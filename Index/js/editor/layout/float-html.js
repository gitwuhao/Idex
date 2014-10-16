(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsFloatLayout',
		_name_ : 'float-html',
		title : 'HTML代码',
		getPropertyForm : function (box){
			this.logger(this);
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
				},'||',{
					isPadding : true,
					width : '15px'
				},{
					xtype:'textarea',
					cls : 'code',
					width : '200px',
					placeholder :'在此处粘贴HTML代码:',
					rows : 4
				});

			this.form=this.app.CreatePropertyForm({
				$owner : this,
				id : this.__PROPERTY_PANEL_ID__,
				render : box,
				items : items
			});
			var htmlitem=this.app.layout.getLayout('html-item');
			this.onPaste=htmlitem.onPaste;
			this.addUndo=htmlitem.addUndo;
			this.initCodeTextArea=htmlitem.initCodeTextArea;
			this.initCodeTextArea();
			return this.form;
		},
		__undo_title__:'编辑浮动代码层',
		__undo_type__:'changefloathtmlhtml',
		onAutoSize : function(){
			this.setHeight(this.activeElement.scrollHeight);
		}
	});
//jQuery.getPrivateData(document.activeElement)
})(CF,jQuery);