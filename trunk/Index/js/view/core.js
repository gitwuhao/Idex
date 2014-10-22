(function(CF,$){

	var Idex=function(){};

	Idex=new Idex();

	CF.merger(Idex,{
		topbar : [{
				type : 'home'
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
				href:'http://item.taobao.com/item.htm?id=27018556087'
			}/*,{
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
		view : {},
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
		
		function getNavItemHTML(item){
			var html=[];
			html.push('<div class="',item.type,' idex-nav-icon">');
			if(item.href){
				html.push('<a href="',item.href,'" target="_blank">',
							'<div class="idex-icon"></div>',
						  '</a>');
			}else{
				html.push('<div class="idex-icon"></div>');
			}
			html.push('</div>');
			return html;
		};

		var html=['<div class="idex-nav-topbar">'];

		for(var i=0,len=Idex.topbar.length;i<len;i++){
			var item=Idex.topbar[i];
			html.push.apply(html,getNavItemHTML(item));
		}

		html.push('</div>',
			      '<div class="idex-nav-bottombar">');
		for(var i=0,len=Idex.bottombar.length;i<len;i++){
			var item=Idex.bottombar[i];
			html.push.apply(html,getNavItemHTML(item));
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
			}else if($.hasClass(parentElement,'module')){
				anchor='module';
			}else if($.hasClass(parentElement,'renovation')){
				anchor='renovation';
			}
			$(target).click({
				anchor : anchor
			},function(event){
				Idex.trigger('anchor.'+event.data.anchor);
			});
		});

		
	});


	window.Idex=Idex;


	$.getDoc().ready(function(){
		Idex.$navbox=$('.idex-navigation');
		Idex.$viewbox=$('.idex-view-box');
		initBar();
		Idex.triggerAndRemoveEvent('ready');
	});

	
	


	$.loadJSQueue(
		'js/view/list.js',
		'js/view/module.js'
	);


	


})(CF,jQuery);