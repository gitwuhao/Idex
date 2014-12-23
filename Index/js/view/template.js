(function(CF,$,Idex){
 
Idex.view.template.init=function(tab){
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
				MODULE_TYPE : 't',
				CACHE_KEY : 'template_list',
				ACTION_TYPE : 1
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
			if(this.currentKeyWord){
				this.search.setValue('');
				this.rerenderList();
			}
		},
		onHideAfter : function(){
			this.$floatbox.hide();
		}
	});

	tab.onRender();

	delete tab.onRender;
};

})(CF,jQuery,Idex);