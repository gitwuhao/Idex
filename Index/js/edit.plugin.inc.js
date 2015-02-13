(function(CF,$){
var IDEX_LIB_PATH= window.IDEX_LIB_PATH || window.location.origin +'/',
	list=[
	'js/edit/plugin/SelectPicture.js',
	'js/edit/plugin/ExportPS.js',
	'js/edit/plugin/UploadCloud.js',
	'js/edit/adapter/DragDrop.js',
	'js/edit/adapter/TextEditor.js',
	'js/edit/adapter/HTMLEditor.js',
	'js/edit/adapter/TableEditor.js',
	'js/edit/adapter/ImageQueue.js'
];
for(var i=0,len=list.length;i<len;i++){
	var u=list[i];
	list[i]=IDEX_LIB_PATH+u;
}

$.loadJSQueue.apply(this,list);
})(CF,jQuery);