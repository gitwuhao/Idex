(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsFloatLayout',
		_name_ : 'float-text',
		title : '文本',
		initModule : function(){
			this.logger(this);
			this.app.bindReadyAfter(this);
		},
		onAppReadyAfter : function(){
			this.logger(this);
			var textItem=this.app.layout.getLayout('text-item');
			textItem.extend(this);
		},
		getFormItemConfig : function(){
			var me=this;
			var items=this.getBasePropertyForm();
			items.push({
					label:'边框',
					name : 'border',
					width:'200px',
					xtype:'radio',
					items:[{
						label : '1',
						value : '1'
					},{
						label : '2',
						value : '2'
					},{
						label : '3',
						value : '3'
					},{
						label : '4',
						value : '4'
					}],
					getDesc : '设置边框'
				},{
					name : 'bColor',
					width:'19px',
					cls : 'mini2',
					xtype:'color',
					getDesc : '设置边框颜色'
				},'||',{
					label:'上',
					name : 'paddingTop',
					placeholder :'边距',
					unit:'px',
					vtype : ['spin'],
					xtype:'text',
					minValue : 50,
					minValue : 1,
					width:'110px',
					getDesc : '修改上边距'
				},{
					label:'下',
					name : 'paddingBottom',
					placeholder :'边距',
					unit:'px',
					vtype : ['spin'],
					xtype:'text',
					minValue : 50,
					minValue : 1,
					width:'110px',
					getDesc : '修改下边距'
				},{
					label:'左',
					name : 'paddingLeft',
					placeholder :'边距',
					unit:'px',
					vtype : ['spin'],
					xtype:'text',
					minValue : 50,
					minValue : 1,
					width:'110px',
					getDesc : '修改左边距'
				},{
					label:'右',
					name : 'paddingRight',
					placeholder :'边距',
					unit:'px',
					vtype : ['spin'],
					xtype:'text',
					minValue : 50,
					minValue : 1,
					width:'110px',
					getDesc : '修改右边距'
				},'||',{
					label:'背景',
					name : 'bgColor',
					width:'110px',
					xtype:'color',
					getDesc : '设置背景颜色'
				},{
					isPadding: true,
					width: '38px'
				},{
					xtype:'button',
					cls : 'autosize',
					onClick : function(){
						me.onAutoSize();
					}
				},{
					isPadding: true,
					width: '10px'
				},{
					label:'编辑',
					xtype:'button',
					name :'editor',
					me  : this,
					onClick : function(){
						this.me.onEditor();
					}
				});
			return items;
		},
		onAutoSize : function(){
			this.activeElement.style.height='0px'
			$.setTimeout(function(){
				this.setHeight(this.activeElement.scrollHeight);
			},50,this);
		}
	});

})(CF,jQuery);