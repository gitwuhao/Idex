(function(CF,$){
	
var KEY_MAP=window.APP_KEY_MAP,
	WIN_NAME=KEY_MAP.WIN_NAME,
	ObjectHasOwnProperty=Object.prototype.hasOwnProperty,
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
		ui:{},
		layout : {},
		_module_list_:[],
		_module_map_:{},
		KEY_MAP : KEY_MAP,
		_init_ : function(){
			if(!this._isReady_){
				this.$viewPanel=$('.idex-view-panel:first');
				this.$navigation=$('.idex-navigation:first');
				this.$contextBox=$('.idex-view-context-box:first',this.$viewPanel);
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
			delete this._module_map_;
			this.triggerAndRemoveEvent('readyafter');
			delete this.bindReady();
			delete this.bindReadyAfter();
			this.trigger('resize');
		},
		bindReady : function(module){
			if(!module){
				return;
			}
			this.addEventListener('ready',function(){
				module.on('ready');
			});
		},
		bindReadyAfter : function(module){
			if(!module){
				return;
			}
			this.addEventListener('readyafter',function(){
				module.on('appReadyAfter');
			});
		},
		_initModule_:function(module){
			if(module._isUIModule_){
				module=this.createUIModule(module);
			}else if(module._isLayoutModule_){
				module=this.layout.createLayoutModule(module);
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

			if(module.initPlugin){
				module.initPlugin();
			}
		},
		createUIModule : CF.emptyFunction,
		createLayoutModule : CF.emptyFunction,
		pushModule : function(module){
			if(module.overwrite){
				module.overwrite(this);
				return;
			}else if(!module._name_){
				return;
			}

			if(!this._isReady_){
				this._module_list_.push(module);
				this._module_map_[module._name_]=module;
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
				if(event.altKey && (event.button==2 || event.type=='contextmenu')){
					$.setTimeout(function(){
						this.data.$eventElement.trigger('help',this);
					},100,event);
					return false;
				}
			});		
		}
	};

	window.name=WIN_NAME.EDIT;

	Idex.module=function(prototype){
		CF.merger(this,prototype);
	};

	IdexModule=Idex.module;

	CF.extendEventListener(Idex);

	
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


	$.getWin().resize(function(event){
		Idex.trigger('resize');
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
	
	function IdexReady(){
		Idex.ready();
		document.body.spellcheck=false;
		
		$.Idex=Idex;

		if(!CF.isDebug){
			$.disabledRightButton();
			$.unloadMsg=' ';
			$.unloadAlert();
		}
		delete $[name];
	};


	//$.getDoc().ready(IdexReady);

	(function(){
		
		var win=window,
		_l='location',
		_id='id',
		_oi='oi',
		_h='host',
		_e='e',
		_lan='lan',
		_x='x';

		_l=win[_l]; 

		_h=_l[_h]; 
		
		if(_h){
			_h=_h.toLowerCase();
			 if(_h.indexOf((_oi+_lan))>-1 || _h.indexOf((_id+_e+_x))>-1 ){
				$.getDoc().one('Idex.ready',IdexReady);
			 }else{
				$[name]=CF.emptyFunction;
			 }
		}
	})();

})(CF,jQuery);