<%@page import="com.idex.handle.JSPConextDataHandle"%><%@page import="com.idex.handle.TemplateJSPConextDataHandle"%><%@page import="com.idex.handle.JSPDataHandle"%><%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
JSPDataHandle handle=JSPDataHandle.getInstance();
JSPConextDataHandle jspHandle = handle.getEditJSPHandle();
%>
<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>Idex - 设计【<%=jspHandle.getPageTitle()%>】</title>
<link type="text/css" href="/css/edit/imports.css" rel="stylesheet" />
<link type="text/css" href="/css/theme/idex-desc-default.css" rel="stylesheet" />
</head>
<body>

<div class="idex-navigation border-box uns"><div class="idex-nav-topbar"><div class="home idex-nav-icon"><a href="/" target="_IDEX_HOME"><div class="idex-icon"></div></a></div><div class="list idex-nav-icon"><a href="/#list" target="_IDEX_HOME"><div class="idex-icon"></div></a></div><div class="module idex-nav-icon"><a href="/#module" target="_IDEX_HOME"><div class="idex-icon"></div></a></div></div><div class="idex-nav-bottombar"><div class="comment idex-nav-icon"><a href="http://bangpai.taobao.com/group/16499510.htm" target="_IDEX_COMMENT"><div class="idex-icon"></div></a></div><div class="logout idex-nav-icon"><a href="/logout.s" target="_IDEX_HOME"><div class="idex-icon"></div></a></div></div></div>

<div class="idex-view-panel" style="display: block; height: 700px;">
	<div class="idex-view-panel-box" align="left">
		<div class="idex-view-context-box" idex-id="<%=jspHandle.getID()%>" idex-type="<%=jspHandle.getType()%>">
<%=jspHandle.getCode()%>
		</div>
	</div>
</div>

<script>
function loadFile() {

	window.BASE_PATH = '/oilan/', uiPath = BASE_PATH + 'ui/';

	window.UI_LIB_PATH = uiPath + 'js/ui/';

	$.includePack('css', uiPath + 'css/imports.css');

	$.loadJSQueue(uiPath + 'js/ui.files.js', function() {
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
	  	//'/_/js/ImageQueue.dev.js',
	  	'/_/js/ImageQueue.js',
		'/js/sessionExpired.js',
		loadEditorLib
	);
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
</script>
<%=jspHandle.getIncludeHTML()%>
<script type="text/javascript" charset="utf-8" src="/_/js/startup.js" ></script>
</body>
</html>
