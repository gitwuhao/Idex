(function(CF,$){
var IDEX_LIB_PATH= window.IDEX_LIB_PATH || window.location.origin +'/',
	list=[
	'js/edit/layout/container.js',
	'js/edit/layout/text-item.js',
	'js/edit/layout/html-item.js',
	'js/edit/layout/float-box.js',
	'js/edit/layout/float-link.js',
	'js/edit/layout/float-image.js',
	'js/edit/layout/float-text.js',
	'js/edit/layout/float-html.js',
	'js/edit/layout/image-fgrid.js',
	'js/edit/layout/image-flink.js',
	'js/edit/layout/image-rtable.js',
	'js/edit/layout/image-row.js',
	'js/edit/layout/image-rlink.js',
	'js/edit/layout/image-ctable.js',
	'js/edit/layout/image-col.js',
	'js/edit/layout/image-clink.js',
	'js/edit/layout/property-table.js',
	'js/edit/layout/property-itable.js',
	'js/edit/layout/user-table.js',
	'js/edit/layout/list-table.js',
	'js/edit/layout/image-list.js',
	'js/edit/layout/image-item.js',
	'js/edit/layout/image-text.js',
	'js/edit/layout/i-image-item.js',
	'js/edit/layout/i-text-item.js',
	'js/edit/layout/split-line.js',
	'js/edit/layout/double-image-text.js'
];
for(var i=0,len=list.length;i<len;i++){
	var u=list[i];
	list[i]=IDEX_LIB_PATH+u;
}

$.loadJSQueue.apply(this,list);
})(CF,jQuery);