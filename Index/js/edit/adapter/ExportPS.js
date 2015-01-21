(function(CF,$){
	$.push({
		_name_ : 'ExportPS',
		show : function(callback){
			if(this.win){
				return;
			}
			this.win=new ui.window({
				title : '导出',
				callback : callback,
				cls : 'idex-export-ps-win x-ui-scrollbar',
				html : '<div class="idex-link-item ps-script"><a href="#a">切图脚本</a></div><div class="idex-link-item layout-pic"><a href="#s" download="">布局模板</a></div>',
				onCloseAfter : function(){
					this.$owner.close();
				}
			});
			this.win.$owner = this;
			this.win.show();
		},
		close:function(){
			this.logger(this);
			this.win.callback.execute();
			this.win.remove();
			delete this.win;
		},
		export : function(){
			if(this.isExportPsIng){
				return;
			}
			
			var html=this.app.ViewPanel.getAllHTML(),
				_timers_=Date.now();
			if(this.lastFrameId && window[this.lastFrameId]){
				window[this.lastFrameId]();
			}
			
			var me=this,
				lastFrameId='ide_template_'+_timers_;

			this.lastFrameId=lastFrameId;

			this.isExportPsIng=true;
			
			window[lastFrameId]=function(){
				$('#'+lastFrameId).remove();
				delete window[lastFrameId];
				ui.popu.removeMask();
				delete me.isExportPsIng;
				me.app.isLocked=false;
			};

			ui.popu.createMask();

			localStorage.setItem(CACHE_KEY_MAP.TO_PS_CALLBACK,lastFrameId);
			localStorage.setItem(CACHE_KEY_MAP.TO_PS_HTML,html);
			$.getBody().append(['<iframe id="',lastFrameId,'" src="',this.TO_PS_URL,'" style="position: absolute;left: 0px;top: -1000px;width: 1px;height: 1px;"></iframe>'].join(''));

		
		
		}
	});
})(CF,jQuery);