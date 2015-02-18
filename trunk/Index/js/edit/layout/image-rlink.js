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