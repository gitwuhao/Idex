(function(CF,$){
	var TAB={
		floatbar : [{
			xtype:'text',
			icon :'search',
			placeholder : '粘贴宝贝ID或链接直接查询'
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
						'<div class="idex-list-view">',
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
						'</div>',
					'</div>',
				  ].join(''),
			_form_ : {
				items : [{
					label:'宝贝标题',
					name : 'title',
					placeholder : '填写宝贝标题'
				},{
					label:'商家编码',
					name : 'code',
					placeholder : '填写商家编码'
				},{
					label:'描述类型',
					xtype:'radio',
					name : 'type',
					items:[{
						label:'全部&nbsp;&nbsp;&nbsp;',
						value : '1',
						checked : true
					},{
						label:'默认&nbsp;&nbsp;&nbsp;',
						value:'2'
					},{
						label:'Idex&nbsp;&nbsp;&nbsp;',
						value:'3'
					}]
				},{
					label:'宝贝类型',
					xtype:'radio',
					name : 'ptype',
					items:[{
						label:'全部&nbsp;&nbsp;&nbsp;',
						value : '1',
						checked : true
					},{
						label:'出售中&nbsp;',
						value:'2'
					},{
						label:'仓库中&nbsp;',
						value:'3'
					}]
				},{
					label:'商品分类',
					html : '<input type="hidden" name="seller_cids"/><div class="selected-category"><div class="del x-ui-icon"></div><div class="label">新品专区</div></div>'
				},{
					cls :'tree-item',
					html : ' '
				}],
				onRenderAfter : function(){
					ui.logger(this);
					this.tree=new ui.tree({
						form : this,
						render: $('.tree-item td',this.$elem),
						cls : 'idex-tree-box',
						items: [{"cid":"1008995124","label":"【TOP爆款专区TOP爆款专区TOP爆款专区】"},{"cid":"996913469","label":"【羽绒会场】"},{"cid":"996916438","label":"【棉衣/棉服会场】"},{"cid":"996917343","label":"【毛呢外套会场】"},{"cid":"996918423","label":"【毛衣/针织衫会场】","children":[{"cid":"996917449","label":"毛衣"},{"cid":"996918823","label":"针织衫"}]},{"cid":"996918558","label":"【连衣裙会场】","children":[{"cid":"997736354","label":"街头连衣裙"},{"cid":"997736374","label":"半身裙"},{"cid":"997737329","label":"甜美连衣裙"},{"cid":"997737632","label":"通勤连衣裙"}]},{"cid":"977255555","label":"秋装连衣裙"},{"cid":"960312272","label":"套装"},{"cid":"936571235","label":"吊带"},{"cid":"898737942","label":"防晒衫/空调衫"},{"cid":"809997507","label":"手机品牌团"},{"cid":"837773734","label":"针织衫"},{"cid":"159451110","label":"上装"},{"cid":"327891660","label":"长袖T恤","children":[{"cid":"327891661","label":"圆领长袖T恤"},{"cid":"327891662","label":"V领长袖T恤"},{"cid":"327891663","label":"纯色长袖T恤"},{"cid":"327891664","label":"图案长袖T恤"}]},{"cid":"327891654","label":"短袖T恤","children":[{"cid":"327891656","label":"圆领短袖T恤"},{"cid":"327891657","label":"V领短袖T恤"},{"cid":"327891658","label":"纯色短袖T恤"},{"cid":"327891659","label":"图案短袖T恤"}]},{"cid":"331151036","label":"五分/七分袖T恤"},{"cid":"344203726","label":"吊带/背心"},{"cid":"327891666","label":"毛衣/针织衫","children":[{"cid":"396130286","label":"针织衫"},{"cid":"396130287","label":"毛衣"}]},{"cid":"703984217","label":"罩衫"},{"cid":"327891670","label":"卫衣","children":[{"cid":"327891671","label":"连帽卫衣"},{"cid":"327891672","label":"开衫卫衣"},{"cid":"327891673","label":"套头卫衣"},{"cid":"327891674","label":"纯色卫衣"},{"cid":"327891675","label":"图案卫衣"},{"cid":"396555368","label":"加厚卫衣"}]},{"cid":"327891676","label":"衬衫/雪纺","children":[{"cid":"327891677","label":"短袖衬衫/雪纺"},{"cid":"327891678","label":"长袖衬衫/雪纺"}]},{"cid":"484900850","label":"防晒衫"},{"cid":"327891679","label":"外套","children":[{"cid":"327891681","label":"西装"},{"cid":"327891687","label":"风衣"},{"cid":"327891690","label":"皮衣"},{"cid":"396555369","label":"短外套"},{"cid":"331184091","label":"休闲外套"},{"cid":"396555370","label":"毛呢外套"},{"cid":"403287508","label":"棉衣/羽绒服"},{"cid":"618832157","label":"皮草"}]},{"cid":"327891692","label":"马夹"},{"cid":"327891694","label":"裙装"},{"cid":"327891696","label":"连衣裙","children":[{"cid":"327891698","label":"吊带裙"},{"cid":"327891700","label":"背带裙/背心裙"},{"cid":"327891705","label":"短袖连衣裙"},{"cid":"336326209","label":"无袖连衣裙"},{"cid":"327891708","label":"中袖/七分袖连衣裙"},{"cid":"327891709","label":"长袖连衣裙"},{"cid":"327891711","label":"纯色连衣裙"}]},{"cid":"327891713","label":"半身裙","children":[{"cid":"327891715","label":"短款半身裙"},{"cid":"327891717","label":"长款半身裙"}]},{"cid":"327891721","label":"裤装"},{"cid":"327891723","label":"牛仔长裤"},{"cid":"327891725","label":"休闲长裤"},{"cid":"327891731","label":"七分/五分裤"},{"cid":"327891727","label":"打底裤"},{"cid":"327891732","label":"连衣裤"},{"cid":"327891729","label":"短裤"},{"cid":"339975073","label":"女套装"},{"cid":"336346439","label":"女装大码区","children":[{"cid":"336346440","label":"大码区上装"},{"cid":"336346441","label":"大码区下装"},{"cid":"336346442","label":"大码区裙装"}]},{"cid":"727608651","label":"甜美","children":[{"cid":"727610763","label":"T恤"},{"cid":"727611251","label":"衬衫/雪纺/防晒衫"},{"cid":"727611268","label":"裙装"},{"cid":"727611409","label":"裤装"},{"cid":"727611515","label":"鞋/包/配饰"}]},{"cid":"727608661","label":"通勤","children":[{"cid":"727611936","label":"T恤"},{"cid":"727611950","label":"衬衫/雪纺/防晒衫"},{"cid":"727612257","label":"裙装"},{"cid":"727612272","label":"鞋/包/配饰"},{"cid":"727612307","label":"裤装"}]},{"cid":"727609067","label":"街头","children":[{"cid":"727612539","label":"T恤"},{"cid":"727612554","label":"衬衫/雪纺/防晒衫"},{"cid":"727612585","label":"裤装"},{"cid":"727612752","label":"裙装"},{"cid":"727613232","label":"鞋/包/配饰"}]},{"cid":"292759307","label":"每日新品","children":[{"cid":"1017675072","label":"1205新品"},{"cid":"1017216872","label":"1204新品"},{"cid":"1016744016","label":"1203新品"},{"cid":"1016266965","label":"1202新品"},{"cid":"1015810179","label":"1201新品"},{"cid":"1014928575","label":"1129新品"},{"cid":"1014451539","label":"1128新品"},{"cid":"1010397891","label":"1127新品"},{"cid":"1003818318","label":"1119新品"},{"cid":"1000571000","label":"1106新品"}]},{"cid":"752579305","label":"休闲裤专区"},{"cid":"667610938","label":"手机专享"},{"cid":"726771876","label":"手机天猫"},{"cid":"674505605","label":"手机爆款"},{"cid":"674505543","label":"手机秒杀"},{"cid":"726772561","label":"手机精品"},{"cid":"693761559","label":"手机聚划算"},{"cid":"666931747","label":"箱包专区","children":[{"cid":"666932221","label":"单肩包"},{"cid":"666932045","label":"手提包"},{"cid":"666932166","label":"斜挎包"},{"cid":"666932080","label":"手拿包"},{"cid":"666932173","label":"双肩包"},{"cid":"666932350","label":"钱包/卡套"}]},{"cid":"666933897","label":"女鞋专区","children":[{"cid":"666934506","label":"靴子"},{"cid":"666934065","label":"高帮鞋"},{"cid":"666934523","label":"低帮鞋"},{"cid":"666934379","label":"帆布鞋"},{"cid":"666934592","label":"凉鞋"},{"cid":"666934666","label":"拖鞋"},{"cid":"666934828","label":"春季"},{"cid":"666934870","label":"秋季"},{"cid":"666935249","label":"冬季"},{"cid":"666935045","label":"夏季"},{"cid":"666935572","label":"羊皮"},{"cid":"666935934","label":"牛皮"},{"cid":"666936105","label":"PU"}]},{"cid":"666932715","label":"配件专区","children":[{"cid":"666933043","label":"围巾"},{"cid":"666933059","label":"帽子"},{"cid":"666932376","label":"腰带"},{"cid":"666933125","label":"其他"}]},{"cid":"666933234","label":"饰品专区","children":[{"cid":"666933195","label":"项链/毛衣链"},{"cid":"666933264","label":"耳钉/耳环"},{"cid":"666933634","label":"发饰"},{"cid":"666933695","label":"手链/手镯"},{"cid":"666933939","label":"戒指/指环"},{"cid":"903242820","label":"套装"},{"cid":"666933845","label":"其他"}]},{"cid":"620068604","label":"文胸专区"},{"cid":"634926532","label":"鞋包配饰专区","children":[{"cid":"634926559","label":"女鞋"},{"cid":"634926622","label":"箱包"},{"cid":"634926640","label":"配件"},{"cid":"635008251","label":"内衣"},{"cid":"635008542","label":"饰品"}]},{"cid":"636324397","label":"童装专区","children":[{"cid":"636324804","label":"儿童上装"},{"cid":"636324919","label":"儿童裤装"},{"cid":"636324933","label":"儿童裙装"},{"cid":"636327689","label":"儿童套装"},{"cid":"636328014","label":"童鞋"},{"cid":"636328140","label":"儿童配件"},{"cid":"636328182","label":"儿童箱包"},{"cid":"636328411","label":"儿童饰品"}]},{"cid":"159451122","label":"男装专区"},{"cid":"743239119","label":"橱窗精品"},{"cid":"669277707","label":"50元及以下 非包邮商品"},{"cid":"768706829","label":"生e经"},{"cid":"794857792","label":"毛呢/棉衣/羽绒服"},{"cid":"800379234","label":"棉衣/棉服"},{"cid":"816801252","label":"加绒裤"},{"cid":"825131068","label":"毛呢外套"},{"cid":"825131856","label":"卫衣/短外套"},{"cid":"825312383","label":"T恤/卫衣专区","children":[{"cid":"825312577","label":"长袖T恤"},{"cid":"825312793","label":"卫衣"}]},{"cid":"809996087","label":"手机新品"},{"cid":"839849765","label":"雪纺衫/蕾丝衫","children":[{"cid":"839849794","label":"雪纺衫"},{"cid":"839850470","label":"蕾丝衫"}]},{"cid":"917141945","label":"休闲裤"},{"cid":"917142322","label":"牛仔裤"},{"cid":"950888245","label":"T恤"},{"cid":"964132791","label":"冬装"},{"cid":"969338074","label":"【勿选择】技术测试分类1","children":[{"cid":"969402239","label":"【勿选择】技术测试分类1-3"},{"cid":"969374351","label":"【勿选择】技术测试分类1-1"},{"cid":"971312653","label":"测试！！！勿选！！！"}]},{"cid":"969338075","label":"【勿选择】技术测试分类2"},{"cid":"978292704","label":"羽绒服"},{"cid":"978305418","label":"【秋装特惠专场】"},{"cid":"990990640","label":"【秋装清仓】"},{"cid":"997717839","label":"【牛仔裤会场】","children":[{"cid":"997718329","label":"小脚裤"},{"cid":"997718722","label":"五分/七分/短裤"},{"cid":"997718820","label":"直筒裤"}]},{"cid":"997736593","label":"【休闲裤会场】","children":[{"cid":"997738635","label":"休闲裤"},{"cid":"997739832","label":"五分/七分/短裤"},{"cid":"997739838","label":"打底裤"}]},{"cid":"997740713","label":"【T恤/衬衫会场】","children":[{"cid":"997739596","label":"衬衫"},{"cid":"997739627","label":"T恤"},{"cid":"997739629","label":"雪纺衫/蕾丝衫"}]},{"cid":"997740968","label":"【卫衣/短外套会场】","children":[{"cid":"997738792","label":"西装"},{"cid":"997739949","label":"短外套"},{"cid":"997740575","label":"卫衣"},{"cid":"997741639","label":"套装"},{"cid":"997742103","label":"风衣"},{"cid":"997742135","label":"马夹"}]},{"cid":"997743025","label":"【鞋包配饰会场】","children":[{"cid":"997741324","label":"箱包"},{"cid":"997741933","label":"配件"},{"cid":"997742521","label":"配饰"},{"cid":"997742864","label":"美鞋"}]},{"cid":"1017040672","label":"【双12满减专区】"}],
						onNodeClick : function(node,event){
							this.form.on('nodeClick',node);
						}
					});

					this.$sellerCids=$('[name="seller_cids"]',this.$elem);
					this.$category=$('.selected-category',this.$elem);
					this.$categoryLabel=this.$category.children(".label");
					this.$categoryDel=this.$category.children(".del");
					this.$categoryDel.click({
						me : this
					},function(event){
						var me=event.data.me;
						me.$category.hide();
						me.$sellerCids.val('');
						me.tree.removeActiveNode();
					});
				},
				onNodeClick : function(node){
					this.$category.show();
					this.$categoryLabel.text(node.label);
					this.$sellerCids.val(node.cid);
				},
				buttons:[{
					label:'查询',
					onClick:function(){

					}
				},{
					label:'重置',
					onClick:function(){

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
				this.$viewbox=this.$tabview.children('.idex-list-box:first');

				this._form_.render=this.$formbox[0];

				this.form=new ui.form(this._form_);
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