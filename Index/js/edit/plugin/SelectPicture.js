(function(CF,$){

var CACHE_KEY = {
	PIC_TREE : 'pic_category_tree',
	LAST_LOAD : 'last_load_pic_list'
},
ATTR_KEY_MAP=window.APP_KEY_MAP.ATTR;

$.push({
	_name_ : 'SelectPicture',
	initModule : function(){
		this.logger(this);
		this.app.bindReadyAfter(this);
	},
	onAppReadyAfter : function(){
		var app=this.app,
			ViewPanel,
			ImagePanel,
			data;
		ViewPanel=app.ViewPanel;
		ImagePanel=app.ImagePanel;
		data=ViewPanel.data;
		
		this.isSGIF=ImagePanel.isSGIF;
		this.setImageSrc=ImagePanel.setImageSrc;

		this.picTitlePx='idex_'+data.type+'_'+data.id+'_';
		//console.info(this.picTitlePx);
		
		this.U_LABEL = ['<a href="',this.UPLOAD_URL,'" target="_IDEX_TB_PIC">上传图片</a>'].join('');
	
	},
	UPLOAD_URL : 'http://tadget.taobao.com/redaction/manager.htm',
	show : function(callback){
		if(this.win){
			return;
		}
		var title,
			picListConfig=this.getPicListConfig();
		if(callback){
			title='选择图片';
			CF.merger(picListConfig,this.getPicPageConfig());
		}else{
			title='匹配图片';
			CF.merger(picListConfig,this.getMatchListConfig());
		}
		this.win=new ui.window({
			title : title,
			callback : callback,
			cls : 'idex-select-pic-win x-ui-scrollbar',
			item : {
				xtype:'tab',
				items : [picListConfig,{
					label: this.U_LABEL,
					name : 'upload',
					onBindEvent:function(){
						this.$tag.bindHover();
					}
				}]
			},
			onCloseAfter : function(){
				this.$owner.close();
			}
		});
		this.win.$owner = this;
		this.win.show();
	},
	close:function(){
		this.logger(this);
		this.win.remove();
		delete this.win;
	},
	onSelect : function(img){
		var src=img.src.replace(this.PIC_SIZING,'');
		this.win.callback.execute(src);
		this.win.close();
	},
	getDescBox : function(){
		return this.app.ViewPanel.getDescBox();
	},
	getDescImageList : function(){
		var list=$('img',this.getDescBox()),
			array=[],
			me=this;

		$.it(list,function(i,img){
			if(img.offsetParent){
				array.push(img);
			}
		});
		return array;
	},
	applyMatchImageList : function(array){
		//img: img,path: ,pixel: "800x1200",title: "idex_1_101010744_1"
		$.it(array,function(i,item){
			$.attr(item.img,ATTR_KEY_MAP.SRC,item.path);
			item.img.src='';
		});
		$.setTimeout(function(){
			this.trigger('contextReLoad');
		},100,this.app);
	},
	PIC_SIZING : '_150x150.jpg',
	getTreeData : function(){
		return $.cache.get(CACHE_KEY.PIC_TREE);
	},
	saveTreeData : function(json){
		if(!json){
			$.cache.remove(CACHE_KEY.PIC_TREE);
			return;
		}
		$.cache.put(CACHE_KEY.PIC_TREE,$.cache.stringJSON(json));
	},
	getLastLoadPic : function(){
		return $.cache.get(CACHE_KEY.LAST_LOAD);
	},
	saveLastLoadPic : function(json){
		if(!json){
			$.cache.remove(CACHE_KEY.LAST_LOAD);
			return;
		}
		$.cache.put(CACHE_KEY.LAST_LOAD,$.cache.stringJSON(json));
	},
	loadTreeData : function(callback){
		var treeData=this.getTreeData();
		if(treeData){
			callback($.cache.parseJSON(treeData));
			return;
		}
		$.jsonp({
			url:'/picture.s',
			data : 'method=getCat',
			_$owner : this,
			_$callback : callback,
			success : function(json){
				if(json && json.length>0){
					json=$.cache.buildTreeData(json);
					if(json && json.length>0){
						this._$owner.saveTreeData(json);
					}
					this._$callback(json);
				}else if(json.errorMsg){
					CF.error('loadTreeData :'+json.errorMsg);
					this._$callback();
				}
			},
			error : function(){

			}
		});
	},
	loadAutoMatchList : function(cid,callback){
		$.jsonp({
			url:'/picture.s',
			data : 'method=query&pageSize=100&cid='+cid,
			_callback : callback,
			success : function(json){
				this._callback.execute(json);
			},
			error : function(){
				this._callback.execute();
			}
		});
	},
	getPicListConfig : function(){
		return {
			label: '图片库',
			name : 'picList',
			html : ['<div class="idex-pic-tree uns"></div>',
					'<div class="idex-pic-list uns"></div>'].join(''),
			onLoad:function(){
				var div,
					html=['<div class="x-ui-floatbar-box uns">',
							'<div class="idex-pic-left-box">',
							'</div>',
							'<div class="idex-pic-right-box">',
							'</div>',
						  '</div>'];


				div=$.createElement(html.join(''));

				this.$owner.$tabbarbox.before(div);

				this.$floatbar=$(div);
				var children=this.$floatbar.children();
				this.$picLeftBox=$(children[0]);
				this.$picRightBox=$(children[1]);

				children=this.$tabview.children();
				this.$picTree=$(children[0]);
				this.$picList=$(children[1]);
				
				this.$context = this.$owner.$owner.$owner;

				this.initUI();
			},
			initUI : function(){
				this.initRefreshButton();
				this.initTree();
			},
			initRefreshButton : function(){
				var button=this.refreshTreeButton;
				button.render = this.$picLeftBox[0];
				button.$owner=this;
				this.refreshTreeButton=new ui.button(button);
			},
			initTree : function(){
				var me=this;
				this.$context.loadTreeData(function(json){
					if(!json){
						me.$picTree.html('加载失败...');
					}else{
						me.createTree(json);
					}
				});
			},
			refreshTreeButton :{
				xtype : 'button',
				icon : 'refresh',
				label : '刷新分类',
				onClick:function(){
					this.$owner.on('refresh');
					this.disabled();
				}
			},
			onRefresh : function(){
				if(this.tree && this.tree.remove){
					this.tree.remove();
				}
				this.$context.saveTreeData();
				this.$picTree.empty();
				this.initTree();
			},
			createTree : function(json){
				if(json && json.insert){
					json.insert(0,{label : '<span class="cB">最近上传</span>'});
				}
				this.tree=new ui.tree({
					$owner : this,
					render: this.$picTree,
					cls : 'idex-tree-box none-icon',
					items : json,
					onNodeClick : function(node,event){
						this.$owner.on('nodeClick',node);
					}
				});
				if(this.onTreeLoadAfter){
					this.onTreeLoadAfter();
				}
			},
			initPicList : function(){
				this.$picList.html('<div class="error-msg">选择一个图片分类...</div>');
			},
			onTreeLoadAfter : function(){
				this.initPicList();
				delete this.onTreeLoadAfter;
				//delete this.initPicList;
			}
		};
	},
	getPicPageConfig : function(){
		return {
			onNodeClick : function(node){
				this.currentCID=node.cid  || '';
				this.currentPageNo=1;

				this.loadPicList({
					cid : this.currentCID
				});
			},
			onTreeLoadAfter : function(){
				var json=this.$context.getLastLoadPic();
				if(json){
					try{
						json=$.cache.parseJSON(json);
						this.currentCID=json.cid  || '';
						this.currentPageNo=json.pageNo;
						json.isLastLoad=true;
						this.buildPicList(json);
					}catch(e){
						json=null
						this.$context.saveLastLoadPic();
					};
				}
				if(!json){
					this.initPicList();
				}
				delete this.onTreeLoadAfter;
				delete this.initPicList;
			},
			PAGE_SIZE : 12,
			loadPicList : function(paramObject){
				if(this.isBuilding){
					return;
				}
				this.isBuilding=true;
				this.removePageToolBar();
				
				var loadingTimeoutId=$.setTimeout(function(){
					ui.popu.createInnerLoading({
						$elem : this.$picList,
						css : {
							'height': '200px',
							'width': '400px',
							'margin': '100px auto',
							'overflow': 'hidden'
						}
					});
				},300,this);

				var args='method=query&pageSize='+this.PAGE_SIZE;

				if(paramObject){
					args=args +'&'+$.param(paramObject);
				}

				$.jsonp({
					url:'/picture.s',
					data : args,
					$owner : this,
					success : function(json){
						window.clearTimeout(loadingTimeoutId);
						this.$owner.buildPicList(json);
					},
					error : function(){
						this.$owner.buildPicList(-1);
					}
				});
			},
			buildPicList : function(json){
				var html,
					errorMsg;
				if(json && json.total>0){
					html=[];
					var result=json.result;
					for(var i=0,len=result.length;i<len;i++){
						var item=result[i];
						html.push('<div class="idex-pic-item" title="',item.title,'">',
									'<div class="idex-img-box">',
										'<img src="',item.path,this.$context.PIC_SIZING,'"/>',
									'</div>',
									'<div class="pic-title">',item.pixel,'</div>',
									'<div class="select-title">选择</div>',
								  '</div>');
					}
					html=html.join('');
					this.buildPageToolBar(json.total);
					if(!json.isLastLoad){
						json.cid=this.currentCID;
						json.pageNo=this.currentPageNo;
						this.$context.saveLastLoadPic(json);
					}
				}else if(json==-1){
					errorMsg='加载失败...';
				}else if(json && json.errorMsg){
					CF.error('buildPicList :'+json.errorMsg);
					errorMsg='加载失败【'+json.errorMsg+'】';
				}else{
					errorMsg='没有找到图片...';
				}
				if(errorMsg){
					html='<div class="error-msg">'+errorMsg+'</div>';
				}

				this.$picList.html(html);

				if(json && json.total>0){
					this.bindPicItemEvent();
				}
				this.isBuilding=false;
			},
			bindPicItemEvent : function(){
				this.$picList.children('.idex-pic-item').click({
					$context : this.$context
				},function(event){
					event.data.$context.onSelect($('img',this)[0]);
				});
			},
			buildPageToolBar : function(total){
				this.getPageToolBarHTML({
					pageNo : this.currentPageNo,
					pageSize : this.PAGE_SIZE,
					total : total
				});
			},
			/*
			{
				pageNo : pageNo,
				pageSize : pageSize,
				total : total
			}
			*/
			getPageToolBarHTML : function(config){

				var total=parseInt(config.total),
					css_label='idex-page-label',
					css_button='idex-page-button',
					startPageNo,
					endPageNo,
					pageCount,
					pageSize=parseInt(config.pageSize),
					pageNo=parseInt(config.pageNo),
					html;

				pageCount=Math.floor(total/pageSize) + ((total % pageSize) >0 ?  1 : 0);

				if(pageCount==1){
					return;
				}

				html=['<div class="idex-page-toolbar">'];

				if(!pageNo || pageNo==1){
					html.push('<div class="',css_label,'">上一页</div>');
				}else{
					html.push('<div class="',css_button,' prev">上一页</div>');
				}

				if(1 < pageNo-2){
					startPageNo=pageNo-2;
				}else{
					startPageNo=pageNo;
				}

				if(startPageNo>=2){
					html.push('<div class="',css_button,' num">1</div>');
				}

				if(startPageNo>3){
					html.push('<div class="more">...</div>');
				}else if(startPageNo==3){
					html.push('<div class="',css_button,' num">2</div>');
				}

				if(pageCount > (pageNo+2)){
					endPageNo=pageNo+2;
					if(endPageNo<5){
						endPageNo=5;
					}
				}else{
					endPageNo=pageCount;
				}

				for(var i=startPageNo;i<=endPageNo;i++){
					var isActive=false;
					if(i==pageNo){
						isActive=true;
					}
					html.push('<div class="',css_button,' num',(isActive ? ' active' : ''),'">',i,'</div>');
				}

				if(pageCount == endPageNo+1){
					html.push('<div class="',css_button,' num">',pageCount,'</div>');
				}else if(pageCount > endPageNo){
					html.push('<div class="more">...</div>');
				}

				if(pageCount==pageNo){
					html.push('<div class="',css_label,'">下一页</div>');
				}else{
					html.push('<div class="',css_button,' next">下一页</div>');
				}
				html.push('</div>');

				this.$picRightBox.html(html.join(''));
				this.bindPageToolBarEvent();
			},
			bindPageToolBarEvent : function(){
				var $toolbar=this.$picRightBox.children('.idex-page-toolbar:first');
				$toolbar.children('.idex-page-button').click({
					$owner : this
				},function(event){
					var $owner=event.data.$owner,
						pageNo;
					if($.hasClass(this,'prev')){
						pageNo=parseInt($owner.currentPageNo)-1;
					}else if($.hasClass(this,'num')){
						pageNo=this.innerText;
						if(pageNo==$owner.currentPageNo){
							return;
						}
					}else if($.hasClass(this,'next')){
						pageNo=parseInt($owner.currentPageNo)+1;
					}
					$owner.currentPageNo=pageNo;
					$owner.loadPicList({
						cid : $owner.currentCID,
						pageNo : pageNo
					});
				});
			},
			removePageToolBar : function(){
				this.$picRightBox.empty();
			}
		};
	},
	getMatchListConfig : function(){
		return {
			initUI : function(){
				this.initRefreshButton();
				this.initAutoMatchButton();
				this.initTree();
			},
			onNodeClick : function(node){
				this.autoMatchButton.enabled();
				this.currentCID=node.cid  || '';
				this.currentCatLabel=node.$elem.text();

				this.$picList.html('<div class="error-msg">点击开始匹配...</div>');
			},
			onRefreshAfter : function(){
				this.autoMatchButton.disabled();
				this.initPicList();
			},
			cancelMatchButton :{
				xtype : 'button',
				cls : 'cancel-match',
				label : '取消',
				onClick:function(){
					var $owner=this.$owner;
					if(this.isApply){
						delete this.isApply;
						$owner.$context.applyMatchImageList($owner.matchArray);
						$owner.$context.win.close();
					}else{
						$owner.hideMatchBox();
					}
				}
			},
			autoMatchButton :{
				xtype : 'button',
				icon : 'auto-match',
				isDisabled : true,
				label : '开始匹配',
				onClick:function(){
					this.$owner.executeMatch();
				}
			},
			initAutoMatchButton : function(){
				var button=this.autoMatchButton;
				button.render = this.$picLeftBox[0];
				button.$owner=this;
				button.$context=this.$context;
				this.autoMatchButton=new ui.button(button);
			},
			initMatchListUI : function(){
				var html,
					div,
					$box,
					button,
					$tab=this.$owner.$elem;
					
				html=['<div class="idex-pic-match-status-box">',
						'当前分类：<em class="cat-l cB"></em>',
						'<span class="progress-l">检索：',
							'<em class="num"></em> / ',
							'<em class="count cB"></em>',
						'</span>',
						'<span class="match-l">匹配：',
							'<em class="num c2"></em> / ',
							'<em class="count cB"></em>',
						'</span>',
						'<span class="status-l c2"></span>',
					'</div>'].join('');
				div=$.createElement(html);
				$tab.append(div);
				$box=$(div);
				
				this.$picMatchStatusBox=$box;

				this.$catL=$box.children('.cat-l:first');
				this.$statusL=$box.children('.status-l:first');
				this.$progressL=$box.children('.progress-l:first');
				this.$matchL=$box.children('.match-l:first');
				
				button=this.cancelMatchButton;
				button.render = this.$picMatchStatusBox[0];
				button.$owner=this;
				this.cancelMatchButton=new ui.button(button);


				html='<div class="idex-pic-match-list uns"></div>';
				div=$.createElement(html);
				$tab.append(div);
				this.$picMatchList=$(div);

				this.initMatchListUI=CF.emptyFunction;

			},
			showMatchBox : function(){

				this.$catL.text(this.currentCatLabel);
				this.$statusL.html([
					'正在匹配',
					'<em class="s1">.</em>',
					'<em class="s2">.</em>',
					'<em class="s3">.</em>'
								].join(''));
				var $l=this.$progressL;
				$l.children('.num:first').text(0);
				$l.children('.count:first').text(0);

				
				$l=this.$matchL;
				$l.children('.num:first').text(0);
				$l.children('.count:first').text(this.descImageList.length);

				
				this.$floatbar.hide();
				this.$picTree.hide();
				this.$picList.hide();

				
				this.$picMatchList.show();
				this.$picMatchStatusBox.show();
			},
			hideMatchBox : function(){
				this.$picMatchList.empty();
				this.$picMatchList.hide();
				this.$picMatchStatusBox.hide();
				
				delete this.matchArray;
				delete this.descImageList;

				this.$floatbar.show();
				this.$picTree.show();
				this.$picList.show();
			},
			executeMatch : function(){
				var list=this.$context.getDescImageList();
				if(list && list.length>0){
					$.setTimeout(function(){
						this.$context.loadAutoMatchList(this.currentCID,CF.getCallback(this.matchImage,this));
					},100,this);
					this.initMatchListUI();
					this.descImageList=list;
					this.showMatchBox();
					return;
				}
				ui.quicktip.show({
					time : 5000,
					html : '<span style="color: #F90;">没有需要自动匹配的图片</span>',
					offset : 'tl',
					align : 'tc',
					css : {
						opacity : 1,	
						'margin-top' :'10px'
					},
					cls : 'qit-autosize',
					target : this.autoMatchButton.$elem[0]
				});

				this.autoMatchButton.remove();

				this.autoMatchButton={
					enabled : CF.emptyFunction,
					disabled : CF.emptyFunction
				};
			},
			checkMatchArray : function(){
				$.setTimeout(function(){
					if(this.matchArray && this.createPicItem){
						this.createPicItem();
					}
				},100,this);
			},
			createPicItem : function(){
				var isCheck=false,
					item,
					div,
					me=this,
					img,
					$list,
					pNum,
					matchNum,
					array=me.matchArray,
					index;
				
				if(array && array.length>0){
					index=array._index;
					item=array[index];
				}else{
					return;
				}
				if(!item){
					return
				}
				div=$.createElement(
					['<div class="idex-pic-item">',
						'<img/>',
						'<div class="pic-title">',item.pixel,'</div>',
					'</div>'].join(''));
				
				$list=this.$picMatchList;
				$list.append(div);

				$list[0].scrollTop=$list[0].scrollTop+200;

				img=div.firstElementChild;
				
				img.onerror=img.onload=function(){
					this.onerror=null;
					this.onload=null;
					me.checkMatchArray();
				};

				if(array.length-1==index){
					pNum=array._total;
					matchNum=index+1;
					this.matchComplete();
				}else{
					pNum=index+1;
					matchNum=index;
				}
				this.$matchL.children('.num:first').text(matchNum);
				this.$progressL.children('.num:first').text(pNum);
				array._index++;
				//index=array._index;
				$.setTimeout(function(){
					if(this.$context){
						img.src=item.path+this.$context.PIC_SIZING;
					}
				},0,this);
			},
			matchComplete : function(){
				var b=this.cancelMatchButton;
				b.$label.text('应用');
				b.isApply=true;
				this.$statusL.empty();
			},
			matchImage : function(json){
				if(!json || !json.total){
					this.$picMatchList.html('<div class="error-msg">没有找到图片...</div>');
					this.$statusL.empty();
					return;
				}
				var matchArray=[],
					total=json.total,
					resultArray={
						length : 0
					},
					$pl=this.$progressL,
					picPx=this.$context.picTitlePx,
					M_REG;

				
				matchArray._index=0;
				matchArray._total=total;
				
				this.matchArray=matchArray;

				M_REG=new RegExp('^'+picPx+'(\\d+)$','i');
				
				
				$pl.children('.count:first').text(total);
				this.checkMatchArray();

				//title:"1 (18)",pixel:"800x1200",path:
				$.it(json.result,function(i,item){
					var rs=$.trim(item.title).match(M_REG);
					if(rs && rs[1] && !resultArray[rs[1]]){
						resultArray[rs[1]]=item;
						resultArray.length++;
					}
				});

				if(resultArray.length==0){
					this.$picMatchList.html('<div class="error-msg">在当前分类下找不到相匹配的图片...</div>');
					this.$statusL.empty('');
					return;
				}

				//i:index,target:img
				$.it(this.descImageList,function(index,img){
					var picItem=resultArray[index+1];
					if(picItem){
						picItem.img=img;
						this.matchArray.push(picItem);
					/*
					}else{
						console.info('not match:',item,picItem);
					*/
					}
				},this);
				
			}
		};
	}
});
})(CF,jQuery);