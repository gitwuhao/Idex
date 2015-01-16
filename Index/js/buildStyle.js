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
	function getCSWidth(element){
		return window.getComputedStyle(element).width;
	};
	function getCSHeight(element){
		return window.getComputedStyle(element).height;
	};

	$.CSSApply.buildStyle=function(element,isRemoveClass){
		var stylecolor=$.attr(element,ATTR_KEY_MAP.STYLE_COLOR);
		if(stylecolor){
			$.getDoc().trigger('changestyle',{
				path:'idex-desc-default.css',
				color : stylecolor
			});
		}

		$.removeAttr(element,ATTR_KEY_MAP.STYLE_COLOR);

		$('.hide').remove();
		/*
		$('img[_s_]').each(function(index,elem){
			elem.src=$.attr(elem,'_s_');
			$.removeAttr(elem,'_s_');
		});
		*/
		$.CSSApply('idex-desc-default.css').disabled=true;

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
			this._width=getCSWidth(this.children[0]);
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
			this._width=this.clientWidth+'px';
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
				parent=this.parentElement;

			if(parent._width){
				var parentElementStyle=parent.style;
				parentElementStyle.width=parent._width;
				parentElementStyle.height=parent._height;
			}
			
			this._width=getWidth(img);
			this._height=getHeight(img);
			parent=this.parentElement;
			if($.hasClass(parent,'p-n') && !parent.parentElement.previousElementSibling){
				//this._width=(img.clientWidth-1)+'px';
				this._margin='0px 5px 0px 0px';
			}
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

		$('hr').replaceWith('<div style="margin: 5px 0px;border-top: 1px solid #DDD;"></div>');

		$('.property-itable .property-tbody,.property-image,.layout,.layout-box,.i-text-item,.i-image-item').unwrap();
		$('.image-text .i-image-box .i-image-item').unwrap();
		/*
		HTMLfilter.filter({
			"*":{
				style:{
					'box-sizing' : function(){
						this.style.removeProperty('box-sizing');
					}
				},
				'@remove' : ['d-t','^id','^on','name',(isRemoveClass ? '^class':'')]
			},
			'@remove':['#comment']
		},element);
		*/
		
		//HTMLfilter.removeTextBreakLine(element);

		var descStyle=element.style;
		if(descStyle.boxSizing){
			descStyle.width=(element.clientWidth - $.getPXValue(descStyle.paddingLeft) - $.getPXValue(descStyle.paddingRight)) +'px';
			descStyle.removeProperty('box-sizing');
		}
		if(isRemoveClass){
			var array=$('[class]',element);
			array.push(element);
			array.each(function(i,el){
				el.removeAttribute('class');
			});
		}
	};

})(CF,jQuery);