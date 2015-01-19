(function(CF,$){
	var ATTR_KEY_MAP=window.APP_KEY_MAP.ATTR;
	$.push({
		_isUIModule_:true,
		_className_ : 'FloatTabPanel',
		_name_ : 'ImagePanel',
		autoRender:false,
		cls:'idex-image-tab-panel',
		bottombar:{
			items : [{
				cls:"checkimg",
				title : '校验图片',
				onClick : function(){
					this.$owner.$owner.on(this.cls);
				}
			},{
				cls:"automatch",
				title : '自动匹配',
				onClick : function(){
					this.$owner.$owner.on(this.cls);
				}
			}]
		},
		items : [{
			active:true,
			label:'图片信息',
			onTagClick:function(){
			},
			onLoad:function(){
				this.$tabview.html('<div class="uncheck">没有校验信息...</div>');
			}
		}],
		initModule : function(){
			this.logger(this);
		},
		onCreatePanel : function(){
			this.logger(this);
			this.currentTab.$tabview.click({
				me : this
			},function(event){
				var target=event.target,
					parentElement;
				if(this==event.target){
				
				}else{
					var me=event.data.me;
					parentElement=target.parentElement;
					if($.hasClass(parentElement,'idex-reload-icon')){
						me.on('reloadItem',parentElement.parentElement);
					}else if($.hasClass(parentElement,'idex-list-item-icon')){
						me.on('clickItem',parentElement.parentElement);
					}else if($.hasClass(parentElement,'idex-list-item')){
						me.on('clickItem',parentElement);
					}else if($.hasClass(target,'idex-list-item')){
						me.on('clickItem',target);
					}
				}
			});
		},
		onShow : function(){
			this.logger(this);
			if(!this.isChecked){
				//this.onCheckimg();
			}
		},	
		onHide : function(){
			this.logger(this);
			this.removeActiveItem();
		},
		onAutomatch : function(){
			//CF.getCallback(this.)
			this.app.SelectPicture.show();
		},
		onCheckimg : function(){
			this.logger(this);
			if(this.app.isLocked){
				return;
			}
			this.app.isLocked=true;
			this.currentTab.$tabview.html('');
			ui.popu.createLoading();
			this.$imgList=$('img',this.getDescBoxElement());
			this.index=0;
			this.isChecked=true;
			delete this.activeItem;
			this.iterator();
		},
		iterator : function(){
			if(!this.$imgList){
				return;
			}
			var img=this.$imgList[this.index];
			if(!img){
				ui.popu.removeLoading();
				delete this.$imgList;
				this.app.isLocked=false;
				return;
			}
			this.index++;
			//不可见
			if(img.offsetParent){
				this.setId(img);
				this.check(img);
			}else{
				this.iterator();
			}
		},
		setId : (function(){
			var __SUFFIX__='CI'+$.randomChar(2),
				index=parseInt('1'+(''+$.timestamp()).match(/(\d{4}$)/)[0]);
			return function(img){
				if(!img.id){
					img.id=__SUFFIX__ + (index++);
				}
			};
		})(),
		isSGIF : function(img){
			var src=img.src,
				_src_=img.getAttribute(ATTR_KEY_MAP.SRC);
			
			if((!src && !_src_)
				|| (/s\.gif$/.test(src) || /s\.gif$/.test(_src_))
				/*|| (/^http/.test(src))*/
			){
				return true;
			}
			return false;
		},
		check : function(img){
			this.logger(this);
			var src=img.src,
				_src_=img.getAttribute(ATTR_KEY_MAP.SRC),
				item,
				naturalHeight=img.naturalHeight,
				naturalWidth=img.naturalWidth,
				clientHeight=img.clientHeight,
				clientWidth=img.clientWidth;

			if(!src && !_src_){
				img.src='/s.gif';
				item={
					type : 'error',
					title : '未设置图片'
				};
			}else if(this.isSGIF(img)){
				item={
					type : 'error',
					title : '未设置图片'
				};
			}else if(img.src && naturalHeight==0 && naturalHeight==naturalWidth){
				item={
					type : 'warning',
					title : '图片加载失败',
					isReload : true
				};
			}else if(img.src && (naturalHeight!=clientHeight || naturalWidth!=clientWidth)){
				item={
					type : 'warning',
					title : '缩放['+naturalWidth+'&nbsp;x&nbsp;'+naturalHeight+']'
				};
			}else if(!src && _src_){
				var me=this;
				
				src=_src_;

				img.removeAttribute('src');

				img.onload=function(event){
					$.setTimeout(function(){
						me.check(this);
					},50,this);
					this.onload=null;
					this.onerror=null;
				};
				img.onerror=img.onload;

				setTimeout(function(){
					img.src=src;
				},100);
				return;
			}
			if(item){
				var html=['<div class="idex-list-item" data-index="',img.id,'">',
							'<div class="idex-list-item-icon idex-',item.type,'-icon">',
								'<div class="idex-icon"></div>',
							'</div>',
							'<div class="idex-img-width-height-view">',clientWidth,'&nbsp;x&nbsp;',clientHeight,'</div>',
							'<div class="idex-list-item-title">',item.title,'</div>',
							];
				if(item.isReload){
					html.push('<div class="idex-list-item-icon idex-reload-icon">',
								'<div class="idex-icon"></div>',
							  '</div>');
				}
				html.push('</div>');
				this.currentTab.$tabview.append(html.join(''));
				var tabview=this.$tabviewbox[0];
				tabview.scrollTop=tabview.scrollHeight + 100;
			}
			$.setTimeout(function(){
				this.iterator();
			},100,this);
			if(item){
				return false;
			}
			return true;
		},
		onClickItem : function(target){
			this.logger(this);
			var id=target.getAttribute('data-index'),
				img;
			img=this.get(id);
			if(!img){
				setTimeout(function(){
					$(target).remove();
				},100);
				return;
			}
			if(img.clientHeight==0 || img.clientWidth==0){
				$(img).one('load',{
					target : target,
					img : img
				},function(event){
					var data=event.data;
					$(data.target).children('.idex-img-width-height-view').html(data.img.clientWidth+'&nbsp;x&nbsp;'+data.img.clientHeight);
				});
			}
			this.app.ViewPanel.srcollTop(img.offsetTop - 5 );
			
			if(this.activeItem && this.activeItem.$target[0]==target){
				return;
			}

			this.removeActiveItem();

			this.activeItem={
				$target : $(target),
				id : id
			};
			this.activeItem.$target.addClass('active');
			$('#'+id).addClass('idex-r-activeimg');
		},
		removeActiveItem : function(){
			this.logger(this);
			if(this.activeItem){
				this.activeItem.$target.removeClass('active');
				$('#'+this.activeItem.id).removeClass('idex-r-activeimg');
			}
			delete this.activeItem;
		},
		onReloadItem : function(target){
			this.logger(this);
			var id=target.getAttribute('data-index'),
				img,
				src;

			img=this.get(id);
			
			src=img.getAttribute('src');

			img.removeAttribute('src');

			img.onload=function(){
				this.onload=null;
				this.onerror=null;
			};

			img.onerror=function(){
				this.onload=null;
				this.onerror=null;
			};
			
			setTimeout(function(){
				img.src=src;
			},100);
			
			this.onClickItem(target);
		}
	});	
	
})(CF,jQuery);