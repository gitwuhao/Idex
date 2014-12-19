(function(CF,$){
	var TAB={
		items : [{
			label:'描述列表',
			name : 'list',
			html :[
				    '<div class="idex-form-box"></div>',
				    '<div class="idex-list-box">',
						'<div class="idex-list-view not-result">',
							'空空的列表...',
						'</div>',
						'<div class="idex-status-box"></div>',
					'</div>',
				  ].join(''),
			_form_ : {
				notLabelPadding : true,
				items : [{
					label:'宝贝标题',
					name : 'title',
					maxlength : 10,
					placeholder : '填写宝贝标题'
				},{
					label:'商家编码',
					name : 'outerId',
					maxlength : 50,
					placeholder : '填写商家编码'
				},{
					label:'描述类型',
					xtype:'radio',
					name : 'isDesc',
					items:[{
						label:'全部&nbsp;&nbsp;&nbsp;',
						value : '',
						checked : true
					},{
						label:'默认&nbsp;&nbsp;&nbsp;',
						value:'0'
					},{
						label:'Idex&nbsp;&nbsp;&nbsp;',
						value:'1'
					}]
				},{
					label:'宝贝类型',
					xtype:'radio',
					name : 'status',
					items:[{
						label:'全部&nbsp;&nbsp;&nbsp;',
						value : '',
						checked : true
					},{
						label:'出售中&nbsp;',
						value:'1'
					},{
						label:'仓库中&nbsp;',
						value:'2'
					}]
				},{
					label:'商品分类',
					html : '<input type="hidden" name="sellerCids"/><div class="category-label"><div class="del x-ui-icon"></div><div class="label"></div></div>'
				},{
					cls :'tree-item',
					html : ' '
				}],
				loadTree : function(){
					//http://idex.oilan.com/config.s?type=1
					var key='seller_category_tree',
						data;

					data=$.cache.get(key);
					if(!data){
						$.ajax({
							url:'/config.s',
							data : 'method=get&type=1',
							$owner : this,
							type : 'POST',
							dataType : 'jsonp',
							success : function(json){
								json=$.cache.buildTreeData(json);
								$.cache.put(key,JSON.stringify(json),new Date());
								this.$owner.createTree(json);
							},
							error : function(){

							}
						});
					}else{
						this.createTree(JSON.parse(data));
					}
				},
				createTree:function(data){
					this.tree=new ui.tree({
						form : this,
						render: $('.tree-item td',this.$elem),
						cls : 'idex-tree-box',
						items: data,
						onNodeClick : function(node,event){
							this.form.on('nodeClick',node);
						}
					});
				},
				onRenderAfter : function(){
					this.$listbox=this.$owner.$listbox;
					this.$viewbox=this.$owner.$viewbox;
					this.$statusbox=this.$owner.$statusbox;

					this.loadTree();

					this.pageSize=$.toNumber(localStorage[this.KEY_PAGE_SIZE]);

					this.$sellerCids=$('[name="sellerCids"]',this.$elem);

					this.$category=$('.category-label',this.$elem);
					this.$categoryLabel=this.$category.children(".label");
					this.$categoryDel=this.$category.children(".del");
					this.$categoryDel.click({
						me : this
					},function(event){
						event.data.me.resetSellerCat();
					});
				},
				resetSellerCat : function(){
					this.$category.hide();
					this.$sellerCids.val('');
					this.tree.removeActiveNode();
				},
				onNodeClick : function(node){
					this.$category.show();
					this.$categoryLabel.text(node.label);
					var list=[],
						children;

					children=node.children;
					if(children){
						for(var i=0,len=children.length;i<len;i++){
							var n=children[i];
							list.push(n.cid);
						}
					}else{
						list.push(node.cid);
					}
					this.$sellerCids.val(list.join(','));
				},
				query : function (data,type){
					var method;
					if(type==this.Q_TYPE.GET){
						method='get';
					}else{
						method='query';
					}


					if(type!=this.Q_TYPE.LOAD){
						this.page=null;
					}

					if(data){
						data='method='+method+'&'+data;
					}else{
						data='method='+method;
					}
					//获取分页尺寸
					if(!this.pageSize){
						data=data+'&pageSize=1';
					}

					this.$statusbox.empty();

					$.ajax({
						url:'/item.s',
						data : data,
						$type : type,
						$owner : this,
						type : 'POST',
						dataType : 'jsonp',
						success : function(json){
							if(!this.$owner.pageSize){
								this.$owner.pageSize=$.toNumber(localStorage[this.$owner.KEY_PAGE_SIZE]);
								if(!this.$owner.pageSize){
									console.error('pageSize is null...');
								}
							}
							this.$owner.onLoadList(json,this.$type);
						},
						error : function(){
							//this.$owner.$statusbox.append(this.$owner.LOAD_MORE_HTML);
						}
					});
				},
				KEY_PAGE_SIZE : 'idex_list_page_size',
				pageSize : null,
				page : null,
				loadMoreList : function(){
					this.removeAutoLoadListener();
					if(!this.page){
						this.page=2;
					}else{
						this.page++;
					}
					var param=null;
					if(!this.queryParam){
						param='page='+this.page;
					}else{
						param=this.queryParam+'&page='+this.page;
					}
					this.query(param,this.Q_TYPE.LOAD);
					//console.info('load more');
				},
				Q_TYPE : {
					SUBMIT : 1,
					GET : 2,
					LOAD : 3
				},
				NOT_MORE_HTML : '<div class="idex-not-more-list">没有更多宝贝显示</div>',
				//LOAD_MORE_HTML : '<div class="idex-load-more-list">点击加载更多</div>',
				onLoadList : function(json,type){
					var qType=this.Q_TYPE,
						html;

					if(type==qType.LOAD){
						this.$statusbox.append(this.NOT_MORE_HTML);
					}
					if(!json){

						this.removeAutoLoadListener();

						if(type==qType.LOAD){
							return;
					    }else if(type==qType.SUBMIT){
							html='没有找到你要的宝贝...';
							this.tabPanel.seach.showQuicktip('试试这里...');
						}else{
							html='没有找到对应的宝贝...';
						}
						
						
						this.tabPanel.$sortbarbox.hide();
						
						this.$viewbox.addClass('not-result');
						this.$viewbox.html(html);
						this.$statusbox.empty();
						return;
					}
					html=[];
					$.it(json,function(i,item){
						html.push(
						'<div class="idex-list-item">',
							'<div class="idex-item-img"><img src="',item.pic_url,'_200x200.jpg"/></div>',
							'<div class="idex-item-content">',
								'<div class="idex-item-title">',
									'<a href="http://item.taobao.com/item.htm?id=',item.num_iid,'" target="_TB_ITEM">',
										item.title,
									'</a>',
								'</div>');

						if(item.status==3){
							html.push(
								'<div class="idex-item-type">',
									'<div class="invalid">失效</div>',
								'</div>'
							);
						}else if(item.is_desc==0){
							html.push(
								'<div class="x-ui-button create"><div class="x-ui-label">创建</div></div>'
							);
						}else{
							html.push(
								'<div class="idex-item-buttons">',
									'<div class="x-ui-button publish"><div class="x-ui-label">发布</div></div>',
									'<div class="x-ui-button edit"><div class="x-ui-label">编辑</div></div>',
								'</div>'
							);
						}

						if(item.edit_time){
							html.push(
								'<div class="idex-item-detail">',
									'最后编辑时间：',item.edit_time);
							if(item.last_user_nick){
								html.push(
									'<span class="last-user">',item.last_user_nick,'</span>'
									);
							}
							if(item.publish_time){
								html.push(
									'<br/>',
									'最后发布时间：',item.publish_time
								);
								if(item.status!=3){
									html.push(
									'<span class="revert"><a href="#list">还原</a></span>'
									);
								}
							}
							html.push(
								'</div>'
							);
						}
						html.push(
							'</div>',
						'</div>'
						);
					});
					if(type==qType.LOAD){
						this.$viewbox.append(html.join(''));
					}else{
						this.$viewbox.removeClass('not-result');
						this.$viewbox.html(html.join(''));
						//滚动到顶部
						this.$listbox[0].scrollTop=0;
					}

					if(json.length==this.pageSize){
						this.addAutoLoadListener();
						if(type==qType.SUBMIT){
							this.tabPanel.$sortbarbox.show();
						}
					}else{
						//this.$statusbox.append(this.NOT_MORE_HTML);
						this.removeAutoLoadListener();
						if(type==qType.SUBMIT || type==qType.GET){
							this.tabPanel.$sortbarbox.hide();
						}
					}
					//console.info(json);
				},
				addAutoLoadListener:function(){
					if(this.isAutoLoadListener){
						return;
					}
					this.isAutoLoadListener=true;
					this.$listbox.on('scroll',{
						me : this
					},function(event){
						if(this.scrollTop + this.clientHeight + 100 > this.scrollHeight){
							event.data.me.loadMoreList();
						}
					});
				},
				removeAutoLoadListener:function(){
					delete this.isAutoLoadListener;
					this.$listbox.off('scroll');
				},
				buttons:[{
					label:'查询',
					onClick:function(){
						var param,
							form=this.$owner;
						param=form.getParam(true);
						form.queryParam=param;
						form.query(param,form.Q_TYPE.SUBMIT);
					}
				},{
					label:'重置',
					onClick:function(){
						var form=this.$owner;
						form.getItem('title').setValue('');
						form.getItem('outerId').setValue('');
						form.getItem('isDesc').setValue('');
						form.getItem('status').setValue('');

						form.resetSellerCat();
					}
				}]
			},
			onShowAfter : function(){
				this.$floatbox.show();
			},
			onHideAfter : function(){
				this.$floatbox.hide();
			},
			onLoad:function(){
				this.$formbox=this.$tabview.children('.idex-form-box:first');
				this.$listbox=this.$tabview.children('.idex-list-box:first');
				this.$viewbox=this.$listbox.children('.idex-list-view:first');
				this.$statusbox=this.$listbox.children('.idex-status-box:first');

				this._form_.render=this.$formbox[0];

				this._form_.$owner=this;

				this._form_.tab=this.$owner;

				
				this._form_.tabPanel=this;

				this.form=new ui.form(this._form_);

				delete this._form_;

				var div,
					html=['<div class="x-ui-floatbar-box">',
							'<div class="idex-sortbar-box">'
						 ];

				for(var i=0,len=this.sortbar.length;i<len;i++){
					var cls,
						item=this.sortbar[i];
					if(item.type){
						cls=item.cls + ' '+ item.type;
					}else{
						cls=item.cls;
					}
					html.push(	'<div class="idex-sort-button ',cls,'" >',item.label,
									'<div class="idex-icon sort"></div>',
								'</div>');
				}
				html.push(  '</div>',
							'<div class="idex-search-box"></div>',
						  '</div>');
				div=$.createElement(html.join(''));

				this.$owner.$tabbarbox.before(div);
				this.$floatbox=$(div);

				var children=this.$floatbox.children();

				this.initSortBarBox(children[0]);
				this.initSearchText(children[1]);
			},
			sortbar : [{
				field :'publish_time',
				cls : 'publish-time',
				label :'发布时间'
			},{
				field :'editor_time',
				cls : 'editor-time',
				label :'编辑时间',
				type : 'desc'
			}],
			sortButtonClick : function(item){
				if(this.activeSortItem){
					this.activeSortItem.$elem.removeClass('desc asc');
					/*
					if(this.activeSortItem!=item){
						this.activeSortItem.type='';
					}
					*/
				}
				if(item.type=='desc'){
					item.type='asc';
				}else{
					item.type='desc';
				}
				item.$elem.addClass(item.type);
				this.activeSortItem=item;
			},
			initSortBarBox : function(sortbarbox){
				this.$sortbarbox=$(sortbarbox);
	 
				var children=this.$sortbarbox.children();
			
				for(var i=0,len=this.sortbar.length;i<len;i++){
					var item = this.sortbar[i];
					item.$elem=$(children[i]);

					item.$elem.click({
						item : item,
						$owner : this
					},function(event){
						var data=event.data;
						data.$owner.sortButtonClick(data.item);
					});
				}
				this.activeSortItem=this.sortbar[1];
			},
			initSearchText : function(searchbox){
				this.seach.render = searchbox;

				var seach=new ui.form.text(this.seach);

				seach.form=this.form;

				this.seach=seach;
			},
			seach : {
				icon :'search',
				placeholder : '粘贴宝贝链接回车查询',
				onRenderAfter : function(){
					this.callPrototypeMethod();
					this.addEventListener('textkeydown',function(event){
						 if(event.keyCode==13){
							this.value=this.$text.val();
							if(this.value){
								this.submit();
							}
						 }
					});

					this.$text.on("paste",{
						me : this
					},function(event){
						var array,
							value=$.getClipboardTextData(event);
						if(!value){
						}else if(value.indexOf('item.taobao.com')>-1 || value.indexOf('detail.tmall.com')>-1){
							array=value.match(/id=(\d{10,13})/i);
							if(array && array.length==2){
								this.value=array[1];
							}
						}else if(event.data.me.REG_NUMIID.test(value)){
							this.value=value;
						}
						return false;
					});
				},
				onIconmousedown : function(event){
					this.submit();
				},
				REG_NUMIID : /^[1234]\d{9,12}$/,
				showQuicktip : function(html){
					ui.quicktip.show({
						align : 'lc',
						offset : 'lt',
						cls : 'list-search-quicktip c1',
						html : html,
						target :  this.$elem[0]
					});
				},
				submit : function(){
					var value=this.value;
					if(!this.REG_NUMIID.test(value)){
						this.showQuicktip('宝贝ID不正确，可直接复制宝贝链接贴入。<div class="shortcuts c2">清空：Shift`+`Backspace</div>'.formatHTML());
						return;
					}
					this.form.query('numIID='+value,this.form.Q_TYPE.GET);
				}
			}
		},{
			label:'描述模板',
			name : 'template',
			onLoad : function(){
				Idex.view.template.init(this);
			}
		}]
	};

	function initTab(render){
		if(TAB._owner_name_==ui.tab._owner_name_){
			return;
		}
		TAB.render=render;
		TAB=new ui.tab(TAB);
	};


	Idex.addEventListener('anchor.list',function(event){
		this.setViewPanel('list');
		initTab(this.activeViewPanel);
		TAB.setCurrentTab(TAB.getTab('list'));
	});


	Idex.addEventListener('anchor.template',function(event){
		this.setViewPanel('list');
		initTab(this.activeViewPanel);
		TAB.setCurrentTab(TAB.getTab('template'));
	});

})(CF,jQuery);


