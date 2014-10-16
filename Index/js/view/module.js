(function(CF,$){
	var module={};
	CF.merger(module,Idex.view.module,{
		items : [{
			active:true,
			label:'自定义模块',
			onTagClick:function(){
				console.info("onTagClick:"+this.label);
			},
			onLoad:function(){
				this.$tabview.html("sdflskdjf");
				console.info("onLoad:"+this.label);
			}
		},{
			label:'装修模块',
			onTagClick:function(){
				console.info("onTagClick:"+this.label);

			},
			onLoad:function(){
				
			}
		}],
		onShow : function(){
			this.$render.show();
		
		},
		onHide : function(){
			this.$render.hide();
			
		}
	});

	Idex.view.module.init=function(){
		Idex.view.module=new ui.tab(module);
	};	

})(CF,jQuery);