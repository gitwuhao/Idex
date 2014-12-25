(function(CF,$){
$.push({
	overwrite : function(app){
		var LayoutPanel=app._module_map_.LayoutPanel,
			ViewPanel=app._module_map_.ViewPanel,
			topbarItems,
			home;
		
		topbarItems=LayoutPanel.topbar.items;

		home=topbarItems[0];

		topbarItems.push({
			cls : "config",
			onClick : home.onClick
		});

		CF.merger(LayoutPanel,{
			onConfig : function(){
				this.app.$eventElement.trigger('viewconfig');
			}
		});

		CF.merger(ViewPanel,{
			MIN_WIDTH:750,
			MAX_WIDTH:1200,
			initPlugin : function(){

				this.initPluginEvent();

				var stylecolor,
					width,
					uid;

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
			},
			initPluginEvent : function(){
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
						label:'名称',
						name : 'name',
						placeholder :'填写模板名称',
						maxlength : 10,
						value: '未命名描述模板',
						xtype:'text',
						getDesc : '设置模板名称'

					},{
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
					},'||',{
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
					},{
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
						}],
						onRenderAfter : function(){
							this.callPrototypeMethod();
							var div=$.createElement('<div class="idex-ui-radio-group"><span>More</span></div>');
							this.items[0].$elem.parent().append(div);

							$(div).click(function(event){
								ui.quicktip.show({
									html : '更多风格还在设计<br/>敬请期待...',
									px : 'idex-ui',
									offset : 'lt',
									align :'lc',
									target : this
								});
							});
						}
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

		
	}
});
})(CF,jQuery);