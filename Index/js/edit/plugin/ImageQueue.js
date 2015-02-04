(function(CF,$){
var _name_ = 'ImageQueue',
	ImageQueue;

ImageQueue=function(config){
	CF.merger(this,config);

	this.$context=$(this.context);
	this.array = [];
	this.length=0;
	this.context=this.$context[0];
	this.bindcontextScroll();
};

CF.merger(ImageQueue.prototype,{
	_name_ : _name_,
	ATTR_SRC : 'iq-src',
	context : null,
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
		return $.attr(img,this.ATTR_SRC);//||$.attr(img,'src');
	},
	isLoadAfterImage : function(img){
		//return (img.src && img.naturalHeight>0 && img.naturalWidth>0)||false;
		if(!$.attr(img,'src') && this.getSrc(img)){
			return false;
		}
		return true;
	},
	pushList : function(context){
		if(!context){
			return;
		}
		var imgList=$('img['+this.ATTR_SRC+']',context);
		$.it(imgList,function(i,img){
			if(!this.isLoadAfterImage(img) && img.offsetParent){
				this.push(img);
			}
		},this);
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
			this.bindcontextScroll();
		}
		this.isRun=true;

		this.load();
	},
	stop : function(){
		this.$context.off(this.SCROLL_EVENT_KEY);
		this.isRun=false;
	},
	load : function(top){
		if(top!=0 && !top){
			top=this.context.scrollTop;
		}
		this.on('check',top);
	},
	bindcontextScroll:function(){
		this.$context.on(this.SCROLL_EVENT_KEY,{
			instance : this
		},function(event){
			event.data.instance.on('check',this.scrollTop);
		});
	},
	onCheck : function(top){
		if(this.length<=0 || this.isPause || !this.context){
			return;
		}
		var i=0,
			offsetTop,
			img;
		top = top || this.context.scrollTop;
		offsetTop = top + this.context.clientHeight + this.spacing;

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
		if(this.isLoadAfterImage(img)){
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
		img.removeAttribute(this.ATTR_SRC);
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
	},
	destroy:function(){
		CF.info('ImageQueue.destroy');
		this.on('destroy');
		this.stop();
		if(this.$insertContent){
			this.$insertContent.off('DOMNodeInserted',this._insertDOMHandle_);
		}
		CF.removeOwnProperty.call(this);
	}
});

CF.extendEventListener(ImageQueue.prototype);

//CF.setOwner(ImageQueue);

window.ImageQueue=ImageQueue;


})(CF,jQuery);