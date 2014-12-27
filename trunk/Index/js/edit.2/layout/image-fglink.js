(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsFixedLayout',
		_name_ : 'image-fglink',
		title : '图片链接',
		isBorder:true,
		isPadding:true,
		initModule : function(){
			this.logger(this);
		},
		getPropertyForm : function (box){
			this.logger(this);
			this.form=this.app.CreatePropertyForm({
				$owner : this,
				id : this.__PROPERTY_PANEL_ID__,
				render : box,			
				items : [
				CF.merger({
					placeholder :'填写链接地址',
					getDesc : '修改链接地址'
				},this.app.ui.FORMITEM.link),
				CF.merger({
					placeholder :'填写图片地址',
					getDesc : '修改图片地址'
				},this.app.ui.FORMITEM.img),
				'SIZE']
			});
			return this.form;
		},
		setSrc : function(value){
			var img=this.activeElement.firstElementChild;
			img.src=value;
		},
		getSrc : function(){
			var img=this.activeElement.firstElementChild;
			return img.src;
		}
	});

})(CF,jQuery);