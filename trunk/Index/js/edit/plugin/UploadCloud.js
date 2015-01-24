(function(CF,$){
var CACHE_KEY={

};
$.push({
	_name_ : 'UploadCloud',
	initModule : function(){
		this.logger(this);
		
		this.app.bindReadyAfter(this);

		this.app.addEventListener('upload',function(){
			this.UploadCloud.on('upload');
		});
	},
	onAppReadyAfter : function(){
		console.info('onAppReadyAfter:',this);
	},
	onUpload : function(){
		
	}
});
})(CF,jQuery);