(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsSubLayout',
		_name_ : 'image-clink',
		title : '图片链接',
		isBorder:true,
		isPadding:true,
		initModule : function(){
			this.logger(this);
		},
		onMousedown:function(event,target){
			this.logger(this);
			var col=this.getParentElement(target);

			this.parentBox=this.getParentElement(col);
			
			this.updateParentBox();
			
			//$.setTimeout(function(){
			//$.removeClass(this.activeElement,'idex-r-active');
			//},100,this);

			this.app.dd.sort({
				instance : this,
				isAutoWidth : true,
				render : this.app.ViewPanel.$popuBox[0],
				target : target,
				event : event,
				type : {
					resize : true
				},
				parentBox : this.parentBox,
				isLockBody : true,
				onSortBoxMove : function(event){
					var item=this.app.layout.findParent(event.target),
						element,
						layout;
					if(item){
						element=item.target;
						layout=item.layout;
						if(layout==this.instance){
							return element;
						}else if(layout._name_ == "image-col"){
							var isAppend=false;
							if(!element.lastElementChild){
								isAppend=true;
							}else{
								var lastElement=element.lastElementChild,
									offset,
									$lastElement;
								$lastElement=$(lastElement);
								offset=$lastElement.offset();
								if(offset.top + $lastElement.height() < event.pageY){
									isAppend=true;
								}
							}
							if(isAppend){
								this.moveLayout(element,this.target,'append');
							}
						}
					}
				},
				onSort : function(element){
					var $element=$(element),
						offset=$(element).offset(),
						event=this.event,
						target=this.target,
						type=null,
						parentElement=null,
						prev = $element.prev(),
						next = $element.next();
					if(offset.top + ($element.height()/2) < event.pageY){
						if(next[0]!=target){
							type='after';
						}
					}else if(prev[0]!=target){
						type='before';
					}
					
					//ui.dragdrop.scrollTop(this.app.ViewPanel.viewPanel,element);
					if(type){
						//$element[type](target);
						this.moveLayout(element,target,type);
					}
				},
				onResize : function(x,y,w,h){
					var $target=this.$target;
					if(this.event){
						if(y!=0){
							var newHeight=this.instance.getHeight() + y;
							this.instance.changeFormItemValue('height',newHeight);
							this.instance.setFormItemValue('height',newHeight);
							this.instance.updateParentBox();
						}
					}
				},
				moveLayout : function(targetElement,srcElement,type){
					this.instance.setID(targetElement);
					this.instance.setID(srcElement);
					if(type=='replace'){
						this.app.LayoutPanel.replaceLayout(targetElement,srcElement);
					}else{
						this.app.LayoutPanel.moveLayout(targetElement,srcElement,type);
					}

					//this.instance.updateParentBox();

					var lastCommand=this.app.HistoryPanel.getLastCommand();
					
					if(lastCommand.parentBox!=this.parentBox){
						lastCommand.parentBox=this.parentBox;
						lastCommand.layoutInstance=this.instance;
						lastCommand.undoAfter=lastCommand.redoAfter= function(){
							//this.layoutInstance.updateParentBox();
						};
					}
				}
			});
		},
		onClick : function(){
			this.updateParentBox();
		},
		updateParentBox:function(){
			if(this.parentBox){		
				this.parentBox.style.height="";
				this.parentBox.style.height=this.parentBox.scrollHeight+'px';
				delete this._SET_HEIGHT_TIMEOUT_ID_;
			}
		},
		onDeActiveLayout : function(activeLayout,deActiveLayout){
			this.logger(this);
			this.callPrototypeMethod();
			this.updateParentBox();
		},
		getPropertyForm : function (box){
			this.logger(this);
			var me=this;
			this.form=this.app.CreatePropertyForm({
				$owner : this,
				id : this.__PROPERTY_PANEL_ID__,
				render : box,			
				items : [{
					label:'高度',
					name : 'height',
					unit:'px',
					maxlength : 3,
					minValue : 50,
					vtype : ['spin','required'],
					xtype:'text',
					getDesc : '修改图片高度'
				},
				CF.merger({
					placeholder :'填写链接地址',
					getDesc : '修改链接地址'
				},this.app.ui.FORMITEM.link),
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
				}]
			});
			return this.form;
		},
		/*
		onNew : function(element){
			this.logger(this);
			if(!this.form){
				this.getPropertyForm();
			}
			element.style.height='50px';
			var activeElement=this.activeElement;
			this.activeElement=element;
			this.activeElement=activeElement;
		},
		*/
		setHeight : function(value){
			this.logger(this);
			this.activeElement.style.height=value + 'px';
			this.getImgsizing();
			this.updateParentBox();
		},
		getHeight : function(){
			this.logger(this);
			return this.activeElement.offsetHeight;
		}
	});

})(CF,jQuery);