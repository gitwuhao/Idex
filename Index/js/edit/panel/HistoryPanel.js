(function(CF,$){

	function iconClickHandle(){
		this.$owner.$owner.on(this.cls);			
	};

	var __SUFFIX__='U'+$.randomChar(3);

	var __UNDO_INDEX__=parseInt((''+$.timestamp()).match(/(\d{4}$)/)[0]);

	
	var __SNAP__SUFFIX__='LS'+$.randomChar(3);

	var __SNAP_INDEX__=__UNDO_INDEX__ * 5;


	function getUndoID(){
		return (__UNDO_INDEX__ ++ )  + __SUFFIX__;
	};


	function getLocalSnapID(){
		return (__SNAP_INDEX__ ++ )  + __SNAP__SUFFIX__;
	};
	
	$.push({
		_isUIModule_:true,
		_className_ : 'FloatTabPanel',
		_name_ : 'HistoryPanel',
		autoRender:false,
		cls:'idex-history-tab-panel',
		bottombar:{
			items : [{
				cls:"snap",
				onClick : iconClickHandle
			},{
				cls:"del",
				onClick : iconClickHandle
			}]
		},
		items : [{
			cls:'history',
			active:true,
			label:'历史记录',
			html:['<div class="idex-cloud-snap-box"></div>',
				'<div class="idex-local-snap-box"></div>',
				'<div class="idex-undo-list-box"></div>'].join('')
		}],
		initModule : function(){
			this.logger(this);
			
			this.undo=ui.UndoManager.getInstance(20);

			this.createPanel();

			var me=this;
			

			this.undo.addEventListener('add',function(command){
				me.on('addUndo',command);
			});
			
			this.undo.addEventListener('redo',function(command){
				me.on('executeRedo',command);
			});

			this.undo.addEventListener('undo',function(command){
				me.on('executeUndo',command);
			});

			this.undo.addEventListener('execute',function(index,command,action){
				if(index==0 && action=='undo'){
					return false;
				}
			});

			this.undo.addEventListener('remove',function(commands){
				me.on('removeUndo',commands);
			});

			
			this.app.addEventListener('readyafter',function(event){
				me.on('appReadyAfter');
			});
		},
		onAppReadyAfter : function(){
			this.addUndo({
				undo : CF.emptyFunction,
				redo : CF.emptyFunction,
				type : 'open',
				title:'打开'
			});

			this.createSnap({
				title : '本地快照[默认]',
				id : getLocalSnapID(),
				context : this.app.ViewPanel.getOriginalHTML()
			});
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

			this.$cloudSnapBox.show();

		},
		addLocalSnapItem:function(item){
			this.logger(this);

			var	div=$.createElement(['<div class="idex-list-item idex-local-snap-item" id="',item.id,'">',
										'<div class="idex-list-item-icon idex-list-check-item check">',
											'<div class="idex-icon"></div>',
										'</div>',
										'<div class="idex-list-item-icon idex-snap-icon">',
											'<div class="idex-icon"></div>',
										'</div>',
										'<div class="idex-list-item-title">',item.title,'</div>',
									'</div>'].join(''));

			this.$localSnapBox.append(div);

			var $elem=$(div);
			
			$elem.children('.idex-list-check-item:first').click({
				panel : this,
				event : this.app.event,
				snapID : item.id
			},function(event){
				var data=event.data;
				event.data=null;
				data.panel.on('snapCheck',event,this,data.snapID);
			});
			
			$elem.click({
				panel : this,
				event : this.app.event
			},function(event){
				var data=event.data;
				event.data=null;
				data.panel.on('snapClick',event,this);
			});

			this.localsnapList[item.id]=item;

			this.$localSnapBox.show();

		},
		addUndoItem:function(command){
			this.logger(this);
			
			var	div=$.createElement(['<div class="idex-list-item idex-undo-item active" id="',command.id,'">',
										'<div class="idex-list-item-icon brush">',
											'<div class="idex-icon"></div>',
										'</div>',
										'<div class="idex-list-item-icon idex-undo-icon">',
											'<div class="idex-icon"></div>',
										'</div>',
										'<div class="idex-list-item-title">',command.title,'</div>',
									'</div>'].join(''));

			this.$undoListBox.append(div);

			$(div).click({
				panel : this
			},function(event){
				event.data.panel.on('executeUndoIndex',this);
			});
			this.$undoListBox.show();
		},
		onAddUndo:function(command){
			this.logger(this);
			
			command.app=this.app;
			command.id=getUndoID();

			this.addUndoItem(command);
			
			if(this.activeCommand){
				var item=this.app.get(this.activeCommand.id);
				var check=item.firstElementChild;
				$.removeClass(item,'active');
				$.removeClass(check,'brush');
				$.addClass(check,'check');
			}
			this.activeCommand=command;
			
			if(this.applySnapCommand!=command){
				this.applySnapCommand=null;
				this.on('deActiveLocalSnap');
			}
		},
		onExecuteRedo:function(command){
			this.logger(this);
			if(this.activeCommand){
				var item=this.app.get(this.activeCommand.id);
				$.removeClass(item,'active');
				$.removeClass(item.firstElementChild,'brush');
				$.addClass(item.firstElementChild,'check');
			}
			this.onExecuteAfter(this.undo.getCommand());
		},
		onExecuteUndo:function(command){
			this.logger(this);
			if(this.activeCommand){
				var item=this.app.get(this.activeCommand.id);
				$.addClass(item,'disabled');
				$.removeClass(item,'active');
				$.removeClass(item.firstElementChild,'brush');
				$.addClass(item.firstElementChild,'check');
			}
			this.onExecuteAfter(this.undo.getCommand());
		},
		onExecuteAfter : function(command){
			this.logger(this);
			if(command){
				var item=this.app.get(command.id);
				$.addClass(item,'active');
				$.removeClass(item,'disabled');
				$.addClass(item.firstElementChild,'brush');
				$.removeClass(item.firstElementChild,'check');
			}
			this.activeCommand=command;
			//this.app.trigger('contextUpdate');
			if(this.applySnapCommand && this.applySnapCommand!=command){
				this.applySnapCommand=null;
				this.on('deActiveLocalSnap');
			}else if(command.type == 'brushsnap'){
				this.applySnapCommand=command;
			}
		},
		onRemoveUndo:function(commands){
			this.logger(this);
			for(var i=0,len=commands.length;i<len;i++){
				var command=commands[i];
				var item=this.app.get(command.id);
				$(item).remove();
			}
		},
		onExecuteUndoIndex :function(element){
			this.logger(this);
			if(this.activeCommand && this.activeCommand.id==element.id){
				return;
			}
			var index=0;
			while(element.previousElementSibling){
				element=element.previousElementSibling;
				index++;
			}
			this.undo.execute(index);
		},
		onCreatePanel:function(){
			this.logger(this);
			this.disabled('del');
			var historyTab=this.getTab('history');
			var children=historyTab.$tabview.children();

			this.$localSnapBox=$(children[1]);
			this.localsnapList={};
			this.localSnapCount=0;
			this.localSnapQueue=-1;

			this.$undoListBox=$(children[2]);

		},
		onSnapCheck : function(event,target,snapID){
			this.logger(this);
			var snap=this.localsnapList[snapID];
			if(this.brushSnap==snap){
				return;
			}else if(this.brushSnap){
				this.on('deActiveBrush');
			}
			$.addClass(target,'brush');
			$.removeClass(target,'check');
			this.brushSnap=snap;
			
			this.app.ViewPanel.setHTML(snap.context);
		},
		onSnapClick : function(event,target){
			this.logger(this);
			var snap=this.localsnapList[target.id];
			if(this.activeSnap==snap){
				return;
			}else if(this.activeSnap){
				this.on('deActiveSnap');
			}
			$.addClass(target,'active');
			this.activeSnap=snap;
			this.enabled('del');
		},
		onDeActiveBrush:function(){
			this.logger(this);
			if(!this.brushSnap){
				return;
			}
			var item=this.app.get(this.brushSnap.id);
			var check=item.firstElementChild;
			$.removeClass(check,'brush');
			$.addClass(check,'check');
			this.brushSnap=null;
		},
		onDeActiveSnap:function(){
			this.logger(this);
			if(!this.activeSnap){
				return;
			}
			var item=this.app.get(this.activeSnap.id);
			$.removeClass(item,'active');
			this.activeSnap=null;
		},
		onDeActiveLocalSnap:function(){
			this.logger(this);
			this.on('deActiveBrush');
			this.on('deActiveSnap');
			this.disabled('del');
		},
		localSnapQueue : 0,
		onSnap : function(){
			this.logger(this);
			if(this.localSnapQueue==-1){
				this.localSnapQueue=0;
			}else{
				title='本地快照['+(this.localSnapQueue+1)+']';
			}
			this.createSnap({
				title : title,
				id : getLocalSnapID(),
				context : this.app.ViewPanel.getHTML()
			});
		},
		createSnap : function(snapItem){
			this.logger(this);
			
			if(this.localSnapCount>=5){
				return;
			}

			this.addLocalSnapItem(snapItem);

			this.localSnapCount++;
			this.localSnapQueue++;
			
			if(this.localSnapCount>=5){
				this.disabled('snap');
				return;
			}
		},
		onDel:function(){
			this.logger(this);
			if(this.activeSnap){
				if(this.localSnapCount>=5){
					this.enabled('snap');
				}
				this.localSnapCount--;
			
				var snapID=this.activeSnap.id;
				var item=this.app.get(snapID);
				$(item).remove();
				
				if(this.activeSnap==this.brushSnap){
					this.brushSnap=null;
				}
				this.activeSnap=null;
				delete this.localsnapList[snapID];
				
				if(this.localSnapCount==0){
					this.$localSnapBox.hide();
					this.localSnapQueue=1;
				}
				this.disabled('del');
			}
		},
		delLocalSnap:function(){
			this.logger(this);
			if(this.localSnapCount>=5){
				this.enabled('snap');
			}
		},
		addUndo : function(command){
			this.logger(this);
			this.undo.add(command);
		},
		getLastCommand:function(){
			this.logger(this);
			return this.undo.getLastCommand();
		},
		updateLastCommand:function(){
			this.logger(this);
			if(this.activeCommand){
				var item=this.app.get(this.activeCommand.id);
				while(item){
					$.removeClass(item,'active');
					$.removeClass(item.firstElementChild,'brush');
					$.addClass(item.firstElementChild,'check');
					item=item.nextElementSibling;
				}
			}
			var lastCommand=this.getLastCommand();
			this.undo.setCommandIndex(lastCommand);
			this.onExecuteAfter(lastCommand);
		},
		onShow : function(){
			var tabviewboxHeight=this.$tabviewbox.height();
			this.$tabviewbox.css('height',tabviewboxHeight);
		},
		onHide : function(){
			this.$tabviewbox.css('height','');
		}
	});	
	
})(CF,jQuery);