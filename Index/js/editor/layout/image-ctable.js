(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsLayout',
		_name_ : 'image-ctable',
		title : '图片纵列表'
		/*,
		getPropertyForm : function (box){
			this.logger(this);
			this.form=this.app.CreatePropertyForm({
				$owner : this,
				id : this.__PROPERTY_PANEL_ID__,
				render : box,			
				items : [{
					label:'列数',
					xtype:'radio',
					name: 'col',
					items:[{
						label : '3列',
						value : '3'
					},{
						label : '4列',
						value : '4'
					},{
						label : '5列',
						value : '5'
					}],
					getDesc : '修改链接地址'
				}]
			});
			return this.form;
		}
		*/
	});

})(CF,jQuery);