(function(CF,$){
var win=window,
	KEY_MAP=win.APP_KEY_MAP,
	ATTR_KEY_MAP=KEY_MAP.ATTR,
	ACTION_KEY_MAP=KEY_MAP.ACTION,
	CACHE_KEY_MAP=KEY_MAP.CACHE,
	MDID='idex-dm-id',
	$descBox,
	AllHTML='',
	$view=$('.idex-preview-view'),
	NUM_IID,
	isDescPreview,
	_CACHE_KEY_=CACHE_KEY_MAP.PREVIEW_HTML,
	_NUM_IID_KEY_=CACHE_KEY_MAP.NUM_IID,
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

	function getPreviewType(){
		var state,
			href=win.location.href;
		if(/preview\.html/.test(href)){
			state=$.LS.getItem(_PREVIEW_TYPE_);
		}else{
			state=new RegExp('/view/'+ACTION_KEY_MAP.DESC+'/\\d+').test(href);
		}
		return state;
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
		var mIndex=0,
			desc=$descBox[0];

		isDescPreview=getPreviewType();

		$view.css('width',desc.clientWidth);

		if(isDescPreview){
			$('.image-title,.text-title',desc).each(function(index,elem){
				var parentElement=elem.parentElement;
				var title=parentElement.getAttribute(ATTR_KEY_MAP.TITLE);
				if(title){
					$(elem).before(['<div data-id="99143',index,'" data-title="',title,'" ',MDID,'="',mIndex,'" style="line-height:0px;"> &nbsp;</div>'].join(''));
					mIndex++;
				}
			});
		}else{
			
			$('.map-box').each(function(index,elem){

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


			$('.image-title,.text-title',desc).remove();
		}
		$.StyleSheet.buildStyle(desc);

		$.StyleSheet.removeClass(desc);

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
			$('div',this).each(function(index,div){
				$.style(div,'display','block');
				$.replaceTag(div,'span');
			});
			
			var $br=$('br',this.children);
			$br.before('<span style="display:block;"></span>');
			$br.remove();

			$.replaceTag(elem,'a');
		});

		if(isDescPreview){
			$('div['+MDID+']',desc).each(function(index,elem){
				$.attr(elem,'id','ids-module-99143'+index);
				$.attr(elem,'class','dm_module');
				$.removeAttr(elem,MDID);
			});
		}


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
						if(td.cellIndex==0 && td.style.height!=''){
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
		if(isDescPreview){
			AllHTML=['<div align="center">',html,'</div>'].join('');
		}else{
			AllHTML=html;
		}
		setTimeout(complete,500);
	};

	function complete(){

		var html=['<div class="idex-preview-button-box">',
					'<div class="idex-preview-button">复制</div>',
					'<div class="idex-preview-button">发布</div>',
					//'<div class="idex-preview-button">分享</div>',
				  '</div>'].join('');

		var
			div=$.createElement(html),
			$box=$('.idex-preview-box'),
			$copy,
			$qtipbox,
			$publish,
			$share;



		$box.append(div);

		$copy=$(div.firstElementChild);
		$publish=$copy.next();
		$share=$publish.next();

		div=$.createElement('<div class="idex-preview-qtipbox">复制成功</div>');
		$.getBody().append(div);

		$qtipbox=$(div);

		if(isDescPreview){
			$publish.click(function(event){
				onPublish(this);
			});
		}else{
			$publish.remove();
			$publish=null;
		}

		$share.click(function(event){
			onShare(this);
			
		});
		


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

		$.getBody().css('overflow-y','auto');

		var imageQueue=new window.ImageQueue({
			ATTR_SRC : ATTR_KEY_MAP.SRC
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
					html="发布成功...";
				}else if(id==-1){
					html='发布失败：超出限制!';
				}else if(id==-9){
					html='发布失败：当前子账号没有发布商品详情的权限!';
				}else{
					html='发布失败：原因未知...';
				}
				if(id.errorMsg){
					html="发布失败："+id.errorMsg;
				}
				if(html){
					alert(html);
				}
			},
			error : function(){
				alert('发布失败：服务器出了个错..');
			}
		});
	};

	function onShare(button){
		var defaultText="Idex - 帮你实现好创意！",
			title=window.prompt("输入分享标题(最多15个字)",defaultText);
		
		$.jsonp({
			url:'/view.s',
			data :  $.param({
				method : 'share',
				title : (title||defaultText).substr(0,15),
				code : AllHTML
			}),
			success : function(id){
				if(id && id>0){	
					$(button).remove();
					var $qrcode,
						div=$.createElement('<div class="qrcode-box"><div class="label">扫一扫</div><div class="qrcode"></div></div>');
					$.getBody().append(div);

					$(div).children('.qrcode').qrcode({
						width : 120,
						height : 120,
						text : 'http://idex.oilan.com.cn/s/'+id+'.html'
					});	
				}
			},
			error : function(){
				alert('分享失败：服务器出了个错..');
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

	$(document).ready(function(){
		$.getBody().append('<div class="idex-preview-loading"><div class="bubbling-g-box"><span class="bubbling-g-1"></span><span class="bubbling-g-2"></span><span class="bubbling-g-3"></span></div></div>');
		setTimeout(function(){
			ready();
		},500);
	});

	$.getDoc().on('sessionExpired',function(event){
		alert('操作无效：当前会话已过期！');
	});

})(CF,jQuery);