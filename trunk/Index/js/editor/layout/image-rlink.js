(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsFixedLayout',
		_name_ : 'image-rlink',
		title : '图片链接',
		isBorder:true,
		isPadding:true,
		onMousedown:function(event,target){
			this.logger(this);
			var row=this.getParentElement(target);
			this.app.dragdrop.sort({
				instance : this,
				target : target,
				event : event,
				parentBox : this.getParentElement(row),
				isLockBody : true,
				onSortBoxMove : function(event){
					var item=this.app.layout.findParent(event.target);
					if(item && item.layout==this.instance){
						if(this.target==item.target && this.$replaceElement){
							this.$replaceElement.removeClass('replace');
							delete this.$replaceElement;
							delete this.replaceElement;
							return;
						}
						return item.target;
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
		onDeActiveLayout : function(){
			this.app.layout.resizeLayout;
		},
		getPropertyForm : function (box){
			this.logger(this);
			this.form=this.app.CreatePropertyForm({
				$owner : this,
				id : this.__PROPERTY_PANEL_ID__,
				render : box,			
				items : [{
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
				'SIZE']
			});
			return this.form;
		},
		setLink : function(value){
			$.attr(this.activeElement,'_l_',value);
		},
		getLink : function(){
			return $.attr(this.activeElement,'_l_');
		},
		setSrc : function(value){
			var img=this.activeElement.firstElementChild;
			img.src=value;
		},
		getSrc : function(){
			var img=this.activeElement.firstElementChild;
			return img.src;
		}
	});

})(CF,jQuery);