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
						labelKey : 'name',
						render: $('.tree-item td',this.$elem),
						cls : 'idex-tree-box',
						items: [{cid:"1008995124",name:"【TOP爆款专区TOP爆款专区TOP爆款专区】",pid:"0",sort:"1"},{cid:"996913469",name:"【羽绒会场】",pid:"0",sort:"2"},{cid:"996916438",name:"【棉衣/棉服会场】",pid:"0",sort:"3"},{cid:"996917343",name:"【毛呢外套会场】",pid:"0",sort:"4"},{cid:"996918423",name:"【毛衣/针织衫会场】",pid:"0",sort:"5"},{cid:"996917449",name:"毛衣",pid:"996918423",sort:"1"},{cid:"996918823",name:"针织衫",pid:"996918423",sort:"2"},{cid:"996918558",name:"【连衣裙会场】",pid:"0",sort:"6"},{cid:"997736354",name:"街头连衣裙",pid:"996918558",sort:"1"},{cid:"997736374",name:"半身裙",pid:"996918558",sort:"2"},{cid:"997737329",name:"甜美连衣裙",pid:"996918558",sort:"3"},{cid:"997737632",name:"通勤连衣裙",pid:"996918558",sort:"4"},{cid:"977255555",name:"秋装连衣裙",pid:"0",sort:"7"},{cid:"960312272",name:"套装",pid:"0",sort:"8"},{cid:"936571235",name:"吊带",pid:"0",sort:"9"},{cid:"898737942",name:"防晒衫/空调衫",pid:"0",sort:"10"},{cid:"809997507",name:"手机品牌团",pid:"0",sort:"11"},{cid:"837773734",name:"针织衫",pid:"0",sort:"12"},{cid:"159451110",name:"上装",pid:"0",sort:"13"},{cid:"327891660",name:"长袖T恤",pid:"0",sort:"14"},{cid:"327891661",name:"圆领长袖T恤",pid:"327891660",sort:"1"},{cid:"327891662",name:"V领长袖T恤",pid:"327891660",sort:"2"},{cid:"327891663",name:"纯色长袖T恤",pid:"327891660",sort:"3"},{cid:"327891664",name:"图案长袖T恤",pid:"327891660",sort:"4"},{cid:"327891654",name:"短袖T恤",pid:"0",sort:"15"},{cid:"327891656",name:"圆领短袖T恤",pid:"327891654",sort:"1"},{cid:"327891657",name:"V领短袖T恤",pid:"327891654",sort:"2"},{cid:"327891658",name:"纯色短袖T恤",pid:"327891654",sort:"3"},{cid:"327891659",name:"图案短袖T恤",pid:"327891654",sort:"4"},{cid:"331151036",name:"五分/七分袖T恤",pid:"0",sort:"16"},{cid:"344203726",name:"吊带/背心",pid:"0",sort:"17"},{cid:"327891666",name:"毛衣/针织衫",pid:"0",sort:"18"},{cid:"396130286",name:"针织衫",pid:"327891666",sort:"1"},{cid:"396130287",name:"毛衣",pid:"327891666",sort:"2"},{cid:"703984217",name:"罩衫",pid:"0",sort:"19"},{cid:"327891670",name:"卫衣",pid:"0",sort:"20"},{cid:"327891671",name:"连帽卫衣",pid:"327891670",sort:"1"},{cid:"327891672",name:"开衫卫衣",pid:"327891670",sort:"2"},{cid:"327891673",name:"套头卫衣",pid:"327891670",sort:"3"},{cid:"327891674",name:"纯色卫衣",pid:"327891670",sort:"4"},{cid:"327891675",name:"图案卫衣",pid:"327891670",sort:"5"},{cid:"396555368",name:"加厚卫衣",pid:"327891670",sort:"6"},{cid:"327891676",name:"衬衫/雪纺",pid:"0",sort:"21"},{cid:"327891677",name:"短袖衬衫/雪纺",pid:"327891676",sort:"1"},{cid:"327891678",name:"长袖衬衫/雪纺",pid:"327891676",sort:"2"},{cid:"484900850",name:"防晒衫",pid:"0",sort:"22"},{cid:"327891679",name:"外套",pid:"0",sort:"23"},{cid:"327891681",name:"西装",pid:"327891679",sort:"1"},{cid:"327891687",name:"风衣",pid:"327891679",sort:"2"},{cid:"327891690",name:"皮衣",pid:"327891679",sort:"3"},{cid:"396555369",name:"短外套",pid:"327891679",sort:"4"},{cid:"331184091",name:"休闲外套",pid:"327891679",sort:"5"},{cid:"396555370",name:"毛呢外套",pid:"327891679",sort:"6"},{cid:"403287508",name:"棉衣/羽绒服",pid:"327891679",sort:"7"},{cid:"618832157",name:"皮草",pid:"327891679",sort:"8"},{cid:"327891692",name:"马夹",pid:"0",sort:"24"},{cid:"327891694",name:"裙装",pid:"0",sort:"25"},{cid:"327891696",name:"连衣裙",pid:"0",sort:"26"},{cid:"327891698",name:"吊带裙",pid:"327891696",sort:"1"},{cid:"327891700",name:"背带裙/背心裙",pid:"327891696",sort:"2"},{cid:"327891705",name:"短袖连衣裙",pid:"327891696",sort:"3"},{cid:"336326209",name:"无袖连衣裙",pid:"327891696",sort:"4"},{cid:"327891708",name:"中袖/七分袖连衣裙",pid:"327891696",sort:"5"},{cid:"327891709",name:"长袖连衣裙",pid:"327891696",sort:"6"},{cid:"327891711",name:"纯色连衣裙",pid:"327891696",sort:"7"},{cid:"327891713",name:"半身裙",pid:"0",sort:"27"},{cid:"327891715",name:"短款半身裙",pid:"327891713",sort:"1"},{cid:"327891717",name:"长款半身裙",pid:"327891713",sort:"2"},{cid:"327891721",name:"裤装",pid:"0",sort:"28"},{cid:"327891723",name:"牛仔长裤",pid:"0",sort:"29"},{cid:"327891725",name:"休闲长裤",pid:"0",sort:"30"},{cid:"327891731",name:"七分/五分裤",pid:"0",sort:"31"},{cid:"327891727",name:"打底裤",pid:"0",sort:"32"},{cid:"327891732",name:"连衣裤",pid:"0",sort:"33"},{cid:"327891729",name:"短裤",pid:"0",sort:"34"},{cid:"339975073",name:"女套装",pid:"0",sort:"35"},{cid:"336346439",name:"女装大码区",pid:"0",sort:"36"},{cid:"336346440",name:"大码区上装",pid:"336346439",sort:"1"},{cid:"336346441",name:"大码区下装",pid:"336346439",sort:"2"},{cid:"336346442",name:"大码区裙装",pid:"336346439",sort:"3"},{cid:"727608651",name:"甜美",pid:"0",sort:"37"},{cid:"727610763",name:"T恤",pid:"727608651",sort:"1"},{cid:"727611251",name:"衬衫/雪纺/防晒衫",pid:"727608651",sort:"2"},{cid:"727611268",name:"裙装",pid:"727608651",sort:"3"},{cid:"727611409",name:"裤装",pid:"727608651",sort:"4"},{cid:"727611515",name:"鞋/包/配饰",pid:"727608651",sort:"5"},{cid:"727608661",name:"通勤",pid:"0",sort:"38"},{cid:"727611936",name:"T恤",pid:"727608661",sort:"1"},{cid:"727611950",name:"衬衫/雪纺/防晒衫",pid:"727608661",sort:"2"},{cid:"727612257",name:"裙装",pid:"727608661",sort:"3"},{cid:"727612272",name:"鞋/包/配饰",pid:"727608661",sort:"4"},{cid:"727612307",name:"裤装",pid:"727608661",sort:"5"},{cid:"727609067",name:"街头",pid:"0",sort:"39"},{cid:"727612539",name:"T恤",pid:"727609067",sort:"1"},{cid:"727612554",name:"衬衫/雪纺/防晒衫",pid:"727609067",sort:"2"},{cid:"727612585",name:"裤装",pid:"727609067",sort:"3"},{cid:"727612752",name:"裙装",pid:"727609067",sort:"4"},{cid:"727613232",name:"鞋/包/配饰",pid:"727609067",sort:"5"},{cid:"292759307",name:"每日新品",pid:"0",sort:"40"},{cid:"1017675072",name:"1205新品",pid:"292759307",sort:"1"},{cid:"1017216872",name:"1204新品",pid:"292759307",sort:"2"},{cid:"1016744016",name:"1203新品",pid:"292759307",sort:"3"},{cid:"1016266965",name:"1202新品",pid:"292759307",sort:"4"},{cid:"1015810179",name:"1201新品",pid:"292759307",sort:"5"},{cid:"1014928575",name:"1129新品",pid:"292759307",sort:"6"},{cid:"1014451539",name:"1128新品",pid:"292759307",sort:"7"},{cid:"1010397891",name:"1127新品",pid:"292759307",sort:"8"},{cid:"1003818318",name:"1119新品",pid:"292759307",sort:"9"},{cid:"1000571000",name:"1106新品",pid:"292759307",sort:"10"},{cid:"752579305",name:"休闲裤专区",pid:"0",sort:"41"},{cid:"667610938",name:"手机专享",pid:"0",sort:"42"},{cid:"726771876",name:"手机天猫",pid:"0",sort:"43"},{cid:"674505605",name:"手机爆款",pid:"0",sort:"44"},{cid:"674505543",name:"手机秒杀",pid:"0",sort:"45"},{cid:"726772561",name:"手机精品",pid:"0",sort:"46"},{cid:"693761559",name:"手机聚划算",pid:"0",sort:"47"},{cid:"666931747",name:"箱包专区",pid:"0",sort:"48"},{cid:"666932221",name:"单肩包",pid:"666931747",sort:"1"},{cid:"666932045",name:"手提包",pid:"666931747",sort:"2"},{cid:"666932166",name:"斜挎包",pid:"666931747",sort:"3"},{cid:"666932080",name:"手拿包",pid:"666931747",sort:"4"},{cid:"666932173",name:"双肩包",pid:"666931747",sort:"5"},{cid:"666932350",name:"钱包/卡套",pid:"666931747",sort:"6"},{cid:"666933897",name:"女鞋专区",pid:"0",sort:"49"},{cid:"666934506",name:"靴子",pid:"666933897",sort:"1"},{cid:"666934065",name:"高帮鞋",pid:"666933897",sort:"2"},{cid:"666934523",name:"低帮鞋",pid:"666933897",sort:"3"},{cid:"666934379",name:"帆布鞋",pid:"666933897",sort:"4"},{cid:"666934592",name:"凉鞋",pid:"666933897",sort:"5"},{cid:"666934666",name:"拖鞋",pid:"666933897",sort:"6"},{cid:"666934828",name:"春季",pid:"666933897",sort:"7"},{cid:"666934870",name:"秋季",pid:"666933897",sort:"8"},{cid:"666935249",name:"冬季",pid:"666933897",sort:"9"},{cid:"666935045",name:"夏季",pid:"666933897",sort:"10"},{cid:"666935572",name:"羊皮",pid:"666933897",sort:"11"},{cid:"666935934",name:"牛皮",pid:"666933897",sort:"12"},{cid:"666936105",name:"PU",pid:"666933897",sort:"13"},{cid:"666932715",name:"配件专区",pid:"0",sort:"50"},{cid:"666933043",name:"围巾",pid:"666932715",sort:"1"},{cid:"666933059",name:"帽子",pid:"666932715",sort:"2"},{cid:"666932376",name:"腰带",pid:"666932715",sort:"3"},{cid:"666933125",name:"其他",pid:"666932715",sort:"4"},{cid:"666933234",name:"饰品专区",pid:"0",sort:"51"},{cid:"666933195",name:"项链/毛衣链",pid:"666933234",sort:"1"},{cid:"666933264",name:"耳钉/耳环",pid:"666933234",sort:"2"},{cid:"666933634",name:"发饰",pid:"666933234",sort:"3"},{cid:"666933695",name:"手链/手镯",pid:"666933234",sort:"4"},{cid:"666933939",name:"戒指/指环",pid:"666933234",sort:"5"},{cid:"903242820",name:"套装",pid:"666933234",sort:"6"},{cid:"666933845",name:"其他",pid:"666933234",sort:"7"},{cid:"620068604",name:"文胸专区",pid:"0",sort:"52"},{cid:"634926532",name:"鞋包配饰专区",pid:"0",sort:"53"},{cid:"634926559",name:"女鞋",pid:"634926532",sort:"1"},{cid:"634926622",name:"箱包",pid:"634926532",sort:"2"},{cid:"634926640",name:"配件",pid:"634926532",sort:"3"},{cid:"635008251",name:"内衣",pid:"634926532",sort:"4"},{cid:"635008542",name:"饰品",pid:"634926532",sort:"5"},{cid:"636324397",name:"童装专区",pid:"0",sort:"54"},{cid:"636324804",name:"儿童上装",pid:"636324397",sort:"1"},{cid:"636324919",name:"儿童裤装",pid:"636324397",sort:"2"},{cid:"636324933",name:"儿童裙装",pid:"636324397",sort:"3"},{cid:"636327689",name:"儿童套装",pid:"636324397",sort:"4"},{cid:"636328014",name:"童鞋",pid:"636324397",sort:"5"},{cid:"636328140",name:"儿童配件",pid:"636324397",sort:"6"},{cid:"636328182",name:"儿童箱包",pid:"636324397",sort:"7"},{cid:"636328411",name:"儿童饰品",pid:"636324397",sort:"8"},{cid:"159451122",name:"男装专区",pid:"0",sort:"55"},{cid:"743239119",name:"橱窗精品",pid:"0",sort:"56"},{cid:"669277707",name:"50元及以下 非包邮商品",pid:"0",sort:"57"},{cid:"768706829",name:"生e经",pid:"0",sort:"58"},{cid:"794857792",name:"毛呢/棉衣/羽绒服",pid:"0",sort:"59"},{cid:"800379234",name:"棉衣/棉服",pid:"0",sort:"60"},{cid:"816801252",name:"加绒裤",pid:"0",sort:"61"},{cid:"825131068",name:"毛呢外套",pid:"0",sort:"62"},{cid:"825131856",name:"卫衣/短外套",pid:"0",sort:"63"},{cid:"825312383",name:"T恤/卫衣专区",pid:"0",sort:"64"},{cid:"825312577",name:"长袖T恤",pid:"825312383",sort:"1"},{cid:"825312793",name:"卫衣",pid:"825312383",sort:"2"},{cid:"809996087",name:"手机新品",pid:"0",sort:"65"},{cid:"839849765",name:"雪纺衫/蕾丝衫",pid:"0",sort:"66"},{cid:"839849794",name:"雪纺衫",pid:"839849765",sort:"1"},{cid:"839850470",name:"蕾丝衫",pid:"839849765",sort:"2"},{cid:"917141945",name:"休闲裤",pid:"0",sort:"67"},{cid:"917142322",name:"牛仔裤",pid:"0",sort:"68"},{cid:"950888245",name:"T恤",pid:"0",sort:"69"},{cid:"964132791",name:"冬装",pid:"0",sort:"70"},{cid:"969338074",name:"【勿选择】技术测试分类1",pid:"0",sort:"71"},{cid:"969402239",name:"【勿选择】技术测试分类1-3",pid:"969338074",sort:"1"},{cid:"969374351",name:"【勿选择】技术测试分类1-1",pid:"969338074",sort:"2"},{cid:"971312653",name:"测试！！！勿选！！！",pid:"969338074",sort:"3"},{cid:"969338075",name:"【勿选择】技术测试分类2",pid:"0",sort:"72"},{cid:"978292704",name:"羽绒服",pid:"0",sort:"73"},{cid:"978305418",name:"【秋装特惠专场】",pid:"0",sort:"74"},{cid:"990990640",name:"【秋装清仓】",pid:"0",sort:"75"},{cid:"997717839",name:"【牛仔裤会场】",pid:"0",sort:"76"},{cid:"997718329",name:"小脚裤",pid:"997717839",sort:"1"},{cid:"997718722",name:"五分/七分/短裤",pid:"997717839",sort:"2"},{cid:"997718820",name:"直筒裤",pid:"997717839",sort:"3"},{cid:"997736593",name:"【休闲裤会场】",pid:"0",sort:"77"},{cid:"997738635",name:"休闲裤",pid:"997736593",sort:"1"},{cid:"997739832",name:"五分/七分/短裤",pid:"997736593",sort:"2"},{cid:"997739838",name:"打底裤",pid:"997736593",sort:"3"},{cid:"997740713",name:"【T恤/衬衫会场】",pid:"0",sort:"78"},{cid:"997739596",name:"衬衫",pid:"997740713",sort:"1"},{cid:"997739627",name:"T恤",pid:"997740713",sort:"2"},{cid:"997739629",name:"雪纺衫/蕾丝衫",pid:"997740713",sort:"3"},{cid:"997740968",name:"【卫衣/短外套会场】",pid:"0",sort:"79"},{cid:"997738792",name:"西装",pid:"997740968",sort:"1"},{cid:"997739949",name:"短外套",pid:"997740968",sort:"2"},{cid:"997740575",name:"卫衣",pid:"997740968",sort:"3"},{cid:"997741639",name:"套装",pid:"997740968",sort:"4"},{cid:"997742103",name:"风衣",pid:"997740968",sort:"5"},{cid:"997742135",name:"马夹",pid:"997740968",sort:"6"},{cid:"997743025",name:"【鞋包配饰会场】",pid:"0",sort:"80"},{cid:"997741324",name:"箱包",pid:"997743025",sort:"1"},{cid:"997741933",name:"配件",pid:"997743025",sort:"2"},{cid:"997742521",name:"配饰",pid:"997743025",sort:"3"},{cid:"997742864",name:"美鞋",pid:"997743025",sort:"4"},{cid:"1017040672",name:"【双12满减专区】",pid:"0",sort:"81"}],
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