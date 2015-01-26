(function(CF,$){
var UPLOAD_FAIL_KEY = 'IDEX_UPLOAD_CLOUD_FAIL',
	lastUploadTimeId;
$.push({
	_name_ : 'UploadCloud',
	initModule : function(){
		this.logger(this);

		this.app.bindReadyAfter(this);

		this.app.addEventListener('upload',function(callback){
			this.UploadCloud.upload(callback);
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
			offset : 'lt',
			align : 'lc',
			html : config.html,
			time : config.time,
			target :  this.iconItem.target
		});
	},
	CONTEXT_MAX_LENGTH : -1,
	upload : function(callback){
		
		this.iconItem.$elem.addClass('saveing');

		var ViewPanel=this.app.ViewPanel,
			allHTML=ViewPanel.getAllHTML();

		this.callback=callback;

		console.info('on upload:'+Date.getDateTime());
		
		if(allHTML.length>this.CONTEXT_MAX_LENGTH){
			this.on('error',['<span style="color:#CD3E00;">',
								'代码超出限制，保存失败！',
							 '</span>'].join(''));
			return;
		}else if(this.lastUploadHTML==allHTML){
			this.on('success');
			return;
		}
		this.currentUploadHTML=allHTML;
		this.on('upload',allHTML);
	},
	getParam : function(data){
		return $.param(data);
	},
	onUpload : function(allHTML){
		var ViewPanel=this.app.ViewPanel,
			value,
			data={
				method : 'save',
				id : ViewPanel.data.id,
				atype : ViewPanel.data.type
			};
			
		value=ViewPanel.getWidth();
		if(value){
			data.width=value;
		}
		
		value=ViewPanel.getTitle();
		if(value){
			data.title=value;
		}
		
		data.html=allHTML;

		$.jsonp({
			url : '/edit.s',
			data : this.getParam(data),
			_id : data.id,
			_$owner : this,
			success : function(val){
				if(val==1){
					this._$owner.on('success');
					this._$owner.saveUploadFail(this._id);
				}else{
					this.error();
				}
			},
			error : function(){
				this._$owner.on('error');
				this._$owner.saveUploadFail(this._id,this.data);
			}
		});
	},
	saveUploadFail:function(id,data){
		var key=UPLOAD_FAIL_KEY+'_'+id;
		if(!data){
			$.cache.remove(key);
		}else{
			$.cache.put(key,data);
		}
	},
	onSuccess : function(){
		this.lastUploadHTML=this.currentUploadHTML;
		this.quicktip({
			html : '<span style="color:#5BCD00;padding: 0px 15px;">上传成功</span>',
			time : 5000
		});
		this.setInterval();
	},
	onError : function(){
		this.quicktip({
			html : '<span style="color:#CD3E00;">保存失败，稍后在试！</span>',
			time : 5000
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
			this.trigger('save','save');
		},this.INTERVAL_TIME,this.app.TabPanel);

		$.setTimeout(function(){
			this.iconItem.$elem.removeClass('saveing');
			
			if(this.callback){
				this.callback.execute();
			}
		},1000,this);
	}
});
})(CF,jQuery);