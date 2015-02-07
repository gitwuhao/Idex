(function(){
Idex.addEventListener('initHomeCount',function(){
	var homeJSON=window.getHomeJSON ? window.getHomeJSON() :{};

	if(homeJSON.c && homeJSON.c[0]){
		var count=homeJSON.c[0];
		for(var key in count){
			$('#'+key.toCamelCase()).text(count[key]);
		}
	}
	if(homeJSON.v){
		var versionLimit=homeJSON.v;
		for(var key in versionLimit){
			$('#'+key).text(versionLimit[key]);
		}
		if(versionLimit.dcount==-1){
			$('#dcs').remove();
		}
		if(versionLimit.version==3){
			$('#upgrade').remove();
		}

		
		Idex.getVersionLimit=function(key){
			return versionLimit[key];
		};
	}
	if(homeJSON.d){
		var date=new Date(Date.parseStr(homeJSON.d));
		$('#dtime').text(date.format('yyyy-MM-dd'));
	}
	
	var $home=Idex.$viewbox.children('.idex-view-panel.home');
	$('[id]',$home).removeAttr('id');
	
	delete window.getHomeJSON;

});
})();