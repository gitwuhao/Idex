(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsSubLayout',
		_name_ : 'image-ctext',
		title : '文本',
		initModule : function(){
			this.logger(this);
			var array,
				textItem=this.app.layout.getLayout('text-item');

			array=this.getBaseFormItemConfig();
			
			array.push.apply(array,textItem.getFormItemConfig());

			this.formItemConfig=array;

			textItem.extend(this);
		},
		getBaseFormItemConfig : function(){
			return [CF.merger({
					placeholder :'填写链接地址',
					getDesc : '修改链接地址'
				},this.app.ui.FORMITEM.link)];
		},
		getFormItemConfig : function(){
			return this.formItemConfig;
		},
		setType : function(value){
		
		},
		getType : function(){
		
		}
	});

})(CF,jQuery);