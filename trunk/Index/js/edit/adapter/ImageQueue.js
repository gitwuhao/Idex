(function(CF,$){
	var ImageQueue=window.ImageQueue,
		IDEX_ATTR_MAP=window.IDEX_ATTR_MAP;
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
				spacing : 100,
				attrName : IDEX_ATTR_MAP.SRC,
				css : {
					item : 'idex-r-iq-item',
					load_error : 'idex-r-iq-error'
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

			
			this.addEventListener('contentUpdate runImageQueue',function(){
				this.ImageQueue.clear();
				/*
				var array=[],
					imgList=$('img['+IDEX_ATTR_MAP.SRC+']',this.$viewPanel);
				$.it(imgList,function(i,img){
					if(img.offsetParent){
						array.push(img);
					}
				});
				*/
				this.ImageQueue.pushList($('img['+IDEX_ATTR_MAP.SRC+']',this.$viewPanel));
				this.ImageQueue.run();
			});

			this.triggerAndRemoveEvent('runImageQueue');
		}
	});
	delete window.ImageQueue;
})(CF,jQuery);