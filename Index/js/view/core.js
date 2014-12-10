(function(CF,$){

	var Idex=function(){};

	Idex=new Idex();

	CF.merger(Idex,{
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
				target : '_idex_comment',
				href:'http://item.taobao.com/item.htm?id=27018556087'
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
		},
		getNavItemHTML:function (item){
			var html=['<div class="',item.type,' idex-nav-icon">'];
			if(item.href){
				html.push('<a href="',item.href,'" ',(item.target?'target="'+item.target+'"':''),'>',
							'<div class="idex-icon"></div>',
						  '</a>');
			}else{
				if(item.type=="home"){
					html.push('<a href="/">');
				}else{
					html.push('<a href="/#',item.type,'">');
				}
				html.push( '<div class="idex-icon"></div>',
						  '</a>');
			}
			html.push('</div>');
			return html;
		},
		getNavHTML : function(){

			var html=['<div class="idex-navigation border-box uns">',
						'<div class="idex-nav-topbar">'];

			for(var i=0,len=Idex.topbar.length;i<len;i++){
				var item=Idex.topbar[i];
				html.push.apply(html,this.getNavItemHTML(item));
			}

			html.push('</div>',
					  '<div class="idex-nav-bottombar">');
			for(var i=0,len=Idex.bottombar.length;i<len;i++){
				var item=Idex.bottombar[i];
				html.push.apply(html,this.getNavItemHTML(item));
			}
			html.push('</div>',
					'</div>');
			console.info(html.join(''));
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
			html.push.apply(html,Idex.getNavItemHTML(item));
		}

		html.push('</div>',
			      '<div class="idex-nav-bottombar">');
		for(var i=0,len=Idex.bottombar.length;i<len;i++){
			var item=Idex.bottombar[i];
			html.push.apply(html,Idex.getNavItemHTML(item));
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



/**
*
*  UTF-8 data encode / decode
*  http://www.webtoolkit.info/
*
**/
 
var UTF8 = {
 
	// public method for url encoding
	encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	},
 
	// public method for url decoding
	decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
 
		while ( i < utftext.length ) {
 
			c = utftext.charCodeAt(i);
 
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
 
		}
 
		return string;
	}
 
};