(function(CF,$){
	$.push({
		_name_ : 'SelectPicture',
		initModule : function(){
			this.logger(this);

			this.app.addEventListener('readyafter',function(event){
				this.SelectPicture.on('readyAfter');
			});
		},
		onReadyAfter : function(){
			var data=this.app.ViewPanel.data;
			this.pictureTitlePrefix='idex_'+data.type+'_'+data.id+'_';
			console.info(this.pictureTitlePrefix);
		},
		show : function(){
			var me=this;
			if(this.win){
				return;
			}

			this.win=new ui.window(this.getWinConfig());
			this.win.$owner = this;
			this.win.show();
		},
		onSelect : function(img){
			var src=img.src.replace(this.PIC_SIZING,'');
			console.info('select:' + src);
		},
		PIC_SIZING : '_150x150.jpg',
		CACHE_KEY : {
			PICTURE_TREE : 'picture_category_tree'
		},
		getTreeData : function(){
			return $.cache.get(this.CACHE_KEY.PICTURE_TREE);
		},
		saveTreeData : function(json){
			if(!json){
				$.cache.remove(this.CACHE_KEY.PICTURE_TREE);
				return;
			}
			$.cache.put(this.CACHE_KEY.PICTURE_TREE,JSON.stringify(json));
		},
		loadTreeData : function(callback){
			var treeData=this.getTreeData();
			if(treeData){
				callback(JSON.parse(treeData));
				return;
			}
			$.ajax({
				url:'/picture.s',
				data : 'method=getCat',
				_$owner : this,
				_$callback : callback,
				type : 'POST',
				dataType : 'jsonp',
				jsonpCallback : $.getJSONPName(),
				success : function(json){
					if(json && json.length>0){
						json=$.cache.buildTreeData(json);
						if(json && json.length>0){
							this._$owner.saveTreeData(json);
						}
						this._$callback(json);
					}else if(json.errorMsg){
						console.error('loadTreeData :'+json.errorMsg);
						this._$callback();
					}
				},
				error : function(){

				}
			});
		},
		loadAutoMatchPictureList : function(cid,callback){
			$.ajax({
				url:'/picture.s',
				data : 'method=query&pageSize=100&cid='+cid,
				type : 'POST',
				dataType : 'jsonp',
				jsonpCallback : $.getJSONPName(),
				_callback : callback,
				success : function(json){
					this._callback.execute(json);
				},
				error : function(){
					this._callback.execute();
				}
			});
		},
		close:function(){
			this.logger(this);
			this.win.remove();
			delete this.win;
		},
		getWinConfig : function(){
			return {
				title : '选择图片',
				cls : 'idex-select-picture-win x-ui-scrollbar',
				item : {
					xtype:'tab',
					items : [{
						label: '图片库',
						name : 'picList',
						html : ['<div class="idex-picture-tree uns"></div>',
								'<div class="idex-picture-list uns"></div>',
								'<div class="idex-picture-match-list uns">',
									'<div class="idex-picture-item">',
										'<img src="/s.gif"/>',
										'<div class="pic-title">1x1</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="/s.gif"/>',
										'<div class="pic-title">1x1</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="/s.gif"/>',
										'<div class="pic-title">1x1</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="/s.gif"/>',
										'<div class="pic-title">1x1</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="/s.gif"/>',
										'<div class="pic-title">1x1</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="/s.gif"/>',
										'<div class="pic-title">1x1</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="/s.gif"/>',
										'<div class="pic-title">1x1</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="/s.gif"/>',
										'<div class="pic-title">1x1</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="/s.gif"/>',
										'<div class="pic-title">1x1</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="/s.gif"/>',
										'<div class="pic-title">1x1</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="/s.gif"/>',
										'<div class="pic-title">1x1</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="/s.gif"/>',
										'<div class="pic-title">1x1</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="/s.gif"/>',
										'<div class="pic-title">1x1</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="/s.gif"/>',
										'<div class="pic-title">1x1</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="/s.gif"/>',
										'<div class="pic-title">1x1</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="/s.gif"/>',
										'<div class="pic-title">1x1</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="/s.gif"/>',
										'<div class="pic-title">1x1</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="/s.gif"/>',
										'<div class="pic-title">1x1</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="/s.gif"/>',
										'<div class="pic-title">1x1</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="/s.gif"/>',
										'<div class="pic-title">1x1</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="/s.gif"/>',
										'<div class="pic-title">1x1</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="/s.gif"/>',
										'<div class="pic-title">1x1</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="/s.gif"/>',
										'<div class="pic-title">1x1</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="/s.gif"/>',
										'<div class="pic-title">1x1</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="/s.gif"/>',
										'<div class="pic-title">1x1</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="/s.gif"/>',
										'<div class="pic-title">1x1</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="/s.gif"/>',
										'<div class="pic-title">1x1</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="/s.gif"/>',
										'<div class="pic-title">1x1</div>',
									'</div>',
								'</div>'].join(''),
						onLoad:function(){
							var div,
								html=['<div class="x-ui-floatbar-box uns">',
										'<div class="idex-picture-left-box">',
										'</div>',
										'<div class="idex-picture-right-box">',
										'</div>',
										'<div class="idex-picture-match-status-box">',
											'当前分类：<em class="cat-l cB">最近上传</em>',
											'<span class="status-l">正在匹配',
												'<em class="s1">.</em>',
												'<em class="s2">.</em>',
												'<em class="s3">.</em>',
											'</span>',
											'<span class="progress-l">正在检索：',
												'<em class="num">1</em>&nbsp;/&nbsp;',
												'<em class="count cB">100</em>',
											'</span>',
											'<span class="match-l">已匹配：',
												'<em class="num">39</em>&nbsp;/&nbsp;',
												'<em class="count cB">49</em>',
											'</span>',
										'</div>',
									  '</div>'];


							div=$.createElement(html.join(''));

							this.$owner.$tabbarbox.before(div);

							this.$floatbar=$(div);
							this.$pictureLeftBox=this.$floatbar.children('.idex-picture-left-box:first');
							this.$pictureRightBox=this.$floatbar.children('.idex-picture-right-box:first');
							this.$pictureMatchStatusBox=this.$floatbar.children('.idex-picture-match-status-box:first');


							this.$pictureTree=this.$tabview.children('.idex-picture-tree:first');
							this.$pictureList=this.$tabview.children('.idex-picture-list:first');
							this.$pictureMatchList=this.$tabview.children('.idex-picture-match-list:first');

							this.$context = this.$owner.$owner.$owner;

							this.initUI();
							this.initTree();
						},
						initUI : function(){

							this.refreshTreeButton.render = this.$pictureLeftBox[0];
							this.refreshTreeButton.$owner=this;
							this.refreshTreeButton=new ui.button(this.refreshTreeButton);

							this.autoMatchButton.render = this.$pictureLeftBox[0];
							this.autoMatchButton.$owner=this;
							this.autoMatchButton.$context=this.$context;
							this.autoMatchButton=new ui.button(this.autoMatchButton);

							this.cancelMatchButton.render = this.$pictureMatchStatusBox[0];
							this.cancelMatchButton.$owner=this;
							this.cancelMatchButton.$context=this.$context;
							this.cancelMatchButton=new ui.button(this.cancelMatchButton);

						},
						initTree : function(){
							var me=this;
							this.$context.loadTreeData(function(json){
								if(!json){
									me.$pictureTree.html('加载失败...');
								}else{
									me.createTree(json);
								}
							});
						},
						cancelMatchButton :{
							xtype : 'button',
							cls : 'cancel-match',
							label : '取消',
							onClick:function(){
								
							}
						},
						autoMatchButton :{
							xtype : 'button',
							icon : 'auto-match',
							label : '自动匹配',
							onClick:function(){
								this.$context.loadAutoMatchPictureList(this.$owner.currentCID,CF.getCallback(this.$owner.buildMatchPictureList,this.$owner));
							}
						},
						refreshTreeButton :{
							xtype : 'button',
							icon : 'refresh',
							label : '刷新分类',
							onClick:function(){
								this.$owner.refreshTree();
							}
						},
						buildMatchPictureList : function(json){
							if(json && json.length>0){
								
							}
						},
						refreshTree : function(){
							if(this.tree && this.tree.remove){
								this.tree.remove();
							}
							this.autoMatchButton.$elem.hide();
							this.$context.saveTreeData();
							this.$pictureTree.empty();
							this.initTree();
						},
						onShowAfter : function(){
							this.$floatbar.show();
						},
						onHideAfter : function(){
							this.$floatbar.hide();
						},
						isInitTree : true,
						createTree : function(json){
							if(json && json.insert){
								json.insert(0,{label : '<span class="cB">最近上传</span>'});
							}
							this.tree=new ui.tree({
								$owner : this,
								render: this.$pictureTree,
								cls : 'idex-tree-box none-icon',
								items : json,
								onNodeClick : function(node,event){
									this.$owner.on('nodeClick',node);
								}
							});

							if(this.isInitTree){
								$.setTimeout(function(){
									this.tree.items[0].$node.click();
								},100,this);
							}
							delete this.isInitTree;
						},
						onNodeClick : function(node){

							this.autoMatchButton.$elem.hide();

							this.currentCID=node.cid  || '';
							this.currentPageNo=1;

							/*
							this.getPictureData();
							if(this.currentCID==''){
								this.$pictureLeftBox.show();
							}else{
								this.$pictureLeftBox.hide();
							}
							*/
							this.loadPictureList({
								cid : this.currentCID
							});

						},
						PAGE_SIZE : 12,
						loadPictureList : function(paramObject){
							if(this.isBuilding){
								return;
							}
							this.isBuilding=true;
							this.removePageToolBar();

							ui.popu.createInnerLoadingAnimation({
								$elem : this.$pictureList,
								css : {
									'height': '200px',
									'width': '400px',
									'margin': '100px auto',
									'overflow': 'hidden'
								}
							});

							var args='method=query&pageSize='+this.PAGE_SIZE;

							if(paramObject){
								args=args +'&'+$.param(paramObject);
							}

							$.ajax({
								url:'/picture.s',
								data : args,
								type : 'POST',
								dataType : 'jsonp',
								jsonpCallback : $.getJSONPName(),
								$owner : this,
								success : function(json){
									$.setTimeout(function(_json){
										this.buildPictureList(_json);
									},500,this.$owner,[json]);
								},
								error : function(){
									this.$owner.buildPictureList(-1);
								}
							});
						},
						getPictureData : function(){
							this.removePageToolBar();
							this.buildPictureList({total:"231",result:[{title:"1 (18)",pixel:"1x1",path:"http://img03.taobaocdn.com/imgextra/i3/1646439371/TB24MxhbFXXXXbQXpXXXXXXXXXX-1646439371.jpg"},{title:"1 (16)",pixel:"267x400",path:"http://img03.taobaocdn.com/imgextra/i3/1646439371/TB2l9hkbFXXXXcQXXXXXXXXXXXX-1646439371.jpg"},{title:"1 (17)",pixel:"300x300",path:"http://img02.taobaocdn.com/imgextra/i2/1646439371/TB2T3FjbFXXXXapXpXXXXXXXXXX-1646439371.jpg"},{title:"1 (15)",pixel:"800x800",path:"http://img01.taobaocdn.com/imgextra/i1/1646439371/TB2MtFlbFXXXXcGXXXXXXXXXXXX-1646439371.jpg"},{title:"1 (14)",pixel:"800x1000",path:"http://img02.taobaocdn.com/imgextra/i2/1646439371/TB2oz8mbFXXXXbpXXXXXXXXXXXX-1646439371.jpg"},{title:"1 (13)",pixel:"800x800",path:"http://img04.taobaocdn.com/imgextra/i4/1646439371/TB2K.XmbFXXXXbEXXXXXXXXXXXX-1646439371.jpg"},{title:"1 (12)",pixel:"1x1",path:"http://img03.taobaocdn.com/imgextra/i3/1646439371/TB2jL4ibFXXXXbgXpXXXXXXXXXX-1646439371.jpg"},{title:"1 (11)",pixel:"267x400",path:"http://img02.taobaocdn.com/imgextra/i2/1646439371/TB2wxNhbFXXXXbMXpXXXXXXXXXX-1646439371.jpg"},{title:"1 (10)",pixel:"800x800",path:"http://img04.taobaocdn.com/imgextra/i4/1646439371/TB2qgBnbFXXXXbaXXXXXXXXXXXX-1646439371.jpg"},{title:"1 (9)",pixel:"300x300",path:"http://img02.taobaocdn.com/imgextra/i2/1646439371/TB2boxlbFXXXXccXXXXXXXXXXXX-1646439371.jpg"},{title:"1 (7)",pixel:"267x400",path:"http://img01.taobaocdn.com/imgextra/i1/1646439371/TB2d2lkbFXXXXXyXpXXXXXXXXXX-1646439371.jpg"},{title:"1 (8)",pixel:"267x400",path:"http://img04.taobaocdn.com/imgextra/i4/1646439371/TB2YcNrbFXXXXXkXXXXXXXXXXXX-1646439371.jpg"}]});
						},
						buildPictureList : function(json){
							var html;
							if(json==-1){
								html='<div style="padding-top: 30%;font-size: 28px;text-align: center;">加载失败...</div>';
							}else if(json && json.errorMsg){
								console.error('buildPictureList :'+json.errorMsg);
								html='<div style="padding-top: 30%;font-size: 28px;text-align: center;">加载失败【'+json.errorMsg+'】...</div>';
							}else if(json && json.total>0){
								html=[];
								var result=json.result;
								for(var i=0,len=result.length;i<len;i++){
									var item=result[i];
									html.push('<div class="idex-picture-item" title="',item.title,'">',
												'<img src="',item.path,this.$context.PIC_SIZING,'"/>',
												'<div class="pic-title">',item.pixel,'</div>',
												'<div class="select-title">选择</div>',
											  '</div>');
								}
								html=html.join('');
								this.buildPageToolBar(json.total);
							}else{
								html='<div style="padding-top: 30%;font-size: 28px;text-align: center;">没有找到图片...</div>';
							}
							this.$pictureList.html(html);
							if(json && json.total>0){
								this.bindPictureItemEvent();
								this.autoMatchButton.$elem.show();
							}
							this.isBuilding=false;
						},
						bindPictureItemEvent : function(){
							this.$pictureList.children('.idex-picture-item').click({
								$context : this.$context
							},function(event){
								event.data.$context.onSelect($(this).children('img')[0]);
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
								html.push('<div class="idex-page-label">上一页</div>');
							}else{
								html.push('<div class="idex-page-button prev">上一页</div>');
							}

							if(1 < pageNo-2){
								startPageNo=pageNo-2;
							}else{
								startPageNo=pageNo;
							}

							if(startPageNo>=2){
								html.push('<div class="idex-page-button num">1</div>');
							}

							if(startPageNo>3){
								html.push('<div class="more">...</div>');
							}else if(startPageNo==3){
								html.push('<div class="idex-page-button num">2</div>');
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
								html.push('<div class="idex-page-button num',(isActive ? ' active' : ''),'">',i,'</div>');
							}

							if(pageCount == endPageNo+1){
								html.push('<div class="idex-page-button num">',pageCount,'</div>');
							}else if(pageCount > endPageNo){
								html.push('<div class="more">...</div>');
							}

							if(pageCount==pageNo){
								html.push('<div class="idex-page-label">下一页</div>');
							}else{
								html.push('<div class="idex-page-button next">下一页</div>');
							}
							html.push('</div>');

							this.$pictureRightBox.html(html.join(''));
							this.bindPageToolBarEvent();
						},
						bindPageToolBarEvent : function(){
							var $toolbar=this.$pictureRightBox.children('.idex-page-toolbar:first');
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
								$owner.loadPictureList({
									cid : $owner.currentCID,
									pageNo : pageNo
								});
							});
						},
						removePageToolBar : function(){
							this.$pictureRightBox.empty();
						}
					},{
						label: '<a href="http://tadget.taobao.com/redaction/manager.htm" target="_IDEX_TB_PIC">上传图片</a>',
						name : 'upload',
						onBindEvent:function(){
							this.$tag.bindHover();
						}
					}]
				},
				onCloseAfter : function(){
					this.$owner.close();
				}
			};
		}
	});
})(CF,jQuery);