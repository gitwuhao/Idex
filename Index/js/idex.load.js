(function(){
window.loadFile=function(){

	window.BASE_PATH = '/oilan/', uiPath = BASE_PATH + 'ui/';

	window.UI_LIB_PATH = uiPath + 'js/ui/';

	$.includePack('css', uiPath + 'css/imports.css');

	$.loadJSQueue(uiPath + 'js/ui.files.js', function() {
		UIList.push('/js/dev/debug.js');
		UIList.push(loadBaseLib);
		$.loadJSQueue.apply(this, UIList);
	});
};
function loadBaseLib(){
	var isDebug=true;
	window.isDebug=isDebug;
	$.loadJSQueue(
		'/_/js/jquery.StyleSheet.js',
		'/_/js/htmlfilter.js',
	  	'/_/js/ImageQueue.js',
		//'/_/js/ImageQueue.dev.js',
		'/js/sessionExpired.js',
		loadEditorLib
	);
};
function getIncludeFileList(){
	return [
		'js/edit/plugin/LayoutConfig.js',
		'js/edit/plugin/CloudSnap.js',
		'js/edit/plugin/CopyCode.js'
	];
};
function loadEditorLib(){
	var IDEX_LIB_PATH = window.IDEX_LIB_PATH || window.location.origin +'/',
	urls;
	urls=[
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
		'js/edit/template.js',
		'js/edit/saveAs.js',
		'js/edit/style.js',
		'js/edit/help.js',
		/**-----------------------layout----------------------------**/
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
		'js/edit/layout/image-ftext.js',
		'js/edit/layout/image-rtable.js',
		'js/edit/layout/image-row.js',
		'js/edit/layout/image-rlink.js',
		'js/edit/layout/image-rtext.js',
		'js/edit/layout/image-ctable.js',
		'js/edit/layout/image-col.js',
		'js/edit/layout/image-clink.js',
		'js/edit/layout/image-ctext.js',
		'js/edit/layout/property-table.js',
		'js/edit/layout/property-itable.js',
		'js/edit/layout/user-table.js',
		'js/edit/layout/list-table.js',
		'js/edit/layout/image-list.js',
		'js/edit/layout/image-item.js',
		'js/edit/layout/image-text.js',
		'js/edit/layout/double-image-text.js',
		'js/edit/layout/i-image-item.js',
		'js/edit/layout/i-text-item.js',
		'js/edit/layout/split-line.js',
		/**-----------------------plugin----------------------------**/
		'js/edit/plugin/SelectPicture.js',
		'js/edit/plugin/ExportPS.js',
		'js/edit/plugin/UploadCloud.js',
		'js/edit/adapter/DragDrop.js',
		'js/edit/adapter/TextEditor.js',
		'js/edit/adapter/HTMLEditor.js',
		'js/edit/adapter/TableEditor.js',
		'js/edit/adapter/ImageQueue.js'
	];
	
	urls.push.apply(urls,getIncludeFileList());
	urls.push('js/ready.js');
	for(var i=0,len=urls.length;i<len;i++){
		var u=urls[i];
		urls[i]=IDEX_LIB_PATH+u;
	}
	 
	$.loadJSQueue.apply(this,urls);
};

})();