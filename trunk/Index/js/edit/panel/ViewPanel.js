(function(CF,$){
var CONFIG_DATA={},
	KEY_MAP=window.APP_KEY_MAP,
	ATTR_KEY_MAP=KEY_MAP.ATTR,
	CACHE_KEY_MAP=KEY_MAP.CACHE;
(function(){
	var $context=$('.idex-view-context-box');

	CONFIG_DATA.id= $context.attr('idex-id');
	$context.removeAttr('idex-id');

	CONFIG_DATA.type= $context.attr('idex-type');
	$context.removeAttr('idex-type');

})();

$.push({
	_name_ : 'ViewPanel',
	__events__ : ['click','mousedown'].join(' '),
	initModule : function(){
		this.logger(this);

		this.viewPanel=this.app.$viewPanel[0];
		this.$contextBox=this.app.$contextBox;

		this.__OUTPUT_RULES__['*']=this.app.layout.__OUTPUT_RULES__['*'];

		this.getDescBox();

		this._$$originalHTML=this.getAllHTML();

		var div,
			html=['<div class="idex-view-panel-popu-box">','</div>'].join('');

		div=$.createElement(html);
		this.$contextBox.after(div);
		this.$popuBox=$(div);

		this.app.data=this.data;

		this.initEvents();

		this.app.bindReadyAfter(this);

		this.app.addEventListener('contextReLoad contextInsert contextDelete',function(){
			this.ViewPanel.updateCount();
		});
	},
	onAppReadyAfter : function(){
		var div,
			html='<div class="idex-code-count-box">源码：<span class="value">19.9K</span>/<span class="count">20K</span></div>';
		div=$.createElement(html);
		this.app.LayoutPanel.$bottombarbox.append(div);
		this.$codeCountBox=$(div);
		this.$countValue=this.$codeCountBox.children('.value');
	},
	CONTEXT_MAX_LENGTH : 20 * 1000,
	updateCount : function(length){
		if(!this.$countValue){
			return;
		}else if(!length){
			length=this.descbox.outerHTML.length;
		}
		
		var val=length-this.CONTEXT_MAX_LENGTH;

		if(val > 0){
			this.$countValue.addClass('c1');
			this.$codeCountBox.attr('title','已超出'+Number.stringify(val)+'字');
		}else{
			this.$countValue.removeClass('c1');
			this.$codeCountBox.attr('title','还剩'+Number.stringify(Math.abs(val))+'字');
		}
		this.$countValue.text(Number.toPrecision((length/1000),1)+'K');
	},
	data : CONFIG_DATA,
	initEvents : function(){
		this.logger(this);

		this.$contextBox.on(this.__events__,{
			panel : this,
			event : this.app.event
		},function(event){
			var data=event.data;
			event.data=null;
			/*
			if(data.event.removeTargetHandle(event)){
				return;
			}
			*/
			if(!event.originalEvent || event.screenX==0 && event.screenY==0){
				event.isCommandTrigger=true;
			}

			if(event.type=='mousedown' && (event.button==2 || event.ctrlKey)){
				event.type='mouserightdown';
			}

			data.panel.eventDispatch(event);
			/*
			if(event.type=='mouserightdown'){
				return false;
			}
			*/
		});


		var margin=this.viewPanel.offsetTop * 2;

		this.addEventListener('resize',function(width,height){
			this.viewPanel.style.height=(height- margin) + 'px';
		});

	},
	eventDispatch:function(event){
		this.logger(this);
		var type=event.type,
			target=event.target,
			item,
			layout;

		item=this.app.layout.findParent(target);

		if(!event.isCommandTrigger){
			if(type=='click' && this.lastEvent && this.lastEvent.target!=event.target){
				this.lastEvent=event;
				return;
			}
		}
		if(item){
			layout=item.layout;
			layout.eventDispatch(event,item.target,type);
		}else{
			this.on(type,event);
		}
		this.lastEvent=event;
	},
	getDescBox : function(){
		this.$descbox=this.$contextBox.children('.idex-desc-box:first');
		this.descbox=this.$descbox[0];
		return this.$descbox;
	},
	onSrcollTop:function(element){
		this.logger(this);
		var offsetTop=element.offsetTop,
			scrollTop=this.viewPanel.scrollTop;
		if(scrollTop > offsetTop || offsetTop - scrollTop > window.innerHeight){
			this.viewPanel.scrollTop=offsetTop - 5;
		}
	},
	srcollTop : function(top){
		this.logger(this);
		this.viewPanel.scrollTop=top;
	},
	disabledSrcoll:function(){
		var style=this.viewPanel.style;
		style.setProperty('overflow-x','hidden');
		style.setProperty('overflow-y','hidden');
	},
	enabledSrcoll:function(){
		var style=this.viewPanel.style;
		style.setProperty('overflow-x','hidden');
		style.setProperty('overflow-y','auto');
	},
	__OUTPUT_RULES__ : {
		isRemoveEmptyAttr : true,
		'meta iframe style noscript script link html ^body$ ^head$ ^title$ frame object param' : HTMLfilter.removeElement,
		/*Refer : app.layout.__OUTPUT_RULES__*/
		'*' : null,
		'img' : {
			':before' : function(){
				if(this.naturalHeight>0 && this.naturalWidth>0){
					this.setAttribute(ATTR_KEY_MAP.SRC,'');
				}
			},
			'src' : function(attr){
				attr.name=ATTR_KEY_MAP.SRC;
			}
		}
	},
	getAllHTML : function(){
		this.logger(this);
		var HTML=HTMLfilter.getOuterHTML(this.descbox,this.__OUTPUT_RULES__);
		this.updateCount(HTML.length);
		return HTML;
	},
	getHTML : function(){
		this.logger(this);
		return this.descbox.outerHTML;
	},
	setHTML : function(HTML){
		this.logger(this);
		this.$contextBox.html(HTML);
		this.getDescBox();
		$('.idex-r-active',this.descbox).removeClass('idex-r-active');
		//this.app.trigger('contextReLoad');
		this.app.LayoutPanel.home();
	},
	getOriginalHTML : function(){
		this.logger(this);
		return this._$$originalHTML;
	}
});
})(CF,jQuery);