(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsFixedLayout',
		_name_ : 'image-ftext',
		title : '文本',
		initModule : function(){
			this.logger(this);
			var array,
				textItem=this.app.layout.getLayout('text-item'),
				imageFLink=this.app.layout.getLayout('image-flink');

			array=this.getBaseFormItemConfig();
			
			this.formItemConfig=textItem.getFormItemConfig;
			
			array.push.apply(array,this.formItemConfig());

			this.formItemConfig=array;

			textItem.extend(this);

			this.setType=imageFLink.setType;
			
			this.getType=imageFLink.getType;

		},
		getBaseFormItemConfig : function(){
			var me =this;
			return [{
					label:'类型',
					xtype:'radio',
					cls:'s3',
					name: 'type',
					items:[{
						label : '图片',
						value : '1'
					},{
						label : '文本',
						value : '2'
					}],
					onClick : function(item){
						me.setType(item.value);
					},
					onChange : CF.emptyFunction,
					getDesc : '修改链接类型'
				},
				CF.merger({
					placeholder :'填写链接地址',
					getDesc : '修改链接地址'
				},this.app.ui.FORMITEM.link)];
		},
		getFormItemConfig : function(){
			return this.formItemConfig;
		}
	});

})(CF,jQuery);