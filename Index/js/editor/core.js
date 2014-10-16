(function(CF,$){
	
	var loca=window.location,
		_NAME_,
		ROOTPATH;
	if(loca.host=='www.oilan.com.cn'){
		_NAME_='ide/';
	}else if(loca.host=='idex.oilan.com.cn'){
		_NAME_='/';
	}else{
		_NAME_='';
	}
	ROOTPATH=[loca.protocol,'/','/',loca.host,'/',_NAME_].join('');

	var ObjectHasOwnProperty=Object.prototype.hasOwnProperty,
		ObjectConstructor={}.constructor,
		logger = function(ref){
			var caller,
				_owner_,
				arg;
			caller=arguments.callee.caller;
			arg=caller.arguments;
			_owner_=arguments.callee.caller._owner_;
			callerName=ref._owner_name_+'::'
			if(ref._owner_name_!=caller._owner_._owner_name_){
				callerName= callerName + caller._owner_._owner_name_+'.';
			}
			callerName=callerName + caller._name_;
			CF.logger(callerName,arg);
		},
		IdexModule,
		name=['p','u','s','h'].join(''),
		Idex={
		_name_ : 'Idex',
		_isReady_:false,
		href : window.location.href,
		ui:{},
		layout : {},
		ROOTPATH : ROOTPATH,
		_module_list_:[],
		_init_ : function(){
			if(!this._isReady_){
				this.$viewPanel=$('.idex-view-panel:first');
				this.$navigation=$('.idex-navigation:first');
				this.$descBox=$('.idex-desc-box:first',this.$viewPanel);
				this.$body=$.getBody();

				this.$viewPanel.append('<div class="idex-event-listener"></div>');

				this.$eventElement=$('.idex-event-listener');

			}
		},
		ready : function(){
			this._init_();
			this.triggerAndRemoveEvent('ready');
			this._isReady_=true;
			var i=0;
			while(this._module_list_[i]){
				this._initModule_(this._module_list_[i]);
				i++;
			}
			delete this.ready;
			delete this._init_;
			delete this._module_list_;
			this.triggerAndRemoveEvent('readyafter');
			this.trigger('resize');
		},
		_initModule_:function(module){
			if(module._isUIModule_){
				module=this.createUIModule(module);
			}else if(module._isLayoutModule_){
				module=this.createLayoutModule(module);
			}else{
				module=new IdexModule(module);
				
				CF.extendEventListener(module);

				CF.setOwner(module);
				
				module.ui=this.ui;

				module.layout=this.layout;

				module._owner_name_='Idex.'+module._name_;
			}
			module.app=this;
			module.logger=logger;

			if(module.initModule){
				module.initModule();
				delete module.initModule;
			}
			
			if(module._isLayoutModule_ || module._name_=='_temp_module_'){
				this.removeModule(module);
			}else{
				this[module._name_]=module;
			}

		},
		createUIModule : CF.emptyFunction,
		createLayoutModule : CF.emptyFunction,
		pushModule : function(module){
			if(!module._name_){
				return;
			}
			if(!this._isReady_){
				this._module_list_.push(module);
			}else{
				this._initModule_(module);
			}
		},
		removeModule : function(module){
			if(this[module._name_]==module){
				delete this[module._name_];
				CF.removeOwnProperty.call(module);
			}
		},
		get : function(id){
			return document.getElementById(id);
		},
		logger : logger,
		triggerHelpHandle:function(elem,data){
			if(this.isHelp==false){
				this.triggerHelpHandle=CF.emptyFunction;
				return;
			}
			var $elem;
			if(elem.jquery){
				$elem=elem;
			}else{
				$elem=$(elem);
			}
			data.$eventElement=this.$eventElement;
			$elem.on("keyup contextmenu",data,function(event){
				if(event.ctrlKey && (event.button==2 || event.type=='contextmenu')){
					$.setTimeout(function(){
						this.data.$eventElement.trigger('help',this);
					},100,event);
					return false;
				}
			});		
		}
	};

 


	Idex.module=function(prototype){
		CF.merger(this,prototype);
	};

	IdexModule=Idex.module;

	CF.extendEventListener(Idex);

	
	Idex.KeyMap={
		/** Key constant @type Number */
		BACKSPACE: 8,
		/** Key constant @type Number */
		TAB: 9,
		/** Key constant @type Number */
		NUM_CENTER: 12,
		/** Key constant @type Number */
		ENTER: 13,
		/** Key constant @type Number */
		RETURN: 13,
		/** Key constant @type Number */
		SHIFT: 16,
		/** Key constant @type Number */
		CTRL: 17,
		/** Key constant @type Number */
		ALT: 18,
		/** Key constant @type Number */
		PAUSE: 19,
		/** Key constant @type Number */
		CAPS_LOCK: 20,
		/** Key constant @type Number */
		ESC: 27,
		/** Key constant @type Number */
		SPACE: 32,
		/** Key constant @type Number */
		PAGE_UP: 33,
		/** Key constant @type Number */
		PAGE_DOWN: 34,
		/** Key constant @type Number */
		END: 35,
		/** Key constant @type Number */
		HOME: 36,
		/** Key constant @type Number */
		LEFT: 37,
		/** Key constant @type Number */
		UP: 38,
		/** Key constant @type Number */
		RIGHT: 39,
		/** Key constant @type Number */
		DOWN: 40,
		/** Key constant @type Number */
		PRINT_SCREEN: 44,
		/** Key constant @type Number */
		INSERT: 45,
		/** Key constant @type Number */
		DELETE: 46,
		/** Key constant @type Number */
		ZERO: 48,
		/** Key constant @type Number */
		ONE: 49,
		/** Key constant @type Number */
		TWO: 50,
		/** Key constant @type Number */
		THREE: 51,
		/** Key constant @type Number */
		FOUR: 52,
		/** Key constant @type Number */
		FIVE: 53,
		/** Key constant @type Number */
		SIX: 54,
		/** Key constant @type Number */
		SEVEN: 55,
		/** Key constant @type Number */
		EIGHT: 56,
		/** Key constant @type Number */
		NINE: 57,
		/** Key constant @type Number */
		A: 65,
		/** Key constant @type Number */
		B: 66,
		/** Key constant @type Number */
		C: 67,
		/** Key constant @type Number */
		D: 68,
		/** Key constant @type Number */
		E: 69,
		/** Key constant @type Number */
		F: 70,
		/** Key constant @type Number */
		G: 71,
		/** Key constant @type Number */
		H: 72,
		/** Key constant @type Number */
		I: 73,
		/** Key constant @type Number */
		J: 74,
		/** Key constant @type Number */
		K: 75,
		/** Key constant @type Number */
		L: 76,
		/** Key constant @type Number */
		M: 77,
		/** Key constant @type Number */
		N: 78,
		/** Key constant @type Number */
		O: 79,
		/** Key constant @type Number */
		P: 80,
		/** Key constant @type Number */
		Q: 81,
		/** Key constant @type Number */
		R: 82,
		/** Key constant @type Number */
		S: 83,
		/** Key constant @type Number */
		T: 84,
		/** Key constant @type Number */
		U: 85,
		/** Key constant @type Number */
		V: 86,
		/** Key constant @type Number */
		W: 87,
		/** Key constant @type Number */
		X: 88,
		/** Key constant @type Number */
		Y: 89,
		/** Key constant @type Number */
		Z: 90,
		/** Key constant @type Number */
		CONTEXT_MENU: 93,
		/** Key constant @type Number */
		NUM_ZERO: 96,
		/** Key constant @type Number */
		NUM_ONE: 97,
		/** Key constant @type Number */
		NUM_TWO: 98,
		/** Key constant @type Number */
		NUM_THREE: 99,
		/** Key constant @type Number */
		NUM_FOUR: 100,
		/** Key constant @type Number */
		NUM_FIVE: 101,
		/** Key constant @type Number */
		NUM_SIX: 102,
		/** Key constant @type Number */
		NUM_SEVEN: 103,
		/** Key constant @type Number */
		NUM_EIGHT: 104,
		/** Key constant @type Number */
		NUM_NINE: 105,
		/** Key constant @type Number */
		NUM_MULTIPLY: 106,
		/** Key constant @type Number */
		NUM_PLUS: 107,
		/** Key constant @type Number */
		NUM_MINUS: 109,
		/** Key constant @type Number */
		NUM_PERIOD: 110,
		/** Key constant @type Number */
		NUM_DIVISION: 111,
		/** Key constant @type Number */
		F1: 112,
		/** Key constant @type Number */
		F2: 113,
		/** Key constant @type Number */
		F3: 114,
		/** Key constant @type Number */
		F4: 115,
		/** Key constant @type Number */
		F5: 116,
		/** Key constant @type Number */
		F6: 117,
		/** Key constant @type Number */
		F7: 118,
		/** Key constant @type Number */
		F8: 119,
		/** Key constant @type Number */
		F9: 120,
		/** Key constant @type Number */
		F10: 121,
		/** Key constant @type Number */
		F11: 122,
		/** Key constant @type Number */
		F12: 123,
	};

	$.getDoc().keydown(function(event){
		//console.info('keyCode:',event.keyCode,event);
		/*shift|ctrl|alt|backspace|enter*/
		if(event.keyCode==16 || event.keyCode==17 ||  event.keyCode==18 ||  event.keyCode==8 ||  event.keyCode==13){
			return;
		}else if(event.keyCode==27){
			setTimeout(function(){
				Idex.$eventElement.trigger('esc',event);
			},100);
		}

		if(!$.isEditable(event.target) && !Idex.trigger('keydown',event)){
			return false;
		/*过滤F11、F12*/
		}else if(event.keyCode==122 || event.keyCode==123){
		}else if(event.keyCode>=112 && event.keyCode<=123 ){
			return false;
		}
	});

	$(window).resize(function(event){
		Idex.trigger('resize');
	});

	$.getDoc().ready(function(){
		Idex.ready();
		document.body.spellcheck=false;
		
		$.Idex=Idex;

		if(!CF.isDebug){
			$.disabledRightButton();
			$.unloadMsg=' ';
			$.unloadAlert();
		}
		delete $[name];
	});


	function _A_(){
		var caller=arguments.callee.caller,
			arg=caller.arguments;
		if(arg.length==1 && caller.caller.arguments[0]==CF){
			Idex.pushModule(arg[0]);
		}else{
			console.error(arguments.callee.caller.caller);
		}
	};


	$[name] = function(){
		_A_();
	};

	
})(CF,jQuery);