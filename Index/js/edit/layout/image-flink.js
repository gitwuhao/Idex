(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsFixedLayout',
		_name_ : 'image-flink',
		title : '图片链接',
		initModule : function(){
			this.logger(this);

			var textItem=this.app.layout.getLayout('text-item');

			textItem.extendReplaceLayout(this);

		},
		getPropertyForm : function (box){
			this.logger(this);
			this.form=this.app.CreatePropertyForm({
				$owner : this,
				id : this.__PROPERTY_PANEL_ID__,
				render : box,			
				items : [{
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
					getDesc : '修改链接类型'
				},
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
		setType : function(value){
			if(this.getType()==value){
				return;
			}
			if(value=='1'){
				html='<div class="image-flink img-b img-p"><img src="/s.gif"/></div>';
			}else{
				html='<div class="image-ftext"></div>';
			}
			this.replaceLayoutItem(html);
		},
		getType : function(){
			var value='1',
				target=this.activeElement;
			if($.hasClass(target,'image-ftext')){
				value='2';
			}
			return value;
		}
	});

})(CF,jQuery);