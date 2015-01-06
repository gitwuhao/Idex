(function(){
var urlMap={
	'/picture.s' : {
		'method=query&pageSize=12' : '/js/data/picture.query.js',
		'method=query&pageSize=100' : '/js/data/picture.query.100.js',
		'method=getCat' : '/js/data/picture.getcat.js'
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
		config.url=url;
		config.jsonpCallback='_test_jsonp_callback';
	}else{
		config.jsonpCallback=$.getJSONPName();
	}

	$.ajax(CF.merger({
		type : 'POST',
		dataType : 'jsonp'
	},config));
};
})();