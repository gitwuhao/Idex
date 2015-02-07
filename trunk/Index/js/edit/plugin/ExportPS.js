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
				onCloseAfter : function(){
					this.$owner.close();
				}
			});
			this.win.$owner = this;
			this.win.show();

			
			ui.popu.createInnerLoading({
				$elem : this.win.$body,
				css : {
					'margin': '10px auto 0px auto',
					'height': '100px',
					'width': '200px',
					'text-align': 'center',
					'overflow': 'hidden'
				}
			});
			
			//$.setTimeout(this.buildDownLoadLink,2000,this);

			this.initExportCanvas();
			
		},
		buildDownLoadLink : function(data){
			this.win.$body.html('<div class="idex-link-item ps-script"><a href="#s">切图脚本</a></div><div class="idex-link-item layout-pic"><a href="#i">布局模板</a></div>');

			var _links=$('a',this.win.$body),
				scriptLink,
				imageLink;
			if(/#s$/i.test(_links[0].href)){
				scriptLink=_links[0];
				imageLink=_links[1];
			}else{
				scriptLink=_links[1];
				imageLink=_links[0];
			}
			
			imageLink.href=data.imageData;
			imageLink.download = 'idex-'+data.type+'-'+data.id+'.png';


			scriptLink.href=data.jsxData;
			scriptLink.download = 'idex-'+data.type+'-'+data.id+'.jsx';

			this.win.$iframe.remove();

		},
		TO_PS_URL : '/tops.html',
		initExportCanvas : function(){
			var ViewPanel=this.app.ViewPanel,
				html,
				id,
				type;
			
			html=ViewPanel.getAllHTML();
			id=ViewPanel.data.id || Date.now();
			type=ViewPanel.data.type;

			this.dataHandleId='$g_e_d_'+id;
			this.iframeId='e_iframe_'+id;
			
			var me=this;

			window[this.dataHandleId]=function(){
				return {
					html : html,
					id : id,
					type : type,
					//imageData : 
					//jsxData : 
					callback : function(){
						me.buildDownLoadLink(this);
					}
				};
			};
			
			$.getBody().append(['<iframe id="',this.iframeId,'" src="',this.TO_PS_URL,'?fn=',this.dataHandleId,'" style="position: absolute;left: 0px;top: -1000px;width: 1px;height: 1px;"></iframe>'].join(''));

			this.win.$iframe=$(this.app.get(this.iframeId));
		},
		close:function(){
			this.logger(this);
			
			delete window[this.dataHandleId];

			this.win.callback.execute();
			this.win.remove();
			delete this.win;
		}
	});
})(CF,jQuery);