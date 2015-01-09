(function(CF,$){
var IDEX_ATTR_MAP=window.IDEX_ATTR_MAP;

$.push({
	_name_ : 'ImageQueue',
	initModule : function(){
		this.logger(this);
		this.app.addEventListener('readyafter',function(){
			this.ImageQueue.onReadyAfter();
		});

		this.app.addEventListener('contentUpdate',function(){
			this.ImageQueue.trigger('contentUpdate');
		});

		this.app.addEventListener('loadImage',function(){
			this.ImageQueue.load();
		});
	},
	onReadyAfter : function(){
		this.init(this.app.$viewPanel);
		this.addEventListener('contentUpdate runImageQueue',function(){
			this.clear();
			var imgList=$('img['+IDEX_ATTR_MAP.SRC+']',this.$viewPanel);
			$.it(imgList,function(i,img){
				if(img.offsetParent){
					this.push(img);
				}
			},this);
			this.run();
		});

		this.triggerAndRemoveEvent('runImageQueue');
	},
	init : function(content){
		this.$content=$(content);
		this.array = [];
		this.length=0;
		this.content=this.$content[0];

		this.bindContentScroll();
	},
	content : null,
	css : {
		item : 'idex-r-iq-item',
		error : 'idex-r-iq-error'
	},
	/*距image offsetTop 像素*/
	spacing : 100,
	/*重试次数*/
	retry : 3,
	isAutoListener : true,
	errorCount : 0,
	getSrc : function(img){
		return $.attr(img,IDEX_ATTR_MAP.SRC);//||$.attr(img,'src');
	},
	push : function(img){
		var top,
			left,
			src=this.getSrc(img);
		if(!src){
			return;
		}
		this.array.push(img);
		$.addClass(img,this.css.item);
		this.length++;
	},
	remove : function(index){
		if(this.array && this.length>0){
			var img=this.array.splice(index,1);
			this.length=this.array.length;
			CF.info({'ImageQueue.remove':img});
		}
	},
	get : function(index){
		if(!this.array || this.array.length==0){
			return null;
		}
		return this.array[index];
	},
	/*事件后缀*/
	SCROLL_EVENT_KEY : 'scroll.IQ',
	run : function(){
		if(this.isRun==false){
			this.bindContentScroll();
		}
		this.isRun=true;

		this.load();
	},
	stop : function(){
		this.$content.off(this.SCROLL_EVENT_KEY);
		this.isRun=false;
	},
	load : function(top){
		if(top!=0 && !top){
			top=this.content.scrollTop;
		}
		this.on('check',top);
	},
	bindContentScroll:function(){
		this.$content.on(this.SCROLL_EVENT_KEY,{
			instance : this
		},function(event){
			event.data.instance.on('check',this.scrollTop);
		});
	},
	onCheck : function(top){
		if(this.length<=0 || this.isPause || !this.content){
			return;
		}
		var i=0,
			offsetTop,
			img;
		top = top || this.content.scrollTop;
		offsetTop = top + this.content.clientHeight + this.spacing;

		while(img=this.get(i)){
			var imgOffsetTop=img.offsetTop,
				height=img.clientHeight;

			if(img.offsetParent){
				var isCheck=false;
				if(imgOffsetTop >= top && imgOffsetTop <= offsetTop){
					isCheck=true;
				}else if(imgOffsetTop + this.spacing >= top && imgOffsetTop + height <= offsetTop){
					isCheck=true;
				}
				if(isCheck==true){
					this.loadImage(img);
					this.on('complete',img);
					this.remove(i);
					return;
				}
			}
			i++;
		}
	},
	loadImage:function(img){
		if(img.src && img.naturalHeight>0 && img.naturalWidth>0){
			$.setTimeout(function(){
				this.imgLoad(img);
			},0,this);
			return;
		} 

		var src=this.getSrc(img);

		img.removeAttribute('src');

		img._load_error_index_=0;

		var me=this;
		img.onload=function(){
			me.imgLoad(this);
		};

		img.onerror=function(){
			me.imgError(this);
		};
		
		setTimeout(function(){
			img.src=src;
		},0);
	
	},
	onComplete : function(img){
		img.removeAttribute(IDEX_ATTR_MAP.SRC);
		$.removeClass(img,this.css.item);
		if(!img.className){
			img.removeAttribute('class');
		}
	},
	onImageLoad : function(img){
		$.removeClass(img,this.css.error);
	},
	onImageError:function(img,index){
		$.addClass(img,this.css.error);
	},
	imgLoad : function(img){
		img.onload=null;
		img.onerror=null;

		delete img._load_error_index_;

		this.on('imageLoad',img);

		this.load();
	},
	imgError : function(img){
		img._load_error_index_++;

		var index=img._load_error_index_;

		if(index<this.retry){				
			var src=img.src;
			img.removeAttribute('src');
			setTimeout(function(){
				img.src=src;
			},index * 500);
		}else{
			img.onload=null;
			img.onerror=null;
			this.errorCount--;
			delete img._load_error_index_;
			this.load();
		}
		if(index==1){
			this.errorCount++;
			this.load();
		}
		this.on('imageError',img,index);
	},
	clear:function(){
		CF.info('ImageQueue.clear');
		this.array = [];
		this.length=0;
	}
});
})(CF,jQuery);