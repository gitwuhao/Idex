(function(CF,$){

	//var $.CSSApply={};


	$.CSSApply=function(href){
		return $.CSSApply.execute(href);
	};
	
	CF.merger($.CSSApply,{
		execute : function(href){
			var styleSheet=this.findSheet(href);
			if(!styleSheet){
				styleSheet=this.getSheetById(href);
				if(!styleSheet){
					return;
				}
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
		},
		apply : function(selectorText,style){
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
		},
		findSheet : function(href){
			var styleSheetsMap=this.getSheetsMap();
			for(var key in styleSheetsMap){
				if(key.indexOf(href)>-1){
					return styleSheetsMap[key];
				}
			}
		},
		getSheetById : function(id){
			var element=document.getElementById(id);
			if(element && element.sheet){
				return element.sheet;
			}
			return null;
		},
		clearClassName : function(selectorText,context){
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
		},
		cssRulesToMap : function(cssRules){
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
		},
		getSheetsMap : function(){
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
		}
	});  
 
	var sheetMap={};

	function findSheet(path){
		var styleSheet=sheetMap[path];
		if(!styleSheet){
			styleSheet=$.CSSApply.findSheet(path);
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

	$.getDoc().trigger('styleready',$.CSSApply);

})(CF,jQuery);