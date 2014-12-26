(function(CF,$){

	var systemTemplates,
		templateData={
			__DATA_MAP__ : null,
			custom : null,
			system : null,
			share : null
		},
		APP
		;


	var __SUFFIX__='TP'+$.randomChar(3);

	var __INDEX__=parseInt((''+$.timestamp()).match(/(\d{5}$)/)[0]);

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
				this.Template.initData();
				delete this.Template.initData;
			});
		},
		data : templateData,
		roleTree:{
			'container' : {},
			'float-box' : {
				parent : 'container'
			},
			'float-link' : {
				parent : 'float-box'
			},
			'float-image' : {
				parent : 'float-box'
			},
			'float-text' : {
				parent : 'float-box'
			},
			'float-html' : {
				parent : 'float-box'
			},
			'text-item' : {
				parent : 'container'
			},
			'html-item' : {
				parent : 'container'
			},
			'image-ctable' : {
				parent : 'container'
			},
			'image-col' : {
				parent : 'image-ctable'
			},
			'image-clink' : {
				parent : 'image-col'
			},
			'image-rtable' : {
				parent : 'container'
			},
			'image-fgrid' : {
				parent : 'container'
			},
			'image-row' : {
				parent : 'image-rtable'
			},
			'image-rlink' : {
				parent : 'image-row'
			},
			'property-table' : {
				parent : 'container'
			},
			'property-itable' : {
				parent : 'container'
			},
			'list-table' : {
				parent : 'container'
			},
			'user-table' : {
				parent : 'container'
			},
			'image-list' : {
				parent : 'container'
			},
			'image-item' : {
				parent : 'image-list'
			}
		},
		initData:function(){
			this.logger(this);

			this.data.system=getSystemTemplates();

			this.loadTemplateData(true);


			var node,
				parent,
				parents,
				tree=this.roleTree;
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
		},
		loadTemplateData : function(isAsync,callback){
			$.ajax({
				url:'/module.s',
				data : 'method=query&_t=2',
				type : 'POST',
				_$owner : this,
				dataType : 'jsonp',
				jsonpCallback : $.getJSONPName(),
				async : isAsync ,
				success : function(json){
					this._$owner.setTemplateData(json,callback);
				},
				error : function(){
					
				}
			});
		},
		setTemplateData : function (json,callback){
			var array=json||[],
				containerList=[],
				layoutList=[],
				dataMap={};

			for(var i=0,len=array.length;i<len;i++){
				var _layout_,
					item=array[i];
				item.uid=getLayoutID();
				dataMap[item.uid]=item;
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

			templateData.custom={};
			templateData.custom.containerList=containerList;
			templateData.custom.layoutList=layoutList;

			var system=templateData.system;
			for(var key in system){
				var item=system[key];
				dataMap[item.id]=item;
			}
			templateData.__DATA_MAP__=dataMap;

			if(callback){
				callback();
			}
		},
		getSystemTemplate : function(parentLayoutType){
			this.logger(this);
			var tree=this.roleTree,
				layoutChilds,
				html=[];

			if(parentLayoutType){
				layoutChilds=tree[parentLayoutType].child;
			}else{
				layoutChilds=['container'];
			}
			for(var i=0,len=layoutChilds.length;i<len;i++){
				var layoutType=layoutChilds[i];
				var layout=this.data.system[layoutType];
				if(layout){
					if(!layout.title){
						var layoutObject=this.app.layout.getLayout(layoutType);
						if(layoutObject && layoutObject.title){
							layout.title=layoutObject.title;
						}
					}

					if(layout.title){
						html.push('<div id="',layout.id,'" class="layout-template-item ',layout.type,'-icon">',
										'<div class="idex-icon"></div>',
										'<span>',layout.title,'</span>',
									'</div>');
					}
				}
			}
			return html.join('');
		},
		_getTemplate : function(parentLayoutType,dataArray){
			var layout,
			list,
			html=[];
			if(parentLayoutType){
				list=dataArray.layoutList;
			}else {
				list=dataArray.containerList;
			}
			for(var i=0,len=list.length;i<len;i++){
				layout=this.data.__DATA_MAP__[list[i]];
				html.push('<div id="',layout.uid,'" class="layout-template-item ',layout.type,'-icon">',
							'<div class="idex-icon"></div>',
							'<span>',layout.title,'</span>');
				if(layout.isShare){
					//html.push('<div class="share-tag idex-icon"></div>');
				}
				html.push('</div>');
			}
			return html.join('');
		},
		getCustomTemplate : function(parentLayoutType){
			this.logger(this);
			return this._getTemplate(parentLayoutType,this.data.custom);
		},
		getShareTemplate : function(parentLayoutType){
			this.logger(this);
			return this._getTemplate(parentLayoutType,this.data.share);
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
						html : this.getSystemTemplate(parentLayoutType),
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
				html : this.getSystemTemplate(parentLayoutType),
				onTagClick : onTagClick,
				onLoad : onLoad
			},{
				cls:'custom',
				label:'自定义',
				html :  this.getCustomTemplate(parentLayoutType),
				onTagClick : onTagClick,
				onLoad : onLoad
			}/*,{
				cls:'share',
				label:'共享',
				html : this.getShareTemplate(parentLayoutType),
				onTagClick : onTagClick,
				onLoad : onLoad
			}*/];

			var floatbar = [/*{
				xtype : 'button',
				icon : true,
				isDisabled : true,
				cls : 'share',
				title : "共享",
				onClick:function(){
					me.on('shareClick',this,this.$owner);
				}
			},{
				xtype : 'button',
				icon : true,
				isDisabled : true,
				cls : 'unshare',
				title : "取消共享",
				onClick:function(){
					me.on('unshareClick',this,this.$owner);
				}
			},*/{
				xtype : 'button',
				icon : true,
				isDisabled : true,
				cls : 'del',
				title : "删除",
				onClick:function(){
					me.on('delClick',this,this.$owner);
				}
			},{
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
		onShareClick:function(button,tab){
			this.logger(this);

		},
		onUnShareClick:function(button,tab){
			this.logger(this);

		},
		onDelClick:function(button,tab){
			this.logger(this);

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

			if(type=='custom'){
				tab.show('del');
				tab.enabled('del');
				if(data.isShare){
					tab.show('unshare');
					tab.enabled('unshare');
					tab.hide('share');
				}else{
					tab.show('share');
					tab.enabled('share');
					tab.hide('unshare');
				}
			}
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
				$floatbar.children('.del,.share,.unshare').hide();
			}else if(type=='share'){
				$floatbar.show();
				$floatbar.children('.del,.share,.unshare').hide();
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

	function getSystemTemplates(){
		if(systemTemplates){
			return systemTemplates;
		}
		systemTemplates=[{
			type : 'container',
			title : '未命名模块',
			html : ['<div class="container" d-t="未命名模块">',
						'<div class="text-title">未命名模块</div>',
						'<div class="layout-box"></div>',
					'</div> '].join('')
		},{
			type : 'float-box',
			html : ['<div class="layout float-box img-b img-p" style="height:300px;">',
						'<div class="float-box-bg">',
						'</div>',
					'</div> '].join('')
		},{
			type : 'float-link',
			html : ['<div class="float-link"></div> '].join('')
		},{
			type : 'float-image',
			html : ['<div class="float-image img-b img-p">',
						'<img src="/s.gif">',
					'</div> '].join('')
		},{
			type : 'float-text',
			html : '<div class="float-text">标题<br>描述.....</div>'
		},{
			type : 'float-html',
			html : '<div class="float-html">标题<br>描述.....</div>'
		},{
			type : 'image-fgrid',
			html : ['<div class="layout image-fgrid" style="height:600px;">',
						'<div class="p-r-b" style="width:70%;height:33.3%;">',
							'<div class="image-fglink img-b img-p">',
								'<img src="/s.gif">',
							'</div>',
						'</div>',
						'<div class="p-b f-r" style="width:30%;height:66.7%;">',
							'<div class="image-fglink img-b img-p">',
								'<img src="/s.gif">',
							'</div>',
						'</div>',
						'<div class="p-r" style="width:30%;height:66.7%;">',
							'<div class="image-fglink img-b img-p">',
								'<img src="/s.gif">',
							'</div>',
						'</div>',
						'<div class="p-r-b" style="width:40%;height:33.4%;">',
							'<div class="image-fglink img-b img-p">',
								'<img src="/s.gif">',
							'</div>',
						'</div>',
						'<div class="p-n" style="width:70%;height:33.3%;">',
							'<div class="image-fglink img-b img-p">',
								'<img src="/s.gif">',
							'</div>',
						'</div>',
					'</div>'].join('')
		},{
			type : 'image-rtable',
			html : ['<div class="layout image-rtable col4">',
						'<div class="image-row" style="height:250px;">',
							'<div class="r-b">',
								'<div class="image-rlink img-b img-p">',
								'<img src="/s.gif">',
								'</div>',
							'</div>',
							'<div class="r-b">',
								'<div class="image-rlink img-b img-p">',
								'<img src="/s.gif">',
								'</div>',
							'</div>',
							'<div class="r-b">',
								'<div class="image-rlink img-b img-p">',
								'<img src="/s.gif">',
								'</div>',
							'</div>',
							'<div class="r-b">',
								'<div class="image-rlink img-b img-p">',
								'<img src="/s.gif">',
								'</div>',
							'</div>',
						'</div>',
						'<div class="image-row" style="height:250px;">',
							'<div class="r-b">',
								'<div class="image-rlink img-b img-p">',
								'<img src="/s.gif">',
								'</div>',
							'</div>',
							'<div class="r-b">',
								'<div class="image-rlink img-b img-p">',
								'<img src="/s.gif">',
								'</div>',
							'</div>',
							'<div class="r-b">',
								'<div class="image-rlink img-b img-p">',
								'<img src="/s.gif">',
								'</div>',
							'</div>',
							'<div class="r-b">',
								'<div class="image-rlink img-b img-p">',
								'<img src="/s.gif">',
								'</div>',
							'</div>',
						'</div>',
					'</div>'].join('')
		},{
			type : 'image-ctable',
			html : ['<div class="layout image-ctable col3">',
						'<div class="image-col">',
							'<div class="image-clink img-b img-p" style="height:300px;">',
							'<img src="/s.gif">',
							'</div>',
							'<div class="image-clink img-b img-p" style="height:50px;">',
							'<img src="/s.gif">',
							'</div>',
							'<div class="image-clink img-b img-p" style="height:300px;">',
							'<img src="/s.gif">',
							'</div>',
						'</div>',
						'<div class="image-col">',
							'<div class="image-clink img-b img-p" style="height:50px;">',
							'<img src="/s.gif">',
							'</div>',
							'<div class="image-clink img-b img-p" style="height:300px;">',
							'<img src="/s.gif">',
							'</div>',
							'<div class="image-clink img-b img-p" style="height:300px;">',
							'<img src="/s.gif">',
							'</div>',
						'</div>',
						'<div class="image-col">',
							'<div class="image-clink img-b img-p" style="height:100px;">',
							'<img src="/s.gif">',
							'</div>',
							'<div class="image-clink img-b img-p" style="height:200px;">',
							'<img src="/s.gif">',
							'</div>',
							'<div class="image-clink img-b img-p" style="height:150px;">',
							'<img src="/s.gif">',
							'</div>',
							'<div class="image-clink img-b img-p" style="height:195px;">',
							'<img src="/s.gif">',
							'</div>',
						'</div>',
					'</div>'].join('')
		},{
			type : 'image-col',
			html : ['<div class="image-col">',
						'<div class="image-clink img-b img-p" style="height:100px;">',
							'<img src="/s.gif">',
						'</div>',
					'</div>'].join('')
		},{
			type : 'image-clink',
			html : ['<div class="image-clink img-b img-p" style="height:100px;">',
						'<img src="/s.gif">',
					'</div>'].join('')
		},{
			type : 'property-table',
			html : '<div class="layout property-table"><table class="property-tbody" border="1"><tbody><tr><td class="property-field">货号</td><td class="property-value">GW3502</td><td class="property-field">货号</td><td class="property-value">GW3502</td></tr><tr><td class="property-field">尺码</td><td class="property-value">S、M</td><td class="property-field">尺码</td><td class="property-value">S、M</td></tr><tr><td class="property-field">颜色</td><td class="property-value">驼色</td><td class="property-field">颜色</td><td class="property-value">驼色</td></tr><tr><td class="property-field">面料弹性</td><td class="property-value" colspan="3"><table class="slider-table"><tbody><tr><td>无</td><td>微弹</td><td class="slider-point">高</td><td>无</td><td>微弹</td></tr></tbody></table></td></tr><tr><td class="property-field">版型</td><td class="property-value" colspan="3"><table class="slider-table"><tbody><tr><td>宽松</td><td class="slider-point">修身</td><td>紧身</td><td>宽松</td><td>紧身</td></tr></tbody></table></td></tr><tr><td class="property-field">长度</td><td class="property-value" colspan="3"><table class="slider-table"><tbody><tr><td class="slider-point">短</td><td>适中</td><td>长</td><td>适中</td><td>长</td></tr></tbody></table></td></tr><tr><td colspan="4" class="property-colspan">蝙蝠T恤再次回归时尚潮人的视线，它可以隐藏拜拜肉，可以修饰不够丰满的上围，可以显得双腿更加纤细，追求气质感。那么要时尚也要风度的单品，就该闪亮登场了！独特的设计，大玩廓型障眼法，让你在这个季节轻松减重，高贵优雅。</td></tr></tbody></table></div>'
		},{
			type : 'property-itable',
			html : ['<div class="layout property-itable col1" style="height:450px;"><div class="p-r pp-i-box"><div class="property-image img-b img-p"><img src="/s.gif"></div></div><div class="p-n pp-t-box"><table class="property-tbody" border="1"><tbody><tr><td class="property-field" style="width:100px;">货号</td><td class="property-value" style="width:190px;">GW3502</td></tr><tr><td class="property-field">尺码</td><td class="property-value">S、M</td></tr><tr><td class="property-field">颜色</td><td class="property-value">驼色</td></tr><tr><td class="property-field">成分</td><td class="property-value">60%腈纶+40%锦纶</td></tr><tr><td class="property-field">季节</td><td class="property-value">春季秋季冬季</td></tr><tr><td class="property-field">面料弹性</td><td><table class="slider-table"><tbody><tr><td>无</td><td>微弹</td><td class="slider-point">高</td></tr></tbody></table></td></tr><tr><td class="property-field">版型</td><td><table class="slider-table"><tbody><tr><td>宽松</td><td class="slider-point">修身</td><td>紧身</td></tr></tbody></table></td></tr><tr><td class="property-field">长度</td><td><table class="slider-table"><tbody><tr><td class="slider-point">短</td><td>适中</td><td>长</td></tr></tbody></table></td></tr><tr><td colspan="2" class="property-colspan">蝙蝠T恤再次回归时尚潮人的视线，它可以隐藏拜拜肉，可以修饰不够丰满的上围，可以显得双腿更加纤细，追求气质感。那么要时尚也要风度的单品，就该闪亮登场了！独特的设计，大玩廓型障眼法，让你在这个季节轻松减重，高贵优雅。</td></tr></tbody></table></div></div>'].join('')
		},{
			type : 'list-table',
			html : ['<div class="layout list-table">',
						'<table border="1" class="list-tbody">',
						'<tbody>',
						'<tr>',
						'<td style="width:20%;">&nbsp;</td>',
						'<td style="width:20%;">&nbsp;</td>',
						'<td style="width:20%;">&nbsp;</td>',
						'<td style="width:20%;">&nbsp;</td>',
						'<td style="width:20%;">&nbsp;</td>',
						'</tr>',
						'<tr>',
						'<td>&nbsp;</td>',
						'<td>&nbsp;</td>',
						'<td>&nbsp;</td>',
						'<td>&nbsp;</td>',
						'<td>&nbsp;</td>',
						'</tr>',
						'<tr>',
						'<td>&nbsp;</td>',
						'<td>&nbsp;</td>',
						'<td>&nbsp;</td>',
						'<td>&nbsp;</td>',
						'<td>&nbsp;</td>',
						'</tr>',
						'</tbody>',
						'</table>',
					'</div>'].join('')
		},{
			type : 'user-table',
			html : ['<div class="layout user-table">',
						'<table border="1" class="user-tbody">',
						'<tbody>',
						'<tr>',
						'<td width="20%">&nbsp;</td>',
						'<td width="20%">&nbsp;</td>',
						'<td width="20%">&nbsp;</td>',
						'<td width="20%">&nbsp;</td>',
						'<td width="20%">&nbsp;</td>',
						'</tr>',
						'<tr>',
						'<td>&nbsp;</td>',
						'<td>&nbsp;</td>',
						'<td>&nbsp;</td>',
						'<td>&nbsp;</td>',
						'<td>&nbsp;</td>',
						'</tr>',
						'<tr>',
						'<td>&nbsp;</td>',
						'<td>&nbsp;</td>',
						'<td>&nbsp;</td>',
						'<td>&nbsp;</td>',
						'<td>&nbsp;</td>',
						'</tr>',
						'</tbody>',
						'</table>',
					'</div>'].join('')
		},{
			type : 'image-list',
			html : ['<div class="layout image-list img-b img-p">',
						'<div class="image-item">',
							'<img src="/s.gif" />',
						'</div>',
						'<div class="image-item">',
							'<img src="/s.gif" />',
						'</div>',
						'<div class="image-item">',
							'<img src="/s.gif" />',
						'</div>',
					'</div>'].join('')
		},{
			type : 'image-item',
			html : ['<div class="image-item">',
						'<img src="/s.gif" />',
					'</div>'].join('')
		},{
			type : 'text-item',
			html : '<div class="layout text-item">标题<br>描述.....<br/><br/><br/></div>'
		},{
			type : 'html-item',
			html : '<div class="layout html-item">标题<br>描述.....<br/><br/><br/></div>'
		}];

		var layoutMAP={};
		for(var i=0,len=systemTemplates.length;i<len;i++){
			var item=systemTemplates[i];
			item.id=getLayoutID();
			layoutMAP[item.type]=item;
		}
		return layoutMAP;
	};

})(CF,jQuery);