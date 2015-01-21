function loadFile(){
	var KEY_MAP=window.APP_KEY_MAP,
		CSSApply=$.CSSApply,
		IMAGE_SELECTER='.i-image-item img,.float-box-bg img,.float-image img,.image-clink img,.image-rlink img,.image-fglink img,.property-image img,.image-item img',
		IMAGE_FILL_BG_COLOR='#F4F2FF',
		IMAGE_BG_COLOR='#F5F5F5',
		ATTR_KEY_MAP=KEY_MAP.ATTR,
		CACHE_KEY_MAP=KEY_MAP.CACHE,
		_L_S_KEY_=CACHE_KEY_MAP.TO_PS_HTML,
		$descBox,
		time=0,
		id,
		EXPORT_CONFIG_DATA={
			type : 't',
			id : '1234567'
		},
		tid=Date.now();


	function ready(){
		var param=$.getParam();
		if(!param || !param.fn){
			return;
		}
		var data=window.top[param.fn]();
		if(!data || !data.html){
			return;
		}
		EXPORT_CONFIG_DATA=data;
		$.getBody().append(data.html);
		$descBox=$(".idex-desc-box");
		build();
	};



	function ready2(){
		var param=$.getParam(),
			html=localStorage.getItem(_L_S_KEY_);
		if(param && param.fn){
			this.getData(param.fn);
		}else if(html=='false'){
			return;
		}else if($(".idex-desc-box").length>0){
			
		}else if(!html){
			time=(time * 3) + 100;
			if(time<2000){
				setTimeout(ready,time);
			}
			return;
		}
		$.getBody().append(html);
		$descBox=$(".idex-desc-box");
		if(window.top!=window){
			localStorage.removeItem(_L_S_KEY_);
		}
		build();
	};

	function cleanText(){
		var desc=$descBox[0];
		
		$('.float-text,.float-html,.property-table,.list-table,.user-table,.float-link,.text-item,.html-item',desc).remove();
		 
		$('.property-itable .property-tbody',desc).each(function(index,table){
			var parentElement=table.parentElement;
			parentElement.setAttribute('style','float: left;width: '+table.offsetWidth+'px;height: 100%;background-color: '+IMAGE_FILL_BG_COLOR+';');
			parentElement.removeAttribute('class');
			$(table).remove();
		});

		$('.i-text-item',desc).each(function(index,element){
			var $elem=$(element);
			$elem.css('background-color',IMAGE_FILL_BG_COLOR);
			$elem.empty();	
		});

	};

	function cleanImage(){
		var desc=$descBox[0];
		
		//$('.image-list').html('<div style="height: 500px;background-color: '+IMAGE_BG_COLOR+';"></div>');
		
		var $list=$('.image-title');
		
		$list.css({
			'background-color': IMAGE_BG_COLOR
		});
		
		$list.empty();

		$(IMAGE_SELECTER,desc).each(function(index,img){
			var src=img.getAttribute(ATTR_KEY_MAP.SRC),
				parentElement=img.parentElement,
				width,
				height,
				_bgcolor_;
			if(!src || /s\.gif$/g.test(src)){
				_bgcolor_=IMAGE_BG_COLOR;
			}else{
				_bgcolor_='#EDFBFF';
			}
			width=img.offsetWidth;
			height=img.offsetHeight;
			if(height==0){
				parentElement.style.height=width+'px';				
			}
			var $img=$(img);
			$img.before('<div img="true" style="width: 100%;height: 100%;background-color: '+_bgcolor_+';"></div>');
			$img.remove();
		});
	};

	
	function applyImage(){
		var desc=$descBox[0];
		$(IMAGE_SELECTER,desc).each(function(i,img){
			var src=img.getAttribute(ATTR_KEY_MAP.SRC);
			if(src && !/s\.gif$/g.test(src)){
				$(img).attr('src',src);
			}
		});
	};

	function applyTableBorder(){
		$('.property-tbody,.list-tbody,.user-tbody').addClass('border');
		CSSApply('idex_main_style_sheet');
	};

	function build(){
		var desc=$descBox[0];
		
		cleanText();

		cleanImage();
		//applyImage();

		CSSApply.buildStyle(desc);

		//$descBox.css('background-color','');

		CSSApply.removeClass(desc);

		$('table',desc).each(function(index,table){
			var bordercolor='',
				rowLength=table.rows.length;
			if(table.style.borderColor){
				bordercolor=$.rgbToHex(table.style.borderColor);
				table.setAttribute('bordercolor',bordercolor);
			}
		});
		
		toJSX(desc)
	
		toCanvas(desc);
	};
	
	function toJSX(element){
		var regions=[];
		$('div[img],div img',element).each(function(index,img){
			regions.push({
				left : img.offsetLeft,
				top : img.offsetTop,
				right : img.offsetLeft + img.offsetWidth,
				bottom : img.offsetTop + img.offsetHeight
			});
		});
		EXPORT_CONFIG_DATA.jsxData=getJSX(regions);
	};

	function toCanvas(element){
		html2canvas(element, {
			onrendered: function(canvas) {

				$.getBody().empty();

				document.body.appendChild(canvas);
				
				try{
					var mime='image/png',
						picData;
					picData = canvas.toDataURL(mime);
					EXPORT_CONFIG_DATA.imageData=picData.replace(mime,'image/octet-stream');
				}catch(e){
					console.error(e);
				}
				EXPORT_CONFIG_DATA.callback();

			}
		});
	};

	function getJSX(regions){
		//text/plain
		var script=[
				//'#target photoshop\n',
				'var l=new Array(),',
					 'a = app.activeDocument,',
					 'hs,',
					 'p,',
					 'fp="idex-',EXPORT_CONFIG_DATA.type,'-',EXPORT_CONFIG_DATA.id,'",',
					 'dD = app.displayDialogs,',
					 'jO = new JPEGSaveOptions();',
				'p=a.path+"/IdexJPEG/";',
				'jO.quality=12;',
				'function yCA(){'
		];

		for(var i=0,len=regions.length;i<len;i++){
			var r=regions[i];
			script.push('l.push([',r.left,',',r.top,',',r.right,',',r.bottom,']);');
		}
		script.push(
				'};',
				'function g(r){',
					'for ( var i = 0,len=r.length; i < len; i++ ) {',
						'r[i]=new UnitValue( r[i] +" pixels" );',
					'}',
					'return r;',
				'};',
				'function s(r,x){',
					'a.crop(r);',
					'a.saveAs(File(p+fp+x+".jpg"), jO );',
					'a.activeHistoryState = hs;',
				'};',
				'function main() {',
					'hs= a.activeHistoryState;',
					'app.displayDialogs = DialogModes.NO;',
					'yCA();',
					'var f=Folder(p);',
					'f.create();',
					'for (var i = 0,len=l.length; i < len; i++ ) {',
						's(g(l[i]),(i+1));',
					'}',
					'app.displayDialogs = dD;',
					'alert("   Finish ...\\n   Browse Directory  :  " + f.fsName + "   ");',
				'};',
				'main();'
		);
		
		return "data:text/plain;base64," + btoa(script.join(''));
	
	};

	ready();


};
loadFile();