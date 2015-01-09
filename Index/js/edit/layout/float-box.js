(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsLayout',
		_name_ : 'float-box',
		title : '浮动层',
		isBorder:true,
		isPadding:true,
		getPropertyForm : function (box){
			this.logger(this);
			this.form=this.app.CreatePropertyForm({
				$owner : this,
				id : this.__PROPERTY_PANEL_ID__,
				render : box,			
				items : [{
					label:'高度',
					name : 'height',
					unit:'px',
					maxlength : 4,
					minValue : 100,
					maxValue : 1900,
					vtype : ['spin','required'],
					xtype:'text',
					getDesc : '设置浮动层高度'
				},
				CF.merger({
					placeholder :'填写背景图片地址',
					getDesc : '修改浮动层的背景图片'
				},this.app.ui.FORMITEM.img),
				'SIZE']
			});
			return this.form;
		},
		setHeight : function(value){
			this.logger(this);
			this.activeElement.style.height=value + 'px';
			/*
			var offsetHeight=this.activeElement.offsetHeight;
			this.activeElement.style.height=value + 'px';
			
			offsetHeight=this.activeElement.offsetHeight - offsetHeight;

			var list=this.getChildren(this.activeElement);

			$.it(list,function(i,item){
				var $target=$(item.target);
				$target.css({
					'margin-top': ($target.getMarginTop() + (- offsetHeight)) + 'px'
				});
			},this);
			*/
		},
		getHeight : function(){
			this.logger(this);
			return this.activeElement.offsetHeight;
		},
		getImgsizing : function(){
			this.logger(this);
			var element=this.activeElement,
				$img=$('.float-box-bg:first img',element),
				img;
			if($img.length==0){
				this.form.$sizeField.html('无图');
				return;
			}
			img=$img[0];
			this.form.$sizeField.html('&nbsp;'+img.clientWidth+'&nbsp;x&nbsp;'+img.clientHeight);
		},
		setSrc : function(value){
			this.logger(this);
			var $bg=$('.float-box-bg:first',this.activeElement);
			if(value==''){
				$bg.empty();
				$.removeClass(this.activeElement,'img-b');
			}else{
				var $img=$bg.children('img');
				if($img.length==0){
					$bg.html('<img src="'+value+'" />');
					$.addClass(this.activeElement,'img-b');
				}else{
					$img.attr('src',value);
				}
			}
		},
		getImgElement : function(){
			return $('.float-box-bg:first img',this.activeElement)[0];
		}
	});

})(CF,jQuery);