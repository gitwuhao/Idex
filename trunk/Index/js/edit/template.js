(function(CF,$){

	var __INDEX__,
		__SUFFIX__='TP'+$.randomChar(3);

	__INDEX__=parseInt((''+$.timestamp()).match(/(\d{5}$)/)[0]);

	function getLayoutID(){
		return (__INDEX__ ++ )  + __SUFFIX__;
	};

	$.push({
		_name_ : 'Template',
		initModule : function(){
			this.logger(this);
			
			this.app.addEventListener('getTemplate',function(config){
				this.Template.getTemplate(config);
			});

			this.app.addEventListener('readyafter',function(event){
				$.setTimeout(function(){
					this.initData();
					delete this.initData;
				},1000,this.Template);
			});
		},
		CACHE_KEY : {
			LAYOUT_RELATION : 'IDEX_LAYOUT_RELATION',
			SYSTEM_TEMPLATE_LIST : 'IDEX_SYSTEM_TEMPLATE_LIST',
			CUSTOM_TEMPLATE_LIST : 'custom_list',
		},
		initData : function(){
			this.data={};
			this.initLayoutRelation();
			this.initSystemTemplate();
			this.initCustomTemplate(true);
		},
		initLayoutRelation : function(){
			var node,
				parent,
				parents,
				tree=JSON.parse(localStorage[this.CACHE_KEY.LAYOUT_RELATION]);
		
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
			}
			this.data.layoutRelationTree=tree;
		},
		initSystemTemplate : function(){
			this.logger(this);
			if(this.getSystemTemplateStorage()){
				this.buildSystemTemplate();
				return;
			}
			var me=this;
			$.getScript("/js/SystemData.js",function(){
				me.buildSystemTemplate();
			});
		},
		getSystemTemplateStorage : function(){
			return localStorage[this.CACHE_KEY.SYSTEM_TEMPLATE_LIST];
		},
		buildSystemTemplate : function(){
			this.logger(this);
			var layoutMAP={},
				systemTemplates=JSON.parse(this.getSystemTemplateStorage());
			for(var i=0,len=systemTemplates.length;i<len;i++){
				var item=systemTemplates[i];
				item.id=getLayoutID();
				layoutMAP[item.type]=item;
			}
			this.data.systemTemplateMap=layoutMAP;
		},
		getCustomTemplateStorage : function(){
			return $.cache.get(this.CACHE_KEY.CUSTOM_TEMPLATE_LIST);
		},
		saveCustomTemplateStorage : function(json){
			$.cache.put(this.CACHE_KEY.CUSTOM_TEMPLATE_LIST,JSON.stringify(json),new Date());
		},
		initCustomTemplate :function(isAsync){
			this.logger(this);
			if(this.getCustomTemplateStorage()){
				this.buildCustomTemplate();
				return;
			}
			$.ajax({
				url:'/module.s',
				data : 'method=query&_t=2',
				type : 'POST',
				_$owner : this,
				dataType : 'jsonp',
				jsonpCallback : $.getJSONPName(),
				async : isAsync,
				success : function(json){
					if(json && json.length>0){
						this._$owner.saveCustomTemplateStorage(json);
						this._$owner.buildCustomTemplate();
					}
				},
				error : function(){
					
				}
			});
		},
		buildCustomTemplate : function(){
			var array,
				ts=this.getCustomTemplateStorage(),
				containerList=[],
				layoutList=[],
				layoutMAP={};
			if(!ts){
				array=[];
			}else{
				array=JSON.parse(ts);
			}

			for(var i=0,len=array.length;i<len;i++){
				var _layout_,
					item=array[i];
				item.uid=getLayoutID();
				layoutMAP[item.uid]=item;
				_layout_=this.app.layout.getLayoutByIndex(item.type);
				if(_layout_ && _layout_._name_){
					item.type=_layout_._name_;
				}else{
					item.type='container';
				}
				if(item.type=='container'){
					containerList.push(item.uid);
				}else{
					layoutList.push(item.uid);
				}
			}

			this.data.customTemplate={};
			this.data.customTemplate.Map=layoutMAP;
			this.data.customTemplate.containerList=containerList;
			this.data.customTemplate.layoutList=layoutList;
		},
		getLayoutTemplateItemHTML : function(){		
			return ['<div id="',layout.id,'" class="layout-template-item ',layout.type,'-icon">',
						'<div class="idex-icon"></div>',
						'<span>',layout.title,'</span>',
					'</div>'].join('');
		},
		getSystemTemplateHTML : function(parentLayoutType){
			this.logger(this);
			var tree=this.data.layoutRelationTree,
				layoutChilds,
				html=[];

			if(parentLayoutType){
				layoutChilds=tree[parentLayoutType].child;
			}else{
				layoutChilds=['container'];
			}
			for(var i=0,len=layoutChilds.length;i<len;i++){
				var layoutType=layoutChilds[i];
				var layout=this.data.systemTemplateMap[layoutType];
				if(layout){
					if(!layout.title){
						var layoutObject=this.app.layout.getLayout(layoutType);
						if(layoutObject && layoutObject.title){
							layout.title=layoutObject.title;
						}
					}

					if(layout.title){
						html.push(this.getLayoutTemplateItemHTML(layout));
					}
				}
			}
			return html.join('');
		},
		getCustomTemplateHTML : function(parentLayoutType){
			this.logger(this);
			var layout,
				customTemplate=this.data.customTemplate,
				list,
				html=[];
			if(parentLayoutType){
				list=customTemplate.layoutList;
			}else {
				list=customTemplate.containerList;
			}
			for(var i=0,len=list.length;i<len;i++){
				layout=customTemplate.Map[list[i]];
				html.push(this.getLayoutTemplateItemHTML(layout));
			}
			return html.join('');
		},
		getTemplate:function(config){
			this.logger(this);
			var me=this,
				parentLayout=config.parentLayout,
				parentLayoutType;

			if(parentLayout && parentLayout._name_){
				parentLayoutType=parentLayout._name_;
			}

			this.config=config||null;
			if(!parentLayout || parentLayout._className_=='AbsContainer'){
				this.createWin(parentLayoutType);
			}else if(parentLayoutType){
				var node=this.roleTree[parentLayoutType];
				if(node.child){
					if(node.child.length==1){
						this.config=config;
						var type=node.child[0],
							templateData=this.data.system[type];
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
			var me=this;
			this.win=new ui.window({
				title : '请选择布局',
				parentLayoutType : parentLayoutType,
				width: 450,
				cls:'idex-template-win uns',
				item:{
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
				},
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
			this.clearSelectedItem();
			this.win.item.$tabbarbox.hide();
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
		createWin:function(parentLayoutType){
			this.logger(this);
			var me=this;
			var onLoad=function(){
				me.bindTabViewEvent(this);
			};
			var onTagClick=function(){
				me.on('tagClick',this);
			};
			var items=[{
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
			}];


			var floatbar = [{
				xtype : 'button',
				icon : true,
				cls : 'refresh',
				title : "刷新",
				onClick:function(){
					this.disabled();
					me.on('refreshClick',this,this.$owner);
				}
			}];


			this.win=new ui.window({
				title : '请选择布局',
				parentLayoutType : parentLayoutType,
				width: 450,
				cls:'idex-template-win uns',
				item:{
					xtype:'tab',
					cls:'idex-template-tabpanle',
					floatbar : floatbar,
					items : items
				},
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
			this.win.item.$floatbar.hide();
			this.clearSelectedItem();
		},
		onRefreshClick:function(button,tab){
			this.logger(this);
			var me=this;

			var parentLayoutType=this.win.parentLayoutType;

			this.loading=new ui.loading({
				target: tab.$tabviewbox[0]
			});

			this.clearSelectedItem();

			this.loadTemplateData(false,function(){
				if(me.win && tab && tab.getTab){
					tab.getTab('custom').$tabview.html(me.getCustomTemplate(parentLayoutType));
					tab.getTab('share').$tabview.html(me.getShareTemplate(parentLayoutType));
				}
				me.loading.remove();
				delete me.loading;
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
			return this.data.__DATA_MAP__[this.selectedItemID];
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
		submit : function(data){
			this.logger(this);
			if(!data){
				data=this.getSelectedData();
			}
			if(this.config && this.config.callback && data){
				this.config.callback({
					title : data.title,
					layout : this.app.layout.getLayout(data.type),
					html : data.html,
					type : data.type
				});
			}
		},
		close:function(){
			this.logger(this);
			this.win.remove();
			delete this.win;
		}
	});



})(CF,jQuery);