/*
'<div class="idex-list-item">',
	'<div class="idex-item-img"><img src="http://gi3.md.alicdn.com/imgextra/i3/263817957/T26y.6Xm4XXXXXXXXX_!!263817957.jpg_200x200.jpg"/></div>',
	'<div class="idex-item-content">',
		'<div class="idex-item-title">',
			'<a href="http://item.taobao.com/item.htm?id=27018556087" target="_TB_ITEM">',
			'韩都衣舍韩版2014冬装新款女装宽松保暖连帽羽绒服GW2800阨',
			'</a>',
		'</div>',
		'<div class="idex-item-buttons">',
			'<div class="x-ui-button"><div class="x-ui-label">发布</div></div>',
			'<div class="x-ui-button"><div class="x-ui-label">编辑</div></div>',
		'</div>',
		'<div class="idex-item-detail">',
			'最后编辑时间：2014-10-11 11:26:07<br/>',
			'最后发布时间：2014-10-11 11:26:07',
			'<span class="revert"><a href="#list">还原</a></span>',
		'</div>',
	'</div>',
'</div>',
'<div class="idex-list-item">',
	'<div class="idex-item-img"><img src="http://gi3.md.alicdn.com/bao/uploaded/i3/TB13htlGpXXXXaZXXXXXXXXXXXX_!!0-item_pic.jpg_200x200.jpg"/></div>',
	'<div class="idex-item-content">',
		'<div class="idex-item-title">',
			'<a href="http://item.taobao.com/item.htm?id=27018556087" target="_TB_ITEM">',
			'韩都衣舍韩版2014冬装新款女装宽松保暖连帽羽绒服GW2800阨',
			'</a>',
		'</div>',
		'<div class="idex-item-type">',
			'<div class="invalid">失效</div>',
		'</div>',
		'<div class="idex-item-detail">',
			'最后编辑时间：2014-10-11 11:26:07<br/>',
		'</div>',
	'</div>',
'</div>',
'<div class="idex-list-item">',
	'<div class="idex-item-img"><img src="http://gi3.md.alicdn.com/bao/uploaded/i3/TB1HsiEFVXXXXXZaXXXXXXXXXXX_!!0-item_pic.jpg_200x200.jpg"/></div>',
	'<div class="idex-item-content">',
		'<div class="idex-item-title">',
			'<a href="http://item.taobao.com/item.htm?id=27018556087" target="_TB_ITEM">',
			'韩都衣舍韩版2014冬装新款女装宽松保暖连帽羽绒服GW2800阨',
			'</a>',
		'</div>',
		'<div class="x-ui-button create"><div class="x-ui-label">创建</div></div>',
	'</div>',
'</div>',
'<div class="idex-list-item">',
	'<div class="idex-item-img"><img src="http://gi2.md.alicdn.com/bao/uploaded/i2/TB1j27lFVXXXXaLXFXXXXXXXXXX_!!0-item_pic.jpg_200x200.jpg"/></div>',
	'<div class="idex-item-content">',
		'<div class="idex-item-title">',
			'<a href="http://item.taobao.com/item.htm?id=27018556087" target="_TB_ITEM">',
			'韩都衣舍韩版2014冬装新款女装宽松保暖连帽羽绒服GW2800阨',
			'</a>',
		'</div>',
		'<div class="idex-item-type">',
			'<div class="invalid">失效</div>',
		'</div>',
		'<div class="idex-item-detail">',
			'最后编辑时间：2014-10-11 11:26:07<br/>',
			'最后发布时间：2014-10-11 11:26:07',
		'</div>',
	'</div>',
'</div>',
'<div class="idex-list-item">',
	'<div class="idex-item-img"><img src="images/s.gif"/></div>',
	'<div class="idex-item-content">',
		'<div class="idex-item-title">',
			'<a href="http://item.taobao.com/item.htm?id=27018556087" target="_TB_ITEM">',
			'韩都衣舍韩版2014冬装新款女装宽松保暖连帽羽绒服GW2800阨',
			'</a>',
		'</div>',
		'<div class="idex-item-type">',
			'<div class="invalid">失效</div>',
		'</div>',
		'<div class="idex-item-detail">',
			'最后编辑时间：2014-10-11 11:26:07<br/>',
			'最后发布时间：2014-10-11 11:26:07',
		'</div>',
	'</div>',
'</div>',

*/

