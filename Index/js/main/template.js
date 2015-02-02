(function(CF,$,Idex){ 
var template = {},
	ACTION_TYPE=Idex.TYPE_MAP.TEMPLATE,
	CACHE_KEY = 'template_list';

Idex.view.template=template;

CF.merger(template,{
	init : function(tab){
		CF.merger(tab,{
			onRender : function(){

				var div,
					html=['<div class="x-ui-floatbar-box">',
								ui.getXTypeHTML(this.refresh),
								ui.getXTypeHTML(this.search),
						  '</div>'];
				div=$.createElement(html.join(''));
				this.$owner.$tabbarbox.before(div);

				this.$floatbox=$(div);

				var children=this.$floatbox.children();


				this.refresh.$owner=this;
				this.refresh=ui.getXTypeItem(this.refresh,children[0]);

				this.search.$owner=this;
				this.search=ui.getXTypeItem(this.search,children[1]);




				var module=new Idex.Module({
					COUNT : Idex.getVersionLimit('tcount'),
					isView : true,
					CACHE_KEY : CACHE_KEY,
					ACTION_TYPE : ACTION_TYPE
				});
				
				CF.merger(this,module);

				this.initModule();


			},
			refresh : {
				xtype : 'button',
				icon : true,
				cls : 'refresh',
				title : "刷新",
				onClick:function(){
					if(this.$owner.isActionBusy(this.$elem[0])){
						return;
					}
					this.$owner.query();
					if(this.$owner.search){
						this.$owner.search.setValue('');
					}
				}
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
				this.$floatbox.show();
			},
			onHideAfter : function(){
				this.$floatbox.hide();
			}
		});

		tab.onRender();

		delete tab.onRender;

		delete this.init;
	},
	initList : function(){
		var data=$.cache.get(CACHE_KEY);
		if(data){
			this.buildModuleList(JSON.parse(data));
		}else{
			this.query();
		}
	},
	saveCache : function(json){
		$.cache.put(CACHE_KEY,JSON.stringify(json),new Date());
	},
	query : function(){
		$.jsonp({
			url:'/module.s',
			data : 'method=query&_t=' + ACTION_TYPE,
			$owner : this,
			success : function(json){
				if(json && json.length>0){
					this.$owner.saveCache(json);
				}else{
					json=[];
				}
				this.$owner.buildModuleList(json);
			},
			error : function(){
				this.$owner.buildModuleList();
			},
			complete : function(){
			}
		});
	},
	buildModuleList : function(json){
		var html;
		if(!json){
			html='<div class="error-msg">没有详情模板...</div>';
		}else if(json.length==0){
			html='<div class="error-msg">还没有详情模板，快去【详情模板】里面创建吧...</div>';
		}else if(json.length>0){
			html=[];
			for(var i=0,len=json.length;i<len;i++){
				var item=json[i];
				html.push('<div class="idex-module-item idex-shadow-box" data-id="',item.id,'">',
							'<p>',item.width,'px</p>',
							'<em>',item.title,'</em>',
						  '</div>');
			}
			html=html.join('');
		}
		this.win.$moduleBox.html(html);
	},
	select : function(callback){
		if(this.win){
			return;
		}
		var win=new ui.window({
			title : '选择详情模板',
			cls : 'idex-win-template-select',
			html : ['<div class="idex-module-box">',
					'</div>'].join(''),
			callback : callback,
			buttons:[{
				label:'确定',
				cls:'submit',
				isDisabled : true,
				onClick : function(event){
					this.$owner.$owner.submit();
				}
			},{
				label:'取消',
				cls:'cancel'
			}],
			onCloseAfter : function(){
				this.$owner.close();
			}
		});
		this.win=win;
		win.$owner = this;
		win.show();
		win.$moduleBox=win.$body.children('.idex-module-box');
		ui.popu.createInnerLoading({
			$elem : win.$moduleBox,
			css : {
				'margin': '0px',
				'height': '400px',
				'text-align': 'center',
				'overflow': 'hidden',
				'width': '100%'
			}
		});
		this.initList();
		//this.buildModuleList();
	},
	submit : function(){


	},
	close : function(){
		this.win.remove();
		delete this.win;
	}
});

})(CF,jQuery,Idex);