function loadFile(){
	var IDEX_KEY_MAP=window.IDEX_KEY_MAP,
		IDEX_ATTR_MAP=window.IDEX_ATTR_MAP,
		$descBox,
		AllHTML='',
		$view,
		_CACHE_KEY_;

	_CACHE_KEY_=IDEX_KEY_MAP.CACHE.PREVIEW;

	function ready(){
		$descBox=$(".idex-desc-box");
		$view=$('.idex-preview-view');
		if($descBox.length==1){
			//localStorage.removeItem(_CACHE_KEY_);
			build();
			return;
		}
		loadHTML();
	};

	function loadHTML(){
		var html=localStorage.getItem(_CACHE_KEY_);
		if(html=='false'){
			return;
		}else if(!html){
			setTimeout(loadHTML,200);
			return;
		}
		$view.html(html);
		$descBox=$(".idex-desc-box");
		build();
		//localStorage.removeItem(_CACHE_KEY_);
	};

	function build(){
		if(!$descBox[0]){
			return;	
		}
		var desc=$descBox[0];

		$view.css('width',desc.clientWidth);
		$('.image-title,.text-title',desc).each(function(index,elem){
			var parentElement=elem.parentElement;
			var title=parentElement.getAttribute('d-t');
			if(title){
				$(elem).before(['<div '+IDEX_ATTR_MAP.CLASS+'="dm_module" data-id="99143',index,'" data-title="',title,'" _id_="ids-module-99143',index,'" style="line-height:0px;"></div>'].join(''));
			}
		});

		$.CSSApply.buildStyle(desc,true);

		$('a['+IDEX_ATTR_MAP.HREF+']',desc).each(function(index,elem){
			var href=elem.getAttribute(IDEX_ATTR_MAP.HREF);
			elem.setAttribute('href',href);
			elem.removeAttribute(IDEX_ATTR_MAP.HREF);
			if(/^#/i.test(href)){
				elem.target='';
			}else if(elem.href){
				elem.target='_blank';
			}
		});


		$('input['+IDEX_ATTR_MAP.TYPE+']',desc).each(function(index,elem){
			var type=elem.getAttribute(IDEX_ATTR_MAP.TYPE);
			elem.removeAttribute(IDEX_ATTR_MAP.TYPE);
			this.setAttribute('type',type);
		});

		$('img',desc).each(function(index,elem){
			var style=elem.style,
				src=elem.getAttribute(IDEX_ATTR_MAP.SRC),
				isSGIF;

			isSGIF=/s\.gif$/g.test(src);

			if(isSGIF || !src){
				style.padding=elem.offsetHeight+"px 0px 0px "+elem.offsetWidth+"px";
				style.width='';
				style.height='';
			}else{
				elem.setAttribute('src',src);
			}
			style.border='none';
			elem.removeAttribute(IDEX_ATTR_MAP.SRC);
		});

		$('div['+IDEX_ATTR_MAP.HREF+']',desc).each(function(index,elem){
			var href=elem.getAttribute(IDEX_ATTR_MAP.HREF);
			elem.setAttribute('href',href);
			elem.removeAttribute(IDEX_ATTR_MAP.HREF);
			if(href && !/^#/i.test(href)){
				elem.setAttribute('target','_blank');
			}
			if(!elem.firstElementChild){
				//border: none;用于ie下去蓝边框
				elem.innerHTML=['<img style="border: none;padding:',elem.clientHeight,'px 0px 0px ',elem.clientWidth,'px;',
								//'width:0px;','height:0px;',
						   '" />'].join('');
			}
			$.replaceTag(elem,'a');
		});


		$('table',desc).each(function(index,table){
			var bordercolor='',
				rowLength=table.rows.length;
			if(table.style.borderColor){
				bordercolor=$.rgbToHex(table.style.borderColor);
				table.setAttribute('bordercolor',bordercolor);
			}
			$.it(table.rows,function(index,tr){
				var cellLength=tr.cells.length;

				$.it(tr.cells,function(index,td){
					var style=td.style;
					//if(td.colSpan==1){
						if(tr.rowIndex==0){
							td._width=td.clientWidth+'px';
						}else{
							td._width='';
						}
						if(td.cellIndex==0 && tr.rowIndex!=rowLength-1){
							td._height=td.clientHeight+'px';
						}else{
							td._height='';
						}
					//}
				});
				$.it(tr.cells,function(index,td){
					var style=td.style;
					style.width=td._width;
					style.height=td._height;
				});
			});
		});

		getAllHTML();
	};

	function getAllHTML(){
		if(AllHTML){
			return AllHTML;
		}
		var html=HTMLfilter.getOuterHTML($descBox[0],{
			'*' : {
				'^style$' : function(attr){
					attr.value=HTMLfilter.getStyleText(this.style);
				}
			}
		});
		AllHTML=['<div align="center">',html,'</div>'].join('');
		setTimeout(complete,500);
	};

	function complete(){

		var html=['<div class="idex-preview-button-box">',
					'<div class="idex-preview-button">复制</div>',
					'<div class="idex-preview-button">退出</div>',
				  '</div>'].join('');

		var isFrame=window.top!=window,
			div=$.createElement(html),
			$box=$('.idex-preview-box'),
			$copy,
			$qtipbox,
			$exit,
			$exit;

		$box.append(div);

		$copy=$(div.firstElementChild);
		$exit=$copy.next();

		div=$.createElement('<div class="idex-preview-qtipbox">复制成功</div>');
		$.getBody().append(div);

		$qtipbox=$(div);

		if(isFrame){
			$exit.click(function(event){
				window.top.$.getDoc().trigger('exitBrowse');
			});
		}else{
			$exit.remove();
			$exit=null;
		}

		ZeroClipboard.bind({
			target :$copy[0],
			onMouseOver : function(event){
				this.$target.addClass('hover');
			},
			onMouseOut : function(event){
				this.$target.removeClass('hover');
			},
			onCopy : function(event){
				$qtipbox.show();
				$qtipbox.addClass('fadeInDown-animation');
				setTimeout(function(){
					$qtipbox.replaceClass('fadeInDown-animation','fadeOutUp-animation');
						setTimeout(function(){
							$qtipbox.removeClass('fadeOutUp-animation');
							$qtipbox.hide();
						},1000);
				},3000);
				return AllHTML;
			}
		});


		$box.append('<div class="idex-preview-count">共：'+getLength(AllHTML.length)+'字</div>');

/*
		var imgQueue=new ImageQueue({
			_name_ : 'ImageQueue',
			content : $box[0],
			spacing : 100,
			attrName : '_s_',
			retry : 5,
			onComplete : function(img){
				img.removeAttribute(this.attrName);
				$.removeClass(img,'image-queue-item');
				if(!img.className){
					img.removeAttribute('class');
				}
			}
		});

		imgQueue.pushList($('img[_s_]',$descBox));
		imgQueue.run();
*/
		$('.idex-preview-button-box').show();
		$('.idex-preview-loading').remove();

	};


	function getLength(len){
		var array=[],
			str=(''+len).split(''),
			n=0;
		for(var i=str.length-1;i>=0;i--){
			array.push(str[i]);
			n++;
			if(i>0 && n==3){
				array.push(',');
				n=0;
			}
		}
		return array.reverse().join('');
	};

	$.loadJSQueue(
		'js/edit/style.js',
		'js/buildStyle.js',
		'/_/js/ZeroClipboard.js',
	function(){
		$(document).ready(function(){
			$.getBody().append('<div class="idex-preview-loading"><div class="bubbling-g-box"><span class="bubbling-g-1"></span><span class="bubbling-g-2"></span><span class="bubbling-g-3"></span></div></div>');
			setTimeout(function(){
				ready();
			},500);
		});
	});

};