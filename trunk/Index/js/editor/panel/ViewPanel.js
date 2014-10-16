(function(CF,$){

	$.push({
		_name_ : 'ViewPanel',
		MIN_WIDTH:750,
		MAX_WIDTH:1200,
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

			this.app.$eventElement.on('viewconfig',{
				panel : this,
			},function(event){
				var panel=event.data.panel,
					app;
				app=panel.app;
				app.PropertyPanel.setActive(panel);
			});

			$.getDoc().one('styleready',{
				panel : this,
			},function(event){
				event.data.panel.styleReady();
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
			var stylecolor,
				width,
				uid,
				div,
				html='<div class="idex-view-panel-popu-box"></div>';

			this.$descbox=this.app.$descBox;
			this.descbox=this.$descbox[0];
			this.viewPanel=this.app.$viewPanel[0];


			div=$.createElement(html);
			this.$descbox.after(div);
			this.$popuBox=$(div);

			stylecolor=this.$descbox.attr('stylecolor');
			stylecolor=$.getHexColor(stylecolor);

			if(!stylecolor){
				stylecolor='#49A0E1';
				this.$descbox.attr('stylecolor',stylecolor);
			}

			width=this.descbox.clientWidth;
			uid=this.$descbox.attr('uid');


			this.userdata={
				stylecolor: stylecolor,
				style : 'style1',
				width: width,
				padding : true,
				imgborder : true,
				imgpadding : true,
				mainimg: '',
				uid: uid || ''
			};

			this.setUid(uid);
			this.initEvents();
		},
		styleReady : function(){
			this.setStylecolor(this.userdata.stylecolor);
		},
		getPropertyForm : function (box){
			this.logger(this);

			var AbsContainerPrototype=this.app.layout.getClass('AbsContainer').prototype;
			this.setPropertyItemValue = AbsContainerPrototype.setPropertyItemValue;
			this.onPropertyFormShow = AbsContainerPrototype.onPropertyFormShow;
			this.getPropertyItemValue = AbsContainerPrototype.getPropertyItemValue;

			this.form=this.app.CreatePropertyForm({
				$owner : this,
				id : this.__PROPERTY_PANEL_ID__,
				render : box,
				items : [{
					label:'宽度',
					name : 'width',
					placeholder :'填写画布宽度',
					width:'165px',
					unit:'px',
					maxlength : 4,
					value: 750,
					xtype:'text',
					getDesc : '设置画布宽度'

				},' ',{
					xtype:'checkitem',
					name : 'padding',
					width:'50px',
					text:'边距',
					getDesc : function(value){
						if(this.value){
							return '设置画布边距';
						}else{
							return '取消画布边距';
						}
					}
				},{
					label:'编号',
					xtype:'text',
					placeholder :'填写数字和字母组成的编号',
					name: 'uid',
					maxlength : 20,
					getDesc : '设置编号'
				},{
					label:'名称',
					xtype:'text',
					placeholder :'填写描述名称',
					name: 'name',
					maxlength : 10,
					getDesc : '设置描述名'
				},{
					label:'主图',
					xtype:'text',
					placeholder :'填写图片地址',
					name: 'mainimg',
					getDesc : function(value){
						if(value==''){
							return '设置主图';
						}
						return '设置主图';
					}
				},'|||',{
					label:'配色',
					xtype:'radio',
					name: 'color',
					cls : 'idex-ui-color-radio-group breakline',
					getDesc : '更换配色',
					items:[{
						value : '#2E2E2E'
					},{
						value : '#49A0E1'
					},{
						checked : true,
						value : '#5ACAE0'
					},{
						value : '#7B62A1'
					},{
						value : '#89B41E'
					},{
						value : '#93D500'
					},{
						value : '#A6A6A6'
					},{
						value : '#A68DD9'
					},{
						value : '#B39D63'
					},{
						value : '#CAA6A9'
					},{
						value : '#F06090'
					},{
						value : '#F0C060'
					},{
						value : '#FC7100'
					}],
					bindItemEvent:function(item){
						this.callPrototypeMethod();
						item.$elem.css('background-color',item.value);
					},
					onChange:function(item){
						this.$owner.getItem('stylecolor').changeColor(item.value);
					}
				},{
					name : 'stylecolor',
					align :'cb',
					width:'16px',
					cls:'radio-color',
					xtype:'color',
					getDesc : '设置自定义配色',
					onRenderAfter:function(config){
						this.callPrototypeMethod();
						var prev=this.$elem.prev();
						var field=$('.idex-ui-item-field:last',prev);
						field.append(this.$elem);
					}
				},
/*
				{
					isPadding: true,
					width: '65px',
					height: '25px'
				},{
					label:'样式',
					xtype:'button'
				},{
					label:'间距',
					width: '110px',
					unit:'px',
					maxlength : 2,
					xtype:'text',
					value : 5,
					name : 'imgMargin',
					getDesc : '间距'
				},'',{
					label:' ',
					width: 'auto',
					xtype:'checkitem',
					name : 'imgBorder',
					value : true,
					text : '边框',
					getDesc : function(value){
						if(this.value){
							return '设置图片边框';
						}else{
							return '取消图片边框';
						}
					}
				},{
					width: 'auto',
					xtype:'checkitem',
					cls: 'idex-ui-boolean-item',
					name : 'imgPadding',
					value : true,
					text : '填充',
					getDesc : function(value){
						if(this.value){
							return '设置图片填充';
						}else{
							return '取消图片填充';
						}
					}
				}
				*/

				{
					label: '风格',
					xtype: 'radio',
					width: 'auto',
					name: 'style',
					cls: 'breakline',
					getDesc : '更换配色',
					items:[{
						checked : true,
						value : 'style1',
						label :'1'
					},{
						value : 'style2',
						label :'2'
					},{
						value : 'style3',
						label :'3'
					},{
						value : 'style4',
						label :'4'
					}]
				}]
			});
			this.mainPanel=this.form.$elem[0];
			return this.form;
		},
		setStyle : function(value){
			this.logger(this);
			this.$descbox.replaceClass(this.userdata.style,value);
			this.userdata.style=value;
		},
		getStyle : function(){
			this.logger(this);
			return this.userdata.style;
		},
		setStylecolor:function(value){
			this.logger(this);
			$.getDoc().trigger('changestyle',{
				path:'idex-desc-default.css',
				color : value
			});
			this.userdata.stylecolor=value;
			this.$descbox.attr('stylecolor',value);
		},
		getStylecolor:function(){
			this.logger(this);
			return this.userdata.stylecolor;
		},
		setPadding:function(value){
			this.logger(this);
			if(value==false){
				this.$descbox.removeClass('p-l-r');
			}else{
				value=true;
				this.$descbox.addClass('p-l-r');
			}
			this.userdata.padding=value;
		},
		getPadding:function(){
			this.logger(this);
			return this.userdata.padding;
		},
		setWidth:function(value){
			this.logger(this);
			if(value=='' || value < this.MIN_WIDTH || value > this.MAX_WIDTH || isNaN(value)){
				this.form.setItemValue('width',this.userdata.width);
				this.form.quickTip({
					target:'width',
					html:'宽度只能在' + this.MIN_WIDTH + 'px至' + this.MAX_WIDTH + 'px之间'
				});
				//this.setWidth(this.userdata.width);
				return false;
			}
			this.userdata.width=value;
			this.descbox.style.width=value+'px';
		},
		getWidth:function(){
			this.logger(this);
			return this.userdata.width;
		},
		setUid:function(value){
			this.logger(this);
			if(value){
				var newValue=value.toWordChar();
				if(newValue!=value && this.form){
					this.form.quickTip({
						target:'uid',
						html:'编号只能由数字和字母组成<br/>如:37202200543'
					});
				}
				value=newValue;
			}else{
				value='';
			}
			if(value.length>20){
				value=value.substring(0,20);
			}
			if(this.form){
				this.form.setItemValue('uid',value);
			}
			var oldUID=this.userdata.uid;
			if(oldUID=='' && value==''){
				return false;
			}
			this.userdata.uid=value;
			this.$descbox.attr('uid',value);
		},
		getUid:function(){
			this.logger(this);
			return this.userdata.uid;
		},
		onPropertyFormShow : CF.emptyFunction,
		setValue : CF.emptyFunction,
		getValue : CF.emptyFunction,
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
		getUserData:function(){
			this.logger(this);
			return {
				stylecolor: this.userdata.stylecolor,
				uid: this.userdata.uid,
				width: this.userdata.width
			};
		},
		setUserData:function(data){
			this.logger(this);
			this.setStylecolor(data.stylecolor);
			this.setUid(data.uid);
			this.setWidth(data.width);
		},
		getHTML : function(){
			this.logger(this);
			return this.descbox.innerHTML;
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
		setHTML : function(HTML){
			this.logger(this);
			this.$descbox.empty();
			this.descbox.innerHTML=HTML;
			$('.idex-r-active',this.descbox).removeClass('idex-r-active');
			this.app.LayoutPanel.on('reloadNavList');
			this.app.trigger('contentupdate');
		},
		getMainimg : function(){
			this.logger(this);
			return this.userdata.mainimg;
		},
		setMainimg : function(value){
			this.logger(this);
			value=$.trim(value);
			this.userdata.mainimg=value;
		},
		getContent: function(){
			this.logger(this);
			return {
				html : this.getHTML(),
				data : this.getUserData()
			};
		},
		setContent: function(content){
			this.logger(this);
			this.setUserData(content.data);
			this.setHTML(content.html);
		}
	});
	
})(CF,jQuery);