(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsLayout',
		_name_ : 'image-rtable',
		title : '图片列表',
		initModule : function(){
			this.logger(this);
		},
		onClick:function(event,target){
			this.logger(this);
		},
		onMousedown:function(event,target){
			this.logger(this);
		},
		onMouseup:function(event,target){
			this.logger(this);
		},
		getPropertyForm : function (box){
			this.logger(this);
			this.form=this.app.CreatePropertyForm({
				$owner : this,
				id : this.__PROPERTY_PANEL_ID__,
				render : box,			
				items : [{
					label:'列高',
					name : 'height',
					unit:'px',
					maxlength : 3,
					minValue : 100,
					maxValue : 500,
					vtype : ['spin','required'],
					xtype:'text',
					getDesc : '修改高度'
				},{
					label:'列数',
					xtype:'radio',
					name: 'col',
					items:[{
						label : '3列',
						value : '3'
					},{
						label : '4列',
						value : '4'
					}],
					getDesc : '修改列数'
				}]
			});
			return this.form;
		},
		setHeight : function(value){
			this.logger(this);
			var list=this.getChildren(this.activeElement);
			$.it(list,function(index,item){
				item.target.style.height=value+'px';
			},this);
		},
		getHeight : function(){
			this.logger(this);
			var list=this.getChildren(this.activeElement),
				item=list[0];
			return item.target.offsetHeight;
		},
		setCol : function(value){
			this.logger(this);
			var $activeElement=$(this.activeElement),
				rows=$activeElement.children(),
				me=this;
			$activeElement.removeClass('col3 col4');
			if(value=='3'){
				$activeElement.addClass('col3');
				$.it(rows,function(rIndex,row){
					$.it($(row).children(':gt(2)'),function(index,element){
						$(element).remove();
					});
				});
			}else if(value=='4'){
				$activeElement.addClass('col4');
				$.it(rows,function(rIndex,row){
					$.it($(row).children(':eq(2)'),function(index,element){
						$(element).after(me.getHTML(element));
					});
				});
			}
			this.app.LayoutPanel.removeChildrenNavList(this.activeElement);
			this.activeElement.click();
		},
		getCol : function(){
			this.logger(this);
			var value=0;
			if($.hasClass(this.activeElement,'col3')){
				value=3;
			}else if($.hasClass(this.activeElement,'col4')){
				value=4;
			}
			return value;
		}
	});

})(CF,jQuery);