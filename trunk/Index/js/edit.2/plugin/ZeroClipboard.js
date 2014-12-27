(function(CF,$){
	var ZC;
	//window._Z_C_SWF_URL_='http://www.oilan.com.cn/_/js/ZeroClipboard.swf';
	$.push({
		_name_ : 'ZeroClipboard',
		initModule : function(){
			this.logger(this);
			$.getDoc().one('ZeroClipboardComplete',{
				app : this.app,
				module : this
			},function(event){	
				var data=event.data,
					module=data.module;
				ZC=window.ZeroClipboard;
				module.onReady();
			});

			this.list=[];
			this.zcbind = this.bind;
			this.bind = function(config){
				if(this.init){
					this.init();
					delete this.init;
				}
				this.list.push(config);
			};
		},
		init : function(callback){
			if(window.ZeroClipboard){
				$.getDoc().trigger('ZeroClipboardComplete',window.ZeroClipboard);
			}else{
				$.loadJSQueue(window._path_ + 'js/ZeroClipboard.js');
			}
		},
		onReady : function(){
			this.logger(this);
			this.bind=this.zcbind;
			$.it(this.list,function(index,item){
				this.bind(item);
			},this);
			delete this.onReady;
			delete this.list;
		},
		bind : function(config){
			this.logger(this);
			config.app=this.app;
			ZC.bind(config);
		}
	});
	
})(CF,jQuery);