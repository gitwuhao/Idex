(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsFixedLayout',
		_name_ : 'image-rlink',
		title : '图片链接',
		initModule : function(){
			this.logger(this);

			var textItem=this.app.layout.getLayout('text-item');
			textItem.extendReplaceLayout(this);

		},
		onMousedown : function(event,target){
			this.logger(this);

			var parentBox,
				row=this.getParentElement(target),
				LAYOUT=this.app.layout;

			parentBox = this.getParentElement(row);
			
			this.app.dragdrop.sort({
				instance : this,
				LAYOUT : LAYOUT,
				target : target,
				event : event,
				parentLayout : LAYOUT.findParent(target.parentElement).layout,
				parentBox : parentBox,
				isLockBody : true,
				onSortBoxMove : function(event){
					var item=this.LAYOUT.findParent(event.target);
					if(item && item.target){
						var parentItem=this.LAYOUT.findParent(item.target.parentElement);
						if(parentItem && parentItem.layout==this.parentLayout){
							if(this.target==item.target && this.$replaceElement){
								this.$replaceElement.removeClass('replace');
								delete this.$replaceElement;
								delete this.replaceElement;
								return;
							}
							return item.target;
						}
					}
				},
				onSort : function(element){
					if(this.$replaceElement){
						this.$replaceElement.removeClass('replace');
					}
					this.replaceElement=element;
					this.$replaceElement=$(this.replaceElement);
					this.$replaceElement.addClass('replace');
				},
				onSortover : function(){
					if(!this.replaceElement || !this.$replaceElement){
						return;
					}
					var replaceElement=this.replaceElement,
						targetElement=this.target;

					this.$replaceElement.removeClass('replace');

					this.instance.setID(replaceElement);
					this.instance.setID(targetElement);
				
					this.app.LayoutPanel.replaceLayout(replaceElement,targetElement);

				},
				onReplace : CF.emptyFunction
			});
		},
		getPropertyForm : function (box){
			this.logger(this);
			var me =this;
			this.form=this.app.CreatePropertyForm({
				$owner : this,
				id : this.__PROPERTY_PANEL_ID__,
				render : box,			
				items : [{
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
				html='<div class="image-rlink img-b img-p"><img src="/s.gif"/></div>';
			}else{
				html='<div class="image-rtext"></div>';
			}
			this.replaceLayoutItem(html);
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