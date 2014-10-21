(function(CF,$){

	var Idex=function(){};

	Idex=new Idex();

	CF.merger(Idex,{
		topbar : [{
				type : 'home',
				isStatic : true
			},{
				type:'list'
			},{
				type:'module'
			}/*,{
				type:'editor',
				init : function(){
					window.location.href='editor.html';
				}
			},{
				type:'timing'
			},{
				type:'style'
			}*/],
		bottombar : [/*{
				type:'sync'
			},{
				type:'config'
			}*/],
		logger : function(ref){
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
		ready : function(){
			var anchor=$.getAnchor().toLowerCase();
			if(!this.view[anchor]){
				anchor='home';
			}
			this.setPanel(anchor);
		},
		createPanel : function(item){
			if(item.render){
				return;
			}
			var render=$.createElement(['<div class="idex-view-panel ',item.type,'"></div>'].join(''));
			this.$viewbox.append(render);
			item.render=render;
			item.$render=$(render);

			if(this.activeItem.init){
				this.activeItem.init();
				this.activeItem=this.view[item.type];

				this.activeItem.on('show');
			}
		},
		setPanel : function(anchor){
			var item=this.view[anchor];
			if(this.activeItem==item){
				return;
			}else if(this.activeItem){
				this.activeItem.on('hide');
				this.activeItem.$icon.removeClass('active');
			}
			if(anchor=='home'){
				window.location.hash='';
			}else{
				window.location.hash=anchor;
			}
			this.activeItem=item;
			item.$icon.addClass('active');

			if(item.$render){
				this.activeItem.on('show');
			}else{
				this.createPanel(item);
			}
		},
		view : {},
		bindIcon : function(item){
			item.$icon.click({
				me : this,
				type : item.type,
			},function(event){
				var data=event.data;
				data.me.setPanel(data.type);
			});

			if(!item.onShow){
				item.onShow = function(){
					this.$render.show();
				};
			}
			if(!item.onHide){					
				item.onHide = function(){
					this.$render.hide();
				};
			}

			if(item.isStatic){
				var $render=$('.'+item.type,Idex.$viewbox);
				item.render=$render[0];
				item.$render=$render;
				CF.extendEventListener(item);
			}
		}
	});

	(function(){
		for(var i=0,len=Idex.topbar.length;i<len;i++){
			var item=Idex.topbar[i];
			Idex.view[item.type]=item;
		}

		for(var i=0,len=Idex.bottombar.length;i<len;i++){
			var item=Idex.bottombar[i];
			Idex.view[item.type]=item;
		}
	})();
	
	function initBar(){
		var html=['<div class="idex-nav-topbar">'];

		for(var i=0,len=Idex.topbar.length;i<len;i++){
			var item=Idex.topbar[i];
			html.push('<div class="',item.type,' idex-nav-icon">',
						 '<div class="idex-icon"></div>',
					  '</div>');
		}

		html.push('</div>',
			      '<div class="idex-nav-bottombar">');
		for(var i=0,len=Idex.bottombar.length;i<len;i++){
			var item=Idex.bottombar[i];
			html.push('<div class="',item.type,' idex-nav-icon">',
						 '<div class="idex-icon"></div>',
					  '</div>');
		}
		Idex.$navbox.html(html.join(''));

		$('.idex-nav-topbar .idex-nav-icon',Idex.$navbox).each(function(index,target){
			var item=Idex.topbar[index];
			item.$icon=$(target);
			item.icon=target;
			Idex.bindIcon(item);
		});

		$('.idex-nav-bottombar .idex-nav-icon',Idex.$navbox).each(function(index,target){
			var item=Idex.bottombar[index];
			item.$icon=$(target);
			item.icon=target;
			Idex.bindIcon(item);
		});
		
		//CF.extendEventListener(Idex.view.timing);
		//CF.extendEventListener(Idex.view.style);
		//CF.extendEventListener(Idex.view.config);
	};

	CF.extendEventListener(Idex);

	window.Idex=Idex;


	$.getDoc().ready(function(){
		Idex.$navbox=$('.idex-navigation');
		Idex.$viewbox=$('.idex-view-box');
		initBar();

		Idex.ready();


	});

	
	$.loadJSQueue(
		'js/view/list.js',
		'js/view/module.js'
	);

})(CF,jQuery);