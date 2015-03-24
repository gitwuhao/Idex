<%@page import="com.idex.handle.JSPDataHandle"%>
<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<title>Idex - 帮你实现好创意！</title>
<link type="text/css" href="css/main/imports.css" rel="stylesheet" />
</head>
<body>
<div class="idex-navigation border-box uns"></div>
<div class="idex-view-box">
	<div class="idex-view-panel home">
		<div class="idex-shadow-box list">
			<div class="title">商品描述</div>
			<div class="content">
				⒈只能为现有（出售中和仓库中）的商品创建商品描述；<br/>
				⒉不能识别现有的商品描述，发布会覆盖原有的商品描述；<br/>
				⒊设置子账号“宝贝管理”或“编辑宝贝”的权限可控制子账号能否发布描述；<br/>
				⒋商品会在每天零晨与淘宝进行数据同步和描述快照的创建；<br/>
				⒌暂不支持删除，删除商品后Idex描述会自动删除；
			</div>
			<div class="count">
				商品描述：<span id="itemCount">-</span>个<br/>
				Idex描述：<em class="c2" id="descCount">0</em>个<span id="dcs">/<em class="c1" id="dcount">50</em>个</span>
			</div>
		</div>
		<div class="idex-shadow-box template">
			<div class="title">详情模板</div>
			<div class="content">
				详情模板用于设计商品描述的头尾模块，
				设置布局宽度、配色、风格等信息，
				应用详情模板可以快速制作出统一风格的商品描述。
				在特殊情况下也可以用于临时制作商品描述。
			</div>
			<div class="count"><br/>
				详情模板：<em class="c2" id="templateCount">0</em>个/<em class="c1" id="tcount">5</em>个
			</div>
		</div>
		<div class="idex-shadow-box module">
			<div class="title">装修模块</div>
			<div class="content">
				装修模块可制作店招、侧边栏、活动页、品牌信息、产品答疑、物流信息等自定义内容和自定义页面。
			</div>
			<div class="count"><br/>
				装修模块：<em class="c2" id="renovationCount">0</em>个/<em class="c1" id="rcount">10</em>个
			</div>
		</div>
		<div class="idex-shadow-box custom">
			<div class="title">自定义模块</div>
			<div class="content">
			自定义模块可制作关联商品、促销、物流信息、企业信息、品牌信息等公用模块，
			在制作商品描述时直接导入无需重复制作。
			</div>
			<div class="count"><br/>
				自定义模块：<em class="c2" id="customCount">0</em>个/<em class="c1" id="ccount">10</em>个
			</div>
		</div>
		<div class="idex-home-bottom-box">
			<div class="left">【<em id="vtitle">基础版</em>】将于 <em class="c1" id="dtime">未知</em> 到期。</div>
			<div class="right">
				<a href="http://item.taobao.com/item.htm?id=27018556087" target="_idex_popu">
					<em class="upgrade c2" id="upgrade">升级&nbsp;|</em>
					<em class="renew c2">续费</em>
				</a>
			</div>
		</div>
	</div>
</div>

<script>
function getHomeJSON(){
<%
JSPDataHandle handle=JSPDataHandle.getInstance();
handle.outHomeCountInfo(out);
%>
};
<%
handle.outIncJS(out);
%>
/*
function getHomeJSON(){
return {c:[{item_count:"77",desc_count:"12",template_count:"12",custom_count:"0",renovation_count:"12"}],v:{vtitle:"专业版",version:3,ccount:30,dcount:-1,rcount:30,tcount:20},isImport:true,d:"2015-04-15 11:42:00",sig:"23097861#奥艾兰#CB0BB2CB"};
};
*/
function loadFile(){
	window.BASE_PATH='/oilan/';
	var uiPath= BASE_PATH + 'ui/';
	
	window.UI_LIB_PATH=uiPath+'js/ui/';

	$.includePack('css',uiPath+'css/imports.css');

	$.loadJSQueue(
		uiPath+'js/ui.files.js',
		function(){
			$.loadJSQueue.apply(this,UIList);
	});
	
	$.loadJSQueue(
		//'/js/dev/debug.js',
		'_/js/jquery.cache.js',
		'/js/main/core.js',
		'/js/main/home.js',
		'/js/main/Idex.Module.js',
		'/js/main/list.js',
		'/js/main/list.panel.js',
		'/js/main/template.js',
		'/js/main/systemTemplate.js',
		'/js/main/module.js',
		'/js/sessionExpired.js'
	);
	

	var homeJSON=getHomeJSON();
	if(homeJSON.isImport){
		$.loadJSQueue(
			'js/main/importProgress.js'
		);
	}
};

function requireChromeVersion(v){
	if(!window.navigator){
		return false;
	}
	var appVersion=window.navigator.appVersion,
		version;
	if(appVersion){
		appVersion=appVersion.match(/chrome.(\d+)/i);
		if(appVersion && appVersion.length==2){
			version=parseInt(appVersion[1]);
			if(v <= version){
				return true;
			}
		}
	}
	return false;
};
function startup(){
	if(!requireChromeVersion(30)){
		error();
	}else{
		load();
	}
};
function error(){
	window.location.href='/error.html';
};
function load(){
	loadJS('/_/js/startup.js');
};
function loadJS(src){
	if(!src){
		return;
	}
	var head=document.head,
	pack = document.createElement("script");
	
	pack.type="text/javascript";
	pack.charset="utf-8";
	pack.src=src;
	head.insertBefore(pack, head.lastChild);
};
startup();
</script>
</body>
</html>