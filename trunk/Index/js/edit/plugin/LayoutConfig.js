(function(CF,$){
var MIN_WIDTH=750,
	MAX_WIDTH=1200,
	STYLE_KEY_MAP = {
		CONTEXT_PADDING : 'p-l-r'
	},
	ATTR_KEY_MAP=window.APP_KEY_MAP.ATTR;

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
			initPlugin : function(){
				this.initPluginEvent();
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
				this.setStylecolor(this.getStylecolor());
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
					},{
						label:'字体',
						name : 'fontsize',
						placeholder :'填写字号',
						width:'165px',
						unit:'px',
						maxlength : 2,
						vtype : ['spin'],
						maxValue : 20,
						minValue : 12,
						xtype:'text',
						getDesc : '设置全局文字大小'

					},' ',{
						name : 'fontcolor',
						cls:'mini',
						width:'20px',
						xtype:'color',
						getDesc : '设置全局文字颜色',
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
						getDesc : '更换风格',
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
									html : '<em style="color:#49A0E1;">更多风格还在设计<br/>敬请期待...</em>',
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
				var cls=' '+this.descbox.className+' ';
				this.descbox.className=$.trim(cls.replace(/\s+style\d?\s+/,' '+value+' '));
			},
			getStyle : function(){
				this.logger(this);
				var array,
					cls=' '+this.descbox.className+' ';
				array=cls.match(/\s+(style\d?)\s+/)||[];
				return $.trim(array[0] || '');
			},
			setStylecolor:function(value){
				this.logger(this);
				$.getDoc().trigger('changestyle',{
					path:'idex-desc-default.css',
					color : value
				});
				this.$descbox.attr(ATTR_KEY_MAP.STYLE_COLOR,value);
			},
			getStylecolor:function(){
				this.logger(this);
				return this.$descbox.attr(ATTR_KEY_MAP.STYLE_COLOR);
			},
			setPadding:function(value){
				this.logger(this);
				if(value==false){
					this.$descbox.removeClass(STYLE_KEY_MAP.CONTEXT_PADDING);
				}else{
					value=true;
					this.$descbox.addClass(STYLE_KEY_MAP.CONTEXT_PADDING);
				}
			},
			getPadding:function(){
				this.logger(this);
				return this.$descbox.hasClass(STYLE_KEY_MAP.CONTEXT_PADDING);
			},
			setWidth:function(value){
				this.logger(this);
				if(value=='' || value < MIN_WIDTH || value > MAX_WIDTH || isNaN(value)){
					this.form.setItemValue('width',this.getWidth());
					this.form.quickTip({
						target:'width',
						html:'宽度只能在' + MIN_WIDTH + 'px至' + MAX_WIDTH + 'px之间'
					});
					return false;
				}
				this.descbox.style.width=value+'px';
			},
			getWidth:function(){
				this.logger(this);
				return this.descbox.offsetWidth;
			},
			setFontsize : function(value){
				if(value==14){
					value='';
				}
				$.style(this.descbox,'font-size',value);
			},
			getFontsize : function(){
				var fontSize=$.style(this.descbox,'font-size');
				if(fontSize){
					return fontSize.replace('px','');
				}
				return 14;
			},
			setFontcolor : function(value){
				$.style(this.descbox,'color',value);
			},
			getFontcolor : function(){
				return $.style(this.descbox,'color');
			},
			onPropertyFormShow : CF.emptyFunction,
			setValue : CF.emptyFunction,
			getValue : CF.emptyFunction
		});

		
	}
});
})(CF,jQuery);