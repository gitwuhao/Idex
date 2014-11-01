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
		var callback='C'+$.randomChar(5),
		isInitProgress=false,
		$progress,
		$progresslabel,
		$progressbg,
		html=['<style>',
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
			  '<div class="idex-s-progress"><div class="idex-s-label">1%</div><div class="idex-s-progress-bg"></div></div>',
			  '<iframe src="http://idex.oilan.com.cn/mp4/imp.ast?callback=',callback,'" width="1" height="1"></iframe>'
			];
		

		window[callback]=function(val){
			if(!isInitProgress){
				$progress.show();
				isInitProgress=true;
			}
			$progressbg.css('width',val+'%');
			$progresslabel.html(val+'%');
			$progress.attr('title','已导入淘宝'+val+'%的数据');
		};

		window.importComplete=function(){
			console.info('完成');
			window[callback](100);
		};

		$.getBody().append(html.join(''));

		$progress=$('.idex-s-progress');
		$progresslabel=$progress.children('.idex-s-label:first');
		$progressbg=$progress.children('.idex-s-progress-bg:first');
	};

})(CF,jQuery);
