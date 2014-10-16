(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsFloatLayout',
		_name_ : 'float-link',
		title : '链接',
		getPropertyForm : function (box){
			this.logger(this);
			var me=this;
			var items=this.getBasePropertyForm();
			items.push({
				xtype:'text',
				label:'链接',
				vtype:['autoselect'],
				placeholder :'填写链接地址',
				name: 'link',
				getDesc : '修改浮动层的链接'
			});


			this.form=this.app.CreatePropertyForm({
				$owner : this,
				id : this.__PROPERTY_PANEL_ID__,
				render : box,
				items : items
			});
			return this.form;
		},
		setLink : function(value){
			$.attr(this.activeElement,'_l',value);
		},
		getLink : function(){
			return $.attr(this.activeElement,'_l');
		}
	});

})(CF,jQuery);