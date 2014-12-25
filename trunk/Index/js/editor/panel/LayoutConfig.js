(function(CF,$){
	$.push({
		overwrite : function(app){
			var LayoutPanel=app._module_map_.LayoutPanel,
				topbarItems,
				home;
			
			topbarItems=LayoutPanel.topbar.items;

			home=topbarItems[0];

			topbarItems.push({
				cls : "config",
				onClick : home.onClick
			});

			CF.merger(LayoutPanel,this.config);
		},
		config : {
			onConfig : function(){
				console.info('config');
				this.app.$eventElement.trigger('viewconfig');
			}
		}
	});
})(CF,jQuery);