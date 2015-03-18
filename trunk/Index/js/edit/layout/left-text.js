(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsSubLayout',
		_name_ : 'left-text',
		title : '文本',
		initModule : function(){
			this.logger(this);
			this.app.bindReadyAfter(this);
		},
		onAppReadyAfter : function(){
			this.logger(this);
			var array,
				textItem=this.app.layout.getLayout('text-item');

			array=this.getBaseFormItemConfig();

			
			this.formItemConfig=textItem.getFormItemConfig;
			
			array.push.apply(array,this.formItemConfig());

			this.formItemConfig=array;

			textItem.extend(this);

		},
		getBaseFormItemConfig : function(){
			return [{
					label:'高度',
					name : 'height',
					unit:'px',
					maxlength : 3,
					minValue : 50,
					vtype : ['spin','required'],
					xtype:'text',
					getDesc : '修改图片高度'
				},CF.merger({
					placeholder :'填写链接地址',
					getDesc : '修改链接地址'
				},this.app.ui.FORMITEM.link)];
		},
		getFormItemConfig : function(){
			return this.formItemConfig;
		},
		setHeight : function(value){
			this.logger(this);
			$.style(this.activeElement,'height',value + 'px');
		},
		getHeight : function(){
			this.logger(this);
			return this.activeElement.offsetHeight;
		}
	});

})(CF,jQuery);