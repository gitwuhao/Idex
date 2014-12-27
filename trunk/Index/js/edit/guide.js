(function(CF,$){
	function GUIDE(){};

	var guide=new GUIDE();
	
	function get(eid){
		return document.getElementById(eid);
	}
	CF.merger(guide,{
		css:{
			sizingIn : 'ani-sizingIn',
			sizingOut : 'ani-sizingOut'
		},
		$eventElement : $('.idex-event-listener'),
		/*
			target:
			className:
			style:
			callback:
			scope:
			time:
		*/
		animationTimeout : 1200,
		runAnimation : function(config){
			if(!config.$target){
				console.error('animation config is not $target:',config);
			}

			config.time=config.time||this.animationTimeout;

			if(config.style && config.isClean!=false){
				config.oldStyle=config.$target.attr('style');
				config.$target.attr('style',config.style);
			}
			if(config.className){
				config.$target.addClass(config.className);
			}
			$.setTimeout(function(){
				if(this.callback){
					this.callback();
				}
				if(this.isClean!=false){
					if(this.style){
						this.$target.attr('style',this.oldStyle);
					}
					if(this.className){
						this.$target.removeClass(this.className);
					}
				}
			},config.time,config);
		},
		init : function(){
			this.helpInstance=this.$eventElement.data('helpInstance');
			this.init=CF.emptyFunction;
		},
		create:function(userConfig){
			if(this.userConfig){
				return;
			}
			this.init();
			ui.UndoManager.stop();
			
			ui.popu.createMask();

			var div,
				tempConfig={},
				html=['<div class="idex-g-box uns">',
						'<div class="idex-g-mask"></div>',
						'<div class="idex-g-view-box">',
							'<div class="idex-g-nav-list">'],
				items=[{
					type:'shortcut',
					title:'快捷键'
				},{
					type:'workflow',
					title:'工作流程'
				},{
					type:'helpinfo',
					title:'提示信息'
				}];


			for(var i=0,len=items.length;i<len;i++){
				var item=items[i];
				html.push('<div class="idex-g-nav-item ',item.type,'">',item.title,'</div>');
			}

			tempConfig.items=items;

			html.push(		'</div>',
							'<div class="idex-g-exitbutton">x</div>',
							'<div class="idex-g-view-panel">',
							'</div>',
						'</div>',
					  '</div>');

			div=$.createElement(html.join(''));

			$.getBody().append(div);

			tempConfig.$guidebox=$(div);

			tempConfig.$guideMask=$(div.firstElementChild);

			tempConfig.$viewBox=$(div.lastElementChild);

			tempConfig.$navList=tempConfig.$viewBox.children('.idex-g-nav-list');

			tempConfig.$viewPanel=tempConfig.$viewBox.children('.idex-g-view-panel');

			this.userConfig=userConfig;

			this.tempConfig=tempConfig;

			this.runAnimation({
				$target : tempConfig.$guideMask,
				className : this.css.sizingIn,
				me : this,
				callback : function(){
					this.me.show();
				}
			});

			$.it(tempConfig.$navList.children(),function(index,navItem){
				var item=this.tempConfig.items[index];
				item.target=navItem;
				item.$target=$(navItem);
				item.$target.click({
					me : this,
					item : item
				},function(event){
					var data=event.data;
					data.me.onNavItemClick(data.item);
				});
			},this);

			this.onNavItemClick(tempConfig.items[0]);

			tempConfig.$viewBox.children('.idex-g-exitbutton').click({
				me : this
			},function(event){
				$.setTimeout(function(){
					this.remove();
				},100,event.data.me);
				return false;
			});

			this.$eventElement.one('esc.one',{
				me : this
			},function(event){
				$.setTimeout(function(){
					this.remove();
				},100,event.data.me);
				return false;
			});

		},
		onNavItemClick : function(item){
			var activeItem=this.tempConfig.activeItem;
			if(item==activeItem){
				return;
			}else if(activeItem){
				this.hideItem(activeItem);
			}
			if(!item.$panel){
				this.on(item.type,item);
			}
			if(item.$panel){
				item.$target.addClass('active');
				item.$panel.show();
				this.on('show'+item.type.toFirstUpperCase(),item);
			}else{
				delete this.tempConfig.activeItem;
				return;
			}
			this.tempConfig.activeItem=item;
		},
		hideItem : function(item){
			item.$target.removeClass('active');
			item.$panel.hide();
			this.on('hide'+item.type.toFirstUpperCase(),item);
		},
		createPanel : function(item,html){
			if(item.$panel){
				return;
			}
			var tempConfig=this.tempConfig,
				div;

			div=$.createElement(html);

			tempConfig.$viewPanel.append(div);

			item.$panel=$(div);

		},
		onShortcut:function(item){
			var html=['<div class="idex-g-shortcut-box">',
						'<div class="top-key-box">',
							'<div class="idex-key-button">Esc`退出(窗口、弹出层)</div>',
							'<div class="idex-key-button">F1`操作指南</div>',
							'<div class="idex-key-button">F2`创建快照</div>',
							'<div class="idex-key-button">F4`导出布局</div>',
							'<div class="idex-key-button">F6`历史记录</div>',
							'<div class="idex-key-button">F7`展开`/`收起</div>',
							'<div class="idex-key-button">F9`图片验证</div>',
							'<div class="idex-key-button">F10`预览</div>',
							'<div class="idex-key-button">F11`全屏</div>',
						'</div>',
						'<div class="fixed-key-box">',
							'<div class="idex-key-button" style="left:160px;bottom:150px;">',
								'Ctrl`+`S`保存',
							'</div>',
							'<div class="idex-key-button" style="left:20px;bottom:80px;">',
								'Ctrl`+`Z`撤销',
							'</div>',
							'<div class="idex-key-button" style="left:20px;bottom:20px;">',
								'Alt`+`Ctrl`+`Z`撤销',
							'</div>',
							'<div class="idex-key-button" style="left:360px;bottom:220px;">',
								'Ctrl`+`Y`重做',
							'</div>',
							'<div class="idex-key-button" style="left:260px;bottom:20px;">',
								'Shift`+`Ctrl`+`Z`重做',
							'</div>',
							/*
							'<div class="idex-key-button" style="left:260px;bottom:80px;">',
								'Alt`+`Ctrl`+`X`重做',
							'</div>',
							'<div class="idex-key-button" style="left:660px;bottom:80px;">',
								'Up`上',
							'</div>',
							'<div class="idex-key-button" style="left:550px;bottom:20px;">',
								'Left`左',
							'</div>',
							'<div class="idex-key-button" style="left:660px;bottom:20px;">',
								'Down`下',
							'</div>',
							'<div class="idex-key-button" style="left:780px;bottom:20px;">',
								'Right`右',
							'</div>',
			*/
						'</div>',
					'</div>'].join('').formatHTML();

			this.createPanel(item,html);
		},
		onWorkflow:function(item){
			var html=['<div class="idex-g-workflow-box">',
						'<div class="idex-g-workflow-ball a"><em>1.</em><p>打开ide<br/>设计布局</p></div>',
						'<div class="idex-g-workflow-ball b"><em>2.</em><p>导出布局模板</p></div>',
						'<div class="idex-g-workflow-ball c"><em>3.</em><p>打开Ps<br/>导入布局模板<br/>制作图片</p></div>',
						'<div class="idex-g-workflow-ball d"><em>4.</em><p>运行ide自动切图脚本</p></div>',
						'<div class="idex-g-workflow-ball e"><em>5.</em><p>上传图片</p></div>',
					  '</div>'].join('');

			this.createPanel(item,html);
		},
		getQitpBoxHTML:function(qitp){
			var html=['<div class="idex-ui-qtip-box border-box uns ',(qitp.cls||''),'" ',
						'style="left:',qitp.left,'px;top:',qitp.top,'px;">',
						'<div class="idex-ui-qtip-content">'];
			if(qitp.i){
				html.push('<span class="a">',qitp.i,'.</span>');
			}
			html.push(		qitp.content,
						'</div>',
						'<div class="idex-ui-qtip-arrow-box">',
							'<div class="idex-ui-icon ',qitp.atype,'" style="',qitp.apoint,'"></div>',
						'</div>',
					'</div>');
			return html.join('');
		},
		onShowHelpinfo : function(){

			this.getMouse();

			this.resetMouse();

			var offset,
				helpinfo,
				tempConfig=this.tempConfig;

			helpinfo=tempConfig.helpinfo;

			tempConfig.$mouseBg.css({
				top: '300px',
				left: '450px',
				display: 'block'
			});
			
			offset=$('.idex-icon-history',helpinfo.$panel).offset();

			tempConfig.$cursorDefault.css({
				top: offset.top + 10,
				left: offset.left + 10,
				display: 'block'
			});

			tempConfig.$guideMouse.show();

			tempConfig.$mouseRightKey.show();

			this.showHelpInfoPrev();
		},
		onHelpinfo : function (item){
			var html=['<div class="idex-g-helpinfo-box">',
						'<div class="idex-right-panel border-box uns"><div class="idex-panel-title"><div class="idex-button"><div class="idex-icon"></div></div></div><div class="idex-panel-icon-box"><div class="idex-icon-layout idex-icon-button"><div class="idex-icon"></div></div><div class="idex-icon-property idex-icon-button"><div class="idex-icon"></div></div><div class="splitline"></div><div class="idex-icon-history idex-icon-button hover"><div class="idex-icon"></div></div><div class="idex-icon-checkimage idex-icon-button"><div class="idex-icon"></div></div><div class="splitline"></div><div class="idex-icon-browse idex-icon-button"><div class="idex-icon"></div></div><div class="idex-icon-exportps idex-icon-button"><div class="idex-icon"></div></div><div class="idex-icon-save idex-icon-button"><div class="idex-icon"></div></div><div class="splitline"></div><div class="idex-icon-guide idex-icon-button"><div class="idex-icon"></div></div></div><div class="idex-panel-box uns"><div class="idex-tab-panel idex-layout-tab-panel border-box"><div class="idex-tabbar-box"><div class="idex-tabbar-tag selected">布局</div></div><div class="idex-topbar-box"><div class="idex-toolbar-box border-box"><div class="idex-toolbar-button-box"><div class="idex-button home idex-icon-button"><div class="idex-icon"></div></div><div class="idex-button back idex-icon-button disabled"><div class="idex-icon"></div></div></div><div class="idex-toolbar-popup-box"></div></div></div><div style="height: 178px;" class="idex-tabview-box"><div class="idex-tabview layout"><div class="idex-layout-navlist-box container-navlist"><div class="idex-list-item container-item active"><div class="idex-list-item-icon eye"><div class="idex-icon"></div></div><div class="idex-layout-icon">740`x`840</div><div class="idex-list-item-title">宝贝描述</div><div class="idex-list-item-sortbar"><div class="idex-button up disabled"><div class="idex-icon"></div></div><div class="idex-button down"><div class="idex-icon"></div></div></div></div><div class="idex-list-item container-item"><div class="idex-list-item-icon eye"><div class="idex-icon"></div></div><div class="idex-layout-icon">740`x`641</div><div class="idex-list-item-title">搭配单品</div><div class="idex-list-item-sortbar"><div class="idex-button up"><div class="idex-icon"></div></div><div class="idex-button down"><div class="idex-icon"></div></div></div></div></div></div></div><div class="idex-bottombar-box"><div class="idex-toolbar-box border-box"><div class="idex-toolbar-button-box"><div class="idex-button saveas idex-icon-button"><div class="idex-icon"></div></div><div class="idex-button copy idex-icon-button"><div class="idex-icon"></div></div><div class="idex-button new idex-icon-button"><div class="idex-icon"></div></div><div class="idex-button del idex-icon-button"><div class="idex-icon"></div></div></div><div class="idex-toolbar-popup-box"></div></div></div></div><div class="idex-tab-panel idex-property-tab-panel border-box"><div class="idex-tabbar-box"><div class="idex-tabbar-tag selected">属性</div></div><div class="idex-tabview-box"><div class="idex-tabview property"><div class="idex-ui-property-disabled-panel"></div><div style="display:block;" class="idex-ui-property-panel"><form class="idex-ui-property-form" autocomplete="off"><div style="width:165px;" class="idex-ui-text idex-ui-item-field"><table><tbody><tr><td class="idex-ui-label">宽度：</td><td class="idex-ui-label-padding"></td><td class="idex-ui-item-field"><div class="idex-ui-text-box"><table><tbody><tr><td class="idex-ui-textfield"><input value="750" type="text" readonly=""></td><td class="idex-ui-icon idex-ui-unit">px</td></tr></tbody></table></div></td></tr></tbody></table></div><div class="idex-ui-item-text"></div><div style="width:50px;" class="idex-ui-checkbox idex-ui-item-field"><div class="idex-ui-checkbox-group checked"><input class="idex-ui-icon" type="text"><span>边距</span></div></div><div class="idex-ui-text idex-ui-item-field"><table><tbody><tr><td class="idex-ui-label">编号：</td><td class="idex-ui-label-padding"></td><td class="idex-ui-item-field"><div class="idex-ui-text-box"><div class="idex-ui-textfield"><input placeholder="填写数字和字母组成的编号" type="text" readonly=""></div></div></td></tr></tbody></table></div><div class="idex-ui-text idex-ui-item-field"><table><tbody><tr><td class="idex-ui-label">名称：</td><td class="idex-ui-label-padding"></td><td class="idex-ui-item-field"><div class="idex-ui-text-box"><div class="idex-ui-textfield"><input placeholder="填写描述名称" type="text" readonly=""></div></div></td></tr></tbody></table></div><div class="idex-ui-text idex-ui-item-field"><table><tbody><tr><td class="idex-ui-label">主图：</td><td class="idex-ui-label-padding"></td><td class="idex-ui-item-field"><div class="idex-ui-text-box"><div class="idex-ui-textfield"><input placeholder="填写图片地址" type="text" readonly=""></div></div></td></tr></tbody></table></div><div class="idex-ui-breakline"></div><div class="idex-ui-radio idex-ui-item-field idex-ui-color-radio-group breakline"><table><tbody><tr><td class="idex-ui-label">配色：</td><td class="idex-ui-label-padding"></td><td class="idex-ui-item-field"><div style="background-color:#2E2E2E;" class="idex-ui-radio-group"></div><div style="background-color:#49A0E1;" class="idex-ui-radio-group"></div><div style="background-color:#5ACAE0;" class="idex-ui-radio-group"></div><div style="background-color:#7B62A1;" class="idex-ui-radio-group"></div><div style="background-color:#89B41E;" class="idex-ui-radio-group"></div><div style="background-color:#93D500;" class="idex-ui-radio-group"></div><div style="background-color:#A6A6A6;" class="idex-ui-radio-group"></div><div style="background-color:#A68DD9;" class="idex-ui-radio-group"></div><div style="background-color:#B39D63;" class="idex-ui-radio-group"></div><div style="background-color:#CAA6A9;" class="idex-ui-radio-group"></div><div style="background-color:#F06090;" class="idex-ui-radio-group"></div><div style="background-color:#F0C060;" class="idex-ui-radio-group"></div><div style="background-color:#FC7100;" class="idex-ui-radio-group"></div><div style="width: 14px;height: 14px;background-color: #49A0E1;margin-top: 1px;" class="idex-ui-color idex-ui-item-field idex-ui-text radio-color"></div></td></tr></tbody></table></div><div style="width:auto;" class="idex-ui-radio idex-ui-item-field breakline"><table><tbody><tr><td class="idex-ui-label">风格：</td><td class="idex-ui-label-padding"></td><td class="idex-ui-item-field"><div class="idex-ui-radio-group checked"><input value="style1" class="idex-ui-icon" type="text"><span>1</span></div><div class="idex-ui-radio-group"><input value="style2" class="idex-ui-icon" type="text"><span>2</span></div><div class="idex-ui-radio-group"><input value="style3" class="idex-ui-icon" type="text"><span>3</span></div><div class="idex-ui-radio-group"><input value="style4" class="idex-ui-icon" type="text"><span>4</span></div></td></tr></tbody></table></div></form></div></div></div></div></div></div>',
						'<div class="idex-key-button2 prev" style="left:350px;top:500px;display: none;">',
							'上`一`步',
						'</div>',
						'<div class="idex-key-button2 next" style="left:350px;top:500px;">',
							'下`一`步',
						'</div>',
					  '</div>'].join('').formatHTML(),
				$panel,
				helpinfo;
			
			this.createPanel(item,html);

			$panel=item.$panel;

			helpinfo={
				item : item,
				$panel : $panel,
				$prev : $panel.children('.prev'),
				$next : $panel.children('.next')
			};

			helpinfo.$prev.click({
				me : this
			},function(event){
				event.data.me.showHelpInfoPrev();
			});
			
			helpinfo.$next.click({
				me : this
			},function(event){
				event.data.me.showHelpInfoNext();
			});

			this.tempConfig.helpinfo=helpinfo;

			//this.showHelpInfoPrev();
			
		},
		onHideHelpinfo : function(item){
			
			var helpinfo,
				tempConfig=this.tempConfig;

			helpinfo=tempConfig.helpinfo;
			if(helpinfo.$prevbox){
				helpinfo.$prevbox.hide();
			}
			if(helpinfo.$nextbox){
				helpinfo.$nextbox.hide();
			}
			
			tempConfig.$guideMouse.hide();
		},
		showHelpInfoPrev : function(){
			var tempConfig=this.tempConfig,
				helpinfo;
			helpinfo=tempConfig.helpinfo;
			if(helpinfo.$prevbox){
				tempConfig.$guideMouse.show();
				helpinfo.$prevbox.show();
				if(helpinfo.$nextbox){
					helpinfo.$nextbox.hide();
				}
				helpinfo.$prev.hide();
				helpinfo.$next.show();
				return;			
			}
			var qitpList=[{
					left:'375',
					top:'90',
					atype:'right',
					apoint:'top: 30%;',
					content:'鼠标移动到按钮（输入框）上。'
				},{
					left:'220',
					top:'295',
					atype:'bottom',
					apoint:'left: 45%;',
					content:'按住&nbsp;<span class="e">Ctrl</span>&nbsp;键'
				},{
					left: '450',
					top: '245',
					atype:'bottom',
					apoint:'left: 43%;',
					content:'点击鼠标<span class="e">右键</span>'
				}],
				html=['<div class="idex-g-helpinfo-prev-box">',
							'<div class="idex-key-button active" style="position: fixed;top: 350px;left: 250px;">',
								'Ctrl',
							'</div>'/*,
							'<div class="idex-char-plus" style="position: fixed;top: 350px;left: 360px;">',
								'+',
							'</div>'*/
					  ],
				div,
				offset;
			
			for(var i=0,len=qitpList.length;i<len;i++){
				var qitp=qitpList[i];
				qitp.i=(i+1);
				qitp.cls='qitqueue';
				html.push(this.getQitpBoxHTML(qitp));
			}

			html.push('</div>');
			 
			div=$.createElement(html.join(''));

			helpinfo.$panel.append(div);

			helpinfo.$prevbox=$(div);


			//$('.qitqueue:first',div).addClass('ani-bounce ani-loop-play');

		},
		showHelpInfoNext : function(){
			var tempConfig=this.tempConfig,
				helpinfo;
			helpinfo=tempConfig.helpinfo;
			
			helpinfo.$prevbox.hide();
			tempConfig.$guideMouse.hide();
			//tempConfig.$mouseBg.hide();
			helpinfo.$prev.show();
			helpinfo.$next.hide();

			if(helpinfo.$nextbox){
				helpinfo.$nextbox.show();
				return;
			}
			var div,
				html=['<div class="idex-g-helpinfo-next-box">'];
			
			html.push(this.getQitpBoxHTML({
				cls:'helptip property-field right',
				left: '420',
				top: '320',
				atype:'right',
				apoint:'top:40%;',
				content: this.helpInstance.getInfo({
					content: 'viewpanel',
					name: 'width',
					type: 'property-field',
					xtype: 'ui.form.text'
				})
			}));

			html.push(this.getQitpBoxHTML({
				cls:'helptip',
				left: '370',
				top: '70',
				atype:'right',
				apoint:'top:35%;',
				content: this.helpInstance.getInfo({
					content: 'icon',
					name: 'history',
					type: 'right-panel-icon'
				})
			}));

			html.push(this.getQitpBoxHTML({
				cls:'helptip',
				left: '615',
				top: '295',
				atype:'right',
				apoint:'top:30%;',
				content: this.helpInstance.getInfo({
					content: 'layoutpanel',
					name: 'del',
					type: 'right-panel-icon'
				})
			}));

			html.push(this.getQitpBoxHTML({
				cls:'helptip',
				left: '705',
				top: '105',
				atype:'left',
				apoint:'top:20%;',
				content: this.helpInstance.getInfo({
					content: 'layoutpanel',
					name: 'back',
					type: 'right-panel-icon'
				})
			}));


			html.push(this.getQitpBoxHTML({
				cls:'helptip',
				left: '150',
				top: '200',
				atype:'right',
				apoint:'top:30%;',
				content: ['<div class="helpinfo">',
							'在右边的操作面板上的按钮、输入框和其它表单，',
							'都可以用<span class="a">Ctrl`+`鼠标右键</span>来查看相关的帮助信息。',
							'当鼠标移动时，帮助信息就自动隐藏了；',
							'所以帮助信息出来之后鼠标就不要动了。',
						  '</div>'].join('').formatHTML()
			}));

			html.push('</div>');

			
			div=$.createElement(html.join(''));

			helpinfo.$panel.append(div);

			helpinfo.$nextbox=$(div);

		},
		show:function(){
			ui.popu.removeMask();
			if(this.userConfig){
				this.userConfig.onShow();
			}
			if(this.tempConfig){
				this.tempConfig.$viewBox.show();
			}
		},
		remove:function(){
			if(!this.tempConfig){
				return;
			}
			this.$eventElement.off('.one');
			this.userConfig.onHide();


			ui.UndoManager.start();

			this.tempConfig.$viewBox.hide();

			this.runAnimation({
				$target : this.tempConfig.$guideMask,
				className : this.css.sizingOut,
				isClean: false,
				me : this,
				callback : function(){
					this.me.cleanConfig();
				}
			});

		},
		cleanConfig : function(){
			if(this.tempConfig){
				if(this.tempConfig.$guidebox){
					this.tempConfig.$guidebox.remove();
				}
				delete this.tempConfig;
			}
			delete this.userConfig;
		},
		resetMouse: function(){
			var tempConfig=this.tempConfig;
			if(tempConfig && tempConfig.$guideMouse){
				tempConfig.$guideMouse.hide();
				tempConfig.$mouseBg.hide();
				tempConfig.$mouseLeftKey.hide();
				tempConfig.$mouseRightKey.hide();
				tempConfig.$cursorDefault.hide();
				tempConfig.$cursorMove.hide();
				tempConfig.$cursorText.hide();
			}
		},
		getMouse: function(){
			if(!this.tempConfig || this.tempConfig.$guideMouse){
				return;
			}
			var html=['<div class="idex-g-mouse">',
							'<div class="idex-g-cursor-box">',
								'<div class="idex-g-icon cursor-default" style="top: 50px;left: 100px;"></div>',
								'<div class="idex-g-icon cursor-move" style="top: 50px;left: 150px;"></div>',
								'<div class="idex-g-icon cursor-text" style="top: 50px;left: 200px;"></div>',
							'</div>',
							'<div class="idex-g-icon mousebg" style="top: 100px;left: 100px;">',
								'<div class="idex-g-icon leftbutton"></div>',
								'<div class="idex-g-icon rightbutton"></div>',
							'</div>',
						'</div>'
					].join(''),
				tempConfig,
				div;

			tempConfig=this.tempConfig,
			div=$.createElement(html);

			tempConfig.$viewPanel.append(div);

			tempConfig.$guideMouse=$(div);

			tempConfig.$mouseBg=$('.mousebg',div);

			tempConfig.$mouseLeftKey=$('.leftbutton',div);
			tempConfig.$mouseRightKey=$('.rightbutton',div);

			tempConfig.$cursorDefault=$('.cursor-default',div);
			tempConfig.$cursorMove=$('.cursor-move',div);
			tempConfig.$cursorText=$('.cursor-text',div);

		}
	});

	CF.extendEventListener(guide);

	guide.$eventElement.on('guide',function(event,data){

		if(guide.lastTimestamp && guide.lastTimestamp + 2000 > event.timeStamp){
			return;
		}

		if(guide.userConfig){
			guide.remove();
		}else{
			guide.create(data);
			guide.lastTimestamp=event.timeStamp;
		}
	});
})(CF,jQuery);