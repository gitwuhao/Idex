function loadFile(){
var win=window,
	href=win.location.href,
	KEY_MAP=win.APP_KEY_MAP,
	ATTR_KEY_MAP=KEY_MAP.ATTR,
	ACTION_KEY_MAP=KEY_MAP.ACTION,
	CACHE_KEY_MAP=KEY_MAP.CACHE,
	MDID='idex-dm-id',
	$descBox,
	AllHTML='',
	$view=$('.idex-preview-view'),
	NUM_IID,
	_CACHE_KEY_=CACHE_KEY_MAP.PREVIEW_HTML,
	_NUM_IID_KEY_=CACHE_KEY_MAP.NUM_IID;
	_PREVIEW_TYPE_=CACHE_KEY_MAP.PREVIEW_TYPE;

	NUM_IID=$view.attr(ATTR_KEY_MAP.ID);
	$view.removeAttr(ATTR_KEY_MAP.ID);

	function ready(){
		$descBox=$(".idex-desc-box");
		if($descBox.length==1){
			//$.LS.removeItem(_CACHE_KEY_);
			build();
			return;
		}
		loadHTML();
	};

	function loadHTML(){
		var html=$.LS.getItem(_CACHE_KEY_);
		NUM_IID=$.LS.getItem(_NUM_IID_KEY_);
		if(html=='false'){
			return;
		}else if(!html){
			setTimeout(loadHTML,200);
			return;
		}
		$view.html(html);
		$descBox=$(".idex-desc-box");
		build();
		//$.LS.removeItem(_CACHE_KEY_);
	};

	function build(){
		if(!$descBox[0]){
			return;	
		}
		var index=0,
			desc=$descBox[0];

		$view.css('width',desc.clientWidth);
		
		$('.image-title,.text-title',desc).each(function(index,elem){
			var parentElement=elem.parentElement;
			var title=parentElement.getAttribute(ATTR_KEY_MAP.TITLE);
			if(title){
				$(elem).before(['<div data-id="99143',index,'" data-title="',title,'" ',MDID,'="',index,'" style="line-height:0px;"></div>'].join(''));
				index++;
			}
		});

		$.CSSApply.buildStyle(desc);

		$.CSSApply.removeClass(desc);

		$('a['+ATTR_KEY_MAP.HREF+']',desc).each(function(index,elem){
			var href=elem.getAttribute(ATTR_KEY_MAP.HREF);
			elem.setAttribute('href',href);
			elem.removeAttribute(ATTR_KEY_MAP.HREF);
			if(/^#/i.test(href)){
				elem.target='';
			}else if(elem.href){
				elem.target='_blank';
			}
		});


		$('input['+ATTR_KEY_MAP.TYPE+']',desc).each(function(index,elem){
			var type=elem.getAttribute(ATTR_KEY_MAP.TYPE);
			elem.removeAttribute(ATTR_KEY_MAP.TYPE);
			this.setAttribute('type',type);
		});

		$('img',desc).each(function(index,elem){
			var style=elem.style,
				src=elem.getAttribute(ATTR_KEY_MAP.SRC),
				isSGIF,
				height,
				width;

			isSGIF=/s\.gif$/g.test(src);

			if(isSGIF || !src){
				width=elem.offsetWidth;
				height=elem.offsetHeight;
				if(height==0){
					height=width;
				}
				style.padding=height+"px 0px 0px "+width+"px";
				style.width='';
				style.height='';
				elem.removeAttribute(ATTR_KEY_MAP.SRC);
			}else{
				//elem.setAttribute('src',src);
			}
			style.border='none';
		});

		$('div['+ATTR_KEY_MAP.HREF+']',desc).each(function(index,elem){
			var href=elem.getAttribute(ATTR_KEY_MAP.HREF);
			elem.setAttribute('href',href);
			elem.removeAttribute(ATTR_KEY_MAP.HREF);
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

		$('div['+MDID+']',desc).each(function(index,elem){
			$.attr(elem,'id','ids-module-99143'+index);
			$.attr(elem,'class','dm_module');
			$.removeAttr(elem,MDID);
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
		var html,
			rules={
			'*' : {
				'^style$' : function(attr){
					attr.value=HTMLfilter.getStyleText(this.style);
				}
			},
			'img' : {
			}
		};
		rules.img[ATTR_KEY_MAP.SRC]=function(attr){
			attr.name='src';
		};

		html=HTMLfilter.getOuterHTML($descBox[0],rules);
		AllHTML=['<div align="center">',html,'</div>'].join('');
		setTimeout(complete,500);
	};

	function complete(){

		var html=['<div class="idex-preview-button-box">',
					'<div class="idex-preview-button">复制</div>',
					'<div class="idex-preview-button">发布</div>',
				  '</div>'].join('');

		var isDesc,
			div=$.createElement(html),
			$box=$('.idex-preview-box'),
			$copy,
			$qtipbox,
			$publish;

		if(/preview\.html/.test(href)){
			isDesc=$.LS.getItem(_PREVIEW_TYPE_);
		}else{
			isDesc=new RegExp('/view/'+ACTION_KEY_MAP.DESC+'/\\d+').test(href);
		}


		$box.append(div);

		$copy=$(div.firstElementChild);
		$publish=$copy.next();

		div=$.createElement('<div class="idex-preview-qtipbox">复制成功</div>');
		$.getBody().append(div);

		$qtipbox=$(div);

		if(isDesc){
			$publish.click(function(event){
				onPublish(this);
			});
		}else{
			$publish.remove();
			$publish=null;
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

  
		var imageQueue=new window.ImageQueue({
			ATTR_SRC : ATTR_KEY_MAP.SRC,
			context : $box[0]
		});
		imageQueue.pushList(imageQueue.context);
		imageQueue.run();

		$('.idex-preview-button-box').show();
		$('.idex-preview-loading').remove();

	};

	function onPublish(element){
		//console.info("onPublish NUM_IID:"+NUM_IID);

		$.jsonp({
			url:'/view.s',
			data :  $.param({
				method: 'publish',
				id : NUM_IID,
				code : AllHTML
			}),
			success : function(id){
				var html;
				if(id && id>0){
					console.info('发布成功..');
				}else if(id==-1){
					html='发布失败，超出限制!';
				}else if(id==-9){
					html='发布失败，当前子账号没有发布商品详情的权限!';
				}else{
					html='保存失败...';
				}
				
				if(html){
					this.onError(html);
				}
			},
			error : function(){
				console.info('发布失败..');
			}
		});
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
		//'js/dev/debug.js',
		'/js/edit/style.js',
		'/js/view/buildStyle.js',
		'/_/js/ImageQueue.js',
		'/_/js/ZeroClipboard.js',
	function(){
		$(document).ready(function(){
			$.getBody().append('<div class="idex-preview-loading"><div class="bubbling-g-box"><span class="bubbling-g-1"></span><span class="bubbling-g-2"></span><span class="bubbling-g-3"></span></div></div>');
			setTimeout(function(){
				ready();
			},500);
		});
	});


$.getDoc().on('sessionExpired',function(event){
	alert('操作无效：当前会话已过期！');
});
};