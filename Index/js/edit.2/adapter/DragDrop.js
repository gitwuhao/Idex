(function(CF,$){

	$.push({
		_name_ : 'dragdrop',
		initModule : function(){
			this.logger(this);
			
			var app=this.app;
			
			app.dd=this;

			ui.dragdrop.addEventListener('dragmove resizemove sortmove',function(config){
				app.PropertyPanel.disabledForm();
			});

			ui.dragdrop.addEventListener('dragover resizeover sortover',function(config){
				app.PropertyPanel.enabledForm();
			});
/*
			ui.dragdrop.addEventListener('dragstart',function(config){
				if(config.target==app.LayoutPanel.activeElement){
					$.removeClass(app.LayoutPanel.activeElement,'idex-r-active');
				}
			});
*/
			/*
			this.app.addEventListener('dragover',function(){
				$(this.LayoutPanel.activeElement).addClass('idex-r-active');
			});
			*/
		},
		sort : function(config){
			this.bind(config,'sort');
		},
		resize : function(config){
			this.bind(config,'resize');
		},
		drag : function(config){
			this.bind(config,'drag');
		},
		bind : function(config,type){
			/*
			if(config.instance && config.instance._isSubLayoutItem_){
				$.setTimeout(function(_config,_type){
					ui.dragdrop[type](this.getConfig(config));
				},100,this,[config,type]);
			}else{
				ui.dragdrop[type](this.getConfig(config));
			}
			*/
			ui.dragdrop[type](this.getConfig(config));
		},
		hide : function(){
			ui.dragdrop.hide();
		},
		getConfig : function(config){
			CF.merger(config,{
					app : this.app
				}
			);
			return config;
		}
	});	
	
})(CF,jQuery);