(function(CF,$,Idex){
 var systemTemplate = {},
	 TYPE_MAP=Idex.TYPE_MAP;

Idex.view.systemTemplate=systemTemplate;


systemTemplate.init=function(tab){
	CF.merger(tab,{
		onRender : function(){

			//this.initUI();

			this.initModule();

		},
		initUI : function(){
		
			var div,
				html=['<div class="x-ui-floatbar-box">',
							ui.getXTypeHTML(this.search),
					  '</div>'];
			div=$.createElement(html.join(''));
			this.$owner.$tabbarbox.before(div);

			this.$floatbox=$(div);

			var children=this.$floatbox.children();
 
			this.search.$owner=this;
			this.search=ui.getXTypeItem(this.search,children[1]);
		},
		search : {
			xtype:'text',
			icon :'search',
			placeholder : '输入关键字',
			onRenderAfter : function(){
				this.callPrototypeMethod();
				this.addEventListener('textkeydown',function(event){
					 if(event.keyCode==13){
						this.value=this.$text.val();
						this.submit();
					 }
				});
			},
			onIconmousedown : function(event){
				this.submit();
			},
			submit : function(){
				this.$owner.onSearch(this.getValue(),this.$elem[0]);
			}
		},
		onShowAfter : function(){
			if(this.$floatbox){
				this.$floatbox.show();
			}
		},
		onHideAfter : function(){
			if(this.$floatbox){
				this.$floatbox.hide();
			}
		},
		initModule : function(){
			
			
			this.$tabview.html('<div class="idex-sys-tpl-list-box idex-module-box"></div>');

			this.$listbox=this.$tabview.children('.idex-sys-tpl-list-box');

		
			this.loadData();


		},
		CACHE_KEY : 'IDEX_SYS_TEMPLATE_DATA',
		loadData : function(){
			var data=$.LS[this.CACHE_KEY];
			data=$.cache.parseJSON(data);
			if(!data){
				var me=this,
					jsonpName=$.getJSONPName();

				$.cache.put('callback',jsonpName,new Date());
				
				window[jsonpName]=function(data){
					$.LS[me.CACHE_KEY]=JSON.stringify(data);
					me.initListBox(data);
					delete window[jsonpName];
				};

				$.loadJSQueue('/template/config.js?v='+(window.TPLversion||0));
			}else{
				this.initListBox(data);
			}
		},
		ACTION_TYPE : TYPE_MAP.SYS_TEMPLATE,
		ATTR_KEY : 'data-item-id',
		initListBox : function(data){
			var html=[];
			this.item_map={};
			for(var i=0,len=data.length;i<len;i++){
				var item=data[i],
					list=item.list||[];
				if(item=="|||"){
					html.push('<div class="idex-sys-tpl-split-line"></div>');
				}else{
					html.push('<div class="idex-sys-tpl-list-group">',
								'<div class="idex-sys-tpl-title-box">',
									'<div class="idex-bg-line"></div>',
									'<div class="idex-title">',item.title,'</div>',
								'</div>',
								'<div class="idex-sys-tpl-item-box">');
					for(var n=0,lLen=list.length;n<lLen;n++){
						var mitem=list[n];
						
						mitem.type=item.type;

						this.item_map[mitem.id]=mitem;

						html.push(	'<div class="idex-module-item idex-shadow-box">',
										'<div class="idex-mini-tbar">',
											'<a href="/preview/',(mitem.type||'type_undefined'),'/',mitem.id,'" target="_IDEX_VIEW" title="预览">',
												'<div class="view idex-icon"></div>',
											'</a>',
											'<div class="copy idex-icon" title="复制" ',this.ATTR_KEY,'="',mitem.id,'"></div>',
										'</div>',
										'<p>',mitem.width,'px</p>',
										'<em>',mitem.title,'</em>',
									'</div>');


					}
					html.push(	'</div>',
							'</div>');
				}
			}
			this.$listbox.html(html.join(''));
			this.initEventListener();
		},
		initEventListener : function(){
			var ATTR_KEY=this.ATTR_KEY,
				me=this;
			$('['+ATTR_KEY+']',this.$listbox).each(function(i,elem){
				var $elem=$(elem),
					id,
					item;
				id=$elem.attr(ATTR_KEY);
				$elem.removeAttr(ATTR_KEY);

				item=me.item_map[id];

				$elem.click({
					me : me,
					item : item
				},function(event){
					var data=event.data;
					data.me.on('copy',data.item,this);
				});
			});
		},	
		isActionBusy : function (){
			var now=$.timestamp();
			if(this.lastActionTime + 2000  > now){
				return true;
			}
			this.lastActionTime=now;
			return false;
		},
		onCopy : function(item,target){
			if(this.isActionBusy(target)){
				return;
			}
			$.jsonp({
				url:'/module.s',
				data : 'method=copy&id='+item.id+'&type='+item.type+'&title='+item.title+'&width='+item.width+'&_t='+this.ACTION_TYPE,
				$owner : this,
				_target : target,
				_type : item.type,
				success : function(json){
					if(json && json.id>0){
						var ttitle;
						if(this._type==TYPE_MAP.TEMPLATE){
							ttitle='详情';
						}else if(this._type==TYPE_MAP.RENOVATION){
							ttitle='装修';
						}
						
						ui.quicktip.show({
							align : 'tc',
							offset : 'lt',
							target :  this._target,
							cls : 'c5',
							html : '复制成功，请刷新'+ttitle+'模板列表！',
							time : 3001
						});
					}else{
						this.onError(); 
					} 
				},
				onError : function(){
					ui.quicktip.show({
						align : 'tc',
						offset : 'lt',
						target :  this._target,
						cls : 'c3',
						html : '复制失败！',
						time : 1001
					});
				},
				error : function(){
					this.onError(); 
				}
			});
		}
	});

	tab.onRender();

	delete tab.onRender;
};

})(CF,jQuery,$.Idex);