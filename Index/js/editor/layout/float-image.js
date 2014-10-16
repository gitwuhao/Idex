(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsFloatLayout',
		_name_ : 'float-image',
		title : '图片',
		isBorder:true,
		isPadding:true,
		getPropertyForm : function (box){
			this.logger(this);
			var me=this;
			var items=this.getBasePropertyForm();
			items.push({
				xtype:'text',
				label:'链接',
				vtype:['autoselect'],
				placeholder :'填写链接地址',
				name: 'link',
				getDesc : '修改链接地址'
			},
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
			}
/*			,{
				label:' ',
				width: 'auto',
				xtype:'checkitem',
				name : 'imgBorder',
				value : true,
				text : '边框',
				getDesc : function(value){
					if(this.value){
						return '设置图片边框';
					}else{
						return '取消图片边框';
					}
				}
			},{
				width: 'auto',
				xtype:'checkitem',
				cls: 'idex-ui-boolean-item',
				name : 'imgPadding',
				value : true,
				text : '填充',
				getDesc : function(value){
					if(this.value){
						return '设置图片填充';
					}else{
						return '取消图片填充';
					}
				}
			}
*/			);

			this.form=this.app.CreatePropertyForm({
				$owner : this,
				id : this.__PROPERTY_PANEL_ID__,
				render : box,
				items : items
			});
			return this.form;
		},
		setLink : function(value){
			$.attr(this.activeElement,'_l_',value);
		},
		getLink : function(){
			return $.attr(this.activeElement,'_l_');
		},
		setHeight :function(value){
			this.callPrototypeMethod();
			this.getImgsizing();
		},
		setSrc : function(value){
			var img=this.activeElement.firstElementChild;
			img.src=value;
		},
		getSrc : function(){
			var img=this.activeElement.firstElementChild;
			return img.src;
		},
		onAutoSize : function(){
			var activeElement,
				height,
				width,
				img=$('img',this.activeElement);
			if(img.length==0){
				return;
			}else{
				img=img[0];
			}

			if(img.naturalHeight == 1 && img.naturalWidth == img.naturalHeight){
				return;
			}
			activeElement=this.activeElement;
			height=img.naturalHeight + (activeElement.offsetHeight - img.offsetHeight);
			width=img.naturalWidth + (activeElement.offsetWidth - img.offsetWidth);
			
			this.setSizing(width - this.getWidth(),height - this.getHeight());
		}
	});

})(CF,jQuery);