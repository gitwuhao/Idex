(function(CF,$){
	$.push({
		_name_ : 'SelectPicture',
		initModule : function(){
			this.logger(this);
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
								'<div class="idex-picture-list uns">',
								'</div>'].join(''),
						onLoad:function(){
							var div,
								html=['<div class="x-ui-floatbar-box uns">',
										'<div class="idex-picture-left-box">',
										'</div>',
										'<div class="idex-picture-right-box">',
										'</div>',
									  '</div>'];

									 
							div=$.createElement(html.join(''));

							this.$owner.$tabbarbox.before(div);
							
							this.$floatbar=$(div);
							this.$pictureLeftBox=this.$floatbar.children('.idex-picture-left-box:first');
							this.$pictureRightBox=this.$floatbar.children('.idex-picture-right-box:first');


							this.$pictureTree=this.$tabview.children('.idex-picture-tree:first');
							this.$pictureList=this.$tabview.children('.idex-picture-list:first');
							
							this.$context = this.$owner.$owner.$owner;

							this.initUI();


						},
						initUI : function(){
							this.autoSelect.render = this.$pictureLeftBox[0];
							this.autoSelect=new ui.button(this.autoSelect);
							
							var me=this;
							this.$context.loadTreeData(function(json){
								me.createTree(json);
							});
						},
						autoSelect :{
							xtype : 'button',
							icon : true,
							cls : 'auto-select',
							title : '自动匹配',
							onClick:function(){

							}
						},
						onShowAfter : function(){
							this.$floatbar.show();
						},
						onHideAfter : function(){
							this.$floatbar.hide();
						},
						createTree : function(json){
							if(json && json.insert){
								json.insert(0,{label : '<span style="color: #FF6100;">最近上传</span>'});
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

							$.setTimeout(function(){
								this.tree.items[0].$node.click();
							},100,this);
						},
						onNodeClick : function(node){
							//console.info('node click:'+node.cid);
							this.currentCID=node.cid  || '';
							this.currentPageNo=1;
							/*
							this.loadPictureList({
								cid : this.currentCID
							});
							*/
							this.getPictureData();
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
							this.buildPictureList({total:"231",result:[{title:"1 (18)",pixel:"800x1200",path:"http://img03.taobaocdn.com/imgextra/i3/1646439371/TB24MxhbFXXXXbQXpXXXXXXXXXX-1646439371.jpg"},{title:"1 (16)",pixel:"267x400",path:"http://img03.taobaocdn.com/imgextra/i3/1646439371/TB2l9hkbFXXXXcQXXXXXXXXXXXX-1646439371.jpg"},{title:"1 (17)",pixel:"300x300",path:"http://img02.taobaocdn.com/imgextra/i2/1646439371/TB2T3FjbFXXXXapXpXXXXXXXXXX-1646439371.jpg"},{title:"1 (15)",pixel:"800x800",path:"http://img01.taobaocdn.com/imgextra/i1/1646439371/TB2MtFlbFXXXXcGXXXXXXXXXXXX-1646439371.jpg"},{title:"1 (14)",pixel:"800x1000",path:"http://img02.taobaocdn.com/imgextra/i2/1646439371/TB2oz8mbFXXXXbpXXXXXXXXXXXX-1646439371.jpg"},{title:"1 (13)",pixel:"800x800",path:"http://img04.taobaocdn.com/imgextra/i4/1646439371/TB2K.XmbFXXXXbEXXXXXXXXXXXX-1646439371.jpg"},{title:"1 (12)",pixel:"800x1200",path:"http://img03.taobaocdn.com/imgextra/i3/1646439371/TB2jL4ibFXXXXbgXpXXXXXXXXXX-1646439371.jpg"},{title:"1 (11)",pixel:"267x400",path:"http://img02.taobaocdn.com/imgextra/i2/1646439371/TB2wxNhbFXXXXbMXpXXXXXXXXXX-1646439371.jpg"},{title:"1 (10)",pixel:"800x800",path:"http://img04.taobaocdn.com/imgextra/i4/1646439371/TB2qgBnbFXXXXbaXXXXXXXXXXXX-1646439371.jpg"},{title:"1 (9)",pixel:"300x300",path:"http://img02.taobaocdn.com/imgextra/i2/1646439371/TB2boxlbFXXXXccXXXXXXXXXXXX-1646439371.jpg"},{title:"1 (7)",pixel:"267x400",path:"http://img01.taobaocdn.com/imgextra/i1/1646439371/TB2d2lkbFXXXXXyXpXXXXXXXXXX-1646439371.jpg"},{title:"1 (8)",pixel:"267x400",path:"http://img04.taobaocdn.com/imgextra/i4/1646439371/TB2YcNrbFXXXXXkXXXXXXXXXXXX-1646439371.jpg"}]});
						},
						buildPictureList : function(json){
							var html;
							if(json==-1){
								html='<div style="padding-top: 30%;font-size: 28px;text-align: center;">加载失败...</div>';
							}else if(json && json.errorMsg){
								html='<div style="padding-top: 30%;font-size: 28px;text-align: center;">加载失败【'+json.errorMsg+'】...</div>';
							}else if(json && json.total>0){
								html=[];
								var result=json.result;
								for(var i=0,len=result.length;i<len;i++){
									var item=result[i];
									html.push('<div class="idex-picture-item" title="',item.title,'">',
												'<img src="',item.path,'_150x150.jpg"/>',
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
							this.isBuilding=false;
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
									pageNo=this.innerText;
								if(pageNo==$owner.currentPageNo){
									return;
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
						label: '上传图片',
						name : 'upload',
						html : '上传'
					}]
				},
				onCloseAfter : function(){
					this.$owner.close();
				}
			};
		},
		CACHE_KEY : {
			PICTURE_TREE : 'picture_category_tree'
		},
		getTreeData : function(){
			return $.cache.get(this.CACHE_KEY.PICTURE_TREE);
		},
		saveTreeData : function(json){
			$.cache.put(this.CACHE_KEY.PICTURE_TREE,JSON.stringify(json),new Date());
		},
		loadTreeData : function(callback){
			var treeData=this.getTreeData();
			if(treeData){
				callback(JSON.parse(treeData));
				return;
			}
			$.ajax({
				url:'/config.s',
				data : 'method=get&type=2',
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
							this._$callback(json);
						}
					}
				},
				error : function(){

				}
			});
		},
		close:function(){
			this.logger(this);
			this.win.remove();
			delete this.win;
		}
	});
})(CF,jQuery);