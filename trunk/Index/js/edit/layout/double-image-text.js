(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsLayout',
		_name_ : 'double-image-text',
		title : '双图文',
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
					vtype : ['spin','required'],
					xtype:'text',
					getDesc : '设置图文高度'
				}]
			});
			return this.form;
		},
		setHeight : function(value){
			this.logger(this);
			if(value){
				this.activeElement.style.height=value + 'px';
			}else{
				this.activeElement.style.height='';		
			}
		},
		getHeight : function(){
			this.logger(this);
			return this.activeElement.offsetHeight;
		}
	});

})(CF,jQuery);