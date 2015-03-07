(function(){
var TEMPLATE = 1,
	DESC = 2,
	RENOVATION = 3,
	CUSTOM = 8,
	TEMPLATE_list,
	RENOVATION_list
	;

TEMPLATE_list=[{
	title : '时尚服装',
	list : [{
		id:"10001",
		width:"790",
		title:"AMH翻领针织开衫"
	},{
		id:"10003",
		width:"790",
		title:"经典复古水洗牛仔夹克"
	}]
},{
	title : '鞋类箱包',
	list : [{
		id:"10002",
		width:"790",
		title:"意大利枫叶潮流马丁靴"
	},{
		id:"10005",
		width:"790",
		title:"爱华仕万向轮登机箱"
	}]
},{
	title : '家居日用',
	list : [{
		id:"10006",
		width:"750",
		title:"水星家纺奥菲莉四件套"
	}]
},{
	title : '家具建材',
	list : [{
		id:"10007",
		width:"790",
		title:"一米爱家具简约书桌"
	}]
},{
	title : '母婴用品'
},{
	title : '化妆美容'
},{
	title : '数码家电'
},{
	title : '食品酒水',
	list : [{
		id:"10000",
		width:"790",
		title:"达利园蛋糕"
	}]
},{
	title : '珠宝配饰'
},{
	title : '酒店旅游',
	list : [{
		id:"10004",
		width:"790",
		title:"北京希腊迪拜9天7晚"
	}]
}];

RENOVATION_list=[{
	title : '装修模块',
	list : [{
		id:"10001",
		width:"990",
		title:"商品列表展示"
	}]
}];


var data=[],
	jsonpName=$.cache.get('callback'),
	callback;
for(var i=0,len=TEMPLATE_list.length;i<len;i++){
	var item=TEMPLATE_list[i];
	item.type=TEMPLATE;
	data.push(item);
}
data.push('|||');
for(var i=0,len=RENOVATION_list.length;i<len;i++){
	var item=RENOVATION_list[i];
	item.type=RENOVATION;
	data.push(item);
}



callback=window[jsonpName];

if(callback){
	callback(data);
}
})();