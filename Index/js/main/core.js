(function(CF,$){
	window.name='_IDEX_HOME';
	
	var SIG_KEY='IDEX_SIG';
	
	(function(){	
		var sig,
			homeJSON=window.getHomeJSON ? window.getHomeJSON() :{};
		if(homeJSON.sig){
			sig=homeJSON.sig;
			/*appKey#nick#secretKey*/
			var array=sig.split('#'),
				list=[],
				appKey=array[0].split(''),
				sKey=($.randomInt(1000) + $.randomChar(20)).split('');
			for(var i=0,len=appKey.length;i<len;i++){
				list.push(sKey[i]+appKey[i]);
			}
			array[0]=list.join('');
			array[1]=encodeURIComponent(array[1]).replaceAll('%','|');
			/*secretKey#appKey#nick*/
			sig=array[2]+'#'+array[0]+'#'+array[1];
		}else{
			sig=$.randomChar(12);
		}
		localStorage[SIG_KEY]=sig;
	})();


	var Idex=function(){};

	Idex=new Idex();


	CF.merger(Idex,{
		TYPE_MAP : {
			TEMPLATE : 1,
			DESC : 2,
			RENOVATION : 3,
			CUSTOM : 8,
			SYS_TEMPLATE : 10
		},
		LINK_TARGET : {
			VIEW : '_IDEX_VIEW',
			EDIT : '_IDEX_EDIT'
		},
		topbar : [{
				type:'home'
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
		bottombar : [{
				type:'comment',
				target : '_IDEX_COMMENT',
				href:'http://bangpai.taobao.com/group/16499510.htm'
			}/*,{
				type:'sync'
			},{
				type:'config'
			}*/,{
				type:'logout',
				href:'/logout.s'
			}],
		logger : function(ref){
			var caller,
				_owner_,
				callerName,
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
		createViewPanel : function(item){
			if(item.render){
				return item.render;
			}
			var render=$.createElement(['<div class="idex-view-panel ',item.type,'"></div>'].join(''));
			this.$viewbox.append(render);
			item.render=render;
			item.$render=$(render);
			return item.render;
		},
		setViewPanel : function(anchor){
			var item=this.view[anchor];
			if(this.activeItem==item){
				return;
			}else if(this.activeItem){
				this.activeItem.$render.hide();
				this.activeItem.$icon.removeClass('active');
			}
			if(anchor=='home'){
				window.location.hash='';
			}else{
				window.location.hash=anchor;
			}
			this.createViewPanel(item);
			item.$render.show();
			item.$icon.addClass('active');
			this.activeItem=item;
			this.activeViewPanel=item.render;
		},
		view : {
		},
		bindIcon : function(item){
			item.$icon.click({
				me : this,
				type : item.type,
			},function(event){
				var data=event.data;
				data.me.trigger('anchor.'+data.type);
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
		},
		getNavItemHTML : function(item,isInitBar){
			var html=['<div class="',item.type,' idex-nav-icon">'];
			if(item.href){
				html.push('<a href="',item.href,'" ',(item.target?'target="'+item.target+'"':''),'>',
							'<div class="idex-icon"></div>',
						  '</a>');
			}else if(isInitBar){
				html.push('<div class="idex-icon"></div>');
			}else{
				if(item.type=="home"){
					html.push('<a href="/"');
				}else{
					html.push('<a href="/#',item.type,'"');
				}
				if(item.target){
					html.push(' target="'+item.target+'"');
				}
				html.push('>');
				html.push( '<div class="idex-icon"></div>',
						  '</a>');
			}
			html.push('</div>');
			return html;
		},
		getPrintNavItem : function(item){
			return {
				href : item.href,
				type : item.type,
				target : item.target || '_IDEX_HOME'
			};
		},
		printNavHTML : function(){

			var html=['<div class="idex-navigation border-box uns">',
						'<div class="idex-nav-topbar">'];

			for(var i=0,len=Idex.topbar.length;i<len;i++){
				var item=Idex.topbar[i];
				html.push.apply(html,this.getNavItemHTML(this.getPrintNavItem(item)));
			}

			html.push('</div>',
					  '<div class="idex-nav-bottombar">');
			for(var i=0,len=Idex.bottombar.length;i<len;i++){
				var item=Idex.bottombar[i];
				html.push.apply(html,this.getNavItemHTML(this.getPrintNavItem(item)));
			}
			html.push('</div>',
					'</div>');
			CF.info(html.join(''));
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
			html.push.apply(html,Idex.getNavItemHTML(item,true));
		}

		html.push('</div>',
			      '<div class="idex-nav-bottombar">');
		for(var i=0,len=Idex.bottombar.length;i<len;i++){
			var item=Idex.bottombar[i];
			html.push.apply(html,Idex.getNavItemHTML(item,true));
		}
		Idex.$navbox.html(html.join(''));

		$('.idex-nav-topbar .idex-nav-icon',Idex.$navbox).each(function(index,target){
			var item=Idex.topbar[index];
			if(item.href){
				return;
			}
			item.$icon=$(target);
			item.icon=target;
			Idex.bindIcon(item);
		});

		$('.idex-nav-bottombar .idex-nav-icon',Idex.$navbox).each(function(index,target){
			var item=Idex.bottombar[index];
			if(item.href){
				return;
			}
			item.$icon=$(target);
			item.icon=target;
			Idex.bindIcon(item);
		});
		
		//CF.extendEventListener(Idex.view.timing);
		//CF.extendEventListener(Idex.view.style);
		//CF.extendEventListener(Idex.view.config);
	};

	CF.extendEventListener(Idex);

	Idex.addEventListener('anchor.home',function(){
		var $render=this.$viewbox.children('.idex-view-panel.home');
		this.view.home.render=$render[0];
		this.view.home.$render=$render;

		this.setViewPanel('home');
	});


	Idex.addEventListener('ready',function(){
		var anchor=$.getAnchor().toLowerCase();
		if(!this.view[anchor]){
			anchor='home';
		}
		this.trigger('anchor.'+anchor);

		$('.idex-shadow-box .count',this.view.home.$render).each(function(index,target){
			var anchor=null,
				parentElement=target.parentElement;
			if($.hasClass(parentElement,'list')){
				anchor='list';
			}else if($.hasClass(parentElement,'template')){
				anchor='template';
			}else if($.hasClass(parentElement,'custom')){
				anchor='custom';
			}else if($.hasClass(parentElement,'module')){
				anchor='module';
			}
			$(target).click({
				anchor : anchor
			},function(event){
				Idex.trigger('anchor.'+event.data.anchor);
			});
		});

	});
	

	$.Idex=Idex;


	$.getDoc().ready(function(){
		Idex.$navbox=$('.idex-navigation');
		Idex.$viewbox=$('.idex-view-box');
		Idex.triggerAndRemoveEvent('initHomeCount');
		initBar();
		Idex.triggerAndRemoveEvent('ready');
		delete $.Idex;
		//delete window.Idex;
	});

})(CF,jQuery);