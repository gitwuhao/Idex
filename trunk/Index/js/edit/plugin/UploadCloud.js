(function(CF,$){
var UPLOAD_FAIL_KEY = 'UPLOAD_CLOUD_FAIL@',
	CHECK_UPLOAD_FAIL_KEY = 'CHECK_UPLOAD_FAIL',
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
		//console.info('onAppReadyAfter:',this);
		
		$.setTimeout(this.checkUploadFail,1000,this);


		$.getWin().on('beforeunload',{
			me : this
		},function(event){
			event.data.me.upload();
		});

	},
	checkUploadFail : function(){
		if($.cache.get(CHECK_UPLOAD_FAIL_KEY)){
			return;
		}
		$.cache.put(CHECK_UPLOAD_FAIL_KEY,'1',new Date());
		var list=$.cache.findAll(UPLOAD_FAIL_KEY+this.app.ViewPanel.data.id);
		if(list && list.length>0){
			var param=JSON.parse(list[0].value);
			if(param.html &&  param.time){
				var date=new Date(),					
					HistoryPanel=this.app.HistoryPanel;
				
				date.setTime(param.time);

				HistoryPanel.createSnap({
					title : '离线快照【'+HistoryPanel.getShotTimeTitle(date)+'】',
					context : param.html
				});
			}
		}
		$.cache.remove(CHECK_UPLOAD_FAIL_KEY);
	},/*
	checkUploadFail : function(){
		if($.cache.get(CHECK_UPLOAD_FAIL_KEY)){
			return;
		}
		$.cache.put(CHECK_UPLOAD_FAIL_KEY,'1',new Date());
		var list=$.cache.findAll(UPLOAD_FAIL_KEY);
		if(list && list.length>0){
			list.index=0;
			$.setTimeout(this.uploadFail,1000,this,[list]);
		}else{
			$.cache.remove(CHECK_UPLOAD_FAIL_KEY);
		}
	},
	uploadFail : function(list){
		var item=list[list.index];
		if(!item){
			$.cache.remove(CHECK_UPLOAD_FAIL_KEY);
			return;
		}
		list.index++;
		$.jsonp({
			url : '/edit.s',
			data : item.value,
			_key : item.key,
			_list : list,
			_$owner : this,
			success : function(val){
				delete $.LS[this._key];
				this.error();
			},
			error : function(){
				$.setTimeout(this.uploadFail,200,this._$owner,[this._list]);
			}
		});
	},*/
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
		
		data.code=allHTML;

		$.jsonp({
			url : '/edit.s',
			data : this.getParam(data),
			_id : data.id,
			_html : allHTML,
			_$owner : this,
			success : function(val){
				if(val==1){
					this._$owner.on('success');
					this._$owner.saveUploadFail(this._id);
				}else{
					this._$owner.on('error');
				}
			},
			error : function(){
				this._$owner.on('error');
				this._$owner.saveUploadFail(this._id,this._html);
			}
		});
	},
	saveUploadFail:function(id,data){
		var key=UPLOAD_FAIL_KEY+id;
		if(!data){
			$.cache.remove(key);
		}else{
			var date=new Date();
			date.addDays(30);
			$.cache.put(key,JSON.stringify({
				html : data,
				time : $.timestamp()
			}),date);
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