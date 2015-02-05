(function(CF,$){
	var ATTR_KEY_MAP=window.APP_KEY_MAP.ATTR;

	function getIntValue(val){
		return parseInt(val.replace('px',''));
	};

	function getFloatValue(val){
		return parseFloat(val.replace('px',''));
	};
	function getWidth(element){
		var offsetWidth=element.offsetWidth;
		return offsetWidth+'px';
	};
	function getHeight(element){
		var height=element.offsetHeight;
		return height+'px';
	};
	
	$.CSSApply.getCSWidth=function(element){
		return window.getComputedStyle(element).width;
	};

	$.CSSApply.getCSHeight=function (element){
		return window.getComputedStyle(element).height;
	};

	$.CSSApply.computedSizing=function(element){

		$('.float-box').each(function(index,elem){
			this.style.width=getWidth(this.children[0]);
			this.style.height=getHeight(this.children[0]);
			this.style.removeProperty('box-sizing');
		});

		$('.float-image').each(function(index,elem){
			var style=this.style;
			var img=this.children[0];
			style.width=getWidth(img);
			style.height=getHeight(img);
			style.removeProperty('box-sizing');
		});
		
		var $array=$('.image-col');

		$array.each(function(index,elem){
			this._width=$.CSSApply.getCSWidth(this.children[0]);
		});

		$array.each(function(index,elem){
			this.style.width=this._width;
			this._width=this.offsetWidth+'px';
		});

		$array.each(function(index,elem){
			var style=this.style;
			style.width=this._width;
			style.removeProperty('box-sizing');
			if(style.padding){
				style.margin=style.padding;
				style.removeProperty('padding');
			}
		});
		

		$('.image-clink').each(function(index,elem){
			var style=this.style,
				img=this.children[0];
			style.width=getWidth(img);
			style.height=getHeight(img);
			style.removeProperty('box-sizing');
		});

		$('.image-fglink').each(function(index,elem){
			var parentElement=this.parentElement;
			parentElement._width=parentElement.offsetWidth+'px';
			parentElement._height=parentElement.offsetHeight+'px';
		});

		$('.image-fglink').each(function(index,elem){
			var style=this.style;
			var parentElement=this.parentElement;
			var parentElementStyle=parentElement.style;
			parentElementStyle.width=parentElement._width;
			parentElementStyle.height=parentElement._height;

			var img=this.children[0];
			style.width=getWidth(img);
			style.height=getHeight(img);
			style.removeProperty('box-sizing');
			style.margin=parentElementStyle.padding;
			style.float=parentElementStyle.float;
			$(this).unwrap();
		});


		$('.image-rlink').each(function(index,elem){
			var parentElement=this.parentElement;
			parentElement._width=parentElement.offsetWidth+'px';
			parentElement._height=parentElement.offsetHeight+'px';
		});

		$('.image-rlink').each(function(index,elem){
			
			var style=this.style;
			var parentElement=this.parentElement;
			var parentElementStyle=parentElement.style;
			parentElementStyle.width=parentElement._width;
			parentElementStyle.height=parentElement._height;

			var img=this.children[0];
			style.width=getWidth(img);
			style.height=getHeight(img);
			style.removeProperty('box-sizing');
			var parentElementStyle=parentElement.style;
			style.margin=parentElementStyle.padding;
			style.float=parentElementStyle.float;
			$(this).unwrap();
		});

/*
		$('.image-item img').each(function(index,elem){
			if(elem.offsetHeight==0){
				this.style.height=getWidth(this);
			}
		});

		$('.image-item').each(function(index,elem){
			var style=this.style,
				img=this.children[0];
			style.width=getWidth(img);
			style.height=getHeight(img);
		});

*/

		$('.property-itable .property-image').each(function(index,elem){
			var style=this.style;
			style.width=getWidth(this.children[0]);
			style.height=getHeight(this.children[0]);
			style.removeProperty('box-sizing');
			var parentElementStyle=this.parentElement.style;
			style.margin=parentElementStyle.padding;
			style.float=parentElementStyle.float;
		});

		$('.property-itable .property-tbody').each(function(index,elem){
			var style=this.style;
			style.width=this.clientWidth+'px';
			style.height=this.clientHeight+'px';
			style.removeProperty('box-sizing');
			var parentElementStyle=this.parentElement.style;
			style.margin=parentElementStyle.padding;
			style.float=parentElementStyle.float;
		});


		$('.image-text .i-text-item').each(function(index,elem){
			this._width=$(this).width()+'px';
			this._height=this.clientHeight+'px';
		});

		$('.image-text .p-r .i-image-item,.image-text .p-n .i-image-item').each(function(index,elem){
			var parentElement=this.parentElement;
			parentElement._width=parentElement.offsetWidth+'px';
			parentElement._height=parentElement.offsetHeight+'px';
		});

		$('.image-text .i-image-item').each(function(index,elem){
			var parent,
				img=this.children[0],
				parent=this.parentElement,
				parentElementStyle=parent.style;

			if(parent._width){
				parentElementStyle.width=parent._width;
				parentElementStyle.height=parent._height;
			}
			
			this._width=getWidth(img);
			this._height=getHeight(img);

			this._margin=parentElementStyle.margin;
			/*
			parent=this.parentElement;
			if($.hasClass(parent,'p-n') && !parent.parentElement.previousElementSibling){
				//this._width=(img.clientWidth-1)+'px';
				if(this.parentElement.previousElementSibling){
					this._margin=this.parentElement.style.margin;
				}else{
					this._margin='0px 5px 0px 0px';
				}
			}
			*/
		});

		$('.image-text .i-text-item').each(function(index,elem){
			var style=this.style;
			style.width=this._width;
			style.height=this._height;
			style.removeProperty('box-sizing');
			var parentElementStyle=this.parentElement.style;
			style.margin=parentElementStyle.padding;
		});

		$('.image-text .i-image-item').each(function(index,elem){
			var style=this.style;
			style.width=this._width;
			style.height=this._height;
			style.removeProperty('box-sizing');
			var parentElementStyle=this.parentElement.style;
			if(this._margin){
				style.margin=this._margin;
			}else{
				style.margin=parentElementStyle.padding;
			}
		});

		$('.image-list').each(function(index,elem){
			this.style.removeProperty('box-sizing');
		});

		
		$('.property-itable .property-tbody,.property-image,.layout,.layout-box,.i-text-item,.i-image-item,.image-text .i-image-box .i-image-item').unwrap();
		

		var descStyle=element.style;
		if(descStyle.boxSizing){
			descStyle.width=$(element).width() +'px';
			descStyle.removeProperty('box-sizing');
		}
		$.removeAttr(element,ATTR_KEY_MAP.TITLE);
	};

	$.CSSApply.setStyle=function(element){
		var stylecolor=$.attr(element,ATTR_KEY_MAP.STYLE_COLOR);
		if(stylecolor){
			$.getDoc().trigger('changestyle',{
				path:'idex-desc-default.css',
				color : stylecolor
			});
		}
		$.removeAttr(element,ATTR_KEY_MAP.STYLE_COLOR);
	};

	$.CSSApply.buildStyle=function(element){

		this.setStyle(element);

		$('.hide').remove();

		$.CSSApply('idex-desc-default.css').disabled=true;

		$('hr').replaceWith('<div style="margin: 5px 0px;border-top: 1px solid #DDD;"></div>');

		this.computedSizing(element);
	};

	$.CSSApply.removeClass=function(element){
		var array=$('[class]',element);
		array.push(element);
		array.removeAttr('class');
	};

})(CF,jQuery);