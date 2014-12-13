(function(CF,$){
	var TAB={
		floatbar : [{
			xtype:'text',
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
			REG_NUMIID : /^[1234]\d{9,12}$/,
			onIconmousedown : function(event){
				this.submit();
			},
			submit : function(){
				var value=this.value;
				if(!this.REG_NUMIID.test(value)){
					ui.quicktip.show({
						align : 'lc',
						offset : 'lt',
						cls : 'list-search-quicktip c1',
						html : '宝贝ID不正确，可直接复制宝贝链接贴入。<div class="shortcuts c2">清空：Shift`+`Backspace</div>'.formatHTML(),
						target :  this.$elem[0]
					});
					return;
				}
				console.info('submit:'+value);
				
				var form,
					list=this.$owner.getTab('list');
				form=list.form;

				form.query('numIID='+value,form.Q_TYPE.GET);
			}
		}],
		topbar : {
			cls:'idex-list-sort-bar uns',
			items:[{
				label:'发布时间',
				cls:'publish-time',
				icon:'sort'
			},{
				label:'编辑时间',
				cls:'editor-time desc',
				icon:'sort'
			}]
		},
		items : [{
			label:'描述列表',
			name : 'list',
			html :[
				    '<div class="idex-form-box"></div>',
				    '<div class="idex-list-box">',
						'<div class="idex-list-view not-result">',
							'空空的列表等待查找...',
						'</div>',
					'</div>',
				  ].join(''),
			_form_ : {
				notLabelPadding : true,
				items : [{
					label:'宝贝标题',
					name : 'title',
					placeholder : '填写宝贝标题'
				},{
					label:'商家编码',
					name : 'outerId',
					placeholder : '填写商家编码'
				},{
					label:'描述类型',
					xtype:'radio',
					name : 'isdesc',
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

					this.loadTree();

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
					
					if(data){
						data='method='+method+'&'+data;
					}else{
						data='method='+method;
					}
					
					$.ajax({
						url:'/item.s',
						data : data,
						$type : type,
						$owner : this,
						type : 'POST',
						dataType : 'jsonp',
						success : function(json){
							this.$owner.onLoadList(json,this.$type);
						},
						error : function(){

						}
					});
				},
				Q_TYPE : {
					SUBMIT : 1,
					GET : 2,
					LOAD : 3
				},
				onLoadList : function(json,type){
					var qType=this.Q_TYPE,
						html,
						$viewbox=this.$owner.$viewbox;
					
					if(!json){
						if(type==qType.LOAD){
							return;
					    }else if(type==qType.SUBMIT){
							html='没有找到你要的宝贝，直接用宝贝ID试试...';
						}else{
							html='没有找到对应的宝贝...';
						}
						$viewbox.addClass('not-result');
						$viewbox.html(html);
						return;			
					}
					html=[];

					console.info(json);
				},
				buttons:[{
					label:'查询',
					onClick:function(){
						var param,
							form=this.$owner;
						param=form.getParam(true);
						form.query(param,form.Q_TYPE.SUBMIT);
					}
				},{
					label:'重置',
					onClick:function(){
						var form=this.$owner;
						form.getItem('title').setValue('');
						form.getItem('outerId').setValue('');
						form.getItem('isdesc').setValue('');
						form.getItem('status').setValue('');
						form.resetSellerCat();
					}
				}]
			},
			onShowAfter : function(){
				this.tabPanel.$floatbar.show();
			},
			onHideAfter : function(){
				this.tabPanel.$floatbar.hide();
			},
			onLoad:function(){
				this.$formbox=this.$tabview.children('.idex-form-box:first');
				this.$viewbox=this.$tabview.children('.idex-list-box:first').children('.idex-list-view:first');

				this._form_.render=this.$formbox[0];

				this.form=new ui.form(this._form_);
				
				this.form.$owner=this;
				delete this._form_;
			}
		},{
			label:'描述模板',
			name : 'module',
			onLoad:function(){
				var html=['<div class="idex-module-box">',
						'<div class="idex-module-item idex-shadow-box">',
							'<p>空白</p>',
							'<em>点击创建模板</em>',
						'</div>',
						'<div class="idex-module-item idex-shadow-box">',
							'<div class="idex-mini-tbar">',
								'<div class="copy idex-icon"></div>',
								'<div class="del idex-icon"></div>',
							'</div>',
							'<p>750px</p>',
							'<em>淘宝模板</em>',
						'</div>',
						'<div class="idex-module-item idex-shadow-box">',
							'<div class="idex-mini-tbar">',
								'<div class="copy idex-icon"></div>',
								'<div class="del idex-icon"></div>',
							'</div>',
							'<p>790px</p>',
							'<em>天猫模板</em>',
						'</div>',
						'<div class="idex-module-item idex-shadow-box">',
							'<div class="idex-mini-tbar">',
								'<div class="copy idex-icon"></div>',
								'<div class="del idex-icon"></div>',
							'</div>',
							'<p>750px</p>',
							'<em>品牌形象</em>',
						'</div>',
						'<div class="idex-module-item idex-shadow-box">',
							'<div class="idex-mini-tbar">',
								'<div class="copy idex-icon"></div>',
								'<div class="del idex-icon"></div>',
							'</div>',
							'<p>750px</p>',
							'<em>品牌形象品牌形象</em>',
						'</div>',
						'<div class="idex-module-item idex-shadow-box">',
							'<div class="idex-mini-tbar">',
								'<div class="copy idex-icon"></div>',
								'<div class="del idex-icon"></div>',
							'</div>',
							'<p>750px</p>',
							'<em>品牌形象品牌形象</em>',
						'</div>',
					  '</div>'];

				this.$tabview.html(html.join(''));
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
		TAB.setCurrentTab(TAB.getTab('module'));
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