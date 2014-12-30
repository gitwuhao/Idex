(function(CF,$){
	$.push({
		_name_ : 'ViewPanel',
		__events__ : ['click','mousedown'].join(' '),
		initModule : function(){
			this.logger(this);
			
			this.viewPanel=this.app.$viewPanel[0];
			this.$contextBox=this.app.$contextBox;
			
			this.getDescBox();
			
			this.originalHTML=this.descbox.outerHTML;


			var div,
				html='<div class="idex-view-panel-popu-box"></div>';

			div=$.createElement(html);
			this.$contextBox.after(div);
			this.$popuBox=$(div);


			this.initEvents();
		},
		initEvents : function(){
			this.logger(this);

			this.$contextBox.on(this.__events__,{
				panel : this,
				event : this.app.event
			},function(event){
				var data=event.data;
				event.data=null;
				if(data.event.removeTargetHandle(event)){
					return;
				}
				if(!event.originalEvent || event.screenX==0 && event.screenY==0){
					event.isCommandTrigger=true;
				}
				
				if(event.type=='mousedown' && (event.button==2 || event.ctrlKey)){
					event.type='mouserightdown';
				}

				data.panel.eventDispatch(event);
			});


			var margin=this.viewPanel.offsetTop * 2;

			this.addEventListener('resize',function(width,height){
				this.viewPanel.style.height=(height- margin) + 'px';
			});

		},
		eventDispatch:function(event){
			this.logger(this);
			var type=event.type,
				target=event.target,
				item,
				layout;

			item=this.app.layout.findParent(target);

			if(!event.isCommandTrigger){
				if(type=='click' && this.lastEvent && this.lastEvent.target!=event.target){
					this.lastEvent=event;
					return;
				}
			}
			if(item){
				layout=item.layout;
				layout.eventDispatch(event,item.target,type);
			}else{
				this.on(type,event);
			}
			this.lastEvent=event;
		},
		getDescBox : function(){
			this.$descbox=this.$contextBox.children('.idex-desc-box:first');
			this.descbox=this.$descbox[0];
			return this.$descbox;
		},
		onSrcollTop:function(element){
			this.logger(this);
			var offsetTop=element.offsetTop,
				scrollTop=this.viewPanel.scrollTop;
			if(scrollTop > offsetTop || offsetTop - scrollTop > window.innerHeight){
				this.viewPanel.scrollTop=offsetTop - 5;
			}
		},
		srcollTop : function(top){
			this.logger(this);
			this.viewPanel.scrollTop=top;
		},
		disabledSrcoll:function(){
			var style=this.viewPanel.style;
			style.setProperty('overflow-x','hidden');
			style.setProperty('overflow-y','hidden');
		},
		enabledSrcoll:function(){
			var style=this.viewPanel.style;
			style.setProperty('overflow-x','hidden');
			style.setProperty('overflow-y','auto');
		},
		__OUTPUT_RULES__ : {
			isRemoveEmptyAttr : true,
			'meta iframe style noscript script link html ^body$ ^head$ ^title$ frame object param' : HTMLfilter.removeElement,
			'*' : {
				'^id$ ^on ^name$' : function(attr){
					if(/^on|^name$/i.test(attr.name)){
						this.removeAttribute(attr.name);
					}else if(/^id$/i.test(attr.name)){
						if(window.isLayoutID(attr.value)){
						}else if( /^img$/i.test(this.tagName) && /^CI/i.test(attr.value)){
						}else{
							this.removeAttribute('id');
						}
					}
					attr.value='';
				},
				'class' : function(attr){
					attr.value=HTMLfilter.removeClass(attr.value,'idex-r-.+');
				}
			},
			'img' : {
				':before' : function(){
					var key='src',
						i_key=IDEX_ATTR_MAP.SRC,
						src,
						_src_;
					src=this.getAttribute(key);
					_src_=this.getAttribute(i_key);
					if(_src_ && src){
						this.setAttribute(key,'');
					}
				},
				'src' : function(attr){
					attr.name=IDEX_ATTR_MAP.SRC;
				}
			}
		},
		getAllHTML : function(){
			this.logger(this);
			return HTMLfilter.getOuterHTML(this.descbox,this.__OUTPUT_RULES__);
		},
		getHTML : function(){
			this.logger(this);
			return this.descbox.outerHTML;
		},
		setHTML : function(HTML){
			this.logger(this);
			this.$contextBox.innerHTML=HTML;
			this.getDescBox();
			$('.idex-r-active',this.descbox).removeClass('idex-r-active');
			this.app.trigger('contentUpdate');
			this.app.LayoutPanel.home();
		},
		getOriginalHTML : function(){
			this.logger(this);
			return this.originalHTML;
		}
	});
	
})(CF,jQuery);