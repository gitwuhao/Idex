(function(CF,$){
	var ImageQueue=window.ImageQueue;
	$.push({
		_name_ : '_temp_module_',
		initModule : function(){
			this.logger(this);
			this.app.addEventListener('readyafter',this.initImageQueue);
		},
		initImageQueue : function(event){
			this.logger(this);
			this.ImageQueue=new ImageQueue({
				_name_ : 'ImageQueue',
				content : this.$viewPanel,
				/*insertContent : this.app.$descBox[0],*/
				spacing : 100,
				attrName : 'idex-src',
				css : {
					item : 'idex-r-imagequeueitem',
					load_error : 'idex-r-imagequeueloaderror'
				},
				retry : 5,
				onComplete : function(img){
					img.removeAttribute(this.attrName);
					$.removeClass(img,this.css.item);
					if(!img.className){
						img.removeAttribute('class');
					}
				},
				onLoad:function(img){
					$.removeClass(img,this.css.load_error);
				},
				onError:function(img,index){
					$.addClass(img,this.css.load_error);
				}
			});

			this.ATTR_KEY_IMG_SRC=this.ImageQueue.attrName;
			
			this.addEventListener('contentupdate runimagequeue',function(){
				this.ImageQueue.clear();

				this.ImageQueue.pushList($('img['+this.ATTR_KEY_IMG_SRC+']',this.$viewPanel));
				this.ImageQueue.run();
			});

			this.triggerAndRemoveEvent('runimagequeue');
		}
	});
	delete window.ImageQueue;
})(CF,jQuery);