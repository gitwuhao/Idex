(function(CF,$){
 
	var sheetMap={};

	function findSheet(path){
		var styleSheet=sheetMap[path];
		if(!styleSheet){
			styleSheet=$.StyleSheet.findSheet(path);
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
	};

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
 
})(CF,jQuery);