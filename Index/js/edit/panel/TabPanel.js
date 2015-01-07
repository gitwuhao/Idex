(function(CF,$){

	$.push({
		_name_ : 'TabPanel',
		_items_:[
			{
				type:'layout',
				key : 'F7',
				title : '布局'
			},{
				type:'property',
				key : 'F7',
				title : '属性'
			},'|',{
				type:'history',
				key : 'F6',
				title : '历史记录'
			},/*{
				type:'info'
			},'|',*/{
				type:'image',
				key : 'F9',
				title : '图片验证'
			},'|',{
				type:'browse',
				key : 'F10',
				title : '预览'
			},/*{
				type:'fullscreen'
			},'|',*/{
				type:'exportps',
				key : 'F4',
				title : '导出'
			},{
				type:'save',
				key : 'S',
				ctrlKey : true,
				title : '保存'
			},/*{
				type:'publish',
				title : '发布'
			},*/'|',{
				type:'guide',
				key : 'F1',
				title : '指南'
			}
		],
		itemsMap : {},
		minWidth : 500,
		initModule : function(){
			this.logger(this);
			var i=0,
				item,
				html=['<div class="idex-right-panel border-box collapse uns">',
						'<div class="idex-panel-title">',
							'<div class="idex-button collapse">',
								'<div class="idex-icon"></div>',
							'</div>',
							/*
							'<div class="idex-button help">',
								'<div class="idex-icon"></div>',
							'</div>',
							*/
						'</div>',
						'<div class="idex-panel-icon-box">'];

			while(item=this._items_[i++]){
				if(item.type){
					html.push('<div class="idex-icon-',item.type,' idex-icon-button" title="',item.title,'">',
								'<div class="idex-icon"></div>',
							  '</div>');
				}else{
					html.push('<div class="splitline"></div>');
				}
			}
			html.push(	'</div>',
						'<div class="idex-panel-box uns">',
						'</div>',
					'</div>');

			var div=$.createElement(html.join(''));
			this.$panel=$(div);


			this.$iconPanel=this.$panel.children('.idex-panel-icon-box:first');

			var list=this.$iconPanel.children();

			i=0;
			while(list[i]){
				item=this._items_[i];
				if(item.type){
					item.$elem=$(list[i]);
					this._bindItemEvent_(item);
				}
				i++;
			}

			this.$panelTitle=this.$panel.children('.idex-panel-title:first');

			var collapseIcon={
				type : 'collapse',
				$elem : this.$panelTitle.children('.collapse:first')
			};

			this._items_.push(collapseIcon);


			this._bindItemEvent_(collapseIcon);
/*
			
			var helpIcon={
				type : 'help',
				$elem : this.$panelTitle.children('.help:first')
			};

			this._items_.push(helpIcon);


			this._bindItemEvent_(helpIcon);

*/
			this.$tabPanel=this.$panel.children('.idex-panel-box:first');


			this.app.$body.append(div);

			div=$.createElement('<div class="idex-float-box idex-panel-box  border-box uns"></div>');

			this.$floatPanel=$(div);

			this.app.$body.append(div);

			this.initEvents();

			//this.getItem('browse').$elem.children('.idex-icon').wrap('<a href="'+this.app.href+'browse.html" target="_ide_browse_" style="cursor:default;"></a>');
		},
		_bindItemEvent_ : function(item){
			this.logger(this);
			var me=this;
			var icon=item.type;
			this._items_[icon]=item;
			
			var _icon_=icon;
			if(icon=='collapse'){
				_icon_='togglepanel';
			}
			
			item.$elem.click({
				tabpanel : this,
				icon : _icon_,
			},function(event){
				var data=event.data;
				var icon=data.icon;
				data.tabpanel.trigger(icon,icon);
			});

			this.app.triggerHelpHandle(item.$elem,{
				type : 'right-panel-icon',
				content : 'icon',
				name : item.type.toLowerCase(),
				target : item.$elem[0],
				align : 'lc',
				offset : 'lt'
			});

			item.$elem.bindHover();

			this.itemsMap['_'+icon+'_']=item;
		},
		getItem:function(icon){
			return this.itemsMap['_'+icon+'_'];
		},
		setCurrentTabPanel:function(item){
			if(this.currentItem){
				this.currentItem.$elem.removeClass('selected');
				var panel=this.getIconPanel(this.currentItem);
				panel.hide();
			}
			if(item==this.currentItem){
				this.currentItem=null;
			}else{
				this.currentItem=item;
				if(item){
					item.$elem.removeClass('hover');
					item.$elem.addClass('selected');
					this.restTabPanelOffset(item);
				}
			}
		},
		getIconPanel : function(item){
			return this.app[item.tabPanelName];
		},
		restTabPanelOffset:function(item){
			var panel=this.getIconPanel(this.currentItem);

			panel.show();

			var offset=item.$elem.offsetBody();
			offset.left=this.$panel.offsetBody().left;
			offset.right=window.innerWidth-offset.left;
			offset.bottom=window.innerHeight-offset.top;

			panel.resetOffset(offset);

		},
		onKeyDown : function(event){
			this.logger(this);
			if(this.lastTimestamp && this.lastTimestamp + 500 > event.timeStamp){
				return;
			}
			if(event.keyCode>=112 && event.keyCode<=123){
			
			}else if(event.keyCode>=65 && event.keyCode<=90 && (event.ctrlKey || event.altKey || event.shiftKey)){
			
			}else{
				return;
			}
			var i=0,
				item,
				keyCode,
				isKey=false,
				icon;
			while(item=this._items_[i++]){
				var keyCode=this.app.KeyMap[item.key];
				if(item.ctrlKey && item.altKey){
					if(event.ctrlKey && event.altKey && event.keyCode==keyCode){
						isKey=true;
					}
				}else if(item.ctrlKey){
					if(event.ctrlKey && event.keyCode==keyCode){
						isKey=true;
					}
				}else if(item.altKey){
					if(event.altKey && event.keyCode==keyCode){
						isKey=true;
					}
				}else if(event.keyCode==keyCode){
					isKey=true;
				}
				if(isKey){
					icon=item.type;
					break;
				}
			}
 
			if(icon){
				this.lastTimestamp=event.timeStamp;
				$.setTimeout(function(){
					this.trigger(icon,icon);
				},100,this);
				return false;
			}
		},
		initEvents:function(){

			this.app.addEventListener('keydown',function(event){
				return this.TabPanel.onKeyDown(event);
			});

			this.app.addEventListener('resize',function(){
				var width=window.innerWidth;
				var height=window.innerHeight;
				if(height>500){
					var isCollapse=this.TabPanel.getItem('collapse').isCollapse;
					if(isCollapse!=true){
						this.LayoutPanel.trigger('resize',width,height);
						this.TabPanel.trigger('resize',width,height);
					}
					this.ViewPanel.trigger('resize',width,height);
					document.body.style.height=height+'px';
				}else{
					document.body.style.height='500px';
				}
				ui.popu.removeCurrentPopu();
			});

			this.app.addEventListener('readyafter',function(event){
				this.TabPanel.trigger('expand');
			});

			
			this.app.addEventListener('cleanfloatpanel',function(event){
				this.TabPanel.setCurrentTabPanel(null);
			});		

			this.addEventListener('resize',function(width,height){
				if(width < this.minWidth && this.isPanelHide!=true){
					this.$panel.hide();
					this.$floatPanel.hide();
					this.isPanelHide=true;
				}else if(width > this.minWidth && this.isPanelHide!=false){
					this.$panel.show();
					this.$floatPanel.show();
					this.isPanelHide=false;
				}
				//this.trigger('fullscreenstate');
			});

			this.addEventListener('togglepanel',function(){
				if(this.app.isLocked){
					return;
				}
				var item=this.getItem('collapse');
				if(!item.isCollapse){
					this.trigger('collapse');
				}else{
					this.trigger('expand');
				}
			});


			this.addEventListener('collapse',function(){
				var item=this.getItem('collapse');
				if(this.app.isLocked || item.isCollapse==true){
					return;
				}
				item.isCollapse=true;

				this.$panel.addClass('collapse');
				item.$elem.addClass('collapse');
				this.setCurrentTabPanel(null);
			});

			
			this.addEventListener('expand',function(){
				var item=this.getItem('collapse');
				if(this.app.isLocked || item.isCollapse==false){
					return;
				}
				item.isCollapse=false;

				this.$panel.removeClass('collapse');
				item.$elem.removeClass('collapse');
				this.setCurrentTabPanel(null);
				
				var width=window.innerWidth,
					height=window.innerHeight;
				this.app.LayoutPanel.trigger('resize',width,height);

			});


			if(this.getItem('fullscreen')){
				this.addEventListener('fullscreen',function(){
					var item=this.getItem('fullscreen');
					if (document.webkitFullscreenElement) {
						document.webkitCancelFullScreen();
					} else {
						document.body.webkitRequestFullScreen();
					};
					this.trigger('fullscreenstate');
				});

				this.addEventListener('fullscreenstate',function(){
					var item=this.getItem('fullscreen');
					if (document.webkitFullscreenElement) {
						item.$elem.addClass('idex-icon-revert');
					} else {
						item.$elem.removeClass('idex-icon-revert');
					};
				});
			}

			this.addEventListener('layout property',function(icon){
				if(this.app.isLocked){
					return;
				}
				this.trigger('togglepanel');
			});

			this.addEventListener('info image history',function(icon){
				if(this.app.isLocked){
					return;
				}
				var item=this.getItem(icon);
				if(!item.tabPanelName){
					if(item.type=='info'){
						item.tabPanelName='InfoPanel';
					}else if(item.type=='image'){
						item.tabPanelName='ImagePanel';
					}else if(item.type=='history'){
						item.tabPanelName='HistoryPanel';
					}
				}
				this.setCurrentTabPanel(item);
			});

			this.addEventListener('save browse exportps help guide',function(icon){
				this.on(icon);
			});

		},
		onBrowse:function(){
			if(this.app.isLocked){
				return;
			}
			this.app.isLocked=true;
			var html=this.app.ViewPanel.getAllHTML();
			localStorage.setItem('__browse_html__',html);
			var link = document.createElement('a');
			link.href = this.app.href+'browse.html';
			link.target ='_ide_browse_';
			link.click();
			this.app.isLocked=false;
		},
		onExportps:function(){
			if(this.app.isLocked){
				return;
			}

			this.app.isLocked=true;

			if(this.isExportPsIng){
				return;
			}
			
			var html=this.app.ViewPanel.getAllHTML(),
				_timers_=Date.now();
			if(this.lastFrameId && window[this.lastFrameId]){
				window[this.lastFrameId]();
			}
			
			var lastFrameId='ide_template_'+_timers_;

			this.lastFrameId=lastFrameId;

			var me=this;

			this.isExportPsIng=true;
			
			window[lastFrameId]=function(){
				$('#'+lastFrameId).remove();
				delete window[lastFrameId];
				ui.popu.removeMask();
				delete me.isExportPsIng;
				me.app.isLocked=false;
			};

			ui.popu.createMask();

			localStorage.setItem('__tops_callback__',lastFrameId);
			localStorage.setItem('__tops_html__',html);
			$.getBody().append('<iframe id="'+lastFrameId+'" src="tops.html" style="position: absolute;left: 0px;top: -1000px;width: 1px;height: 1px;"></iframe>');
		},
		onHelp : function(){
			console.info('help');
		},
		onGuide : function(){
			if(this.app.isLocked && this.app.isGuide){

			}else if(this.app.isLocked){
				return;
			}
			this.app.isLocked=true;
			this.app.isGuide=true;
			this.app.$eventElement.trigger('guide',{
				me : this,
				app : this.app,
				item : this.getItem('guide'),
				onShow : function(){
					this.app.$viewPanel.hide();
					this.me.trigger('collapse');
					this.me.$panel.hide();
				},
				onHide : function(){
					this.app.isLocked=false;
					delete this.app.isGuide;
					this.app.$viewPanel.show();
					this.me.$panel.show();
					this.me.trigger('expand');
				}
			});
		},
		onSave:(function(){
			var AnimationFrames=['-260px -0px','-260px -20px','-260px -40px'],
				isStop=false,
				index=0;
			function saveing($elem){
				if(index>2){
					index=0;
				}
				$elem.children().css('background-position',AnimationFrames[index++]);
				if(isStop!=true){
					setTimeout(function(){
						saveing($elem);
					},500);
				}else{
					$elem.children().css('background-position','');
				}
			};

			return function(){
				
				if(this.app.isSave){
					return;
				}
				this.app.isSave=true;
				
				var item=this.getItem('save');
				//item.$elem.addClass('idex-icon-saveing');
				isStop=false;
				saveing(item.$elem);
				$.setTimeout(function(){
					isStop=true;
					this.app.isSave=false;
				},5000,this);
			};
		})()
	});




})(CF,jQuery);