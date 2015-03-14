(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsLayout',
		_name_ : 'map-box',
		title : '热点层',
		getPropertyForm : function (box){
			this.logger(this);
			this.form=this.app.CreatePropertyForm({
				$owner : this,
				id : this.__PROPERTY_PANEL_ID__,
				render : box,			
				items : [{
					label:'高度',
					name : 'height',
					unit:'px',
					maxlength : 4,
					minValue : 100,
					maxValue : 1900,
					vtype : ['spin','required'],
					xtype:'text',
					getDesc : '设置浮动层高度'
				},
				CF.merger({
					placeholder :'填写背景图片地址',
					getDesc : '修改热点层的背景图片'
				},this.app.ui.FORMITEM.img),
				'SIZE']
			});
			return this.form;
		},
		setHeight : function(value){
			this.logger(this);
			this.activeElement.style.height=value + 'px';
		},
		getHeight : function(){
			this.logger(this);
			return this.activeElement.offsetHeight;
		},
		setSrc : function(value){
			this.logger(this);
			var $img=$('img:first',this.activeElement);
			if(value==''){
				value='/s.gif';
			}
			$img.attr('src',value);
		},
		getImgElement : function(){
			return $('img:first',this.activeElement)[0];
		}
	});

})(CF,jQuery);