(function(CF,$){
	var ide={},
		IDEX_ATTR_MAP=window.IDEX_ATTR_MAP,
		_LAYOUT_CLASS_MAP_={},
		_CONTAINER_PROTOTYPE_,
		_LAYOUT_TYPE_MAP_={
			'container':0,'text-item':1,'html-item':2,'float-box':3,'float-link':4,'float-image':5,'float-text':6,'float-html':7,'image-fgrid':8,'image-fglink':9,'image-rtable':10,'image-row':11,'image-rlink':12,'image-ctable':13,'image-col':14,'image-clink':15,'property-table':16,'property-itable':17,'user-table':18,'list-table':19,'image-list':20,'image-item':21
		};
	

	ide.container=function(config){
		this.eventmap={};
		CF.merger(this,config);
		CF.setOwner(this,this);
		this._owner_name_=this._type_+"."+this._name_;
		this.ready();
	};

	_CONTAINER_PROTOTYPE_=ide.container.prototype;
	CF.extendEventListener(_CONTAINER_PROTOTYPE_);

	var __INDEX_LEN___=6;
	var __INDEX__=parseInt('1'+(''+$.timestamp()).match(new RegExp('(\\d{'+(__INDEX_LEN___ - 1)+'}$)'))[0]);
	var __SUFFIX__='L'+$.randomChar(2);
	function getID(){
		return (__INDEX__++)+__SUFFIX__;
	};


	CF.defineClass(ide.container,{
		_type_:'ide.layout',
		_attr_px_ : 'idex-',
		_name_ : 'AbsContainer',
		ready : function(){},
		initModule : function(){
			this.logger(this);
		},
		eventDispatch : function(event,target,type){
			this.logger(this);
			this.setID(target);

			if(event.type=='mousedown' &&
				this.lastMouseDownEvent &&
				this.lastMouseDownEvent._target == target &&
				event.timeStamp - 300 < this.lastMouseDownEvent.timeStamp){
				event.type='dblclick';
			}

			if(event.type=='click' || event.type=='mousedown' || event.type=='mouserightdown'){
				this.setActive(event,target);
			}

			this.on(event.type,event,target);

			if(event.type=='mousedown' || event.type=='dblclick'){
				this.lastMouseDownEvent=event;
				this.lastMouseDownEvent._target = target;
			}

			this.app.PropertyPanel.setActive(this,target);
		},
		setActive : function(event,target){
			this.logger(this);
			if(this.activeElement!=target || event.isCommandTrigger){
				this.app.LayoutPanel.setActive(this,target);
			}
			if(event.type=='click' && event.isCommandTrigger){
				this.srcollToActiveElement();
			}
		},
		setID:function(target){
			if(!target.id && this.app.layout.isLayout(target)!=false){
				target.id = getID();
			}
		},
		onActiveElement : function(activeElement,deActiveElement){
			this.logger(this);
			$.addClass(activeElement,'idex-r-active');
			this.activeElement=activeElement;
		},
		onActiveElementAfter:function(activeElement,deActiveElement){
			this.logger(this);
			var len=this.getAll(activeElement).length;
			this.app.LayoutPanel.enabled('saveas');
			this.app.LayoutPanel.enabled('copy');
			this.app.LayoutPanel.enabled('new');
			if(len>1){
				this.app.LayoutPanel.enabled('del');
			}else{
				this.app.LayoutPanel.disabled('del');
			}
		},
		onDeActiveElement : function(activeElement,deActiveElement){
			this.logger(this);
			$.removeClass(deActiveElement,'idex-r-active');
			this.activeElement=null;
		},
		onActiveLayout : function(activeLayout,deActiveLayout){
			this.logger(this);
		},
		onDeActiveLayout : function(activeLayout,deActiveLayout){
			this.logger(this);
		},
		onHide:function(element){
			this.logger(this);
			$(element).addClass('hide');
		},
		onShow:function(element){
			this.logger(this);
			$(element).removeClass('hide');
		},
		queryPrevLayoutElement : function(){
			this.logger(this);
			this.prevLayout=this.getPrevElement(this.activeElement);
			return this.prevLayout;
		},
		queryNextLayoutElement : function(){
			this.logger(this);
			this.nextLayout=this.getNextElement(this.activeElement);
			return this.nextLayout;
		},
		srcollToActiveElement : function(){
			this.logger(this);
			if(!this._isSubLayoutItem_){
				this.app.ViewPanel.on('srcollTop',this.activeElement);
			}
		},
		onMovePrev : function(){
			this.logger(this);
			this.app.LayoutPanel.moveLayout(this.prevLayout,this.activeElement,'before');
		},
		onMoveNext : function(){
			this.logger(this);
			this.app.LayoutPanel.moveLayout(this.nextLayout,this.activeElement,'after');
		},
		getParentLayout:function(element){
			this.logger(this);
			var item=this.getParent(element);
			if(item){
				this.setID(item.target);
				return item.layout;
			}
		},
		getParentElement : function(element){
			this.logger(this);
			var item=this.getParent(element);
			if(item){
				this.setID(item.target);
				return item.target;
			}
		},
		getParent : function(element){
			this.logger(this);
			this.setID(element);
			var item=this.app.layout.findParent(element.parentElement);
			if(item && item.target){
				this.setID(item.target);
				return item;
			}
		},
		getAll : function(element){
			this.logger(this);
			this.setID(element);
			var list=this.app.layout.findChildren(this.getParentElement(element));
			for(var i=0,len=list.length;i<len;i++){
				this.setID(list[i].target);
			}
			return list;
		},
		getChildren : function(element){
			this.logger(this);
			this.setID(element);
			var list=this.app.layout.findChildren(element);
			for(var i=0,len=list.length;i<len;i++){
				this.setID(list[i].target);
			}
			return list;
		},
		getPrevElement : function(element){
			this.logger(this);
			this.setID(element);
			var item=this.app.layout.findPrevElement(element);
			if(item){
				this.setID(item.target);
				return item.target;
			}
		},
		getNextElement : function(element){
			this.logger(this);
			this.setID(element);
			var item=this.app.layout.findNextElement(element);
			if(item){
				this.setID(item.target);
				return item.target;
			}
		},
		getLayoutNode : function(element){
			this.logger(this);
			this.setID(element);
			var item=this.app.layout.findParent(element);
			if(item && item.target){
				this.setID(item.target);
				return item.target;
			}
		},
		append : function(target,html){
			this.logger(this);
			var element=$(target).append(html);
			var item=this.getChildren(target);
			if(item && item.length>0){
				return $(item[0].target);
			}
		},
		after : function(target,html){
			this.logger(this);
			var element=$(target).after(html);
			return element.next();
		},
		before : function(target,html){
			this.logger(this);
			var element=$(target).before(html);
			return element.prev();
		},
		getHTML : function(target){
			this.logger(this);
			return HTMLfilter.getOuterHTML(target,this.app.layout.__OUTPUT_RULES__);
		},
		getInnerHTML : function(target){
			this.logger(this);
			return HTMLfilter.getInnerHTML(target,this.app.layout.__OUTPUT_RULES__);
		},
		getPropertyForm : function (box){
			this.logger(this);
			this.form=this.app.CreatePropertyForm({
				$owner : this,
				id : this.__PROPERTY_PANEL_ID__,
				render : box,
				items : []
			});
			return this.form;
		},
		onPropertyFormShow : function (){
			this.logger(this);
			var inputItems=this.form.inputItems;
			$.it(inputItems,function(key,item){
				var value=this.getPropertyItemValue(item.name);
				if(value!=this.__NO_PROPERTY__){
					item.setValue(value);
				}			
			},this);
		},
		setFormItemValue : function(key,value){
			this.logger(this);
			var item=this.form.getItem(key);
			if(item && item.setValue){
				item.setValue(value);
			}
		},
		setPropertyItemValue:function(key,value){
			this.logger(this);
			var fnName='set'+key.toFirstUpperCase();
			if(this[fnName]){
				return this[fnName](value);
			}
			return false;
		},
		getPropertyItemValue:function(key){
			this.logger(this);
			var fnName='get'+key.toFirstUpperCase();
			var value=null;
			if(!this[fnName]){
				return this.__NO_PROPERTY__;
			}
			value=this[fnName]();
			if(value==undefined){
				return '';
			}
			return value;
		},
		__NO_PROPERTY__ : '__NO_PROPERTY__'
	});

	addLayout(ide.container);

	ide.layout=function(){
		this.callSuperMethod();
	};

	CF.extend(ide.layout,ide.container,{
		_name_ : 'AbsLayout',
		onActiveElementAfter:function(activeElement,deActiveElement){
			this.logger(this);
			this.app.LayoutPanel.enabled('saveas');
			this.app.LayoutPanel.enabled('copy');
			this.app.LayoutPanel.enabled('new');
			//var len=this.getAll(activeElement).length;
			//if(len>1){
			this.app.LayoutPanel.enabled('del');
			//}else{
			//	this.app.LayoutPanel.disabled('del');
			//}
		},
		queryPrevLayoutElement : function(){
			this.logger(this);
			this.prevLayoutElement=this.getPrevElement(this.activeElement);
			if(this.prevLayoutElement==null){
				var parentElement=this.getParentElement(this.activeElement);
				this.prevLayoutElement=this.getPrevElement(parentElement);
			}
			return this.prevLayoutElement;
		},
		queryNextLayoutElement : function(){
			this.logger(this);
			this.nextLayoutElement=this.getNextElement(this.activeElement);
			if(this.nextLayoutElement==null){
				var parentElement=this.getParentElement(this.activeElement);
				this.nextLayoutElement=this.getNextElement(parentElement);
			}
			return this.nextLayoutElement;
		},
		onMovePrev : function(){
			this.logger(this);
			var srcElement,
				targetElement=this.activeElement,
				type,
				LayoutPanel=this.app.LayoutPanel,
				_layout=this.app.layout.getItem(this.prevLayoutElement).layout;
			if(_layout.onMovePrev==this.onMovePrev){
				LayoutPanel.moveLayout(this.prevLayoutElement,targetElement,'before');
			}else{
				srcElement=$(this.prevLayoutElement).children('.layout-box:first')[0];
				LayoutPanel.moveLayout(srcElement,targetElement,'append');
			}
		},
		onMoveNext : function(){
			this.logger(this);
			var srcElement,
				targetElement=this.activeElement,
				type,
				LayoutPanel=this.app.LayoutPanel,
				_layout=this.app.layout.getItem(this.nextLayoutElement).layout;
			if(_layout.onMoveNext==this.onMoveNext){
				LayoutPanel.moveLayout(this.nextLayoutElement,targetElement,'after');
			}else{
				var array = _layout.getChildren(this.nextLayoutElement);
				if(array.length>0){
					srcElement=array[0].target;
					type='before';
				}else{
					srcElement=$(this.nextLayoutElement).children('.layout-box:first')[0];
					type='append';
				}
				LayoutPanel.moveLayout(srcElement,targetElement,type);
			}

		}
	});

	addLayout(ide.layout);

	ide.subLayoutContainer=function(){
		this.callSuperMethod();
	};

	CF.extend(ide.subLayoutContainer,ide.layout,{
		_name_ : 'AbsSubLayoutContainer',
		queryPrevLayoutElement : _CONTAINER_PROTOTYPE_.queryPrevLayoutElement,
		queryNextLayoutElement : _CONTAINER_PROTOTYPE_.queryNextLayoutElement,
		onMovePrev : _CONTAINER_PROTOTYPE_.onMovePrev,
		onMoveNext : _CONTAINER_PROTOTYPE_.onMoveNext
	});

	addLayout(ide.subLayoutContainer);

	ide.singleLayout=function(){
		this.callSuperMethod();
	};

	CF.extend(ide.singleLayout,ide.layout,{
		_name_ : 'AbsSingleLayout',
		getChildren : CF.emptyFunction
	});

	addLayout(ide.singleLayout);

	ide.subLayout=function(){
		this.callSuperMethod();
	};

	CF.extend(ide.subLayout,ide.singleLayout,{
		_name_ : 'AbsSubLayout',
		_isSubLayoutItem_ : true,
		onActiveElementAfter:function(activeElement,deActiveElement){
			this.logger(this);
			this.app.LayoutPanel.disabled('saveas');
			this.app.LayoutPanel.enabled('copy');
			this.app.LayoutPanel.enabled('new');
			//var len=this.getAll(activeElement).length;
			//if(len>1){
			this.app.LayoutPanel.enabled('del');
			//}else{
			//	this.app.LayoutPanel.disabled('del');
			//}
		},
		getChildren : CF.emptyFunction,
		queryPrevLayoutElement : _CONTAINER_PROTOTYPE_.queryPrevLayoutElement,
		queryNextLayoutElement : _CONTAINER_PROTOTYPE_.queryNextLayoutElement,
		onMovePrev : _CONTAINER_PROTOTYPE_.onMovePrev,
		onMoveNext : _CONTAINER_PROTOTYPE_.onMoveNext
	});

	addLayout(ide.subLayout);


	ide.fixedLayout=function(){
		this.callSuperMethod();
	};

	CF.extend(ide.fixedLayout,ide.subLayout,{
		_name_ : 'AbsFixedLayout',
		isFixedLayout : true,
		onHide : function (){
			this.logger(this);
			return false;
		},
		onShow : function (){
			this.logger(this);
			return false;
		},
		onActiveElementAfter:function(activeElement,deActiveElement){
			this.logger(this);
			this.app.LayoutPanel.disabled('saveas');
			this.app.LayoutPanel.disabled('copy');
			this.app.LayoutPanel.disabled('del');
			this.app.LayoutPanel.disabled('new');
		},
		queryPrevLayoutElement : CF.emptyFunction,
		queryNextLayoutElement : CF.emptyFunction
	});

	addLayout(ide.fixedLayout);


	ide.resizeLayout=function(){
		this.callSuperMethod();
	};

	CF.extend(ide.resizeLayout,ide.subLayout,{
		_name_ : 'AbsResizeLayout',
		onDeActiveLayout : function(activeLayout,deActiveLayout){
			this.logger(this);
			this.callSuperMethod();
			this.app.dragdrop.hide();
		}
	});

	addLayout(ide.resizeLayout);


	ide.floatLayout=function(){
		this.callSuperMethod();
	};

	CF.extend(ide.floatLayout,ide.resizeLayout,{
		_name_ : 'AbsFloatLayout',
		getBasePropertyForm : function (){
			this.logger(this);
			var me=this;
			return [{
					isPadding: true,
					cls : 'idex-ui-label',
					height: '24px',
					text : '对齐：'
				},'',{
					xtype:'button',
					cls : 'algin-button-group top',
					name : 'atop',
					onClick : function(){
						me.setOffset(0,ui.dragdrop.__M_TOP__);
					}
				},{
					xtype:'button',
					cls : 'algin-button-group middle',
					name : 'amiddle',
					onClick : function(){
						me.setOffset(0,ui.dragdrop.__M_MIDDLE__);
					}
				},{
					xtype:'button',
					cls : 'algin-button-group bottom',
					name : 'abottom',
					onClick : function(){
						me.setOffset(0,ui.dragdrop.__M_BOTTOM__);
					}
				},{
					xtype:'button',
					cls : 'algin-button-group left',
					name : 'aleft',
					onClick : function(){
						me.setOffset(ui.dragdrop.__M_LEFT__,0);
					}
				},{
					xtype:'button',
					cls : 'algin-button-group center',
					name : 'acenter',
					onClick : function(){
						me.setOffset(ui.dragdrop.__M_CENTER__,0);
					}
				},{
					xtype:'button',
					cls : 'algin-button-group right',
					name : 'aright',
					onClick : function(){
						me.setOffset(ui.dragdrop.__M_RIGHT__,0);
					}
				},{
					label:'X',
					name : 'left',
					unit:'px',
					maxlength : 3,
					placeholder :'左',
					vtype : ['spin'],
					xtype:'text',
					width:'115px',
					onChange : function(value){
						me.setOffset(this.value - me.getLeft(),0);
					},
					getDesc : '移动'
				},{
					label:'Y',
					name : 'top',
					unit:'px',
					cls : 'minifield',
					maxlength : 3,
					placeholder :'上',
					vtype : ['spin'],
					xtype:'text',
					width:'105px',
					onChange : function(value){
						me.setOffset(0,this.value - me.getTop());
					},
					getDesc : '移动'
				},{
					label:'宽',
					name : 'width',
					unit:'px',
					maxlength : 3,
					vtype : ['spin'],
					xtype:'text',
					width:'115px',
					minValue : 50,
					onChange : function(value){
						me.setSizing(this.value - me.getWidth(),0);
					}
				},{
					label:'高',
					name : 'height',
					unit:'px',
					cls : 'minifield',
					maxlength : 3,
					minValue : 50,
					vtype : ['spin'],
					xtype:'text',
					width:'105px',
					onChange : function(value){
						me.setSizing(0,this.value - me.getHeight());
					}
				}];
		},
		onMousedown:function(event,target){
			this.logger(this);
			this.app.dd.resize({
				render : this.app.ViewPanel.$popuBox[0],
				instance : this,
				target : target,
				event : event,
				type : {
					drag : true
				},
				margin : {
					top : 0,
					right : 0,
					bottom : 0,
					left : 0
				},
				onDblClick : this.onDblclick ? function(event){
						return this.instance.onDblclick(event);
				} : null,
				parentBox : target.parentElement,
				setPoint : function(point){
					this.createStartPoint();
					var $target=this.$target;
					$target.css({
						'margin-left': ($target.getMarginLeft() + point.x) + 'px',
						'margin-top': ($target.getMarginTop() + point.y) + 'px'
					});
					if(this.event){
						if(point.x!=0){
							this.instance.setFormItemValue('left',this.instance.getLeft());
						}
						if(point.y!=0){
							this.instance.setFormItemValue('top',this.instance.getTop());
						}

					}
					this.savePoint();
				},
				setRegion : function(region){
					this.createStartPoint();
					var $target=this.$target;
					$target.css({
						'margin-left': ($target.getMarginLeft() + region.x) + 'px',
						'margin-top': ($target.getMarginTop() + region.y) + 'px',
						'width': (this.instance.getWidth() + region.w) + 'px',
						'height': (this.instance.getHeight() + region.h) + 'px'
					});
					if(this.event){
						if(region.x!=0){
							this.instance.setFormItemValue('left',this.instance.getLeft());
						}
						if(region.y!=0){
							this.instance.setFormItemValue('top',this.instance.getTop());
						}
						if(region.w!=0){
							this.instance.setFormItemValue('width',this.instance.getWidth());
						}
						if(region.h!=0){
							this.instance.setFormItemValue('height',this.instance.getHeight());
						}
					}
					this.savePoint();
				},
				createStartPoint : function(){
					if(!this.undoCommand){
						var $target=this.$target;
						this.undoCommand={
							'margin-left': $target.getMarginLeft() + 'px',
							'margin-top': $target.getMarginTop() + 'px',
							'width': this.instance.getWidth() + 'px',
							'height': this.instance.getHeight() + 'px'
						};
					}
				},
				savePoint:function(){
					var $target=this.$target;
					var command={
						undoValue : this.undoCommand,
						redoValue : {
							'margin-left': $target.getMarginLeft() + 'px',
							'margin-top': $target.getMarginTop() + 'px',
							'width': this.instance.getWidth() + 'px',
							'height': this.instance.getHeight() + 'px'
						},
						title : '调整浮动层',
						elementID : this.target.id
					};
					var lastCommand=this.app.HistoryPanel.getLastCommand();
					if(lastCommand.title==command.title && lastCommand.elementID==command.elementID){
						lastCommand.redoValue=command.redoValue;
					}else{
						CF.merger(command,{
							undo : function(){
								$('#'+this.elementID).css(this.undoValue);
							},
							redo : function(){
								$('#'+this.elementID).css(this.redoValue);
							}
						});
						this.app.HistoryPanel.addUndo(command);
					}
				}
			});
		},
		setSizing:function(w,h){
			this.logger(this);
			$.removeClass(this.activeElement,'idex-r-active');
			this.on('mousedown',null,this.activeElement);
			ui.dragdrop.resize.hide();
			ui.dragdrop.setSizing(w,h);
			if(w!=0){
				this.setFormItemValue('width',this.getWidth());
			}
			if(h!=0){
				this.setFormItemValue('height',this.getHeight());
			}
		},
		setOffset:function(x,y){
			this.logger(this);
			$.removeClass(this.activeElement,'idex-r-active');
			this.on('mousedown',null,this.activeElement);
			ui.dragdrop.resize.hide();
			ui.dragdrop.setOffset(x,y);
			if(x!=0){
				this.setFormItemValue('left',this.getLeft());
			}
			if(y!=0){
				this.setFormItemValue('top',this.getTop());
			}
		},
		onNew : function(element){
			this.logger(this);
			if(!this.form){
				this.getPropertyForm();
			}
			element.style.width='50px';
			element.style.height='50px';
			var activeElement=this.activeElement;
			this.activeElement=element;
			this.setOffset(0,-2000);
			this.activeElement=activeElement;
		},
		setLeft : function(value){
			this.logger(this);
			this.setOffset(value - this.getLeft(),0);
		},
		setTop : function(value){
			this.logger(this);
			this.setOffset(0,value - this.getTop());
		},
		setWidth : function(value){
			this.logger(this);
			this.setSizing(value - this.getWidth(),0);
		},
		setHeight : function(value){
			this.logger(this);
			this.setSizing(0,value - this.getHeight());
		},
		getLeft : function(){
			this.logger(this);
			return $(this.activeElement).getMarginLeft();
		},
		getTop : function(){
			this.logger(this);
			var element=this.activeElement;
			var bg=element.parentElement.firstElementChild;
			return bg.offsetHeight - Math.abs($(element).getMarginTop());
		},
		getWidth : function(){
			this.logger(this);
			return this.activeElement.offsetWidth;
		},
		getHeight : function(){
			this.logger(this);
			return this.activeElement.offsetHeight;
		},
		onDeActiveLayout : function(activeLayout,deActiveLayout){
			this.logger(this);
			this.callSuperMethod();
			this.app.dragdrop.hide();
		}
	});

	addLayout(ide.floatLayout);

	function addLayout(_class_){
		_LAYOUT_CLASS_MAP_[_class_.prototype._name_]=_class_;
	};



	$.push({
		_name_ : '_temp_module_',
		initModule : function(){
			this.logger(this);
			this._layout_.app=this.app;
			this.app.layout=this._layout_;
			this.app.createLayoutModule=this.createLayoutModule;
			//this.app.cleanHTML=this._layout_.getClass('AbsContainer').prototype.cleanHTML;

			var LAYOUTID='\\d{'+__INDEX_LEN___+'}'+__SUFFIX__,
				APP=this.app;
			window.isLayoutID=function(_id_){
				var reg=new RegExp(LAYOUTID,'gi');
				return reg.test(_id_);
			};
		
		},
		_layout_:{
			__LAYOUT_INDEX_TYPE_MAP__ :{},
			__LAYOUT_INSTANCE_MAP__ : {},
			__OUTPUT_RULES__ : {
				'*' : {
					'^id$ ^on ^name$' : function(attr){
						if(/^on|^name$/i.test(attr.name)){
							this.removeAttribute(attr.name);
						}else if(/^id$/i.test(attr.name)){
							if(window.isLayoutID(attr.value)){
							}else if( /^img$/i.test(this.tagName) && /^CI/i.test(attr.value)){
							}else{
								this.removeAttribute('id');
							}
						}
						attr.value='';
					},
					'class' : function(attr){
						attr.value=HTMLfilter.removeClass(attr.value,'idex-r-.+');
					}
				}
			},
			getLayout : function(_name_){
				return this.__LAYOUT_INSTANCE_MAP__[_name_];
			},
			getLayoutByIndex : function(_index_){
				return this.__LAYOUT_INDEX_TYPE_MAP__[_index_];
			},
			addClass : function(__className__,_class_){
				_LAYOUT_CLASS_MAP_[__className__]=_class_;
			},
			getClass:function(__className__){
				return _LAYOUT_CLASS_MAP_[__className__];
			},
			__printIndexMap__ : function(){
				var h=[];
				var map=this.__LAYOUT_INDEX_TYPE_MAP__;
				for(var i in map){
					h.push(i+'.'+map[i]._name_);
				}
				console.info(h.join(';')+';');
			},
			__findParent__ : function(target){
				if(this.app.ViewPanel.descbox==target || !target){
					return;
				}
				var item=this.getItem(target);
				if(item){
					return item;
				}
				return this.__findParent__(target.parentElement);
			},
			findParent : function(target){
				var $target=$(target),
					htmlTarget,
					$parent;
				while($target.length==1){
					$parent=$target.closest('.html-item,.float-html');
					if($parent[0]){
						htmlTarget=$parent[0];
						$target=$parent.parent();
					}else{
						break;
					}
				}
				return this.__findParent__(htmlTarget || target);
			},
			findChildren : function(target){
				var children=target.children,
					list=[],
					array,
					_className_,
					c,
					element;

				for(var n=0,len=children.length;n<len;n++){
					element=children[n];
					var item=this.getItem(element);
					if(item){
						list.push(item);
					}
				}

				if(list.length==0){
					for(var n=0,len=children.length;n<len;n++){
						var _list_=this.findChildren(children[n]);
						if(_list_.length>0){
							list=list.concat(_list_);
						}
					}
				}
				return list;
			},
			findPrevElement : function(target){
				var element=target;
				while(element){
					element=element.previousElementSibling;
					var item=this.getItem(element);
					if(item){
						return item;
					}
				}
			},
			findNextElement : function(target){
				var element=target;
				while(element){
					element=element.nextElementSibling;
					var item=this.getItem(element);
					if(item){
						return item;
					}
				}
			},
			getItem : function(element){
				if(!element){
					return;
				}
				var className=element.className;
				if(className){
					var array=className.split(' ');
					for(var m=0,len=array.length;m<len;m++){
						c=array[m];
						layout=this.getLayout(c);
						if(layout){
							return {
								layout : layout,
								target : element
							};
						}
					}
				}
			},
			isLayout : function (element){
				return this.getItem(element).layout || false;
			}
		},
		createLayoutModule:function(module){
			if(!module._className_){
				return;
			}
			var _class_=this.layout.getClass(module._className_);
			var _layout_=new _class_(module);
			this.layout.__LAYOUT_INSTANCE_MAP__[module._name_]=_layout_;

			_layout_._type_index_=_LAYOUT_TYPE_MAP_[module._name_];

			this.layout.__LAYOUT_INDEX_TYPE_MAP__[_layout_._type_index_]=_layout_;

			
			//this.layout._LAYOUT_TYPE_MAP_.push('\''+module._name_+'\':'+this.layout._LAYOUT_TYPE_MAP_.length);
			return _layout_;
		}
	});
})(CF,jQuery);