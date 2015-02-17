(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsFixedLayout',
		_name_ : 'image-ftext',
		title : '文本',
		initModule : function(){
			this.logger(this);
			var textItem=this.app.layout.getLayout('text-item');
			textItem.extend(this);
		},
		getFormItemConfig : function(){
			var me=this;
			return [{
					label:'类型',
					xtype:'radio',
					name: 'type',
					items:[{
						label : '图片',
						value : '1'
					},{
						label : '文本',
						value : '2'
					}],
					getDesc : '修改链接类型'
				},
				CF.merger({
					placeholder :'填写链接地址',
					getDesc : '修改链接地址'
				},this.app.ui.FORMITEM.link),
				{
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
				},'|||',{
					label:'边框',
					name : 'border',
					width:'199px',
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
					width:'20px',
					xtype:'color',
					getDesc : '设置边框颜色'
				},'|||',{
					label:'背景',
					name : 'bgColor',
					width:'110px',
					xtype:'color',
					getDesc : '设置背景颜色'
				},{
					isPadding : true,
					width : '50px'
				},{
					label:'编辑',
					xtype:'button',
					name :'editor',
					onClick : function(){
						me.onEditor();
					}
				}];
		},
		setType : function(value){
		
		},
		getType : function(){
		
		}
	});

})(CF,jQuery);