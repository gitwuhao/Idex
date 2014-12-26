function loadFile(){
	var $descBox,
		AllHTML='',
		$view,
		_L_S_KEY_='__browse_html__';


	window.onbeforeunload = function(event){
		/*
		var html=localStorage.getItem(_L_S_KEY_);
		if(html=='false' || html=='' || !html){
			localStorage.setItem(_L_S_KEY_,'false');
			return '  ';
		}else{
			return null;
		}
		*/
	};

	function ready(){
		$descBox=$(".idex-desc-box");
		if($descBox.length==1){
			localStorage.removeItem(_L_S_KEY_);
			build();
			return;
		}
		$view=$('.idex-browse-view');
		loadHTML();
	};

	function loadHTML(){
		var html=localStorage.getItem(_L_S_KEY_);
		if(html=='false'){
			return;
		}else if(!html){
			setTimeout(loadHTML,200);
			return;
		}
		$view.html(html);
		$descBox=$(".idex-desc-box");
		build();
		//localStorage.removeItem(_L_S_KEY_);
	};

	function build(){
		var desc=$descBox[0];

		if($descBox.length>0){

			$('.image-title,.text-title',desc).each(function(index,elem){
				var parentElement=elem.parentElement;
				var title=parentElement.getAttribute('d-t');
				if(title){
					$(elem).before(['<div _c_="dm_module" data-id="99143',index,'" data-title="',title,'" _id_="ids-module-99143',index,'" style="line-height:0px;"></div>'].join(''));
				}
			});

			CSSApplyStyle.run(desc,true);

			$('div[_l_]',desc).each(function(index,elem){
				var link=elem.getAttribute('_l_');
				elem.setAttribute('href',link);
				elem.removeAttribute('_l_',link);
				$.replaceTag(elem,'a');
			});

			$('img',desc).each(function(index,elem){
				var style=this.style,
					src=this.getAttribute('_s_');
				if(!src){
					style.padding=this.clientHeight+"px 0px 0px "+this.clientWidth+"px";
					style.width="0px";
					style.height="0px";
					style.border=0;
				}else{
					style.width="100%";
					style.height="100%";
				}
				if(/s\.gif$/g.test(src)){
					this.setAttribute('_s_','http://img01.taobaocdn.com/imgextra/i1/1646439371/TB2i1hDaXXXXXcvXXXXXXXXXXXX-1646439371.gif');
				}
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
		}
	};

	function getAllHTML(){
		if(AllHTML){
			return AllHTML;
		}
		var html=HTMLfilter.getOuterHTML($descBox[0],{
			'meta iframe style noscript script link html ^body$ ^head$ ^title$ frame object param' : HTMLfilter.removeElement,
			'*' : {
				':before' : function(){
					var css=this.getAttribute('_c_');
					if(css){
						this.setAttribute('class',css);
						this.removeAttribute('_c_');
					}

					var id=this.getAttribute('_id_');
					if(id){
						this.setAttribute('id',id);
						this.removeAttribute('_id_');
					}

					var name=this.getAttribute('_na_');
					if(name){
						this.setAttribute('name',name);
						this.removeAttribute('_na_');
					}
				},
				'^on' : function(attr){
					attr.value='http://img01.taobaocdn.com/imgextra/i1/1646439371/TB2i1hDaXXXXXcvXXXXXXXXXXXX-1646439371.gif';
				},
				'style' : function(attr){
					HTMLfilter.removeStyle(this,{
						'@remove' : ['position','background-image','widows','^_','^-','orphans','image$']
					});
					attr.value=HTMLfilter.getStyleText(this.style);
				},
				'class' : function(attr){
					attr.value=HTMLfilter.removeClass(attr.value,'active');
				}
			},
			'img' : {
				':before' : function(){
					var src=this.getAttribute('src'),
						_s_=this.getAttribute('_s_');
					if(src && _s_){
						this.removeAttribute('_s_','');
					}
				},
				'_s_' : function(attr){
					attr.name='src';
					if(CF.isDebug){
						attr.value='';
					}
				},
				'class' : function(attr){
					attr.value=HTMLfilter.removeClass(attr.value,'active image-queue-item');
				}
			},
			'a'  : {
				':before' : function(){
					var href=this.getAttribute('href'),
						_h_=this.getAttribute('_h_');

					if(/^javascript:/i.test(href)){
						this.removeAttribute('href');
					}else if(/^javascript:/i.test(_h_)){
						this.removeAttribute('_h_');
					}else if(_h_){
						this.setAttribute('href',_h_);
					}

					this.removeAttribute('_h_');

					if(/^#/i.test(href)){
						this.target="";
					}else if(this.href){
						this.target="_blank";
					}
				}
			},
			'input'  : {
				':before' : function(){
					var css=this.getAttribute('_c_'),
						newClass;
					if(css){
						newClass=HTMLfilter.removeClass(css,'_s-t_');
						if(css!=newClass){
							this.type='submit';
							this.setAttribute('_c_',newClass);
						}
					}
				}
			}
		});

		AllHTML='<div align="center">'+html+'</div>';
		
		setTimeout(complete,500);
	};

	function complete(){

		var html=['<div class="idex-browse-button-box">',
					'<div class="idex-browse-button">复制</div>',
					'<div class="idex-browse-button">退出</div>',
				  '</div>'].join('');

		var isFrame=window.top!=window,
			div=$.createElement(html),
			$box=$('.idex-browse-box'),
			$copy,
			$qtipbox,
			$exit,
			$exit;

		$box.append(div);

		$copy=$(div.firstElementChild);
		$exit=$copy.next();

		div=$.createElement('<div class="idex-browse-qtipbox">复制成功</div>');
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


		$box.append('<div class="idex-browse-count">共：'+getLength(AllHTML.length)+'字</div>');


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

		$('.idex-browse-button-box').show();
		$('.idex-browse-loading').remove();

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
		'js/Idex/style.js',
		window._path_ + 'js/ZeroClipboard.js',
	function(){
		$(document).ready(function(){
			$.getBody().append('<div class="idex-browse-loading"><div class="bubbling-g-box"><span class="bubbling-g-1"></span><span class="bubbling-g-2"></span><span class="bubbling-g-3"></span></div></div>');
			setTimeout(function(){
				ready();
			},500);
		});
	});
};