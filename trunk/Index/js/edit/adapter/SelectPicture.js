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
					floatbar : [{
						xtype : 'button',
						icon : true,
						cls : 'auto-select',
						title : '自动匹配',
						onClick:function(){
						}
					}],
					items : [{
						label: '图片库',
						name : 'picList',
						html : ['<div class="idex-picture-tree uns"></div>',
								'<div class="idex-picture-list uns">',
									'<div class="idex-picture-item">',
										'<img src="http://img04.taobaocdn.com/bao/uploaded/i4/TB1wVEnGFXXXXcJXXXXXXXXXXXX_!!0-item_pic.jpg_150x150.jpg"/>',
										'<div class="item-title">选择</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="http://img02.taobaocdn.com/bao/uploaded/i2/TB1VkHSGFXXXXbNXFXXXXXXXXXX_!!0-item_pic.jpg_150x150.jpg"/>',
										'<div class="item-title">选择</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="http://img02.taobaocdn.com/bao/uploaded/i2/TB1PJMbGFXXXXasXpXXXXXXXXXX_!!0-item_pic.jpg_150x150.jpg"/>',
										'<div class="item-title">选择</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="http://img01.taobaocdn.com/bao/uploaded/i1/TB1Mg2WGFXXXXbLXXXXXXXXXXXX_!!0-item_pic.jpg_150x150.jpg"/>',
										'<div class="item-title">选择</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="http://img04.taobaocdn.com/bao/uploaded/i4/TB1fc9CGFXXXXbVXpXXXXXXXXXX_!!0-item_pic.jpg_150x150.jpg"/>',
										'<div class="item-title">选择</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="http://img04.taobaocdn.com/bao/uploaded/i4/TB1wVEnGFXXXXcJXXXXXXXXXXXX_!!0-item_pic.jpg_150x150.jpg"/>',
										'<div class="item-title">选择</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="http://img04.taobaocdn.com/bao/uploaded/i4/TB1wVEnGFXXXXcJXXXXXXXXXXXX_!!0-item_pic.jpg_150x150.jpg"/>',
										'<div class="item-title">选择</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="http://img04.taobaocdn.com/bao/uploaded/i4/TB1wVEnGFXXXXcJXXXXXXXXXXXX_!!0-item_pic.jpg_150x150.jpg"/>',
										'<div class="item-title">选择</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="http://img04.taobaocdn.com/bao/uploaded/i4/TB1wVEnGFXXXXcJXXXXXXXXXXXX_!!0-item_pic.jpg_150x150.jpg"/>',
										'<div class="item-title">选择</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="http://img04.taobaocdn.com/bao/uploaded/i4/TB1wVEnGFXXXXcJXXXXXXXXXXXX_!!0-item_pic.jpg_150x150.jpg"/>',
										'<div class="item-title">选择</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="http://img04.taobaocdn.com/bao/uploaded/i4/TB1wVEnGFXXXXcJXXXXXXXXXXXX_!!0-item_pic.jpg_150x150.jpg"/>',
										'<div class="item-title">选择</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="http://img04.taobaocdn.com/bao/uploaded/i4/TB1wVEnGFXXXXcJXXXXXXXXXXXX_!!0-item_pic.jpg_150x150.jpg"/>',
										'<div class="item-title">选择</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="http://img04.taobaocdn.com/bao/uploaded/i4/TB1wVEnGFXXXXcJXXXXXXXXXXXX_!!0-item_pic.jpg_150x150.jpg"/>',
										'<div class="item-title">选择</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="http://img04.taobaocdn.com/bao/uploaded/i4/TB1wVEnGFXXXXcJXXXXXXXXXXXX_!!0-item_pic.jpg_150x150.jpg"/>',
										'<div class="item-title">选择</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="http://img04.taobaocdn.com/bao/uploaded/i4/TB1wVEnGFXXXXcJXXXXXXXXXXXX_!!0-item_pic.jpg_150x150.jpg"/>',
										'<div class="item-title">选择</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="http://img04.taobaocdn.com/bao/uploaded/i4/TB1wVEnGFXXXXcJXXXXXXXXXXXX_!!0-item_pic.jpg_150x150.jpg"/>',
										'<div class="item-title">选择</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="http://img04.taobaocdn.com/bao/uploaded/i4/TB1wVEnGFXXXXcJXXXXXXXXXXXX_!!0-item_pic.jpg_150x150.jpg"/>',
										'<div class="item-title">选择</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="http://img04.taobaocdn.com/bao/uploaded/i4/TB1wVEnGFXXXXcJXXXXXXXXXXXX_!!0-item_pic.jpg_150x150.jpg"/>',
										'<div class="item-title">选择</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="http://img04.taobaocdn.com/bao/uploaded/i4/TB1wVEnGFXXXXcJXXXXXXXXXXXX_!!0-item_pic.jpg_150x150.jpg"/>',
										'<div class="item-title">选择</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="http://img04.taobaocdn.com/bao/uploaded/i4/TB1wVEnGFXXXXcJXXXXXXXXXXXX_!!0-item_pic.jpg_150x150.jpg"/>',
										'<div class="item-title">选择</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="http://img04.taobaocdn.com/bao/uploaded/i4/TB1wVEnGFXXXXcJXXXXXXXXXXXX_!!0-item_pic.jpg_150x150.jpg"/>',
										'<div class="item-title">选择</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="http://img04.taobaocdn.com/bao/uploaded/i4/TB1wVEnGFXXXXcJXXXXXXXXXXXX_!!0-item_pic.jpg_150x150.jpg"/>',
										'<div class="item-title">选择</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="http://img04.taobaocdn.com/bao/uploaded/i4/TB1wVEnGFXXXXcJXXXXXXXXXXXX_!!0-item_pic.jpg_150x150.jpg"/>',
										'<div class="item-title">选择</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="http://img04.taobaocdn.com/bao/uploaded/i4/TB1wVEnGFXXXXcJXXXXXXXXXXXX_!!0-item_pic.jpg_150x150.jpg"/>',
										'<div class="item-title">选择</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="http://img04.taobaocdn.com/bao/uploaded/i4/TB1wVEnGFXXXXcJXXXXXXXXXXXX_!!0-item_pic.jpg_150x150.jpg"/>',
										'<div class="item-title">选择</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="http://img04.taobaocdn.com/bao/uploaded/i4/TB1wVEnGFXXXXcJXXXXXXXXXXXX_!!0-item_pic.jpg_150x150.jpg"/>',
										'<div class="item-title">选择</div>',
									'</div>',
									'<div class="idex-picture-item">',
										'<img src="http://img04.taobaocdn.com/bao/uploaded/i4/TB1wVEnGFXXXXcJXXXXXXXXXXXX_!!0-item_pic.jpg_150x150.jpg"/>',
										'<div class="item-title">选择</div>',
									'</div>',
								'</div>'].join(''),
						onLoad:function(){
							var me=this;
							this.$context = this.$owner.$owner.$owner,
							this.$pictureTree=this.$tabview.children('.idex-picture-tree:first');
							this.$pictureList=this.$tabview.children('.idex-picture-list:first');
							this.$context.loadTreeData(function(json){
								me.createTree(json);
							});
						},
						onShowAfter : function(){
							this.$owner.$floatbar.show();
						},
						onHideAfter : function(){
							this.$owner.$floatbar.hide();
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
							console.info('node click:'+node.cid);
						},
						loadPictureList : function(){
							
						
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