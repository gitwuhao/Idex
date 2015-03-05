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
					isPadding: true,
					width: '33px'
				},{
					xtype:'button',
					cls : 'autosize',
					onClick : function(){
						me.onAutoSize();
					}
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