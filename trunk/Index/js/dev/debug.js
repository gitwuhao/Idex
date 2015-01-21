(function(){

var path='/js/dev/data/',
	urlMap={
	'/picture.s' : {
		'method=query&pageSize=12' : 'picture.query.js',
		'method=query&pageSize=100' : 'picture.query.100.js',
		'method=getCat' : 'picture.getcat.js'
	},
	'/module.s' : {
		'method=query&_t=2' : 'module.query.2.js',
		'method=query&_t=4' : 'module.query.4.js',
		'method=getCode&_t=4' : 'module.getCode.4.txt',
		'method=getCode&_t=2&id=101010806' : 'module.getCode.2.101010806.txt',
		'method=getCode&_t=2&id=101010827' : 'module.getCode.2.101010827.txt',
		'method=insert&_t=2' : 'module.insert.js'
	},
	'/config.s' : {
		'method=get&type=1' : 'config.get.1.js'
	},
	'/item.s' : {
		'method=query&pageSize=1' : 'item.query.1.js',
		'method=get' : 'item.get.js'
	}
};
function match(param,data){
	data=$.param2Object(data);
	param=$.param2Object(param);
	var isMatch=true;
	$.it(param,function(key,value){
		if(value!=data[key]){
			isMatch=false;
			return false;
		}
	});
	return isMatch;
};
function findUrl(config){
	var data=config.data,
		paramMap=urlMap[config.url];
	for(var key in paramMap){
		if(match(key,data)){
			return paramMap[key];
		}
	}
};


$.jsonp=function(config){
	var url=findUrl(config);
	if(url){
		delete config.data;
		config.cache=true;
		config.type='GET';
		config.url=path+url;
		config.jsonpCallback='_test_jsonp_callback';
	}

	$.ajax(CF.merger({
		type : 'POST',
		dataType : 'jsonp',
		jsonpCallback:$.getJSONPName()
	},config));
};
$.loadText=function(config){
	var url=findUrl(config);
	if(url){
		delete config.data;
		config.cache=true;
		config.type='GET';
		config.url=path+url;
	}
	$.ajax(CF.merger({
		type : 'POST',
		dataType : 'text',
		jsonpCallback:$.getJSONPName()
	},config));
};
})();