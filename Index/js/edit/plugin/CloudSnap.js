(function(CF,$){
$.push({
	overwrite : function(app){
		var HistoryPanel=app._module_map_.HistoryPanel;
 
		CF.merger(HistoryPanel,{
			initPlugin : function(){
				var historyTab=this.getTab('history'),
					div=$.createElement('<div class="idex-cloud-snap-box"></div>');

				historyTab.$tabview.children(':first').before(div);
				
				this.$cloudSnapBox=$(div);
				this.cloudsnapList={};

				this.addCloudSnapItem({
					id : '10000',
					title : '09月12日'
				});
				this.addCloudSnapItem({
					id : '10001',
					title : '前天18:01'
				});
				this.addCloudSnapItem({
					id : '10002',
					title : '昨天19:01'
				});
				this.$cloudSnapBox.show();
			},
			addCloudSnapItem:function(item){
				this.logger(this);
				var div,
					$elem,
					html=['<div class="idex-list-item idex-cloud-snap-item" id="',item.id,'">',
							'<div class="idex-list-item-icon idex-list-check-item check">',
								'<div class="idex-icon"></div>',
							'</div>',
							'<div class="idex-list-item-icon idex-snap-icon">',
								'<div class="idex-icon"></div>',
							'</div>',
							'<div class="idex-list-item-title">云端快照【',item.title,'】</div>',
						'</div>'].join('');
				
				div=$.createElement(html);

				this.$cloudSnapBox.append(div);

				$elem=$(div);
				
				$elem.children('.idex-list-check-item:first').click({
					panel : this,
					id : item.id
				},function(event){
					var data=event.data;
					event.data=null;
					data.panel.on('cloudSnapCheck',this,data.id);
				});
				
				$elem.click({
					panel : this,
					id : item.id
				},function(event){
					var data=event.data;
					event.data=null;
					data.panel.on('cloudSnapClick',this,data.id);
				});

				this.cloudsnapList[item.id]=item;
			},
			onCloudSnapCheck : function(target,snapID){
				this.logger(this);
				this.logger(this);
				var snap=this.cloudsnapList[snapID];
				if(this.brushSnap==snap){
					return;
				}else if(this.brushSnap){
					this.on('deActiveBrush');
				}
				$.addClass(target,'brush');
				$.removeClass(target,'check');
				this.brushSnap=snap;

				if(this.applySnapCommand){
					this.applySnapCommand.redoContext=snap.context;
					var item=this.get(this.applySnapCommand.id);

					if(item){
						$(item).children('.idex-list-item-title:first').html('应用'+snap.title);
					}
				}else{
					this.applySnapCommand={
						title : '应用'+snap.title,
						type : 'brushsnap',
						undoContext: this.app.ViewPanel.getHTML(),
						redoContext: snap.context,
						undo : function(){
							console.info('云端快照【undo】...');
						},
						redo : function(){
							console.info('云端快照【redo】...');
						}
					};
					this.addUndo(this.applySnapCommand);
				}
				this.applySnapCommand.redo();

				this.setCommandCheckStyle(this.applySnapCommand);
			},
			onCloudSnapClick : function(target,snapID){
				this.logger(this);
				var snap=this.cloudsnapList[snapID];
				if(this.activeSnap==snap){
					return;
				}else if(this.activeSnap){
					this.on('deActiveSnap');
				}
				$.addClass(target,'active');
				this.activeSnap=snap;
				this.disabled('del');
			}
		});
 
	}
});
})(CF,jQuery);