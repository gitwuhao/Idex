var count=100,
	i=0,
	result=[];
result.push({title:"idex_1_101010744_"+(++i),pixel:"800x1200",path:"http://img03.taobaocdn.com/imgextra/i3/1646439371/TB24MxhbFXXXXbQXpXXXXXXXXXX-164643937s1.jpg"});

result.push({title:"idex_1_101010744_"+(++i),pixel:"800x1200",path:"http://img03.taobaocdn.com/imgextra/i3/1646439371/TB2l9hkbFXXXXcQXXXXXXXXXXXX-1646439371.jpg"});

result.push({title:"idex_1_101010744_"+(++i),pixel:"800x1200",path:"http://img02.taobaocdn.com/imgextra/i2/1646439371/TB2T3FjbFXXXXapXpXXXXXXXXXX-1646439371.jpg"});

result.push({title:"idex_1_101010744_"+(++i),pixel:"800x1200",path:"http://img01.taobaocdn.com/imgextra/i1/1646439371/TB2MtFlbFXXXXcGXXXXXXXXXXXX-1646439371.jpg"});

for(;i<count;i++){
	result.push({title:"idex_1_101010744_"+(i+1),pixel:"800x1200",path:"http://img03.taobaocdn.com/imgextra/i3/1646439371/TB24MxhbFXXXXbQXpXXXXXXXXXX-1646439371.jpg"});
}

_test_jsonp_callback({total:count,result:result});

//_test_jsonp_callback({errorCode:'s',errorMsg:'sa'});
