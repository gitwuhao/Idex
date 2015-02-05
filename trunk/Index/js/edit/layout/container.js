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
			var me=this;
			this.form=this.app.CreatePropertyForm({
				$owner : this,
				id : this.__PROPERTY_PANEL_ID__,
				render : box,			
				items : [{
					xtype:'text',
					label:'标题',
					name: 'title',
					width : '165px',
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
				},{
					label:'风格',
					xtype:'radio',
					name: 'style',
					cls : 'breakline',
					items:[{
						label : '1',
						value : '1'
					},{
						label : '2',
						value : '2'
					},{
						label : '3',
						value : '3'
					},{
						label : '4',
						value : '4'
					},{
						label : '5',
						value : '5'
					},{
						label : '图片标题',
						value : '6'
					}],
					getDesc : '修改标题风格',
					onClick : function(item){
						if(item.value=='6' && item.value!=this.value){
							me.setImageTitle(true);
						}else{
							me.setImageTitle(false);
						}
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
			//this.setImageTitle(false);
			return this.form;
		},
		index : 1,
		getImgsizing : function(){
			this.logger(this);
			this._getImgsizing($('.image-title:first img',this.activeElement));
		},
		setImageTitle : function(isShow){
			this.logger(this);
			var src=this.form.getItem('src'),
				imgsizing=this.form.getItem('imgsizing');
			if(isShow){	
				src.$elem.show();
				imgsizing.$elem.show();
			}else{
				src.$elem.hide();
				imgsizing.$elem.hide();
			}	
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
				if($item.hasClass('image-title')){
					this.app.trigger('loadImage',null);
				}
			}
		},
		getDisplay:function(){
			this.logger(this);
			var $item=$(this.activeElement).children('.text-title:first,.image-title:first');
			if(!$item.hasClass('hide')){
				return ['1'];
			}
		},
		setStyle : function(value){
		
		},
		getStyle : function(){
			this.logger(this);
			var value,
				$item=$(this.activeElement).children('.text-title:first');
			if($item.hasClass('s1')){
				value= '1';
			}else if($item.hasClass('s1')){
				return '1';
			}
		},
		setSrc:function(value){
			this.logger(this);
			var $elem=$(this.activeElement),
				oldValue=value;
			value=$.trim(value);
			if(value){
				var $img,
					$imageTitle=$elem.children('.image-title:first');
				if($imageTitle.length==0){
					$elem.children('.text-title:first').remove();
					$elem.children('.layout-box:first').before('<div class="image-title"><img src="'+value+'" /></div>');
				}else{
					$imageTitle.children('img').attr('src',value);
					$imageTitle.removeClass('hide');
					this.app.trigger('loadImage',null);
				}
			}else if($elem.children('.text-title:first').length==0){
				$elem.children('.image-title:first').remove();
				$elem.children('.layout-box:first').before('<div class="text-title">'+this.getTitle()+'</div>');
			}
			if(oldValue!=value){
				this.form.setItemValue('src',value);
			}
		},
		getImgElement : function(){
			return $('.image-title:first img',this.activeElement)[0];
		}
	});

})(CF,jQuery);