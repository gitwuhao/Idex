(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsFixedLayout',
		_name_ : 'image-rtext',
		title : '文本',
		initModule : function(){
			this.logger(this);
			var array,
				textItem=this.app.layout.getLayout('text-item'),
				imageRLink=this.app.layout.getLayout('image-rlink');

			array=this.getBaseFormItemConfig();
			
			this.formItemConfig=textItem.getFormItemConfig;
			
			array.push.apply(array,this.formItemConfig());

			this.formItemConfig=array;

			textItem.extend(this);

			this.setType=imageRLink.setType;
			
			this.getType=imageRLink.getType;

			
			this.onMousedown=imageRLink.onMousedown;
			
		},
		getBaseFormItemConfig : function(){
			var me =this;
			return [{
					label:'类型',
					xtype:'radio',
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