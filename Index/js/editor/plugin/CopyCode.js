(function(CF,$){
var ZC;
//window._Z_C_SWF_URL_='http://www.oilan.com.cn/_/js/ZeroClipboard.swf';
$.push({
	_name_ : 'ZeroClipboard',
	initModule : function(){
		this.logger(this);
		$.getDoc().one('ZeroClipboardComplete',{
			app : this.app,
			module : this
		},function(event){	
			var data=event.data,
				module=data.module;
			ZC=window.ZeroClipboard;
			module.onReady();
		});

		this.list=[];
		this.zcbind = this.bind;
		this.bind = function(config){
			if(this.init){
				this.init();
				delete this.init;
			}
			this.list.push(config);
		};
	},
	init : function(callback){
		if(window.ZeroClipboard){
			$.getDoc().trigger('ZeroClipboardComplete',window.ZeroClipboard);
		}else{
			$.loadJSQueue(window.$_LIB_PATH + 'js/ZeroClipboard.js');
		}
	},
	onReady : function(){
		this.logger(this);
		this.bind=this.zcbind;
		$.it(this.list,function(index,item){
			this.bind(item);
		},this);
		delete this.onReady;
		delete this.list;
	},
	bind : function(config){
		this.logger(this);
		config.app=this.app;
		ZC.bind(config);
	}
});
$.push({
	overwrite : function(app){

		var LayoutPanel=app._module_map_.LayoutPanel,
			bottombarItems,
			saveas;
		
		bottombarItems=LayoutPanel.bottombar.items;

		saveas=bottombarItems[0];

		bottombarItems.insert(0,{
			cls : "code"
		});

		app.addEventListener('readyafter',function(event){
			this.LayoutPanel.initCopyCode();
		});



		LayoutPanel.initCopyCode=function(){
			var codeItem=this.getItem('code');
			if(codeItem){
				this.app.ZeroClipboard.bind({
					panel : this,
					target : codeItem.$elem[0],
					onMouseOver : function(event){
						this.$target.addClass('hover');
					},
					onMouseOut : function(event){
						this.$target.removeClass('hover');
					},
					onCopy : function(event){
						if(this.panel.activeLayout){
							ui.quicktip.show({
								time : 2000,
								html : '<span style="color: #F90;">代码复制成功</span>',
								px : 'idex-ui',
								offset : 'tl',
								align : 'tc',
								cls : 'qit-autosize copy-qit',
								target : this.target
							});
							return HTMLfilter.getOuterHTML(this.panel.activeElement,this.app.ViewPanel.__OUTPUT_RULES__);
						}
					}
				});
			}
		};
		
	}
});
})(CF,jQuery);