(function(CF,$){
	var getNavID,
		getLayoutID,
		getParentNavID,
		getNavListToLayoutID,
		__DESC_BOX_ID__,
		__INDEX__=parseInt('1'+(''+$.timestamp()).match(/(\d{3}$)/)[0]);
	(function(){

		var __SUFFIX__='N'+$.randomChar(2);

		var __LAYOUT__SUFFIX__=null;
		var __NAV_LIST_ID_INDEX__= __INDEX__ * 13;


		__DESC_BOX_ID__=(__INDEX__ * 23) + 'XDESC';


		getNavID=function (layoutID){
			if(!layoutID){
				return;
			}
			var array=layoutID.match(/(\d+)(\S+)/);
			if(__LAYOUT__SUFFIX__==null){
				__LAYOUT__SUFFIX__=array[2];
			}
			return (parseInt(array[1]) + __INDEX__ )  + __SUFFIX__;
		};

		getLayoutID=function (navID){
			if(!navID){
				return;
			}
			var array=navID.match(/(\d+)(\S+)/);
			return (parseInt(array[1]) - __INDEX__) + __LAYOUT__SUFFIX__;
		};

		getParentNavID=function (layoutID){
			if(!layoutID){
				return;
			}
			var array=layoutID.match(/(\d+)(\S+)/);
			return (parseInt(array[1]) + __NAV_LIST_ID_INDEX__)  + __SUFFIX__;
		};


		getNavListToLayoutID=function (navListID){
			if(!navListID){
				return;
			}
			var array=navListID.match(/(\d+)(\S+)/);
			return (parseInt(array[1]) - __NAV_LIST_ID_INDEX__)  + __LAYOUT__SUFFIX__;
		};
	})();


	var __NAV_ITEM_MAP__={};

	function iconClickHandle(){
		this.$owner.$owner.on(this.cls);
	};

	$.push({
		_isUIModule_:true,
		_className_ : 'TabPanel',
		_name_ : 'LayoutPanel',
		autoRender:false,
		cls:'idex-layout-tab-panel',
		topbar:{
			items : [{
				cls : "home",
				onClick : iconClickHandle
			},{
				isDisabled :true,
				cls : "back",
				onClick : iconClickHandle
			}]
		},
		bottombar:{
			items : [(CF.isDebug ? {
				cls:"code",
				onClick : iconClickHandle
			}: ''),{
				isDisabled :true,
				cls:"saveas",
				onClick : iconClickHandle
			},{
				isDisabled :true,
				cls:"copy",
				onClick : iconClickHandle
			},{
				cls:"new",
				onClick : iconClickHandle
			},{
				isDisabled :true,
				cls:"del",
				onClick : iconClickHandle
			}]
		},
		items : [{
			active:true,
			cls:'layout',
			label:'布局'
		}],
		initModule : function(){
			this.logger(this);

			this.createPanel();

			var tab=this.getTab('layout');

			this.$layoutTabView=tab.$tabview;

			this.initEvents();

		},
		__events__ : ['mousedown'].join(' '),
		initEvents : function(){
			this.logger(this);
			this.$layoutTabView.on(this.__events__,{
				panel : this,
				event : this.app.event
			},function(event){
				var data=event.data;
				event.data=null;
				if(data.event.removeTargetHandle(event)){
					return;
				}
				data.panel.eventDispatch(event,event.type);
			});

			this.tabviewbox=this.$tabviewbox[0];

			this.addEventListener('resize',function(width,height){
				if(this.tabviewbox.clientHeight<=0){
					return;
				}
				var propertyTabHeight=this.app.PropertyPanel.$elem.height();
				if(propertyTabHeight>200){
					this.tabviewbox.style.height=(height - propertyTabHeight - 60 - 17 - 6) + 'px';
				}
			});

			this.app.addEventListener('readyafter',function(event){
				this.LayoutPanel.onAppReadyAfter(event);
			});
			
			$.getBody().on('mousedown',{
				panel : this,
			},function(event){
				if(event.target==this){
					var panel=event.data.panel;
					panel.on('home');
				}
			});

/*
			this.app.$eventElement.on('home',{
				panel : this,
			},function(event){
				if(event.target==this){
					var panel=event.data.panel;
					panel.on('home');
				}
			});
*/
		},
		eventDispatch:function(event){
			this.logger(this);
			var target=event.target;
			var navItem=$(target).closest('.idex-list-item')[0];
			var eventtype=event.type;
			var timeStamp=event.timeStamp;
			if(!navItem){
				this.__event_target__=null;
				this.__event_timestamp__=null;
				return;
			}
			var check,eye,up,down
				parentElement=target.parentElement;
			if($.hasClass(target,'eye')){
				eye=target;
			}else if($.hasClass(parentElement,'eye')){
				eye=parentElement;
			}else if($.hasClass(target,'check')){
				check=target;
			}else if($.hasClass(parentElement,'check')){
				check=parentElement;
			}else if($.hasClass(parentElement,'up')){
				up=parentElement;
			}else if($.hasClass(parentElement,'down')){
				down=parentElement;
			}

			if(eye){
				this.on('hideLayout',navItem,eye);
			}else if(check){
				this.on('showLayout',navItem,check);
			}else if(up){
				this.on('up',navItem,up);
			}else if(down){
				this.on('down',navItem,down);
			}else if(this.activeNavItem!=navItem){
				this.on('click',event,navItem);
				this.on('mousedown',navItem);
			}else if(event.ctrlKey ||
				this.__event_target__==target &&
				this.__event_timestamp__  >= timeStamp - 500){

				this.on('dbClick',event,navItem);
				this.__event_target__=null;
				this.__event_timestamp__=null;
				return;
			}else{
				this.on('mousedown',navItem);
			}
			this.__event_target__=target;
			this.__event_timestamp__=timeStamp;
		},
		initMainNavList : function(){
			this.logger(this);
			this.__CONTAINER_LAYOUT__=this.app.layout.getLayout('container');
			this.descbox=this.app.$descBox[0];
			this.descbox.id=__DESC_BOX_ID__;
			this.createMainNavList();
		},
		onAppReadyAfter:function(){
			this.logger(this);
			
			this.initMainNavList();
			delete this.initMainNavList;
			
			var codeItem=this.getItem('code');
			if(codeItem){
				this.app.ZeroClipboard.bind({
					panel : this,
					target : codeItem.$elem[0],
					onMouseOver : function(event){
						this.$target.addClass('hover');
					},
					onMouseOut : function(event){
						this.$target.removeClass('hover');
					},
					onCopy : function(event){
						if(this.panel.activeLayout){
							ui.quicktip.show({
								time : 2000,
								html : '<span style="color: #F90;">代码复制成功</span>',
								px : 'idex-ui',
								offset : 'tl',
								align : 'tc',
								cls : 'qit-autosize copy-qit',
								target : this.target
							});
							return HTMLfilter.getOuterHTML(this.panel.activeElement,this.app.ViewPanel.__OUTPUT_RULES__);
						}
					}
				});
			}
		},
		createMainNavList:function(){
			this.logger(this);
			var navListId=getParentNavID(this.descbox.id);
			var layout=this.__CONTAINER_LAYOUT__;
			var list=layout.getAll(this.descbox.firstElementChild);
			var html=this.getNavListHTML(navListId,layout,list);
			this.$layoutTabView.append(html);
			this.bindItemSortBarHover(this.get(navListId));
			this.on('home');
		},
		onMousedown:function(navItem){
			this.logger(this);
			if(!this.activeLayout.isFixedLayout){
				this.bindNavItemSort(navItem);
			}
			this.activeLayout.srcollToActiveElement();
		},
		bindNavItemSort : function(navItem){
			this.logger(this);
			this.app.dragdrop.sort({
				panel : this,
				cls : 'idex-sort-ghost',
				target : navItem,
				event : event,
				parentBox : navItem.parentElement,
				isLockBody : true,
				onSort : function(element){
					var $element=$(element),
						offset=$element.offset(),
						event=this.event,
						target=this.target,
						type=null,
						$prev = $element.prev(),
						$next = $element.next(),
						prev=$prev[0],
						next=$next[0];
					if(offset.top + ($element.height()/2) < event.pageY){
						if(next!=target){
							type='after';
						}
					}else if(prev==null && element!=target){
						type='before';
					}
					if(type){
						//$element[type](target);
						
						if(this.$sortElement){
							this.$sortElement.removeClass('sort-after sort-before');
						}
						this.sortElement=element;
						
						this.$sortElement=$(this.sortElement);
						this.$sortElement.addClass('sort-'+type);

						this.appendType=type;
					}
					//ui.dragdrop.scrollTop(this.panel.tabviewbox,element);
				},
					/*
				onReplace : function(replaceElement){
					var targetElement=this.panel.getLayoutElementByNavItem(this.target),
						srcElement=this.panel.getLayoutElementByNavItem(replaceElement);
					this.panel.replaceLayout(srcElement,targetElement);
				},
				*/
				onSortover : function(){
					if(!this.sortElement){
						return;
					}
					
					this.$sortElement.removeClass('sort-after sort-before');

					var type=this.appendType,
						layoutElement,
						sortLayout;
						layoutElement=this.panel.getLayoutElementByNavItem(this.target),
						sortLayout=this.panel.getLayoutElementByNavItem(this.sortElement);
					this.panel.moveLayout(sortLayout,layoutElement,type);

				}
			});
		},
		onHome:function(){
			this.logger(this);
			if(this.getItem('home').isDisabled){
				return;
			}
			this.descbox.firstElementChild.click();
			this.disabled('home');
		},
		onBack:function(){
			this.logger(this);
			if(this.activeElement==null){
				var layout=this.get(getNavListToLayoutID(this.activeNavList.id));
				layout.click();
				return;
			}
			var parentLayout=this.activeLayout.getParentElement(this.activeElement);
			if(parentLayout){
				parentLayout.click();
			}
		},
		onSaveas:function(){
			this.logger(this);
			this.app.trigger('saveAsTemplate',{
				layout : this.activeLayout,
				title : this.getNavItemTitle(this.activeNavItem),
				html : this.activeLayout.getHTML(this.activeElement)
			});
		},
		onCopy:function(){
			this.logger(this);
			if(this.activeElement){
				if(this.activeLayout.on('copy',this.activeElement)!=false){
					var html=this.activeLayout.getHTML(this.activeElement);
					var element=this.activeLayout.after(this.activeElement,html);
					element.click();
					this.addNewLayoutUndo();
				}
			}
		},
		onNew:function(){
			this.logger(this);
			var target,
				parentLayout;

			if(this.activeLayout==this.__CONTAINER_LAYOUT__){
				parent=this.descbox;
				target=this.activeElement;
			}else if(this.activeLayout){
				parentLayout=this.activeLayout.getParentLayout(this.activeElement);
				target=this.activeElement;
			}else{
				var layoutID=getNavListToLayoutID(this.activeNavList.id);
				var layout=this.app.get(layoutID);
				if(layout){
					var item=this.app.layout.getItem(layout);
					parentLayout=item.layout;
					parent=layout;
				}
			}

			var me=this;
			this.app.trigger('getTemplate',{
				parentLayout : parentLayout,
				target : target,
				parent : parent,
				callback : function(template){
					if(!this.parentLayout){
						this.parentLayout=me.__CONTAINER_LAYOUT__;
					}
					var element;
					if(this.target){
						element=this.parentLayout.after(this.target,template.html);
					}else{
						element=this.parentLayout.append(this.parent,template.html);
					}
					template.layout.on('new',element[0]);
					element.click();
					me.addNewLayoutUndo();
				}
			});

		},
		addNewLayoutUndo : function(){
			this.logger(this);
			var activeLayout=this.activeElement,
				activeNavItem=this.activeNavItem,
				prev,
				next,
				parent,
				command;
			
			command={
				html : activeLayout.outerHTML,
				title : '新增'+this.getNavItemTitle(activeNavItem),
				type : 'add',
				layoutID : activeLayout.id,
				panel : this
			};
			prev=this.activeLayout.getPrevElement(activeLayout);
			next=this.activeLayout.getNextElement(activeLayout);

			if(prev && prev.id){
				command.prevID=prev.id;
			}else if(next && next.id){
				command.nextID=next.id;
			}else{
				parent=this.activeLayout.getParentElement(activeLayout);
				command.parentID=parent.id;
			}

			command.undo=function(){
				var layout=this.app.get(this.layoutID);
				layout.click();
				this.panel.on('delAction');
			};

			command.redo=function(){
				var item;
				if(this.parentID){
					item=this.app.layout.getItem(this.app.get(this.parentID));
					item.layout.append(item.target,this.html);
				}else if(this.prevID){
					item=this.app.layout.getItem(this.app.get(this.prevID));
					item.layout.after(item.target,this.html);
				}else if(this.nextID){
					item=this.app.layout.getItem(this.app.get(this.nextID));
					item.layout.before(item.target,this.html);
				}
				var elem=this.app.get(this.layoutID);
				elem.click();
			};

			this.app.HistoryPanel.addUndo(command);
		},
		onDel:function(){
			this.logger(this);
			if(!this.activeElement){
				return;
			}

			var activeLayout=this.activeElement;
			var activeNavItem=this.activeNavItem;
			var $target=$();
			$target.push(activeLayout);
			var command={
				html : activeLayout.outerHTML,
				title : '删除'+this.getNavItemTitle(activeNavItem),
				type : 'del',
				layoutID : activeLayout.id
			};

			var prev,
				next,
				parent;
			prev=this.activeLayout.getPrevElement(activeLayout);
			next=this.activeLayout.getNextElement(activeLayout);

			if(prev && prev.id){
				command.prevID=prev.id;
			}else if(next && next.id){
				command.nextID=next.id;
			}else{
				parent=this.activeLayout.getParentElement(activeLayout);
				command.parentID=parent.id;
			}

			this.on('delAction');

			command.undo=function(){
				var item;
				if(this.parentID){
					item=this.app.layout.getItem(this.app.get(this.parentID));
					item.layout.append(item.target,this.html);
				}else if(this.prevID){
					item=this.app.layout.getItem(this.app.get(this.prevID));
					item.layout.after(item.target,this.html);
				}else if(this.nextID){
					item=this.app.layout.getItem(this.app.get(this.nextID));
					item.layout.before(item.target,this.html);
				}
				var elem=this.app.get(this.layoutID);
				elem.click();
			};

			command.redo=function(){
				var layout=this.app.get(this.layoutID);
				layout.click();
				this.app.LayoutPanel.on('delAction');
			};

			this.app.HistoryPanel.addUndo(command);
		},
		onDelAction:function(){
			this.logger(this);
			var activeLayout=this.activeElement;
			var activeNavItem=this.activeNavItem;
			var $target=$();
			$target.push(activeLayout);

			var prev=this.activeLayout.getPrevElement(activeLayout);
			var next=this.activeLayout.getNextElement(activeLayout);
			var nextLayout;
			if(next){
				nextLayout=next;
			}else if(prev){
				nextLayout=prev;
			}

			this.removeNavItem(activeLayout);

			$target.remove();
			this.onDeActive();
			if(nextLayout){
				nextLayout.click();
			}
		},
		removeNavItem : function(targetElement){
			this.logger(this);
			var $target=$();
			var me=this;
			var _list_=$('[id]',targetElement);
			_list_.push(targetElement);
			_list_.each(function(index,elem){
				var navList=me.get(getParentNavID(elem.id));
				if(navList){
					$target.push(navList);
				}
			});
			var navItem=this.getNavItemByLayout(targetElement);
			if(navItem){
				$target.push(navItem);
			}
			$target.remove();
		},
		removeNavList : function(targetElement){
			this.logger(this);
			var navItem=this.getNavItemByLayout(targetElement);
			this.removeNavItem(navItem);
			if(navItem){
				var navList=$(navItem.parentElement);
				navList.remove();
			}
		},
		reloadNavItem : function(targetElement){
			this.logger(this);
			var item=this.app.layout.getItem(targetElement);
			if(item.layout){
				if(this.activeElement==targetElement){
					this.createNavItem(item.layout,targetElement);
				}else{
					this.setActive(item.layout,targetElement);
				}
				targetElement.click();
			}
		},
		onReloadNavList:function(targetElement){
			this.logger(this);
			if(!targetElement){
				this.$layoutTabView.empty();
				this.createMainNavList();
				return;
			}else{
				this.removeNavList(targetElement);
				this.reloadNavItem(targetElement);
			}
		},
		onUp:function(navItem,button){
			this.logger(this);
			if($(button).isDisabled()){
				return;
			}
			this.activeLayout.on('movePrev');
		},
		onDown:function(navItem,button){
			this.logger(this);
			if($(button).isDisabled()){
				return;
			}
			this.activeLayout.on('moveNext');
		},
		onClick : function(event,navItem){
			this.logger(this);
			var layoutElement=this.getLayoutElementByNavItem(navItem.id);
			layoutElement._NavItemClick_=true;
			layoutElement.click();
			delete layoutElement._NavItemClick_;
		},
		onDbClick : function(event,navItem){
			this.logger(this);
			var layout=this.getLayoutElementByNavItem(navItem.id);
			var list=this.activeLayout.getChildren(layout);
			if(list){
				if(list.length>0){
					list[0].target.click();
				}else{
					var navListId=getParentNavID(layout.id);
					var navList=this.get(navListId);
					if(!navList){
						var html=this.getNavListHTML(navListId,this.activeLayout,[]);
						this.$layoutTabView.append(html);
						navList=this.get(navListId);
					}
					this.on('deActive');
					this.setActiveNavList(navList);
					this.enabled('back');
					//this.enabled('home');
				}
			}
		},
		onHideLayout : function(navItem,icon){
			this.logger(this);
			var layout=this.activeElement
			if(this.activeLayout.on('hide',layout)!=false){
				$(icon).replaceClass('eye','check');
			}
		},
		onShowLayout : function(navItem,icon){
			this.logger(this);
			var layout=this.activeElement
			if(this.activeLayout.on('show',layout)!=false){
				$(icon).replaceClass('check','eye');
			}
		},
		onDeActive:function(){
			this.logger(this);
			if(this.activeElement){
				this.activeLayout.on('deActiveElement',null,this.activeElement);
				this.activeElement=null;
				this.activeLayout=null;
				this.activeNavItem=null;
			}
		},
		scrollTabView : function(navItem){
			this.logger(this);
			var viewbox=this.$tabviewbox[0];
			viewbox.scrollTop=navItem.offsetTop - viewbox.offsetTop ;
		},
		getNavItemTitle : function(navItem){
			this.logger(this);
			return $(navItem).children('.idex-list-item-title:first').text();
		},
		setNavItemTitle : function(navItem,title){
			this.logger(this);
			$(navItem).children('.idex-list-item-title:first').text(title);
		},
		getNavItemHTML : function(layout,target){
			this.logger(this);
			var html=['<div id="',getNavID(target.id),'" class="idex-list-item ',layout._name_,'-item">',
						'<div class="idex-list-item-icon '];
			if(layout.isFixedLayout){
				html.push('deye');
			}else if($.hasClass(target,'hide')){
				html.push('check');
			}else{
				html.push('eye');
			}
			html.push(	 '">',
							'<div class="idex-icon"></div>',
						'</div>');
			if(layout==this.__CONTAINER_LAYOUT__){
				if(target.offsetWidth==0){
					html.push('<div class="idex-layout-icon">不可见</div>');
				}else{
					html.push('<div class="idex-layout-icon">',target.offsetWidth,'&nbsp;x&nbsp;',target.offsetHeight,'</div>');
				}
			}else{
				html.push('<div class="idex-layout-icon ',layout._name_,'-icon">',
							'<div class="idex-icon"></div>',
						  '</div>');
			}
			html.push(	'<div class="idex-list-item-title">',
							(target.getAttribute('d-t') || layout.title),
						'</div>');

			if(!layout.isFixedLayout){
				html.push(	'<div class="idex-list-item-sortbar"><div class="idex-button up"><div class="idex-icon"></div></div><div class="idex-button down"><div class="idex-icon"></div></div></div>');
			}
			html.push(	'</div>');
			return html.join('');
		},
		getNavListHTML : function(navListId,layout,list){
			var html=['<div id="',navListId,'" class="idex-layout-navlist-box ',layout._name_,'-navlist">'];
			for(var i=0,len=list.length;i<len;i++){
				var item=list[i];
				html.push(this.getNavItemHTML(item.layout,item.target));
			}
			html.push('</div>');
			return html.join('');
		},
		createNavList : function(layout,target){
			this.logger(this);
			var parentItem=layout.getParent(target);
			var parentElement=parentItem.target;
			var parentLayout=parentItem.layout;
			var navListId=getParentNavID(parentElement.id);
			var navList=this.get(navListId);
			if(navList){
				return;
			}
			var list=layout.getAll(target);
			var html=this.getNavListHTML(navListId,parentLayout,list);
			this.$layoutTabView.append(html);
			this.bindItemSortBarHover(this.get(navListId));
		},
		createNavItem : function(layout,target){
			this.logger(this);
			var navId=getNavID(target.id);
			var navItem=this.get(navId);
			var parentElement=layout.getParentElement(target);
			var navListId=getParentNavID(parentElement.id);
			var navList=this.get(navListId);
			if(navItem){
			}else if(navList){
				var navItemHTML=this.getNavItemHTML(layout,target);
				if(navList.children.length==0){
					navList.innerHTML=navItemHTML;
				}else{
					var prev=this.activeLayout.getPrevElement(target);
					var next=this.activeLayout.getNextElement(target);
					if(prev && prev.id){
						prev=this.getNavItemByLayout(prev.id);
						$(prev).after(navItemHTML);
					}else if(next && next.id){
						next=this.getNavItemByLayout(next.id);
						$(next).before(navItemHTML);
					}
				}
				navItem=this.get(navId);
				this.bindItemSortBarHover(navItem);
			}else if(!navItem){
				this.createNavList(layout,target);
				navItem=this.get(navId);
			}
			if(!navItem){
				console.error('navItem of null ');
				return;
			}
			this.setActiveNavItem(navItem);
			if(!target._NavItemClick_){
				this.scrollTabView(navItem);
			}else{
				delete target._NavItemClick_;
			}
			this.setSortBar();
		},
		bindItemSortBarHover : function(element){
			$('.idex-list-item-sortbar .idex-button',element).bindHover();
		},
		setActive : function(layout,target){
			this.logger(this);
			if(this.activeLayout && this.activeElement && this.activeElement!=target){
				this.activeLayout.on('deActiveElement',target,this.activeElement);
			}
			if(this.activeElement!=target || target==null){
				var oldActiveElement=this.activeElement;
				var oldActive=this.activeLayout;
				this.activeLayout=layout;
				if(target){
					this.activeElement=target;
					this.activeLayout.on('activeElement',this.activeElement,oldActiveElement);
					this.createNavItem(layout,target);
				}
				if(oldActive!=layout){
					if(oldActive){
						oldActive.on('deActiveLayout',this.activeLayout,oldActive);
					}
					layout.on('activeLayout',this.activeLayout,oldActive);
				}
				if(this.activeLayout==this.__CONTAINER_LAYOUT__){
					this.disabled('back');
				}else{
					this.enabled('back');
				}
				this.enabled('home');
			}
		},
		setSortBar : function(){
			this.logger(this);
			var navItem=this.activeNavItem;
			var layout=this.activeLayout.queryPrevLayoutElement();
			var sortBar=$(navItem).children('.idex-list-item-sortbar:first');
			if(sortBar.length==0){
				return;
			}
			var up=sortBar.children('.idex-button.up:first');
			if(layout){
				up.enabled();
			}else{
				up.disabled();
			}
			layout=this.activeLayout.queryNextLayoutElement();
			var down=sortBar.children('.idex-button.down:first');
			if(layout){
				down.enabled();
			}else{
				down.disabled();
			}
			//this.activeLayout.srcollToActiveElement();
			//this.app.ViewPanel.on('srcollTop',this.activeElement);
		},
		setActiveNavItem : function(navItem){
			this.logger(this);
			if(this.activeNavItem==navItem || navItem==null){
				return;
			}else if(this.activeNavItem && this.activeNavItem != navItem){
				$.removeClass(this.activeNavItem,'active');
			}

			this.activeNavItem=navItem;
			$.addClass(this.activeNavItem,'active');
			this.setActiveNavList(navItem.parentElement);

			if(this.activeLayout==this.__CONTAINER_LAYOUT__){
				var target=this.activeElement;
				var html;
				if(target.offsetWidth==0){
					html='不可见';
				}else{
					html=[target.offsetWidth,'&nbsp;x&nbsp;',target.offsetHeight].join('');
				}
				$(this.activeNavItem).children('.idex-layout-icon:first').html(html);
			}

		},
		setActiveNavList : function(navList){
			this.logger(this);
			if(this.activeNavList && this.activeNavList!=navList){
				this.activeNavList.style.display='none';
			}
			this.activeNavList=navList;
			this.activeNavList.style.display='';
		},
		getNavItemByLayout : function(layoutElement){
			this.logger(this);
			if(layoutElement._isString_){
				return this.get(getNavID(layoutElement));
			}else if(layoutElement.id){
				return this.get(getNavID(layoutElement.id));
			}
		},
		getLayoutElementByNavItem : function(navItem){
			this.logger(this);
			if(navItem._isString_){
				return this.get(getLayoutID(navItem));
			}else if(navItem.id){
				return this.get(getLayoutID(navItem.id));
			}
		},
		replaceLayout :  function(srcElement,targetElement){
			this.logger(this);
			var command=this.replaceLayoutElement(srcElement,targetElement);
			this._moveNavItemByLayout_(srcElement,targetElement,'replaceNode');
			return command;
		},
		replaceLayoutElement : function(srcElement,targetElement){
			this.logger(this);
			var elementID=this.activeElement.id,
				srcID=srcElement.id,
				targetID=targetElement.id,
				movetype='replaceNode',
				title='替换布局',
				lastCommand=this.app.HistoryPanel.getLastCommand();

			this._moveLayoutElement_(srcElement,targetElement,movetype);

			if(lastCommand.elementID==elementID &&
				lastCommand.title==title){
				lastCommand.targetID = targetID;
				lastCommand.srcID = srcID;
				this.app.HistoryPanel.updateLastCommand();
				return lastCommand;
			}

			this.app.HistoryPanel.addUndo({
				panel : this ,
				elementID : elementID,
				title : title,
				type : 'replacelayout',
				movetype : movetype,
				targetID : targetID,
				srcID : srcID,
				undo : function(){
					var _srcElement=this.panel.get(this.srcID),
						_targetElement=this.panel.get(this.targetID),
						_type=this.movetype;
					this.panel._moveLayout_(_targetElement,_srcElement,_type);
					this.panel.get(this.elementID).click();
				},
				redo : function(){
					var _srcElement=this.panel.get(this.srcID),
						_targetElement=this.panel.get(this.targetID),
						_type=this.movetype;
					this.panel._moveLayout_(_srcElement,_targetElement,_type);
					this.panel.get(this.elementID).click();
				}
			});
			return this.app.HistoryPanel.getLastCommand();
		},
		moveLayout : function(srcElement,targetElement,type){
			this.logger(this);
			var command=this.moveLayoutElement(srcElement,targetElement,type);
			this._moveNavItemByLayout_(srcElement,targetElement,type);
			return command;
		},
		moveLayoutElement : function(srcElement,targetElement,type){
			this.logger(this);
			var elementID=this.activeElement.id,
				title = '调整布局顺序',
				undoValue = {},
				redoValue = {},
				prev,
				next,
				parent,
				lastCommand=this.app.HistoryPanel.getLastCommand();

			prev=this.activeLayout.getPrevElement(this.activeElement);
			next=this.activeLayout.getNextElement(this.activeElement);
			if(prev && prev.id){
				undoValue.prevID=prev.id;
			}else if(next && next.id){
				undoValue.nextID=next.id;
			}else{
				parent=this.activeLayout.getParentElement(this.activeElement);
				undoValue.parentID=parent.id;
			}

			this._moveLayoutElement_(srcElement,targetElement,type);

			prev=this.activeLayout.getPrevElement(this.activeElement);
			next=this.activeLayout.getNextElement(this.activeElement);
			if(prev && prev.id){
				redoValue.prevID=prev.id;
			}else if(next && next.id){
				redoValue.nextID=next.id;
			}else{
				parent=this.activeLayout.getParentElement(this.activeElement);
				redoValue.parentID=parent.id;
			}

			if(lastCommand.elementID==elementID &&
				lastCommand.title==title){
				lastCommand.redoValue = redoValue;
				this.app.HistoryPanel.updateLastCommand();
				return lastCommand;
			}
			this.app.HistoryPanel.addUndo({
				panel : this ,
				elementID : elementID,
				title : title,
				type : 'movelayout',
				undoValue : undoValue,
				undo : function(){
					this.execute(this.undoValue);
				},
				redoValue : redoValue,
				redo : function(){
					this.execute(this.redoValue);
				},
				execute : function(values){
					var element=this.panel.get(this.elementID),
						srcElement,
						targetElement=element,
						type;
					if(values.parentID){
						srcElement = this.panel.get(values.parentID);
						type = 'append';
					}else if(values.prevID){
						srcElement = this.panel.get(values.prevID);
						type = 'after';
					}else if(values.nextID){
						srcElement = this.panel.get(values.nextID);
						type = 'before';
					}
					this.panel._moveLayout_(srcElement,targetElement,type);
					this.panel.get(this.elementID).click();
				}
			});
			return this.app.HistoryPanel.getLastCommand();
		},
		_moveLayout_ : function(srcElement,targetElement,type){
			this.logger(this);
			this._moveLayoutElement_(srcElement,targetElement,type);
			this._moveNavItemByLayout_(srcElement,targetElement,type);
		},
		_moveLayoutElement_ : function(srcElement,targetElement,type){
			this.logger(this);
			$(srcElement)[type](targetElement);
			this.app.ViewPanel.on('srcollTop',targetElement);
		},
		_moveNavItemByLayout_ : function(srcElement,targetElement,type){
			this.logger(this);
			var srcNavItem=this.getNavItemByLayout(srcElement);
			var targetNavItem=this.getNavItemByLayout(targetElement);
			if(srcNavItem && targetNavItem){
				if(srcNavItem.parentElement==targetNavItem.parentElement){
					$(srcNavItem)[type](targetNavItem);
					this.setSortBar();
				}else{
					this.removeNavList(srcElement);
					this.onReloadNavList(targetElement);
				}
			}else{

				if(srcNavItem){
					this.removeNavList(srcElement);
				}
				if(targetNavItem){
					this.removeNavList(targetElement);
				}
				
				this.reloadNavItem(targetElement);

			}
		}
	});



})(CF,jQuery);