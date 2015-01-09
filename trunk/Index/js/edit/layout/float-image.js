(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsFloatLayout',
		_name_ : 'float-image',
		title : '图片',
		isBorder:true,
		isPadding:true,
		getPropertyForm : function (box){
			this.logger(this);
			var me=this;
			var items=this.getBasePropertyForm();
			items.push(
			CF.merger({
				placeholder :'填写链接地址',
				getDesc : '修改链接地址'
			},this.app.ui.FORMITEM.link),
			CF.merger({
				placeholder :'填写图片地址',
				getDesc : '修改图片地址'
			},this.app.ui.FORMITEM.img),
			{
				xtype:'SIZE',
				width:'195px'
			},'',{
				xtype:'button',
				cls : 'autosize',
				onClick : function(){
					me.onAutoSize();
				}
			});

			this.form=this.app.CreatePropertyForm({
				$owner : this,
				id : this.__PROPERTY_PANEL_ID__,
				render : box,
				items : items
			});
			return this.form;
		},
		setHeight :function(value){
			this.callPrototypeMethod();
			this.getImgsizing();
		},
		onAutoSize : function(){
			var activeElement,
				height,
				width,
				img=$('img',this.activeElement);
			if(img.length==0){
				return;
			}else{
				img=img[0];
			}

			if(img.naturalHeight == 1 && img.naturalWidth == img.naturalHeight){
				return;
			}
			activeElement=this.activeElement;
			height=img.naturalHeight + (activeElement.offsetHeight - img.offsetHeight);
			width=img.naturalWidth + (activeElement.offsetWidth - img.offsetWidth);
			
			this.setSizing(width - this.getWidth(),height - this.getHeight());
		}
	});

})(CF,jQuery);