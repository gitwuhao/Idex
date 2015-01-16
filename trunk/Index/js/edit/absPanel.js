(function(CF,$){
var ATTR_KEY_MAP=window.APP_KEY_MAP.ATTR,
ideui={
	__isIDEUI__ : true,
	_type_ : "ideui",
	px : "idex",
	FORMITEM : {
		'img' : {
			xtype:'text',
			label:'图片',
			name: 'src',
			icon : 'img',
			vtype:['autoselect'],
			placeholder :'填写图片地址',
			getDesc : '修改图片地址',
			onRenderAfter : function(){
				this.callPrototypeMethod();

				var layout=this.layout;
				if(!layout.setSrc){
					layout.setSrc=function(value){
						var img=this.getImgElement();
						if(img){
							$.attr(img,'src',value||'/s.gif');
						}
					};
				}
				if(!layout.getSrc){
					layout.getSrc = function(){
						var img=this.getImgElement();
						if(img){
							return $.attr(img,'src')||$.attr(img,ATTR_KEY_MAP.SRC);
						}
						return '';
					};
				}
				if(!layout.getImgElement){
					this.layout.getImgElement=function(){
						return this.activeElement.firstElementChild;
					};
				}
			},
			onIconmousedown : function(){
				this.app.SelectPicture.show(CF.getCallback(this.onSelect,this));
				return false;
			},
			onSelect : function(src){
				//console.info('on select');
				this.setValue(src);
				this.on('change',this.value);
				
				$.removeAttr(this.layout.getImgElement(),ATTR_KEY_MAP.SRC);
			}
		},
		'link' :{
			xtype:'text',
			label:'链接',
			vtype:['autoselect'],
			maxlength : 200,
			placeholder :'填写链接地址',
			name: 'link',
			getDesc : '修改链接地址',
			onRenderAfter : function(){
				this.callPrototypeMethod();
				var layout=this.layout;
				if(!layout.setLink){		
					layout.setLink = function(value){
						$.attr(this.activeElement,ATTR_KEY_MAP.HREF,value);
					};
					layout.getLink = function(){
						return $.attr(this.activeElement,ATTR_KEY_MAP.HREF);
					};
				}
			}
		},
		'imgsizing' : {
			label : '尺寸',
			isHelp : false,
			name : 'imgsizing',
			onRenderAfter : function(){
				ui.logger(this);
				var $field=$('.idex-ui-item-field',this.$elem);
				$field.css('line-height','22px');
				$field.html('&nbsp;0&nbsp;x&nbsp;0&nbsp;');
				this.form.$sizeField=$field;
				
				this.onBindEvent=CF.emptyFunction;
				this.setValue=CF.emptyFunction;
				this.onDisabled=CF.emptyFunction;
				this.onEnabled=CF.emptyFunction;

				var layout=this.layout;

				if(!layout.getImgsizing){
					layout.getImgsizing = function(){
						this._getImgsizing($('img',this.activeElement));
					};
				}
				
				layout._getImgsizing=function($img){
					if($img.length==0 || $img[0].clientWidth==0){
						this.form.$sizeField.html('无图');
						return;
					}
					var img=$img[0];
					this.form.$sizeField.html('&nbsp;'+img.clientWidth+'&nbsp;x&nbsp;'+img.clientHeight);
				};


				if(!layout.onAutoSize){
					layout.onAutoSize = function(){
						var activeElement,
							item,
							height,
							width,
							img=$('img',this.activeElement);
						if(img.length==0){
							return;
						}else{
							img=img[0];
						}
						activeElement=this.activeElement;
						if(img.naturalHeight > 1 && this.setHeight){
							item=this.form.getItem('height');
							height=img.naturalHeight + (activeElement.offsetHeight - img.offsetHeight);
							this.form.on('change',item,height);
						}
						if(img.naturalWidth > 1 && this.setWidth){
							item=this.form.getItem('width');
							width=img.naturalWidth + (activeElement.offsetWidth - img.offsetWidth);
							this.form.on('change',item,width);
						}
					};
				}
			}
		}
	}
};

var TabPanel={};

CF.merger(TabPanel,ideui,{
	_name_ : "TabPanel",				
	getRender:function(){
		return this.app.TabPanel.$tabPanel;
	},
	getDescBox : function(){
		return this.app.ViewPanel.$descbox;
	},
	getDescBoxElement : function(){
		return this.app.ViewPanel.descbox;
	},
	createPanel:function(){
		if(!this.isRender){
			this.$render=this.getRender();
			this.initRender();
			this.on('createPanel');
		}
	},
	onCreatePanelAfter:function(){
		if(this.bottombar && this.bottombar.itemsMap){
			this.bindItemsHelp(this.bottombar.itemsMap);
		}
		if(this.topbar && this.topbar.itemsMap){
			this.bindItemsHelp(this.topbar.itemsMap);
		}
	},
	bindItemsHelp:function(items){
		$.it(items,function(index,item){
			if(!item.$elem){
				return
			}
			this.app.triggerHelpHandle(item.$elem,{
				type : 'right-panel-icon',
				item : item,
				content : this._name_.toLowerCase(),
				name : item.cls.toLowerCase(),
				target : item.$elem[0],
				align : 'lc',
				offset : 'lt',
			});			
		},this);

	}
});

var FloatTabPanel={};

CF.merger(FloatTabPanel,TabPanel,{
	_name_ : "FloatTabPanel",				
	getRender:function(){
		return this.app.TabPanel.$floatPanel;
	},
	show:function(){
		this.createPanel();
		this.$elem.show();
		this.on('show');
	},
	resetOffset:function(offset){
		this.$elem.css({
			top : offset.top,
			right : offset.right
		});
	},
	hide:function(){
		this.$elem.hide();
		this.on('hide');
	}
});

var PropertyForm=function(config){
	config.px='idex-ui';
	this.callSuperMethod();
};


ui.extend(PropertyForm,ui.widget,{
	_type_ : "ideui",
	_name_ : "propertyform",
	statics:{
		css:{
			_c_property_panel: '-property-panel',
			_c_property_form: '-property-form',
			_c_separator: '-separator',
			_c_breakline: '-breakline',
			_c_break: '-break',
			_c_text: '-item-text'
		},
		getTemplate: function(config){
			ui.widget.applyCSS(config,this.css);
			var html=['<div id="',config.id,'" class="',config._c_property_panel,' ',(config.cls||''),'">',
			'<form autocomplete="off"  class="',config._c_property_form,'">'];
			var items=config.items;
			for(var i=0,len=items.length;i<len;i++){
				var item=items[i];

				if(item=='SIZE' || item.xtype=='SIZE'){						
					item=CF.merger({},ideui.FORMITEM.imgsizing,(item.xtype ? item : {}));
					item.xtype='text';
					items[i]=item;
				}

				if(item=='|'){
					html.push('<div class="',config._c_separator,'"></div>');
					items[i]='';
				}else if(item=='|||'){
					html.push('<div class="',config._c_breakline,'"></div>');
					items[i]='';
				}else if(item=='||'){
					html.push('<div class="',config._c_break,'"></div>');
					items[i]='';
				}else if(item._isString_ || item.isPadding){
					if(item.width || item.cls){
						html.push('<div class="',config._c_text,' ',(item.cls||''),'" style="');
						if(item.width){
							html.push('width:',item.width,';');
						}

						if(item.height){
							html.push('height:',item.height,';');
						}

						html.push('">',(item.text||''),'</div>');
					}else{
						html.push('<div class="',config._c_text,'">',item,'</div>');
					}
					items[i]='';
				}else{
					if(!item.xtype){
						item.xtype='button';
					}
					var xtype=item.xtype;
					if(config.labelVisible==false && xtype!='text' && item.label){
						item.title=item.label;
						delete item.label;
					}
					if(config.px){
						item.px=config.px;
					}
					
					html.push(ui.getXTypeHTML(item));
				}
			}
			html.push('</form></div>');
			return html.join('');
		}
	},
	onRenderAfter:function(config){
		ui.logger(this);
		var $panel,
			children,
			items,
			layout=this.$owner;
		
		$panel=this.$elem;
		children=$panel.children().children();
		items=config.items;

		layout.attrKey={};

		for(var i=0,len=items.length;i<len;i++){
			var name,
				item=items[i];
			if(item){
				if(item.onChange){
				
				}else if(item.xtype=='button'){

				}else if(item.isOnChangeHandle!=false){
					item.onChange=function(value){
						ui.logger(this);
						this.form.on('change',this,this.getValue());
					};
				}
				name=item.name;

				if(name){
					layout.attrKey[name]=layout._attr_px_+name;
				}
				item.form=this;
				item.layout=layout;
				item.app=this.app;
				item=ui.getXTypeItem(item,children[i]);
				if(item.$text){
					ui.form.vtypes.enterToChange(item);
				}
				items[i]=item;
				if(item.isHelp!=false){
					this.bindHelpEvent(item);
				}
			}
		}
		this.itemsToMap();
		
		this.inputItems=[];
		
		$.it(this.itemsMap,function(key,item){
			if(item._owner_name_!=ui.button._owner_name_){
				this.inputItems.push(item);
			}
		},this);
	},
	bindHelpEvent:function(item){
		ui.logger(this);
		item.name=item.name||'';
		item.cls=item.cls||'';
		item.vtype=item.vtype||[];
		this.app.triggerHelpHandle(item.$elem,{
			type : 'property-field',
			item : item,
			vtype : item.vtype,
			content : this.$owner._name_.toLowerCase(),
			name : item.name.toLowerCase(),
			cls : item.cls.toLowerCase(),
			xtype : item._owner_name_.toLowerCase(),
			target : item.$elem[0],
			align : 'lc',
			offset : 'lt'
		});
	},
	getItem:function(icon){
		return this.itemsMap['_'+icon+'_'];
	},
	hideItem : function(icon){
		var item=this.getItem(icon);
		item.$elem.addClass('hide');
	},
	disabled:function(icon){
		if(icon){
			var item=this.getItem(icon);
			item.disabled();
			return;
		}
		for(var key in this.itemsMap){
			var item=this.itemsMap[key];
			if(item.__isUI__){
				item.disabled();
			}
		}
	},
	enabled:function(icon){
		if(icon){
			var item=this.getItem(icon);
			item.enabled();
			return;
		}
		for(var key in this.itemsMap){
			var item=this.itemsMap[key];
			if(item.__isUI__){
				item.enabled();
			}
		}
	},
	onChange:function(item,value){
		ui.logger(this);

		if(this.$owner==this.app.ViewPanel){
		
		}else if(!this.$owner.activeElement){
			return;
		}

		var key=item.name;
		var undoValue=this.$owner.getPropertyItemValue(key);

		if(this.$owner.setPropertyItemValue(key,value)==false){
			return;
		}
		
		value=this.$owner.getPropertyItemValue(key);

		var title;
		if(item.getDesc){
			if(item.getDesc._isString_){
				title=item.getDesc;
			}else if(item.getDesc._isFunction_){
				title=item.getDesc(value);
			}
		}else{
			title='设置属性';
		}
		var elementID;
		if(this.$owner!=this.app.ViewPanel){
			elementID=this.$owner.activeElement.id;
		}

		var lastCommand=this.app.HistoryPanel.getLastCommand();
		if(lastCommand.title==title &&
			lastCommand.elementID==elementID &&
			lastCommand.key==key) {
			lastCommand.redoValue=value;
		}else{
			this.addUndo({
				key : key,
				undoValue : undoValue,
				redoValue : value,
				title : title,
				elementID : elementID
			});
		}
	},
	changeItemValue : function(key,value){
		ui.logger(this);
		var item=this.getItem(key);
		if(item){
			this.onChange(item,value);
		}
	},
	setItemValue : function(key,value){
		ui.logger(this);
		var item=this.getItem(key);
		if(item && item.setValue){
			item.setValue(value);
		}
	},
	setCommandValue:function(id,key,value){
		ui.logger(this);
		var oldActiveElement;
		if(id){
			oldActiveElement=this.$owner.activeElement;
			this.$owner.activeElement=this.app.get(id);
		}
		this.$owner.setPropertyItemValue(key,value);

		if(this.$owner.activeElement==oldActiveElement){
			this.setItemValue(key,value);
		}else if(oldActiveElement){
			this.$owner.activeElement=oldActiveElement;
		}
	},
	addUndo:function(config){
		ui.logger(this);
		var command={
			key : config.key,
			undoValue : config.undoValue,
			redoValue : config.redoValue,
			title : config.title,
			type : 'setValue',
			elementID : config.elementID,
			$owner : this
		};

		command.undo=function(){
			this.$owner.setCommandValue(this.elementID,this.key,this.undoValue);
		};

		command.redo=function(){
			this.$owner.setCommandValue(this.elementID,this.key,this.redoValue);
		};

		this.app.HistoryPanel.addUndo(command);
	},
	quickTip:function(config){
		ui.logger(this);
		config.px='idex-ui';
		config.offset='rb';
		config.align='tc';
		config.cls='property-field';
		config.target=this.getItem(config.target).$elem[0];
		config.targetContent=this.$render[0];
		ui.quicktip.show(config);
	}
});

$.push({
	_name_ : '_temp_module_',
	initModule : function(){
		this.logger(this);
		this.app.ui=this._ui_;
		this.app.createUIModule=this.createUIModule;
		this.app.CreatePropertyForm=function(config){
			config.app=this;
			return new PropertyForm(config);
		};
	},
	_ui_: {
		ideui : ideui,
		TabPanel : TabPanel,
		FloatTabPanel : FloatTabPanel,
		PropertyForm : PropertyForm,
		extend : function(module,_className_){
			CF.apply(module,this[_className_]);
		},
		FORMITEM : ideui.FORMITEM
	},
	createUIModule:function(module){
		if(module._className_){
			this.ui.extend(module,module._className_);
		}
		var _ui_=new ui.tab(module);
		_ui_.get=this.get;
		_ui_._owner_name_=_ui_._type_ + '.' + _ui_._name_;
		this[module._name_]=_ui_;
		return _ui_;
	}
});
})(CF,jQuery);