var count=200,
	data=window.getAppData(),
	i=0,
	type=data.type,
	id=data.id,
	result=[];
result.push({title:'idex_'+type+'_'+id+'_'+(++i),pixel:"800x1200",path:"http://img01.taobaocdn.com/imgextra/i1/1646439371/TB2i1hDaXXXXXcvXXXXXXXXXXXX-1646439371.gif"});

result.push({title:'idex_'+type+'_'+id+'_'+(++i),pixel:"800x1200",path:"http://img01.taobaocdn.com/imgextra/i1/1646439371/TB2g_ZDXXXXXXXTXFXXXXXXXXXX-1646439371.jpg"});

result.push({title:'idex_'+type+'_'+id+'_'+(++i),pixel:"800x1200",path:"http://img03.taobaocdn.com/imgextra/i3/1646439371/TB24MxhbFXXXXbQXpXXXXXXXXXX-1646439371.jpg"});

result.push({title:'idex_'+type+'_'+id+'_'+(++i),pixel:"800x1200",path:"http://img01.taobaocdn.com/imgextra/i1/1646439371/TB2MtFlbFXXXXcGXXXXXXXXXXXX-1646439371.jpg"});
//http://img01.taobaocdn.com/imgextra/i1/1646439371/TB2i1hDaXXXXXcvXXXXXXXXXXXX-1646439371.gif
for(;i<count;i++){
	result.push({title:'idex_'+type+'_'+id+'_'+(i+1),pixel:"800x1200",path:"http://img01.taobaocdn.com/imgextra/i1/1646439371/TB2MtFlbFXXXXcGXXXXXXXXXXXX-1646439371.jpg"});
}
_test_jsonp_callback({total:count,result:result});
