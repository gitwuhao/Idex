(function(CF,$){
var IDEX_LIB_PATH= window.IDEX_LIB_PATH || window.location.origin +'/',
	list=[
	'js/inc.js',
	'js/edit/core.js',
	'js/edit/KeyMap.js',
	'js/edit/absPanel.js',
	'js/edit/absLayout.js',
	'js/edit/template.js',
	'js/edit/saveAs.js',
	'js/edit/panel/TabPanel.js',
	'js/edit/panel/ViewPanel.js',
	'js/edit/panel/LayoutPanel.js',
	'js/edit/panel/PropertyPanel.js',
	'js/edit/panel/HistoryPanel.js',
	'js/edit/panel/ImagePanel.js'
];
for(var i=0,len=list.length;i<len;i++){
	var u=list[i];
	list[i]=IDEX_LIB_PATH+u;
}

$.loadJSQueue.apply(this,list);
})(CF,jQuery);