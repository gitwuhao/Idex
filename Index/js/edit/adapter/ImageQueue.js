(function(CF,$){
var ATTR_KEY_MAP=window.APP_KEY_MAP.ATTR;


$.push({
	_name_ : 'ImageQueue',
	initModule : function(){
		this.logger(this);
		
		this.app.bindReadyAfter(this);

		this.app.addEventListener('contextReLoad',function(){
			this.ImageQueue.trigger('contextReLoad');
		});

		this.app.addEventListener('loadImage',function(context){
			var IQ=this.ImageQueue;
			if(context){
				IQ.pushList(context);
			}
			IQ.load();
		});
	},
	onAppReadyAfter : function(){
		this.app.ImageQueue=new window.ImageQueue({
			context : this.app.$viewPanel[0],
			ATTR_SRC : ATTR_KEY_MAP.SRC,
			init : function(){
				this.addEventListener('contextReLoad runImageQueue',function(){
					this.clear();
					this.pushList(this.context);
					this.run();
				});
				this.triggerAndRemoveEvent('runImageQueue');
			}
		});
		this.app.ImageQueue.init();

		delete window.ImageQueue;
	}
});
})(CF,jQuery);