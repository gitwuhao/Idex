(function(CF,$){

	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsContainer',
		_name_ : 'container',
		title : '布局容器',
		append : function(target,html){
			this.logger(this);
			var element=$(target).children('.layout-box:first').append(html);
			return element.children(':first');
		},
		getParentElement:function(element){
			this.logger(this);
			return element.parentNode;
		},
		getPropertyForm : function (box){
			this.logger(this);
			this.form=this.app.CreatePropertyForm({
				$owner : this,
				id : this.__PROPERTY_PANEL_ID__,
				render : box,			
				items : [{
					xtype:'text',
					label:'标题',
					name: 'title',
					width : '160px',
					maxlength : 8 ,
					getDesc : '设置标题名'
				},'',{
					xtype:'checkbox',
					name : 'display',
					items:[{
						label:'显示',
						value : '1',
						checked : true
					}],
					width : '50px',
					getDesc : function(value){
						if(this.getItem('display').checked){
							return '设置标题可见';
						}
						return '设置标题不可见';
					}
				},
				CF.merger({
					placeholder :'填写图片地址',
					getDesc : function(value){
						if(value==''){
							return '修改为文本标题';
						}
						return '修改图片标题';
					}
				},this.app.ui.FORMITEM.img),
				'SIZE']
			});
			return this.form;
		},
		index : 1,
		getImgsizing : function(){
			this.logger(this);
			this._getImgsizing($('.image-title:first img',this.activeElement));
		},
		setTitle:function(value){
			this.logger(this);
			var oldValue=value;
			if(value){
				value=value.toCWordChar();
			}else{
				value='标题' +(this.index++);
			}
			if(value.length>8){
				value=value.substring(0,8);
			}
			if(oldValue!=value){
				this.form.setItemValue('title',value);
			}
			var $elem=$(this.activeElement);
			$elem.attr(this.attrKey.title,value);
			$elem.children('.text-title').text(value);
			var navItem=this.app.LayoutPanel.getNavItemByLayout(this.activeElement);
			this.app.LayoutPanel.setNavItemTitle(navItem,value);
		},
		getTitle:function(){
			this.logger(this);
			return $(this.activeElement).attr(this.attrKey.title);
		},
		setDisplay:function(value){
			this.logger(this);
			var $item=$(this.activeElement).children('.text-title:first,.image-title:first');
			if(value.length==0){
				$item.addClass('hide');
			}else{
				$item.removeClass('hide');
			}
		},
		getDisplay:function(){
			this.logger(this);
			var $item=$(this.activeElement).children('.text-title:first,.image-title:first');
			if(!$item.hasClass('hide')){
				return ['1'];
			}
		},
		setSrc:function(value){
			this.logger(this);
			var $elem=$(this.activeElement),
				oldValue=value;
			value=$.trim(value);
			if(value){
				var $img=$elem.children('.image-title:first').children('img');
				if($img.length==0){
					$elem.children('.text-title:first').remove();
					$elem.children('.layout-box:first').before('<div class="image-title"><img src="'+value+'" /></div>');
				}else{
					$img.attr('src',value);
				}
			}else if($elem.children('.text-title:first').length==0){
				$elem.children('.image-title:first').remove();
				$elem.children('.layout-box:first').before('<div class="text-title">'+this.getTitle()+'</div>');
			}
			if(oldValue!=value){
				this.form.setItemValue('src',value);
			}
		},
		getSrc:function(){
			this.logger(this);
			return $(this.activeElement).children('.image-title:first').children('img').attr('src');
		}
	});

})(CF,jQuery);