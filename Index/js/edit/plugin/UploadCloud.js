(function(CF,$){
var LAST_UPLOAD_KEY = 'IDEX_LAST_UPLOAD_CLOUD_HTML';
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