(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsFloatLayout',
		_name_ : 'map-link',
		title : '链接',
		getPropertyForm : function (box){
			this.logger(this);
			var me=this;
			var items=this.getBasePropertyForm();
			items.push(
			CF.merger({
				placeholder :'填写链接地址',
				getDesc : '修改链接地址'
			},this.app.ui.FORMITEM.link));


			this.form=this.app.CreatePropertyForm({
				$owner : this,
				id : this.__PROPERTY_PANEL_ID__,
				render : box,
				items : items
			});
			return this.form;
		}
	});

})(CF,jQuery);