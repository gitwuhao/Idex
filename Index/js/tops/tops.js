function loadFile(){
	var KEY_MAP=window.APP_KEY_MAP,
		ATTR_KEY_MAP=KEY_MAP.ATTR,
		CACHE_KEY_MAP=KEY_MAP.CACHE,
		_L_S_KEY_=CACHE_KEY_MAP.TO_PS_HTML,
		$descBox,
		time=0,
		id,
		tid=Date.now();


	function ready(){
		var html=localStorage.getItem(_L_S_KEY_);
		if(html=='false'){
			return;
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

	function build(){
		var desc=$descBox[0];
		
		var fillBgColor='#FAFAFA',
			bgColor='#F5F5F5';
		$('.float-text,.float-html,.property-table,.list-table,.user-table,.float-link').remove();

		$('.property-itable .property-tbody').each(function(index,table){
			var parentElement=table.parentElement;
			parentElement.setAttribute('style','float: left;width: '+table.offsetWidth+'px;height: 100%;background-color: '+fillBgColor+';');
			parentElement.removeAttribute('class');
			$(table).remove();
		});
		
		var $list=$('.text-item,.html-item');

		$list.empty();

		$list.css({
			'height':'50px',
			'background-color': fillBgColor
		});

		$('.image-list').html('<div style="height: 500px;background-color: '+bgColor+';"></div>');

	
		$list=$('.image-title');
		
		$list.css({
			'background-color': bgColor
		});
		
		$list.empty();

		var $IMGList=$();
		$list.each(function(index,element){
			$IMGList.push(element);
		});

		$list=$('.float-box-bg img,.float-image img,.image-clink img,.image-rlink img,.image-fglink img,.property-image img');

		$list.each(function(index,img){
			var src=img.getAttribute(ATTR_KEY_MAP.SRC),
				parentElement=img.parentElement,
				_bgcolor_;
			if(/s\.gif$/g.test(src)){
				_bgcolor_=bgColor;
			}else{
				_bgcolor_='#EDFBFF';
			}
			var $img=$(img);
			$img.before('<div style="width: 100%;height: 100%;background-color: '+_bgcolor_+';"></div>');
			
			$IMGList.push(img.previousElementSibling);
			
			$img.remove();	
		});
		
		
		$IMGList.attr('img','true');

		$IMGList=null;

		CSSApplyStyle.run(desc,true);
		
		var regions=[];

		$('div[img]',desc).each(function(index,element){
			regions.push({
				left : element.offsetLeft,
				top : element.offsetTop,
				right : element.offsetLeft + element.offsetWidth,
				bottom : element.offsetTop + element.offsetHeight
			});
		});
		
		getJSX(regions);

		setTimeout(function(){
			toCanvas(desc);
		},1000);
	};


	function toCanvas(element){
		html2canvas(element, {
			onrendered: function(canvas) {
				document.body.innerHTML='';
				document.body.appendChild(canvas);
				
				Canvas2Image.saveAsPNG(canvas,'Idex-template-' + tid);
				
				var _L_S_C_=CACHE_KEY_MAP.TO_PS_CALLBACK,
					callback=localStorage.getItem(_L_S_C_);

				localStorage.removeItem(_L_S_C_);
				if(callback){
					setTimeout(function(){
						window.top[callback]();
					},1500);
				}
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
					'a.saveAs(File(p+"idex-"+x+".jpg"), jO );',
					'a.activeHistoryState = hs;',
				'};',
				'function main() {',
					'hs= a.activeHistoryState;',
					'app.displayDialogs = DialogModes.NO;',
					'yCA();',
					'var f=Folder(p);',
					'f.create();',
					'for ( var i = 0,len=l.length; i < len; i++ ) {',
						's(g(l[i]),(i+1));',
					'}',
					'app.displayDialogs = dD;',
					'alert("   Finish ...\\n   Browse Directory  :  " + f.fsName + "   ");',
				'};',
				'main();'
		);
		
		var link,
			data="data:text/plain;base64," + btoa(script.join(''));

		link = document.createElement('a');
		link.href = data;
		link.download = 'idex-script-'+tid+'.jsx';
		link.click();
	
	};

	ready();


};
loadFile();