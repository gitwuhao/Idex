(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsSubLayout',
		_name_ : 'image-item',
		title : '图片',
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
						minValue : 10,
						maxValue : 1500,
						vtype : ['spin'],
						xtype:'text',
						getDesc : '修改高度'
					},
					CF.merger({
						placeholder :'填写图片地址',
						getDesc : '修改图片地址'
					},this.app.ui.FORMITEM.img),
					'SIZE',
					{
						label:'边距',
						cls:'s3',
						xtype:'radio',
						name: 'mstyle',
						items:[{
							label : '无',
							value : '1'
						},{
							label : '有',
							value : '2'
						}],
						getDesc : '修改图片边距'
					}
				]
			});
			return this.form;
		},
		setHeight : function(value){
			this.logger(this);
			var element=this.activeElement,
				style=element.style;
			if(value){
				style.height=value+'px';
			}else{
				style.height='';
			}
		},
		getHeight : function(){
			this.logger(this);
			return this.activeElement.offsetHeight;
		},
		setMstyle : function(value){
			this.logger(this);
			var activeElement=this.activeElement;
			$.removeClass(activeElement,'mb5');
			if(value=='2'){
				$.addClass(activeElement,'mb5');
			}
		},
		getMstyle : function(){
			this.logger(this);
			var value=1,
				activeElement=this.activeElement;
			if($.hasClass(activeElement,'mb5')){
				value=2;
			}else{
				value=1;
			}
			return value;
		},
		setSrc : function(value){
			var img=this.getImgElement();
			if(img){
				this.activeElement.style.height='';
				if(value){
					var __img__=document.createElement('img');
					$(__img__).one('load',{
						activeElement : this.activeElement
					},function(event){
						var activeElement=event.data.activeElement;
						activeElement.style.height=activeElement.offsetHeight+'px';
					});
					__img__.src=value;
				}else{
					value='/s.gif';
				}
				$.attr(img,'src',value);
			}
		}
	});

})(CF,jQuery);