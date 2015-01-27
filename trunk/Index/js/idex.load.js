(function(){
var IDEX_LIB_PATH= window.IDEX_LIB_PATH || window.location.origin +'/',
	list=[
	'js/inc.js',
	'js/edit/core.js',
	'js/edit/KeyMap.js',
	'js/edit/absPanel.js',
	'js/edit/absLayout.js',
	'js/edit/panel/TabPanel.js',
	'js/edit/panel/ViewPanel.js',
	'js/edit/panel/LayoutPanel.js',
	'js/edit/panel/PropertyPanel.js',
	'js/edit/panel/HistoryPanel.js',
	'js/edit/panel/ImagePanel.js',
	'js/edit/layout/container.js',
	'js/edit/layout/text-item.js',
	'js/edit/layout/html-item.js',
	'js/edit/layout/float-box.js',
	'js/edit/layout/float-link.js',
	'js/edit/layout/float-image.js',
	'js/edit/layout/float-text.js',
	'js/edit/layout/float-html.js',
	'js/edit/layout/image-fgrid.js',
	'js/edit/layout/image-fglink.js',
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
	'js/edit/template.js',
	'js/edit/SystemData.js',
	'js/edit/saveAs.js',
	'js/edit/adapter/DragDrop.js',
	'js/edit/adapter/TextEditor.js',
	'js/edit/adapter/HTMLEditor.js',
	'js/edit/adapter/TableEditor.js',
	'js/edit/plugin/ImageQueue.js',
	'js/edit/plugin/SelectPicture.js',
	'js/edit/plugin/ExportPS.js',
	'js/edit/plugin/UploadCloud.js',
	/*
	--------------------------------------------
	*/
	'js/edit/plugin/LayoutConfig.js',
	'js/edit/plugin/CloudSnap.js'
	,
	'js/edit/plugin/CopyCode.js'
	
];
for(var i=0,len=list.length;i<len;i++){
	var u=list[i];
	list[i]=IDEX_LIB_PATH+u;
}


list.push(function(){
	$.getDoc().trigger('Idex.ready');
	
	
	setTimeout(function(){
		$.loadJSQueue(
			IDEX_LIB_PATH+'js/edit/style.js',
			IDEX_LIB_PATH+'js/edit/help.js',
			IDEX_LIB_PATH+'js/edit/guide.js'
		);
	},1000);
});

$.loadJSQueue.apply(this,list);

})();