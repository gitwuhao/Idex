(function(CF,$){
/*
	var request =  new XMLHttpRequest();
	request.open("POST", 'http://idex.oilan.com.cn/mp4/imp.ast?callback=dslfkjsdfldskjflksdjf', true);
	request.setRequestHeader("Content-Type","application/x-javascript;");

	request.onload = function() {
		console.info("request.onload",this,arguments);
	};
	request.onloadend = function() {
		console.info("request.onloadend",this,arguments);
	};
	request.onloadstart = function() {
		console.info("request.onloadstart",this,arguments);
	};
	request.onprogress = function() {
		console.info("request.onprogress",this,arguments);
	};
	request.onreadystatechange = function() {
		console.info("request.onreadystatechange",this,arguments);
	};
	request.send(null);
*/
	

	$.getDoc().ready(function(){
		setTimeout(function(){
			init();
		},500);
	});
	
	function init(){
		var isInitProgress=false,
		callbackName,
		frameID='idexFrame'+$.randomChar(3),
		$progress,
		$progresslabel,
		$progressbg,
		timeoutID=null,
		firstRunTimeStamp,
		$frame,
		html=['<style id="progressStyle">',
				'.idex-s-progress{',
					'position: fixed;',
					'right: 3px;',
					'bottom: 3px;',
					'width: 200px;',
					'padding: 4px;',
					'background: rgba(0, 0, 0, 0.25);',
					'border-radius: 6px;',
					'display: none;',
					'box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25), 0 1px rgba(255, 255, 255, 0.08);',
					'-webkit-user-select: none;',
					'cursor: default;',
				'}',
				'.idex-s-progress .idex-s-label{',
					'position: absolute;',
					'width: 100%;',
					'line-height: 50px;',
					'text-align: center;',
					'color: #DDD;',
					'font-size: 26px;',
					'font-family: Verdana;',
				'}',
				'.idex-s-progress .idex-s-progress-bg {',
					'height: 50px;',
					'width: 1%;',
					'border-radius: 4px;',
					'-webkit-transition: 0.4s linear;',
					'-webkit-transition-property: width, background-color;',
					'box-shadow: 0 0 1px 1px rgba(2, 93, 255, 0.25), inset 0 1px rgba(255, 255, 255, 0.1);',
					'background-color: #008FFF;',
					'background: -webkit-gradient(linear, left top, left bottom, from(#09F), to(#008FFF));',
				'}',
			  '</style>',
			  '<div class="idex-s-progress">',
					'<div class="idex-s-label"></div>',
					'<div class="idex-s-progress-bg"></div>',
			  '</div>',
			  '<iframe id="',frameID,'" width="1" height="1" style="top:-100px;left:-100px;position: absolute;"',
			  '>',
			  '</iframe>'
			];
		

		function callbackHandle(json){
			var status,progress;
			if(json=="100"){
				status=-1;
				progress=100;
			}else{
				status=json.status;
				progress=json.progress;
			}
			if(!isInitProgress){
				$progress.show();
				isInitProgress=true;
			}
			if(status>0){
				$progresslabel.html('前面还有'+status+'任务');
			}else{
				$progressbg.css('width',progress+'%');
				$progresslabel.html(progress+'%');
				if(status==0){
					$progress.attr('title','已导入淘宝'+progress+'%的数据');
				}
			}

			if(timeoutID && progress>=100){
				window.clearTimeout(timeoutID);
				timeoutID=null;
			}else if(!timeoutID && progress<100){
				timeoutID=setTimeout(loadFrame,50000);
				firstRunTimeStamp=$.timestamp();
			}

			if(progress>=100){
				onImportComplete();
			}
		};

		window.importComplete=function(){
			window[callbackName](100);
		};

		function onImportComplete(){
			if(CF.Idex){
				delete CF.Idex.isImport;
				CF.Idex.triggerAndRemoveEvent('importComplete');
				delete CF.Idex;
			}
			setTimeout(function(){
				$progress.remove();
				$frame.remove();
				$progressStyle.remove();
				delete window[callbackName];
				delete window.importComplete;
			},30 * 1000);
		};

		$.getBody().append(html.join(''));
		
		$progressStyle=$('#progressStyle');
		$progress=$('.idex-s-progress');
		$progresslabel=$progress.children('.idex-s-label:first');
		$progressbg=$progress.children('.idex-s-progress-bg:first');
		$frame=$('#'+frameID);
		$frame.removeAttr('id');
		 
		function loadFrame(){
			if(firstRunTimeStamp){
				var timeout=$.timestamp() - firstRunTimeStamp - 30000;
				if(timeout<0){
					setTimeout(loadFrame,20000);
					return;
				}
			}
			if(callbackName){
				delete window[callbackName];
			}
			console.info('loadFrame:'+new Date().format()+'>>>'+$progresslabel.html());
			timeoutID=null;
			callbackName='C'+$.randomChar(5);
			window[callbackName]=callbackHandle;
			$frame.attr('src','/progressQuery.as?callback='+callbackName);
		};

		loadFrame();
	};

})(CF,jQuery);
