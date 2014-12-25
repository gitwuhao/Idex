(function(CF,$){

	$.push({
		_name_ : 'ViewPanel',
		__events__ : ['click','mousedown'].join(' '),
		initEvents : function(){
			this.logger(this);

			this.$descbox.on(this.__events__,{
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
		initModule : function(){
			this.logger(this);
			var div,
				html='<div class="idex-view-panel-popu-box"></div>';

			this.$descbox=this.app.$descBox;
			this.descbox=this.$descbox[0];
			this.viewPanel=this.app.$viewPanel[0];


			div=$.createElement(html);
			this.$descbox.after(div);
			this.$popuBox=$(div);


			this.initEvents();
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
				'style' : function(attr){
					HTMLfilter.removeStyle(this,{
						'@remove' : ['position','background-image','widows','^_','^-','orphans','image$']
					});
					attr.value=HTMLfilter.getStyleText(this.style);
				},
				'class' : function(attr){
					attr.value=HTMLfilter.removeClass(attr.value,'idex-r-.+');
				}
			},
			'img' : {
				':before' : function(){
					var src=this.getAttribute('src'),
						_s_=this.getAttribute('_s_');
					if(_s_ && src){
						this.setAttribute('src','');
					}
				},
				'src' : function(attr){
					attr.name='_s_';
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
					}else if(href){
						this.setAttribute('_h_',href);
						this.removeAttribute('href');
					}
				}
			},
			'input'  : {
				':before' : function(){
					if(/^submit$/i.test(this.type)){
						$.addClass(this,'_s-t_');
						this.type='button';
					}
				}
			}
		},
		getAllHTML : function(){
			this.logger(this);
			return HTMLfilter.getOuterHTML(this.descbox,this.__OUTPUT_RULES__);
		},
		getHTML : function(){
			this.logger(this);
			return this.descbox.innerHTML;
		},
		setHTML : function(HTML){
			this.logger(this);
			this.$descbox.empty();
			this.descbox.innerHTML=HTML;
			$('.idex-r-active',this.descbox).removeClass('idex-r-active');
			this.app.LayoutPanel.on('reloadNavList');
			this.app.trigger('contentupdate');
		},
		getContent: function(){
			this.logger(this);
			return {
				html : this.getHTML()
			};
		},
		setContent: function(content){
			this.logger(this);
			this.setHTML(content.html);
		}
	});
	
})(CF,jQuery);