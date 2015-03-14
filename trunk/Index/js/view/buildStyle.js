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
	function getMarginTopValue(element){
		var style=window.getComputedStyle(element);
		var val=style.getPropertyValue('margin-top');
		val=parseFloat(val.replace('px',''));
		return isNaN(val) ? 0 : val;
	};
	function getMarginLeftValue(element){
		var style=window.getComputedStyle(element);
		var val=style.getPropertyValue('margin-left');
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

		$('.map-box').each(function(index,elem){
			$.style(this,'width',getInnerWidth(this));

			$.style(this,'box-sizing','');
			var $img=$('img:first',this),
				offsetTop=elem.offsetTop,
				offsetLeft=elem.offsetLeft,
				img_src,
				html,
				map_id='m_'+$.randomChar(4);
			
			img_src=$img.attr(ATTR_KEY_MAP.SRC);

			html=['<img style="width:100%;height:100%;border:none;vertical-align:top;" ',
						ATTR_KEY_MAP.SRC,'="',img_src,'" ',
						'usemap="#',map_id,'"/>',
						'<map name="',map_id,'">'];
			
			$(this).children('.map-link').each(function(i,link){
				var href=$.attr(link,ATTR_KEY_MAP.HREF),
					left=link.offsetLeft - offsetLeft,
					top=link.offsetTop - offsetTop,
					width=link.offsetWidth,
					height=link.offsetHeight;
				html.push('<area shape="rect" ',
							'coords="',left,',',top,',',left+width,',',top+height,'" ',
							'href="',(href||''),'" />');
			});
			html.push('</map>');

			this.innerHTML=html.join('');
		});



		$('.float-box').each(function(index,elem){
			$.style(this,'width',getInnerWidth(this));
			//this.style.height=getHeight(this.children[0]);
			$.style(this,'box-sizing','');
		});

		$('.float-image').each(function(index,elem){
			setToInnerWidth(this);
			setToInnerHeight(this);
			$.style(this,'box-sizing','');
		});

		
		$('.float-text').each(function(index,elem){
			setToInnerWidth(this);
			setToInnerHeight(this);
			$.style(this,'box-sizing','');
		});

		
		$('.float-line').each(function(index,elem){
			var child=this.firstElementChild,
				$elem=$(this);
			if(child){
				if($.hasClass(this,'v')){
					var borderStyle=$.style(child,'border-left-style');
					var borderColor=$.style(child,'border-left-color');
					$elem.css('border-left','1px '+borderStyle+' '+borderColor);
					$elem.css('width','1px');
					$elem.css('margin-left',(getMarginLeftValue(elem)+20)+'px');
				}else{
					var borderStyle=$.style(child,'border-top-style');
					var borderColor=$.style(child,'border-top-color');
					$elem.css('border-top','1px '+borderStyle+' '+borderColor);
					$elem.css('height','1px');
					$elem.css('margin-top',(getMarginTopValue(elem)+20)+'px');
				}
				$elem.css('padding','');
				$elem.empty();
			}else{
				$elem.remove();
			}
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
		
		$('.image-clink,.image-ctext').each(function(index,elem){
			setToInnerWidth(this);
			setToInnerHeight(this);
			$.style(this,'box-sizing','');
		});

		$array=$('.image-flink,.image-ftext');

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



		$array=$('.image-rlink,.image-rtext');

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