(function(CF,$){

var __INDEX__,
	__SUFFIX__='TP'+$.randomChar(3),
	KEY_MAP=window.APP_KEY_MAP,
	CACHE_KEY=KEY_MAP.CACHE,
	CACHE_VERSION=KEY_MAP.CACHE_VERSION,
	ACTION_KEY=KEY_MAP.ACTION;

__INDEX__=parseInt((''+$.timestamp()).match(/(\d{5}$)/)[0]);

function getLayoutID(){
	return (__INDEX__ ++ )  + __SUFFIX__;
};

$.push({
	_name_ : 'Template',
	initModule : function(){
		this.logger(this);
		
		this.app.addEventListener('getTemplate',function(config){
			this.Template.show(config);
		});

		this.app.bindReadyAfter(this);
	},
	onAppReadyAfter : function(){
		this.contextType=this.app.ViewPanel.data.type;
		this.CustomModule=this.app.CustomModule;
		$.setTimeout(function(){
			this.initData();
			delete this.initData;
		},500,this);
	},
	CACHE_KEY : {
		CUSTOM_CODE : 'custom_code',
		CUSTOM_TEMPLATE_LIST : 'custom_list'
	},
	initData : function(){
		this.data={};
		this.initSystemTemplate();
	},
	LAYOUT_MAP_BY_TYPE_ID : {},
	initLayoutRelation : function(){
		var node,
			parent,
			parents,
			tree=$.cache.parseJSON(localStorage[CACHE_KEY.LAYOUT_RELATION]),
			tid,
			LAYOUT=this.app.layout;
	
		for(var key in tree){
			node=tree[key];
			if(node.parent){
				parents=node.parent.split(' ');
				for(var n=0,len=parents.length;n<len;n++){
					parent=$.trim(parents[n]);
					if(parent && tree[parent]){
						parent=tree[parent];
						parent.child=parent.child||[];
						parent.child.push(key);
					}
				}
				delete node.parent;
			}
			//容器ID
			tid=node.tid;
			if(tid){
				var _layout_=LAYOUT.getLayout(key);
				if(_layout_){
					_layout_._type_id_=tid;
					if(this.LAYOUT_MAP_BY_TYPE_ID[tid]){
						CF.error('layout type id is repeat:['+key+']');
					}
					this.LAYOUT_MAP_BY_TYPE_ID[tid]=_layout_;
				}else{
					CF.error('no find layout:'+key+'...');
				}
			}
		}
		this.data.layoutRelationTree=tree;
	},
	isFilterLayout : function(layoutType){
		var result=false,
			node=this.data.layoutRelationTree[layoutType];
		if(node.export){
			$.it(node.export,function(i,item){
				if(item==this.contextType){
					result=true;
					return false;
				}
			},this);
		}
		return result;
	},
	initSystemTemplate : function(){
		this.logger(this);
		var state=$.cache.equalVersion(CACHE_KEY.SYSTEM_TEMPLATE,CACHE_VERSION.SYS_DATA);
		if(state && this.getSystemTemplateData()){
			this.buildSystemTemplate();
			return;		
		}
		var me=this;
		$.loadJSQueue("/js/edit/SystemData.js?_v="+CACHE_VERSION.SYS_DATA,function(){
			me.buildSystemTemplate();
			$.cache.putVersion(CACHE_KEY.SYSTEM_TEMPLATE,CACHE_VERSION.SYS_DATA);
		});
	},
	getSystemTemplateData : function(){
		return localStorage[CACHE_KEY.SYSTEM_TEMPLATE];
	},
	buildSystemTemplate : function(){
		this.logger(this);
		var layoutMap1={},
			layoutMap2={},
			systemTemplates=$.cache.parseJSON(this.getSystemTemplateData());
		
		
		this.initLayoutRelation();


		for(var i=0,len=systemTemplates.length;i<len;i++){
			var item=systemTemplates[i];
			item.lid=getLayoutID();

			if(!this.isFilterLayout(item.type)){
				layoutMap1[item.lid]=item;
				layoutMap2[item.type]=item;
			}
		}
		this.data.systemTemplate={};
		this.data.systemTemplate.Map=layoutMap1;
		this.data.systemTemplate.layoutMap=layoutMap2;

		
		this.initCustomTemplate();
		
	},
	getCustomTemplateData : function(){
		return $.cache.get(this.CACHE_KEY.CUSTOM_TEMPLATE_LIST);
	},
	saveCustomTemplateData : function(json){
		$.cache.put(this.CACHE_KEY.CUSTOM_TEMPLATE_LIST,$.cache.stringJSON(json),new Date());
	},
	initCustomTemplate :function(){
		this.logger(this);
		var data=this.getCustomTemplateData();
		data=$.cache.parseJSON(data);
		if(data){
			this.buildCustomTemplate(data);
		}else{
			this.loadCustomTemplateList();
		}
	},
	loadCustomTemplateList : function(config){
		$.jsonp({
			url:'/module.s',
			data : 'method=query&_t='+ACTION_KEY.CUSTOM,
			_$owner : this,
			_config : config,
			success : function(json){
				if(json && json.length>0){
					this._$owner.saveCustomTemplateData(json);
					this._$owner.buildCustomTemplate(json);
				}				
				if(this._config && this._config.success){
					this._config.success();
				}
			},
			error : function(){
				if(this._config && this._config.error){
					this._config.error();
				}
			}
		});
	},
	getCustomTemplateCode : function(data){
		var html=this.CustomModule.getCustomCode(data.id);
		if(html){
			data.html=html;
			this.on('callback',data);
			return;
		}
		$.loadText({
			url:'/module.s',
			data : 'method=getCode&id='+data.id+'&_t='+ACTION_KEY.CUSTOM,
			_$owner : this,
			_data : data,
			success : function(_html){
				if(_html){
					var _data=this._data;
					_data.html=_html;
					this._$owner.CustomModule.saveCustomCode(_data.id,_html);
					this._$owner.on('callback',_data);
				}else{
					this.error();
				}
			},
			error : function(){
				ui.quicktip.show({
					px : 'idex-ui',
					align : 'tc',
					offset : 'lt',
					css : {
						'margin-top' : '-25px',
						'margin-right' : '5px'
					},
					html : '<em style="color:#FC7100;">获取自定义模块代码失败...</em>',
					time : 3000,
					target :  this._$owner.config.event.target
				});
			}
		});
	},
	getLayoutByTypeId : function(_type_id_){
		return this.LAYOUT_MAP_BY_TYPE_ID[_type_id_];
	},
	buildCustomTemplate : function(array){
		var containerList=[],
			layoutList=[],
			layoutMAP={};

		for(var i=0,len=array.length;i<len;i++){
			var _layout_,
				item=array[i];
			_layout_=this.getLayoutByTypeId(item.tid);
			
			
			if(!_layout_){
				console.error(item,_layout_);
			}else if(!this.isFilterLayout(_layout_._name_)){
				item.lid=getLayoutID();
				layoutMAP[item.lid]=item;


				if(_layout_ && _layout_._name_){
					item.type=_layout_._name_;
				}else{
					item.type='container';
				}
				if(item.type=='container'){
					containerList.push(item.lid);
				}else{
					layoutList.push(item.lid);
				}
			}
		}

		this.data.customTemplate={};
		this.data.customTemplate.Map=layoutMAP;
		this.data.customTemplate.containerList=containerList;
		this.data.customTemplate.layoutList=layoutList;
	},
	getLayoutTemplateDataById : function(id){
		var data=this.data,
			html;
		html=data.systemTemplate.Map[id];
		if(!html){
			html=data.customTemplate.Map[id]
		}
		return html;
	},
	getLayoutTemplateItemHTML : function(layout){		
		return ['<div id="',layout.lid,'" class="layout-template-item ',layout.type,'-icon">',
					'<div class="idex-icon"></div>',
					'<span>',layout.title,'</span>',
				'</div>'].join('');
	},
	getSystemTemplateHTML : function(parentLayoutType){
		this.logger(this);
		var tree=this.data.layoutRelationTree,
			layoutMap=this.data.systemTemplate.layoutMap,
			layoutChilds,
			html=[];

		if(parentLayoutType){
			layoutChilds=tree[parentLayoutType].child;
		}else{
			layoutChilds=['container'];
		}
		for(var i=0,len=layoutChilds.length;i<len;i++){
			var layoutType=layoutChilds[i];
			if(!this.isFilterLayout(layoutType)){
				var layout=layoutMap[layoutType];
				if(layout){
					if(!layout.title){
						var layoutObject=this.app.layout.getLayout(layoutType);
						if(layoutObject && layoutObject.title){
							layout.title=layoutObject.title;
						}
					}

					if(layout.title){
						html.push(this.getLayoutTemplateItemHTML(layout));
					}else{
						console.error("not find layout:"+layoutType);
					}
				}else{
					console.error("not find layout:"+layoutType);
				}
			}
		}
		return html.join('');
	},
	getCustomTemplateHTML : function(parentLayoutType){
		this.logger(this);
		var layout,
			customTemplate=this.data.customTemplate,
			layoutMap,
			list,
			html=[];
		if(!customTemplate){
			return '<div style="padding-top: 25%;text-align: center;">没有找到你的自定义模块...</div>';
		}
		layoutMap=customTemplate.Map;
		if(parentLayoutType){
			list=customTemplate.layoutList;
		}else {
			list=customTemplate.containerList;
		}
		for(var i=0,len=list.length;i<len;i++){
			layout=layoutMap[list[i]];
			html.push(this.getLayoutTemplateItemHTML(layout));
		}
		return html.join('');
	},
	show : function(config){
		this.logger(this);
		var parentLayout=config.parentLayout,
			parentLayoutType,
			roleTree=this.data.layoutRelationTree;

		if(parentLayout && parentLayout._name_){
			parentLayoutType=parentLayout._name_;
		}

		this.config=config||null;
		if(!parentLayout || parentLayout._className_=='AbsContainer'){
			this.createMainWin(parentLayoutType);
		}else if(parentLayoutType){
			var node=roleTree[parentLayoutType];
			if(node.child){
				if(node.child.length==1){
					this.config=config;
					var type=node.child[0],
						templateData=this.data.systemTemplate.layoutMap[type];
					if(!templateData){
						console.error('['+type+']template data is null');
						return;
					}
					this.submit(templateData);
					delete this.config;
				}else{
					this.createBaseWin(parentLayoutType);
				}
			}
		}
	},
	createBaseWin:function(parentLayoutType){
		this.logger(this);
		var me=this,
			itemConfig;

		itemConfig={
			xtype:'tab',
			cls:'idex-template-tabpanle',
			items : [{
				active:true,
				label:'系统',
				html : this.getSystemTemplateHTML(parentLayoutType),
				onLoad : function(){
					me.bindTabViewEvent(this);
				}
			}]
		};
		
		this.createWin(parentLayoutType,itemConfig);
	},
	createMainWin:function(parentLayoutType){
		this.logger(this);
		var onLoad,
			onTagClick,
			itemConfig,
			me=this;
		onLoad=function(){
			me.bindTabViewEvent(this);
		};
		onTagClick=function(){
			me.on('tagClick',this);
		};
		itemConfig = {
			xtype:'tab',
			cls:'idex-template-tabpanle',
			floatbar : [{
				xtype : 'button',
				icon : true,
				cls : 'refresh',
				title : "刷新",
				onClick : function(){
					this.disabled();
					me.on('refreshClick',this,this.$owner);
				}
			}],
			items : [{
				active:true,
				cls:'system',
				label:'系统',
				html : this.getSystemTemplateHTML(parentLayoutType),
				onTagClick : onTagClick,
				onLoad : onLoad
			},{
				cls:'custom',
				label:'自定义',
				html :  this.getCustomTemplateHTML(parentLayoutType),
				onTagClick : onTagClick,
				onLoad : onLoad
			}/*,{
				cls:'chuang',
				label:'好创意',
				html :  '<div style="padding-top: 20%;text-align: center;">富有创意的模块还在收集或设计中<br/>敬请期待</div>'
			}*/]
		};

		this.createWin(parentLayoutType,itemConfig);
	},
	createWin:function(parentLayoutType,itemConfig){
		this.logger(this);
		var me=this;

		this.win=new ui.window({
			title : '请选择布局',
			parentLayoutType : parentLayoutType,
			width: 450,
			cls:'idex-template-win uns',
			item : itemConfig,
			buttons:[{
				label:'确定',
				cls:'submit',
				onClick : function(event){
					me.submit();
				}
			},{
				label:'取消',
				cls:'cancel'
			}],
			onCloseAfter : function(){
				me.close();
			}
		});

		this.win.show();
		itemConfig=this.win.item;
		if(itemConfig && itemConfig.$floatbar){
			itemConfig.$floatbar.hide();
		}
		this.clearSelectedItem();
	},
	bindTabViewEvent:function(tabPanel){
		this.logger(this);
		tabPanel.$tabview.click({
			content : this,
			tabPanel : tabPanel,
		},function(event){
			event.data.content.on('tabViewClick',event.data.tabPanel,event);
		});
	},
	onRefreshClick:function(button,tab){
		this.logger(this);
		var $tabview=tab.getTab('custom').$tabview;

		ui.popu.createInnerLoading({
			$elem : $tabview,
			css : {
				'margin': '0px',
				'height': '200px',
				'text-align': 'center',
				'overflow': 'hidden',
				'width': '100%'
			}
		});
		
		this.loadCustomTemplateList({
			me : this,
			parentLayoutType : this.win.parentLayoutType,
			$tabview : $tabview,
			success : function(){
				$.setTimeout(function(){
					this.$tabview.html(this.me.getCustomTemplateHTML(this.parentLayoutType));
				},1000,this);
			},
			error : function(){
				this.$tabview.html('<div style="padding-top: 25%;text-align: center;">加载失败...</div>');
			}
		});
	},
	onTabViewClick:function(tabPanel,event){
		this.logger(this);
		var elem,
			tab=tabPanel.$owner,
			type,
			data,
			$elem=$(event.target).closest('.layout-template-item');
		if($elem.length==0 || this.selectedItemID==$elem[0].id){
			return;
		}
		elem=$elem[0];
		if(this.selectedItemID && this.selectedItemID!=elem.id){
			this.clearSelectedItem();
		}

		$.addClass(elem,'selected');
		this.selectedItemID=elem.id;
		type=tabPanel.cls;

		data=this.getSelectedData();

	},
	getSelectedData:function(){
		this.logger(this);
		if(!this.selectedItemID){
			return;
		}
		if(this.win){
			this.win.buttons.submit.enabled();
		}
		return this.getLayoutTemplateDataById(this.selectedItemID);
	},
	getSelectedElement:function(){
		this.logger(this);
		return this.app.get(this.selectedItemID);
	},
	clearSelectedItem:function(){
		this.logger(this);
		if(this.selectedItemID){
			$.removeClass(this.getSelectedElement(),'selected');
			this.selectedItemID=null;
		}
		if(this.win){
			this.win.buttons.submit.disabled();
		}
	},
	onTagClick:function(tabPanel){
		this.logger(this);
		var tab=tabPanel.$owner,
			type=tabPanel.cls,
			$floatbar=tab.$floatbar;

		if(tabPanel.isActive){
			return;
		}

		if(type=='custom'){
			$floatbar.show();
		}else{
			$floatbar.hide();
		}
		tab.$tabviewbox[0].scrollTop=0;

		this.clearSelectedItem();
	},
	onCallback : function(data){
		if(data && data.html){				
			this.config.callback({
				title : data.title,
				layout : this.app.layout.getLayout(data.type),
				html : data.html,
				type : data.type
			});	
		}
	},
	submit : function(data){
		this.logger(this);
		if(!data){
			data=this.getSelectedData();
		}
		if(this.config && this.config.callback && data){
			if(data.id && !data.html){
				this.getCustomTemplateCode(data);		
			}else{
				this.on('callback',data);
			}
		}
	},
	close:function(){
		this.logger(this);
		this.win.remove();
		delete this.win;
	}
});
})(CF,jQuery);