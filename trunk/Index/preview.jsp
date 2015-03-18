<%@page import="java.io.File"%>
<%@page import="com.oilan.web.WebUtil"%>
<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<title>Idex - 模板预览</title>
<link type="text/css" href="/css/theme/idex-desc-default.css" rel="stylesheet" />
<link type="text/css" href="/css/edit/preview.css" rel="stylesheet" />
<style>
.idex-preview-button{
	display: none;
}
</style>
</head>
<body>
<div class="idex-preview-box" align="center">
	<div class="idex-preview-view">
		<%
		File file=(File)request.getAttribute("file");
		WebUtil.writerFile(file, out);
		%>
	</div>
</div>
<script type="text/javascript" charset="utf-8" src="/js/view/view.load.js"></script>
<script type="text/javascript" charset="utf-8" src="/_/js/startup.js"></script>
</body>
</html>