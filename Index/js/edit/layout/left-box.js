(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsLayout',
		_name_ : 'left-box',
		title : '侧边栏',
		getPropertyForm : function (box){
			this.logger(this);
			this.form=this.app.CreatePropertyForm({
				$owner : this,
				id : this.__PROPERTY_PANEL_ID__,
				render : box,			
				items : [{
					label:'宽度',
					name : 'width',
					unit:'px',
					value : 190,
					maxlength : 4,
					minValue : 150,
					maxValue : 900,
					vtype : ['spin','required'],
					xtype:'text',
					getDesc : '设置侧边栏宽度'
				}]
			});
			return this.form;
		},
		setWidth : function(value){
			this.logger(this);
			$.style(this.activeElement.firstChild,'width',value + 'px');
		},
		getWidth : function(){
			this.logger(this);
			return this.activeElement.firstChild.offsetWidth;
		},
		append : function(target,html){
			this.logger(this);
			var element=$(target).children('.left-col:first').append(html);
			return element.children(':first');
		}
	});

})(CF,jQuery);