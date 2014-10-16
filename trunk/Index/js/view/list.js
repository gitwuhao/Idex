(function(CF,$){
	var list={};
	CF.merger(list,Idex.view.list,{
		items : [{
			active:true,
			label:'描述列表',
			onTagClick:function(){
				console.info("onTagClick:"+this.label);
			},
			onLoad:function(){
				this.$tabview.html("sdflskdjf");
				console.info("onLoad:"+this.label);
			}
		},{
			label:'描述模板',
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

	Idex.view.list.init=function(){
		Idex.view.list=new ui.tab(list);
	};	

})(CF,jQuery);