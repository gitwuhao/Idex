(function(){
var urlMap={
	'/picture.s' : {
		'method=query&pageSize=12' : '/js/data/picture.query.js',
		'method=query&pageSize=100' : '/js/data/picture.query.100.js',
		'method=getCat' : '/js/data/picture.getcat.js'
	},
	'/module.s' : {
		'method=query&_t=2' : '/js/data/module.query.2.js',
		'method=query&_t=4' : '/js/data/module.query.4.js',
		'method=getCode&_t=4' : '/js/data/module.getCode.4.txt'
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
		config.url=url;
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
		config.url=url;
	}
	$.ajax(CF.merger({
		type : 'POST',
		dataType : 'text',
		jsonpCallback:$.getJSONPName()
	},config));
};
})();