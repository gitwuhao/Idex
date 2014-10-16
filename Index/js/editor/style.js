(function(CF,$){

	var CSSApplyStyle={};


	var CSSApplyStyle=function(href){
		return CSSApplyStyle.execute(href);
	};

	CSSApplyStyle.execute=function(href){
		var styleSheet=this.findSheet(href);
		if(!styleSheet){
			return;
		}
		var n=0,
			cssRules=styleSheet.cssRules,
			cssRule,
			selectorText;
		while(cssRules && cssRules[n]){
			cssRule=cssRules[n]
			if(cssRule.type==1){
				this.apply(cssRule.selectorText,cssRule.style);
			}
			n++;
		}

		return styleSheet;
	};


	CSSApplyStyle.clearClassName=function(selectorText,context){
		var list=(context||document).querySelectorAll(selectorText),
			elem,
			n=0;
		while(list[n]){
			elem=list[n];
			if(elem.attributes){
				elem.removeAttribute("class");
			}
			n++;
		}
		if(context){
			context.removeAttribute("class");
		}
	};

	CSSApplyStyle.apply=function(selectorText,style){
		var list=document.querySelectorAll(selectorText),
			n=0,
			l=0,
			m=0,
			attr,
			elemStyle,
			elem;
		while(list[n]){
			elem=list[n];
			/*elem.style.cssText=style.cssText;
			*/
			if(!elem.originalStyle){
				m=0;
				elemStyle=elem.style;
				elem.originalStyle={};
				while(elemStyle[m]){
					attr=elemStyle[m];
					elem.originalStyle[attr]=elemStyle[attr];
					m++;
				}
			}
			l=0;
			while(style[l]){
				attr=style[l];
				if(!elem.originalStyle[attr]){
					elem.style[attr]=style[attr];
				}
				l++;
			}
			n++;
		}
	};

	CSSApplyStyle.cssRulesToMap=function(cssRules){
		var n=0,
			cssRule,
			cssRuleMap={};
		while(cssRules && cssRules[n]){
			cssRule=cssRules[n]
			if(cssRule.type==1){
				cssRuleMap[cssRule.selectorText]=cssRule.style;
			}
			n++;
		}
		return cssRuleMap;
	};



	CSSApplyStyle.findSheet=function(href){
		var styleSheetsMap=this.getSheetsMap();
		for(var key in styleSheetsMap){
			if(key.indexOf(href)>-1){
				return styleSheetsMap[key];
			}
		}
	};

	CSSApplyStyle.getSheetsMap=function(){
		var sheets=document.styleSheets,
			i=0,
			n=0,
			cssRules,
			cssRule,
			styleSheetsMap={},
			styleSheet
			;
		while(sheets[i]){
			styleSheet=sheets[i];
			cssRules=styleSheet.cssRules;
			styleSheetsMap[styleSheet.href]=styleSheet;
			n=0;
			while(cssRules && cssRules[n]){
				cssRule=cssRules[n]
				if(cssRule.type==3){
					styleSheet=cssRule.styleSheet;
					styleSheetsMap[styleSheet.href]=styleSheet;
				}
				n++;
			}
			i++;
		}
		return styleSheetsMap;
	};

	var sheetMap={};

	function findSheet(path){
		var styleSheet=sheetMap[path];
		if(!styleSheet){
			styleSheet=CSSApplyStyle.findSheet(path);
			if(styleSheet){
				sheetMap[path]=styleSheet;
			}
		}
		return styleSheet;
	};

	function replaceStyleColor(style,attr,oldValue,value){
		var color=style[attr],
			hex=null;
		if(/^#/.test(color)){
			hex=color.toUpperCase();
		}else if(/^rgb/.test(color)){
			hex=$.toMiniHex(color);
		}
		if(hex==oldValue){
			style[attr]=value;
		}
	}

//.(\s?\d+\s?,\s?)(\s?\d+\s?,\s?)(\s?\d+\s?,\s?)
//.match(/(rgb|rgba)(\d+),\s+(\d+),\s+(\d+)/g)

	var prevColor='#49A0E1';

	$.getDoc().on('changestyle',function(event,data){
		var path=data.path||'idex-desc.css',
			color=data.color,
			styleSheet,
			cssRules,
			n=0,
			cssRule;

			if(prevColor==color){
				return;
			}

			styleSheet=findSheet(path);
			if(!styleSheet){
				return;
			}
			cssRules=styleSheet.cssRules;

			var cRGB=$.hexToRGB(prevColor);
			var nRGB=$.hexToRGB(color);
			if(nRGB==null){
				return;
			}
			var cHEXColor=new RegExp(prevColor,"gmi");
			var cRGBColor=new RegExp(cRGB.r+'\\s*,\\s*'+cRGB.g+'\\s*,\\s*'+cRGB.b,"gm");
			var nRGBColor=[nRGB.r,nRGB.g,nRGB.b].join(',');

			while(cssRules && cssRules[n]){
				cssRule=cssRules[n]
				if(cssRule.type==1){
					var style=cssRule.style,
						cssText=cssRule.style.cssText;
					/*
					for(var i=0,len=style.length;i<len;i++){
						var key=style[i];
						var value=style.getPropertyValue(key).trim();
						if(cRGBColor.test(value)){
							value=value.replace(cRGBColor,nRGBColor);
							style.setProperty(key,value);
						}else if(cHEXColor.test(value)){
							value=value.replace(cHEXColor,color);
							style.setProperty(key,value);
						}
					}
					*/
					cssText=cssText.replace(cRGBColor,nRGBColor);
					cssText=cssText.replaceAll(prevColor,color);
					if(cssRule.style.cssText!=cssText){
						cssRule.style.cssText=cssText;
					}

				}
				n++;
			}
			prevColor=color;
	});

/********************************************************************************/

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
	function getWidth2(element){
		return parseInt(window.getComputedStyle(element).width.replace('px',''))+'px';
	};
	function getHeight2(element){
		return parseInt(window.getComputedStyle(element).height.replace('px',''))+'px';
	};

	CSSApplyStyle.run=function(element,isRemoveClass){
		var stylecolor=$.attr(element,'stylecolor');
		if(stylecolor){
			$.getDoc().trigger('changestyle',{
				path:'idex-desc.css',
				color : stylecolor
			});
		}

		$.removeAttr(element,'stylecolor');
		$.removeAttr(element,'uid');
		$.removeAttr(element,'id');

		$('.hide').remove();
		/*
		$('img[_s_]').each(function(index,elem){
			elem.src=$.attr(elem,'_s_');
			$.removeAttr(elem,'_s_');
		});
		*/
		CSSApplyStyle("idex-desc.css").disabled=true;

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

		$('.image-col').each(function(index,elem){
			this._width=getWidth(this.children[0]);
		});

		$('.image-col').each(function(index,elem){
			this.style.width=this._width;
			this.style.removeProperty('box-sizing');
			if(this.style.padding){
				this.style.margin=this.style.padding;
				this.style.removeProperty('padding');
			}
		});

		$('.image-clink').each(function(index,elem){
			this.style.height=getHeight(this.children[0]);
			this.style.removeProperty('box-sizing');
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
			this._width=getWidth(this.children[0]);
			this._height=getHeight(this.children[0]);
		});

		$('.image-rlink').each(function(index,elem){
			var style=this.style;
			var parentElement=this.parentElement;
			style.width=this._width;
			style.height=this._height;
			style.removeProperty('box-sizing');
			var parentElementStyle=parentElement.style;
			style.margin=parentElementStyle.padding;
			style.float=parentElementStyle.float;
			$(this).unwrap();
		});

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

		$('.property-itable .property-tbody,.property-image,.layout,.layout-box').unwrap();

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
		
		
		HTMLfilter.removeTextBreakLine(element);

		var descStyle=element.style;
		if(descStyle.boxSizing){
			descStyle.width=(element.clientWidth - $.getPXValue(descStyle.paddingLeft) - $.getPXValue(descStyle.paddingRight)) +'px';
			descStyle.removeProperty('box-sizing');
		}
		if(isRemoveClass){
			element.removeAttribute('class');
		}
	};


	window.CSSApplyStyle=CSSApplyStyle;

	$.getDoc().trigger('styleready',CSSApplyStyle);

})(CF,jQuery);