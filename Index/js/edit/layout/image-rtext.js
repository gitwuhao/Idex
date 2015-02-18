(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsFixedLayout',
		_name_ : 'image-rtext',
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
		},
		setType : function(value){
			var html,
				$elem,
				div,
				href,
				id,
				activeElement=this.activeElement;
			if(value=='1'){
				html='<div class="image-rlink img-b img-p"><img src="/s.gif"/></div>';
			}else{
				html='<div class="image-rtext"></div>';
			}
			
			$elem=$(activeElement);
			id=activeElement.id;
			href=$elem.attr(this.KEY_MAP.ATTR.HREF);
			
			div=$.createElement(html);
			$.attr(div,this.KEY_MAP.ATTR.HREF,href);
			$.attr(div,'id',activeElement.id);

			$elem.replaceWith(div);
			this.app.LayoutPanel.updateNavItem(this.app.layout.getItem(div).layout);
			this.activeElement=div;
		},
		getType : function(){
			var value='1',
				target=this.activeElement;
			if($.hasClass(target,'image-rtext')){
				value='2';
			}
			return value;
		}
	});

})(CF,jQuery);