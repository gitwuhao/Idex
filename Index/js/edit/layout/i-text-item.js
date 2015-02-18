(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsFixedLayout',
		_name_ : 'i-text-item',
		title : '文本',
		initModule : function(){
			this.logger(this);
			var textItem=this.app.layout.getLayout('text-item');
			textItem.extend(this);
		},
		getFormItemConfig : function(){
			var me=this;
			return [{
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
					isPadding: true,
					width: '25px',
					height: '30px'
				},{
					label:'编辑',
					xtype:'button',
					name : 'editor',
					onClick : function(){
						me.onEditor();
					}
				}];
		}
	});

})(CF,jQuery);