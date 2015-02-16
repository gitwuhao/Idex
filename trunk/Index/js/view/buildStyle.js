(function(CF,$){
var ATTR_KEY_MAP=window.APP_KEY_MAP.ATTR;

	function getIntValue(val){
		val=parseInt(val.replace('px',''));
		return isNaN(val) ? 0 : val;
	};
	function getFloatValue(val){
		val=parseFloat(val.replace('px',''));
		return isNaN(val) ? 0 : val;
	};
	function getWidth(element){
		var offsetWidth=element.offsetWidth;
		return offsetWidth+'px';
	};
	function getHeight(element){
		var height=element.offsetHeight;
		return height+'px';
	};
	function getInnerWidth(element){
		var left=getIntValue($.style(element,'padding-left')),
			right=getIntValue($.style(element,'padding-right'));
		return (element.clientWidth - left - right) + 'px';
	};
	function getInnerHeight(element){
		var top=getIntValue($.style(element,'padding-top')),
			bottom=getIntValue($.style(element,'padding-bottom'));
		return (element.clientHeight - top - bottom) + 'px';
	};
	function setToInnerWidth(element){
		$.style(element,'width',getInnerWidth(element));
	};
	function setToInnerHeight(element){
		$.style(element,'height',getInnerHeight(element));
	};
	function toProWidthByClient(element){
		element._width=element.clientWidth + 'px';
	};
	function toProHeightByClient(element){
		element._height=element.clientHeight + 'px';
	};
	function toProWidth(element){
		element._width=getInnerWidth(element);
	};
	function toProHeight(element){
		element._height=getInnerHeight(element);
	};
	function getPadding(element){
		return $.style(element,'padding');
	};
	function getMargin(element){
		return $.style(element,'margin');
	};
	function getCSPadding(element){
		return window.getComputedStyle(element).padding;
	};
	function getCSMargin(element){
		return window.getComputedStyle(element).margin;
	};
	function setWidth(element,width){
		if(width){
		
		}else if(element._width){
			width=element._width;
		}else {
			width=getInnerWidth(element);
		}
		$.style(element,'width',width);
	};
	function setHeight(element,height){
		if(height){
		
		}else if(element._height){
			height=element._height;
		}else {
			height=getInnerHeight(element);
		}
		$.style(element,'height',height);
	};
	
	
	$.StyleSheet.getCSWidth=function(element){
		return window.getComputedStyle(element).width;
	};

	$.StyleSheet.getCSHeight=function (element){
		return window.getComputedStyle(element).height;
	};

	$.StyleSheet.computedSizing=function(element){

		$('.float-box').each(function(index,elem){
			$.style(this,'width',getInnerWidth(this));
			//this.style.height=getHeight(this.children[0]);
			this.style.removeProperty('box-sizing');
		});

		$('.float-image').each(function(index,elem){
			setToInnerWidth(this);
			setToInnerHeight(this);
			$.style(this,'box-sizing','');
		});

		
		var $array=$('.image-col');

		$array.each(function(index,elem){
			toProWidth(this);
		});

		$array.each(function(index,elem){
			setWidth(this);
			$.style(this,'box-sizing','');
			$.style(this,'margin',getCSPadding(this));
			$.style(this,'padding','');
		});
		

		$('.image-clink').each(function(index,elem){
			setToInnerWidth(this);
			setToInnerHeight(this);
			$.style(this,'box-sizing','');
		});

		$array=$('.image-fglink');

		$array.each(function(index,elem){
			var parentElement=this.parentElement;
			toProWidthByClient(parentElement);
			toProHeightByClient(parentElement);
		});

		$array.each(function(index,elem){
			var parentElement=this.parentElement;
			setWidth(parentElement);
			setHeight(parentElement);
			
			setWidth(this);
			setHeight(this);

			$.style(this,'box-sizing','');
			$.style(this,'margin',getCSPadding(parentElement));
			$.style(this,'float',$.style(parentElement,'float'));
			$(this).unwrap();
		});



		$array=$('.image-rlink');

		$array.each(function(index,elem){
			var parentElement=this.parentElement;
			toProWidthByClient(parentElement);
			toProHeightByClient(parentElement);
		});

		$array.each(function(index,elem){
			var parentElement=this.parentElement;
			setWidth(parentElement);
			setHeight(parentElement);

			
			setWidth(this);
			setHeight(this);

			$.style(this,'box-sizing','');
			$.style(this,'margin',getCSPadding(parentElement));
			$.style(this,'float',$.style(parentElement,'float'));
			$(this).unwrap();
		});

		$('.image-list .image-item').each(function(index,elem){
			setWidth(this);
			setHeight(this);
		});

		$('.image-list').each(function(index,elem){
			$.style(this,'box-sizing','');
		});

		$('.property-itable .property-image').each(function(index,elem){
			setWidth(this);
			setHeight(this);

			var parentElement=this.parentElement;
			$.style(this,'box-sizing','');
			$.style(this,'margin',getCSPadding(parentElement));
			$.style(this,'float',$.style(parentElement,'float'));
		});

		$('.property-itable .property-tbody').each(function(index,elem){
			setWidth(this,this.offsetWidth);
			setHeight(this,this.offsetHeight);

			var parentElement=this.parentElement;
			$.style(this,'box-sizing','');
			//$.style(this,'margin',getCSPadding(parentElement));
			$.style(this,'float',$.style(parentElement,'float'));
		});

		$array=$('.image-text .i-text-item,.image-text .i-image-item');

		$array.each(function(index,elem){
			var parentElement=this.parentElement;
			toProWidthByClient(parentElement);
			toProHeightByClient(parentElement);
		});

		$array.each(function(index,elem){
			var parentElement=this.parentElement;
			setWidth(parentElement);
			setHeight(parentElement);
			
			setWidth(this);
			setHeight(this);

			$.style(this,'box-sizing','');
			$.style(this,'margin',getCSPadding(parentElement));
			$.style(this,'float',$.style(parentElement,'float'));
		});

 
		$array=$('.double-image-text .i-image-item,.double-image-text .i-text-item');

		$array.each(function(index,elem){
			var parentElement=this.parentElement;
			toProWidthByClient(parentElement);
			toProHeightByClient(parentElement);
		});
		
		$array.each(function(index,elem){
			var parentElement=this.parentElement;
			setWidth(parentElement);
			setHeight(parentElement);
			
			setWidth(this);
			setHeight(this);

			$.style(this,'box-sizing','');
			$.style(this,'margin',getCSPadding(parentElement));
			$.style(this,'float',$.style(parentElement,'float'));
		});


		$array.each(function(index,elem){
			var parentElement=this.parentElement;
			if($.hasClass(parentElement.parentElement,'i-image-box')){
				$(this.parentElement).unwrap();
			}
		});

		
		$('.property-itable .property-tbody,.property-image,.layout,.layout-box,.i-text-item,.i-image-item,.image-text .i-image-box .i-image-item').unwrap();
		

		var descStyle=element.style;
		if(descStyle.boxSizing){
			descStyle.width=$(element).width() +'px';
			descStyle.removeProperty('box-sizing');
		}
		$.removeAttr(element,ATTR_KEY_MAP.TITLE);
	};

	$.StyleSheet.setStyle=function(element){
		var stylecolor=$.attr(element,ATTR_KEY_MAP.STYLE_COLOR);
		if(stylecolor){
			$.getDoc().trigger('changestyle',{
				path:'idex-desc-default.css',
				color : stylecolor
			});
		}
		$.removeAttr(element,ATTR_KEY_MAP.STYLE_COLOR);
	};

	$.StyleSheet.buildStyle=function(element){

		this.setStyle(element);

		$('.hide').remove();

		$.StyleSheet('idex-desc-default.css').disabled=true;

		$('hr').replaceWith('<div style="margin: 5px 0px;border-top: 1px solid #DDD;"></div>');

		this.computedSizing(element);
	};

	$.StyleSheet.removeClass=function(element){
		var array=$('[class]',element);
		array.push(element);
		array.removeAttr('class');
	};

})(CF,jQuery);