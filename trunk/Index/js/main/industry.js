(function(CF,$,Idex){
 
Idex.view.industry.init=function(tab){
	CF.merger(tab,{
		onRender : function(){

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
			this.$floatbox.show();
		},
		onHideAfter : function(){
			this.$floatbox.hide();
		}
	});

	tab.onRender();

	delete tab.onRender;
};

})(CF,jQuery,Idex);