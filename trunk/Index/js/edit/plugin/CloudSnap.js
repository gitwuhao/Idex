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
				var div,
					$elem,
					html=['<div class="idex-list-item idex-cloud-snap-item" id="',item.id,'">',
							'<div class="idex-list-item-icon idex-list-check-item check">',
								'<div class="idex-icon"></div>',
							'</div>',
							'<div class="idex-list-item-icon idex-snap-icon">',
								'<div class="idex-icon"></div>',
							'</div>',
							'<div class="idex-list-item-title">',item.title,'</div>',
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
				console.info('onCloudSnapCheck');
			},
			onCloudSnapClick : function(target,snapID){
				this.logger(this);
				console.info('onCloudSnapClick');
			}
		});
 
	}
});
})(CF,jQuery);