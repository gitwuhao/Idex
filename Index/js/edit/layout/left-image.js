(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsSubLayout',
		_name_ : 'left-image',
		title : '图片链接',
		getPropertyForm : function (box){
			this.logger(this);
			var me=this;
			this.form=this.app.CreatePropertyForm({
				$owner : this,
				id : this.__PROPERTY_PANEL_ID__,
				render : box,			
				items : [{
					label:'高度',
					name : 'height',
					unit:'px',
					maxlength : 3,
					minValue : 50,
					vtype : ['spin','required'],
					xtype:'text',
					getDesc : '修改图片高度'
				},
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
				}]
			});
			return this.form;
		},
		setHeight : function(value){
			this.logger(this);
			$.style(this.activeElement,'height',value + 'px');
			this.getImgsizing();
		},
		getHeight : function(){
			this.logger(this);
			return this.activeElement.offsetHeight;
		},
		onSetSrc : function(){
			if(!$.style(this.activeElement,'height')){
				$.setTimeout(function(){
					$.style(this,'height',this.offsetHeight);
				},100,this.activeElement);
			}
		}
	});

})(CF,jQuery);