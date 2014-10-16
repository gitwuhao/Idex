(function(CF,$){

	function initBar(){
		var html,
			topbar=[{
				type : 'home',
				isStatic : true
			},{
				type:'list'
			},{
				type:'module'
			},{
				type:'editor',
				init : function(){
					window.location.href='editor.html';
				}
			}/*,{
				type:'timing'
			},{
				type:'style'
			}*/],
			bottombar=[{
				type:'sync'
			}/*,{
				type:'config'
			}*/];

		html=['<div class="idex-nav-topbar">'];

		for(var i=0,len=topbar.length;i<len;i++){
			var item=topbar[i];
			html.push('<div class="',item.type,' idex-nav-icon">',
						 '<div class="idex-icon"></div>',
					  '</div>');
			Idex.view[item.type]=item;
		}

		html.push('</div>',
			      '<div class="idex-nav-bottombar">');
		for(var i=0,len=bottombar.length;i<len;i++){
			var item=bottombar[i];
			html.push('<div class="',item.type,' idex-nav-icon">',
						 '<div class="idex-icon"></div>',
					  '</div>');
			Idex.view[item.type]=item;
		}
		Idex.$navbox.html(html.join(''));


		$('.idex-nav-topbar .idex-nav-icon',Idex.$navbox).each(function(index,target){
			topbar[index].$icon=$(target);
			topbar[index].icon=target;
			Idex.bindIcon(topbar[index]);
		});

		$('.idex-nav-bottombar .idex-nav-icon',Idex.$navbox).each(function(index,target){
			bottombar[index].$icon=$(target);
			bottombar[index].icon=target;
			Idex.bindIcon(bottombar[index]);
		});
		

		//CF.extendEventListener(Idex.view.timing);
		//CF.extendEventListener(Idex.view.style);
		//CF.extendEventListener(Idex.view.config);
	};

	var Idex=function(){};

	Idex=new Idex();

	CF.merger(Idex,{
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

			if(item.init){
				this.initPanel();
			}else{
				var me=this;
				$.loadJSQueue('js/view/'+item.type+'.js',function(){
					me.initPanel();
				});
			}
		},
		initPanel : function(){
			this.activeItem.init();
			this.activeItem=this.view[this.activeItem.type];
			this.activeItem.on('show');
		},
		setPanel : function(anchor){
			var item=this.view[anchor];
			if(this.activeItem==item){
				return;
			}else if(this.activeItem){
				this.activeItem.on('hide');
				this.activeItem.$icon.removeClass('active');
			}

			window.location.hash=anchor;

			this.activeItem=item;
			item.$icon.addClass('active');

			if(item.$render){
				this.activeItem.on('show');
			}else{
				this.createPanel(item);
			}

			
		},
		view :{},
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


	CF.extendEventListener(Idex);

	window.Idex=Idex;

	$.getDoc().ready(function(){
		Idex.$navbox=$('.idex-navigation');
		Idex.$viewbox=$('.idex-view-box');
		initBar();
		Idex.ready();
	});

})(CF,jQuery);