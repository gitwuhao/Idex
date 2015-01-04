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
								html=['<div class="x-ui-floatbar-box">',
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

							
							this.buildPageToolBar(200);

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
								json.insert(0,{label : '<span style="color: #FF6100;">最近上传100张</span>',cid : '-100',value : this.$context.CACHE_KEY.LAST_UPLOAD_PICTURE_VALUE});
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
						},
						onNodeClick : function(node){
							//console.info('node click:'+node.cid);
							this.currentCID=node.cid;
							this.currentPageNo=1;
							this.loadPictureList({
								cid : this.currentCID,
								pageSize : this.PAGE_SIZE
							});
						},
						PAGE_SIZE : 12,
						loadPictureList : function(paramObject){
							ui.popu.createInnerLoadingAnimation({
								$elem : this.$pictureList,
								css : {
									'height': '200px',
									'width': '400px',
									'margin': '100px auto',
									'overflow': 'hidden'
								}
							});

							$.ajax({
								url:'/module.s',
								data : 'method=query&_t=5&'+$.param(paramObject),
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
						},
						/*
							'<div class="idex-page-button prev">上一页</div>',
							'<div class="idex-page-button num">1</div>',
							'<div class="idex-page-button num">2</div>',
							'<div class="idex-page-button num">3</div>',
							'<div class="idex-page-button num">4</div>',
							'<div class="idex-page-button num">5</div>',
							'<div class="more">...</div>',
							'<div class="idex-page-button next">下一页</div>',
						*/
						buildPageToolBar : function(total){
							var pageCount,
								pageNo=this.currentPageNo;
							
							var html=[];

							html.push(this.getPageToolBarHTML({
								pageNo : 1,
								pageSize : 12,
								total : 233
							}));

							html.push(this.getPageToolBarHTML({
								pageNo : 2,
								pageSize : 12,
								total : 233
							}));

							html.push(this.getPageToolBarHTML({
								pageNo : 3,
								pageSize : 12,
								total : 233
							}));



							html.push(this.getPageToolBarHTML({
								pageNo : 4,
								pageSize : 12,
								total : 233
							}));

								

							html.push(this.getPageToolBarHTML({
								pageNo : 5,
								pageSize : 12,
								total : 233
							}));

								
							html.push(this.getPageToolBarHTML({
								pageNo : 9,
								pageSize : 12,
								total : 233
							}));

							html.push(this.getPageToolBarHTML({
								pageNo : 19,
								pageSize : 12,
								total : 233
							}));

							html.push(this.getPageToolBarHTML({
								pageNo : 1,
								pageSize : 12,
								total : 20
							}));

								
							html.push(this.getPageToolBarHTML({
								pageNo : 2,
								pageSize : 12,
								total : 20
							}));


								
								
							html.push(this.getPageToolBarHTML({
								pageNo : 6,
								pageSize : 12,
								total : 72
							}));

							this.$pictureList.html(html.join(''));
							
						},
						/*
						{
							pageNo : pageNo,
							pageSize : pageSize,
							total : total
						}
						*/
						getPageToolBarHTML : function(config){
							var total=config.total,
								startPageNo,
								endPageNo,
								pageCount,
								pageSize=config.pageSize,
								pageNo=config.pageNo,
								html=['<div class="idex-page-toolbar" style="margin-bottom: 10px;">'];
							if(!pageNo || pageNo==1){
								html.push('<div class="idex-page-label">上一页</div>');
							}else{
								html.push('<div class="idex-page-button prev">上一页</div>');
							}
							pageCount=Math.floor(total/pageSize) + ((total % pageSize) >0 ?  1 : 0);
							
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

							if(pageCount > endPageNo){
								html.push('<div class="more">...</div>');
							}

							if(pageCount==pageNo){
								html.push('<div class="idex-page-label">下一页</div>');
							}else{
								html.push('<div class="idex-page-button next">下一页</div>');
							}
							html.push('</div>');

							return html.join('');
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
			PICTURE_TREE : 'picture_category_tree',
			LAST_UPLOAD_PICTURE_VALUE : '$L_U_P_V'
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