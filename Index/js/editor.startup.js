(function(CF,$){
var IDEX_LIB_PATH= window.IDEX_LIB_PATH || window.location.origin +'/',
	list=[
	'js/editor/core.js',
	'js/editor/event.js',
	'js/editor/absPanel.js',
	'js/editor/absLayout.js',
	'js/editor/panel/TabPanel.js',
	'js/editor/panel/ViewPanel.js',
	'js/editor/panel/LayoutPanel.js',
	'js/editor/panel/PropertyPanel.js',
	'js/editor/panel/HistoryPanel.js',
//	'js/editor/panel/InfoPanel.js',
	'js/editor/panel/CheckImagePanel.js',
	'js/editor/layout/container.js',
	'js/editor/layout/text-item.js',
	'js/editor/layout/html-item.js',
/*
	'js/editor/layout/layout-box.js',
	'js/editor/layout/image-grid.js',
	'js/editor/layout/image-glink.js',
*/
	'js/editor/layout/float-box.js',
	'js/editor/layout/float-link.js',
	'js/editor/layout/float-image.js',
	'js/editor/layout/float-text.js',
/*
	'js/editor/layout/float-table.js',
*/
	'js/editor/layout/float-html.js',
	'js/editor/layout/image-fgrid.js',
	'js/editor/layout/image-fglink.js',
	'js/editor/layout/image-rtable.js',
	'js/editor/layout/image-row.js',
	'js/editor/layout/image-rlink.js',
	'js/editor/layout/image-ctable.js',
	'js/editor/layout/image-col.js',
	'js/editor/layout/image-clink.js',
	'js/editor/layout/property-table.js',
	'js/editor/layout/property-itable.js',
/*
	'js/editor/layout/property-image.js',
	'js/editor/layout/property-tbody.js',
*/
	'js/editor/layout/user-table.js',
	'js/editor/layout/list-table.js',
	'js/editor/layout/image-list.js',
	'js/editor/layout/image-item.js',
	'js/editor/template.js',
	'js/editor/adapter/SelectImage.js',
	'js/editor/adapter/dragdrop.js',
	'js/editor/adapter/imagequeue.js',
//	'js/editor/adapter/ZeroClipboard.js',
	'js/editor/adapter/TextEditor.js',
	'js/editor/adapter/HTMLEditor.js',
	'js/editor/adapter/TableEditor.js'
];
for(var i=0,len=list.length;i<len;i++){
	var u=list[i];
	list[i]=IDEX_LIB_PATH+u;
}
list.push(function(){
	setTimeout(function(){
		$.loadJSQueue(
			IDEX_LIB_PATH+'js/editor/style.js',
			IDEX_LIB_PATH+'js/editor/help.js',
			IDEX_LIB_PATH+'js/editor/guide.js'
		);
	},1000);
});

$.loadJSQueue.apply(this,list);

})(CF,$);