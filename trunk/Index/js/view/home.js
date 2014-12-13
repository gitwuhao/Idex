(function(){
Idex.addEventListener('ready',function(){
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
	}
	if(homeJSON.d){
		var date=new Date(homeJSON.d);
		$('#dtime').text(date.format('yyyy-MM-dd hh:mm'));
	}
	

	$('[id]',Idex.view.home.render).removeAttr('id');
	
	delete window.getHomeJSON;
});
})();