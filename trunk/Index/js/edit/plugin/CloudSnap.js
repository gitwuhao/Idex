(function(CF,$){

var __SNAP__SUFFIX__='CS'+$.randomChar(3);

var __UNDO_INDEX__=parseInt((''+$.timestamp()).match(/(\d{4}$)/)[0]);

var __SNAP_INDEX__=__UNDO_INDEX__ * 5;

function getCloudSnapID(){
	return (__SNAP_INDEX__ ++ )  + __SNAP__SUFFIX__;
};

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
					ctime : '2014-12-31 00:00:00',
					title : '09月12日'
				});
				this.addCloudSnapItem({
					id : '10001',
					ctime : '2014-12-30 00:00:00',
					title : '前天18:01'
				});
				this.addCloudSnapItem({
					id : '10002',
					ctime : '2014-12-02 00:00:00',
					title : '昨天19:01'
				});
				this.$cloudSnapBox.show();
			},
			addCloudSnapItem:function(item){
				this.logger(this);
				item._id=item.id;

				item.id=getCloudSnapID();
				
				item.title=this.getShotTimeTitle(new Date(Date.parse(item.ctime)-Date.ONE_DAY_OF_MILLISECONDS));

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
					id : item._id
				},function(event){
					var data=event.data;
					event.data=null;
					data.panel.on('cloudSnapCheck',this,data.id);
				});
				
				$elem.click({
					panel : this,
					id : item._id
				},function(event){
					var data=event.data;
					event.data=null;
					data.panel.on('cloudSnapClick',this,data.id);
				});

				this.cloudsnapList[item._id]=item;
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
						_cloudSnap: snap,
						undo : function(){
							this.app.ViewPanel.setHTML(this.undoContext);
						},
						redo : function(){
							if(this.redoContext){
								this.onRedoViewPanelHTML();
								return;
							}
						},
						responseHandle : function(){
							
						},
						onRedoViewPanelHTML : function(){
							this.app.ViewPanel.setHTML(this.redoContext);
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
			},
			getCloudSnapCode : function(cloudSnap,callback){
				$.ajax({
					url:'/module.s',
					data : 'method=getCode&_t=4&id='+cloudSnap.id,
					type : 'POST',
					dataType : 'text',
					success : function(response_html){
						callback(response_html);
					},
					error : function(){
						
					}
				});
			},
			getCloudSnapList : function(){
				$.ajax({
					url:'/module.s',
					data : 'method=query&_t=4&numIID=132676017',
					type : 'POST',
					_$owner : this,
					dataType : 'jsonp',
					jsonpCallback : $.getJSONPName(),
					success : function(json){
						
					},
					error : function(){
						if(this._config && this._config.error){
							this._config.error();
						}
					}
				});
			},
			getShotTimeTitle : function(date){
				var today=new Date(),
					curdate=new Date(date.getTime()),
					_month = date.getMonth() + 1,
					_day = date.getDate(),
					_hours = date.getHours(),
					_minutes = date.getMinutes(),
					day;
				
				today.setHours(0);
				today.setMinutes(0);
				today.setSeconds(0);
				today.setMilliseconds(0);

				curdate.setHours(0);
				curdate.setMinutes(0);
				curdate.setSeconds(0);
				curdate.setMilliseconds(0);

				today=((today.getTime()/Date.ONE_DAY_OF_MILLISECONDS)+"").split('.');

				day=((curdate.getTime()/Date.ONE_DAY_OF_MILLISECONDS)+"").split('.');
			
				today=parseInt(today[0]);
				
				day=parseInt(day[0]);

				//今天、昨天、前天
				if(today==day){
					if(_hours<10){
						_hours='0'+_hours;
					}
					if(_minutes<10){
						_minutes='0'+_minutes;
					}
					return _hours + ':' + _minutes;
				}else if(today==day + 1){
					return  '昨天';
				}else if(today==day + 2){
					return  '前天';
				}else{
					return _month+'月'+_day+'日';
				}
			}
		});
	}
});
})(CF,jQuery);