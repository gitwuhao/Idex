(function(){
Idex.addEventListener('ready',function(){
	var homeJSON=window.getHomeJSON();
	if(homeJSON.c && homeJSON.c[0]){
		var count=homeJSON.c[0];
		for(var key in count){
			$('#'+key.toCamelCase()).text(count[key]);
		}
		
	}
	if(homeJSON.v){
		var version=homeJSON.v;
		for(var key in version){
			$('#'+key).text(version[key]);
		}
		if(version.dcount==-1){
			$('#dcs').remove();
		}
		if(version.v==3){
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