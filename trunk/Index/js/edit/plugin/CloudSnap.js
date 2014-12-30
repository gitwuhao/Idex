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
					title : '2014-09-12【系统】'
				});
				this.addCloudSnapItem({
					id : '10001',
					title : '前天18:01【系统】'
				});
				this.addCloudSnapItem({
					id : '10002',
					title : '昨天19:01【系统】'
				});
				this.$cloudSnapBox.show();
			},
			addCloudSnapItem:function(item){
				this.logger(this);

				var	div=$.createElement(['<div class="idex-list-item idex-cloud-snap-item">',
											'<div class="idex-list-item-icon check">',
												'<div class="idex-icon"></div>',
											'</div>',
											'<div class="idex-list-item-icon idex-snap-icon">',
												'<div class="idex-icon"></div>',
											'</div>',
											'<div class="idex-list-item-title">',item.title,'</div>',
										'</div>'].join(''));

				this.$cloudSnapBox.append(div);

				var $elem=$(div);
				
				item.$elem=$elem;

				var itemId=item.id;
				var me=this;
				$elem.children('.check:first').click({
					panel : this,
					id : itemId
				},function(event){
					var id=event.data.id;
					console.info('cloud snap check');
					event.stopBubble();
				});
				
				$elem.click({
					panel : this,
					id : itemId
				},function(event){
					var id=event.data.id;
					console.info('cloud snap title');
				});
				
				this.cloudsnapList[item.id]=item;

				//this.$cloudSnapBox.show();

			}
		});
 
	}
});
})(CF,jQuery);