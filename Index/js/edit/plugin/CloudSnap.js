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
				
				$.setTimeout(function(){
					this.initCloudSnapList();
				},500,this);
			},
			addCloudSnapItem:function(item){
				this.logger(this);

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
					snapId : item.snapId
				},function(event){
					var data=event.data;
					event.data=null;
					data.panel.on('cloudSnapCheck',this,data.snapId);
				});
				
				$elem.click({
					panel : this,
					snapId : item.snapId
				},function(event){
					var data=event.data;
					event.data=null;
					data.panel.on('cloudSnapClick',this,data.snapId);
				});

				this.cloudsnapList[item.snapId]=item;
			},
			onCloudSnapCheck : function(target,snapID){
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

				var snapTitle ='应用快照【'+snap.title+'】';

				if(this.applySnapCommand){
					this.applySnapCommand.redoContext=snap.context;
					this.applySnapCommand._cloudSnap=snap;

					var item=this.get(this.applySnapCommand.id);
					if(item){
						$(item).children('.idex-list-item-title:first').html(snapTitle);
					}
				}else{
					this.applySnapCommand={
						title : snapTitle,
						type : 'brushsnap',
						undoContext: this.app.ViewPanel.getHTML(),
						redoContext: snap.context,
						_cloudSnap: snap,
						_$owner : this,
						undo : function(){
							this.app.ViewPanel.setHTML(this.undoContext);
						},
						redo : function(){
							if(this.redoContext){
								this.app.ViewPanel.setHTML(this.redoContext);
								return;
							}
							this._$owner.loadCloudSnapCode(this._cloudSnap,this.responseHandle,this);
						},
						responseHandle : function(html){
							this.redoContext=html;
							this._cloudSnap.context=html;
							this.app.ViewPanel.setHTML(html);
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
			loadCloudSnapCode : function(cloudSnap,callback,callback$owner){
				var html=this.getCloudSnapCodeData(cloudSnap.id);
				if(html){
					callback.call(callback$owner,html);
					return;
				}
				ui.popu.createLoading();

				
				var _temp_context = {
					_$owner : this,
					cloudSnapID : cloudSnap.snapId,
					callback : callback,
					callback$owner : callback$owner,
				};
				$.ajax({
					url:'/module.s',
					data : 'method=getCode&_t=4&id='+cloudSnap.snapId,
					type : 'POST',
					dataType : 'text',
					success : function(response_html){
						if(response_html){
							_temp_context._$owner.saveCloudSnapCodeData(_temp_context.cloudSnapID,response_html);
							_temp_context.callback.call(_temp_context.callback$owner,response_html);
						}
					},
					error : function(){
						
					},
					complete : function(){
						$.setTimeout(function(){
							ui.popu.removeLoading();
						},1000);
					}
				});
			},
			CLOUD_CACHE_KEY : {
				SNAP_LIST : 'cloud_snap_list',
				SNAP_CODE : 'cloud_snap_code'
			},
			getCloudSnapListData : function(){
				return $.cache.get(this.CLOUD_CACHE_KEY.SNAP_LIST);
			},
			saveCloudSnapListData : function(json){
				$.cache.put(this.CLOUD_CACHE_KEY.SNAP_LIST,JSON.stringify(json),new Date());
			},
			getCloudSnapCodeData : function(id){
				return $.cache.get(this.CLOUD_CACHE_KEY.SNAP_CODE+'_'+id);
			},
			saveCloudSnapCodeData : function(id,html){
				var date=new Date();
				date.addDays(7);
				$.cache.put(this.CLOUD_CACHE_KEY.SNAP_CODE+'_'+id,html,date);
			},
			initCloudSnapList : function(){
				if(this.getCloudSnapListData()){
					this.buildCloudSnapList();
					return;
				}
				this.loadCloudSnapList();
			},
			loadCloudSnapList : function(){
				$.ajax({
					url:'/module.s',
					data : 'method=query&_t=4&numIID='+this.app.data.id,
					type : 'POST',
					_$owner : this,
					dataType : 'jsonp',
					jsonpCallback : $.getJSONPName(),
					success : function(json){
						if(json && json.length>0){
							this._$owner.saveCloudSnapListData(json);
							this._$owner.buildCloudSnapList();
						}
					},
					error : function(){
						if(this._config && this._config.error){
							this._config.error();
						}
					}
				});
			},
			buildCloudSnapList : function(){
				var array,
					json=this.getCloudSnapListData();
				if(!json){
					array=[];
				}else{
					array=JSON.parse(json);
					this.$cloudSnapBox.show();
				}
				for(var i=0,len=array.length;i<len;i++){
					var item=array[i];
					item.snapId=item.id;
					this.addCloudSnapItem(item);
				}
			},
			getShotTimeTitle : function(date){
				var today=new Date(),
					curdate=new Date(date.getTime()),
					_month = date.getMonth() + 1,
					_day = date.getDate(),
					_hours = date.getHours(),
					_minutes = date.getMinutes(),
					time,
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

				if(_hours<10){
					_hours='0'+_hours;
				}
				if(_minutes<10){
					_minutes='0'+_minutes;
				}
				time=_hours + ':' + _hours;

				//今天、昨天、前天
				if(today ==day){
					return time;
				}else if(today==day + 1){
					return  '昨天 '+time;
				}else if(today==day + 2){
					return  '前天 '+time;
				}else{
					return _month+'月'+_day+'日'+time;
				}
			}
		});
	}
});
})(CF,jQuery);