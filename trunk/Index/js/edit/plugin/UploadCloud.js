(function(CF,$){
var LAST_UPLOAD_KEY = 'IDEX_LAST_UPLOAD_CLOUD_HTML',
	lastUploadTimeId;
$.push({
	_name_ : 'UploadCloud',
	initModule : function(){
		this.logger(this);

		this.app.bindReadyAfter(this);

		this.app.addEventListener('upload',function(){
			//this.UploadCloud.on('upload');
		});
	},
	onAppReadyAfter : function(){
		var ViewPanel=this.app.ViewPanel;
		
		this.CONTEXT_MAX_LENGTH=ViewPanel.CONTEXT_MAX_LENGTH;

		this.lastUploadHTML=ViewPanel.getOriginalHTML();

		this.iconItem=this.app.TabPanel.getItem('save');
		this.iconItem.target=this.iconItem.$elem[0];
		console.info('onAppReadyAfter:',this);
	},
	quicktip : function(config){
		ui.quicktip.show({
			px : 'idex-ui',
			align : 'tc',
			offset : 'lt',
			html : config.html,
			time : config.time,
			target :  this.iconItem.target
		});
	},
	CONTEXT_MAX_LENGTH : -1,
	onUpload : function(){
		var allHTML=this.app.ViewPanel.getAllHTML();
		if(this.lastUploadHTML==allHTML){
			this.on('success');
			return;
		}else if(allHTML.length>this.CONTEXT_MAX_LENGTH){
			this.on('error',['<span class="">',
								'内容超出限制，保存失败！',
							 '</span>'].join(''));
			return;
		}
		this.lastUploadHTML=allHTML;

		/*
		$.jsonp({
			url:'/module.s',
			data : $.param(data),
			_$owner : this,
			success : function(id){

			},
			error : function(){
			},
			complete : function(){
			}
		});
		*/
	},
	onSuccess : function(){
		this.quicktip({
			html : '<span style="color:#EEE;">上传成功</span>',
			time : 5000
		});
		this.setInterval();
	},
	onError : function(html){
		this.quicktip({
			html : html,
			time : 10000
		});
		this.setInterval();
	},
	/*每5分钟自动保存一次*/
	INTERVAL_TIME : 5 * 60 * 1000,
	setInterval : function(){
		if(lastUploadTimeId){
			window.clearTimeout(lastUploadTimeId);
		}
		lastUploadTimeId=$.setTimeout(function(){
			this.on('upload');
		},this.INTERVAL_TIME,this);
	}
});
})(CF,jQuery);