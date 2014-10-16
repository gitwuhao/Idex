(function(CF,$){

	
	CF.merger(Idex.view.sync,{
		init : function(){
			var html=['<div class="">',
						 'sync',
			          '</div>'];
			this.$render.html(html.join(''));
			delete this.init;
		},
		onShow : function(){
			this.$render.show();
		},
		onHide : function(){
			this.$render.hide();
		}
	});


	CF.extendEventListener(Idex.view.sync);

})(CF,jQuery);