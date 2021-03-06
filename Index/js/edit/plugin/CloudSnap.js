(function(CF,$){

var KEY_MAP=window.APP_KEY_MAP,
	ACTION_KEY_MAP=KEY_MAP.ACTION,
	CLOUD_CACHE_KEY = {
		SNAP_LIST : 'cloud_snap_list',
		SNAP_CODE : 'cloud_snap_code'
	},
	__SNAP__SUFFIX__='CS'+$.randomChar(3),
	__UNDO_INDEX__=parseInt((''+$.timestamp()).match(/(\d{4}$)/)[0]),
	__SNAP_INDEX__=__UNDO_INDEX__ * 5;


function getCloudSnapID(){
	return (__SNAP_INDEX__ ++ )  + __SNAP__SUFFIX__;
};

$.push({
	overwrite : function(app){
		var HistoryPanel=app._module_map_.HistoryPanel;
		CF.merger(HistoryPanel,this.config);
	},
	config :  {
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
			
			item.title=this.getShotTimeTitle(new Date(Date.parseStr(item.ctime)-Date.ONE_DAY_OF_MILLISECONDS));

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
					undo : function(){
						this.app.ViewPanel.setHTML(this.undoContext);
					},
					redo : CF.emptyFunction
				};
				this.addUndo(this.applySnapCommand);
			}

			CF.merger(this.applySnapCommand,{
				_$owner : this,
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
			});

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
			$.loadText({
				url:'/module.s',
				data : 'method=getCode&_t='+ACTION_KEY_MAP.SNAPSHOT+'&id='+cloudSnap.snapId,
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
		getCloudSnapListData : function(){
			return $.cache.get(CLOUD_CACHE_KEY.SNAP_LIST+'_'+this.app.data.id);
		},
		saveCloudSnapListData : function(json){
			$.cache.put(CLOUD_CACHE_KEY.SNAP_LIST+'_'+this.app.data.id,JSON.stringify(json),new Date());
		},
		getCloudSnapCodeData : function(id){
			return $.cache.get(CLOUD_CACHE_KEY.SNAP_CODE+'_'+id);
		},
		/*缓存生命周期为3天*/
		CACHE_MAX_AGE : 3,
		saveCloudSnapCodeData : function(id,html){
			var date=new Date();
			date.addDays(this.CACHE_MAX_AGE);
			$.cache.put(CLOUD_CACHE_KEY.SNAP_CODE+'_'+id,html,date);
		},
		initCloudSnapList : function(){
			if(this.getCloudSnapListData()){
				this.buildCloudSnapList();
				return;
			}
			this.loadCloudSnapList();
		},
		loadCloudSnapList : function(){
			$.jsonp({
				url:'/module.s',
				data : 'method=query&_t='+ACTION_KEY_MAP.SNAPSHOT+'&numIID='+this.app.data.id,
				_$owner : this,
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
				array=$.cache.parseJSON(json);
				this.$cloudSnapBox.show();
			}
			for(var i=0,len=array.length;i<len;i++){
				var item=array[i];
				item.snapId=item.id;
				this.addCloudSnapItem(item);
			}
		}
	}
});
})(CF,jQuery);