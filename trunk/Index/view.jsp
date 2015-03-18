<%@page import="com.idex.handle.JSPConextDataHandle"%>
<%@page import="com.idex.handle.JSPDataHandle"%>
<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
JSPDataHandle handle=JSPDataHandle.getInstance();
JSPConextDataHandle jspHandle = handle.getEditJSPHandle();
%>
<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<title>Idex - 预览【<%=jspHandle.getPageTitle()%>】</title>
<link type="text/css" href="/css/theme/idex-desc-default.css" rel="stylesheet" />
<link type="text/css" href="/css/edit/preview.css" rel="stylesheet" />
</head>
<body>
<div class="idex-preview-box" align="center">
<div class="idex-preview-view" idex-id="<%=jspHandle.getID()%>">
	<%=jspHandle.getCode()%>
</div>
</div>
<script type="text/javascript" charset="utf-8" src="/js/view/view.load.js"></script>
<script type="text/javascript" charset="utf-8" src="/_/js/startup.js" ></script>
</body>
</html>