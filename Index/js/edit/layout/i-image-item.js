(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsFixedLayout',
		_name_ : 'i-image-item',
		title : '图片',
		getPropertyForm : function (box){
			this.logger(this);
			this.form=this.app.CreatePropertyForm({
				$owner : this,
				id : this.__PROPERTY_PANEL_ID__,
				render : box,			
				items : [
					CF.merger({
						placeholder :'填写图片地址',
						getDesc : '修改图片地址'
					},this.app.ui.FORMITEM.img),
					'SIZE'
				]
			});
			return this.form;
		}
	});

})(CF,jQuery);