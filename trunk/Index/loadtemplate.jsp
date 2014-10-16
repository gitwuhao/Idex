<%@ page language="java" contentType="text/javascript; charset=utf-8" pageEncoding="utf-8"%><%
String callback=request.getParameter("callback");
out.write(callback);
out.write("({");
%>
	custom : [{
			id:'1829892',
			type : 'container',
			isShare : true,
			title : '促销Banner',
			html : '<div class="container" d-t="促销Banner"><div class="image-title"><img src="images/s.gif"></div><div class="layout-box"><div class="layout m-b float-box img-b img-p" style="height:220px;"><div class="float-box-bg"><img src="images/s.gif"></div><div style="margin-top:-63px;margin-left:1px;width:144px;height:60px;" class="float-link"></div><div style="margin-top:-63px;width:140px;height:60px;margin-left:151px;" class="float-link"></div><div style="margin-top:-63px;margin-left:296px;width:145px;height:60px;" class="float-link"></div><div style="margin-top:-63px;margin-left:447px;width:137px;height:60px;" class="float-link"></div><div style="margin-top:-63px;margin-left:589px;width:142px;height:60px;" class="float-link"></div></div></div></div>'
		},{
			id:'1829893',
			type : 'container',
			title : '尺码表',
			html :'<div class="container" d-t="尺码表"><div class="text-title"> 尺码表 </div><div class="layout-box"><div class="layout m-b list-table"><table border="1" class="list-tbody"><tbody><tr class="thead"><td> 尺码</td><td> 衣长</td><td> 领宽</td><td> 前领深</td><td> 胸围</td><td> 下摆围</td><td> 总袖长</td><td> 袖口围</td></tr><tr style="height:30px;"><td> S</td><td> 77.5</td><td> 24.5</td><td> 8.5</td><td> 122</td><td> 84</td><td> 43</td><td> 16</td></tr><tr style="height:30px;"><td> M</td><td> 79.5</td><td> 25</td><td> 9</td><td> 126</td><td> 88</td><td> 45</td><td> 17</td></tr><tr style="height:30px;"><td> S</td><td> 77.5</td><td> 24.5</td><td> 8.5</td><td> 122</td><td> 84</td><td> 43</td><td> 16</td></tr></tbody></table></div></div></div>'
		},{
			id:'1829894',
			type : 'list-table',
			isShare : true,
			title : '尺码表',
			html :'<div class="layout m-b list-table"><table border="1" class="list-tbody"><tbody><tr class="thead"><td> 尺码</td><td> 衣长</td><td> 领宽</td><td> 前领深</td><td> 胸围</td><td> 下摆围</td><td> 总袖长</td><td> 袖口围</td></tr><tr style="height:30px;"><td> S</td><td> 77.5</td><td> 24.5</td><td> 8.5</td><td> 122</td><td> 84</td><td> 43</td><td> 16</td></tr><tr style="height:30px;"><td> M</td><td> 79.5</td><td> 25</td><td> 9</td><td> 126</td><td> 88</td><td> 45</td><td> 17</td></tr><tr style="height:30px;"><td> S</td><td> 77.5</td><td> 24.5</td><td> 8.5</td><td> 122</td><td> 84</td><td> 43</td><td> 16</td></tr></tbody></table></div>'
		},{
			id:'1829895',
			type : 'image-rtable',
			isShare : true,
			title : '关联产品',
			html :'<div class="layout m-b image-rtable col4"><div class="image-row" style="height:250px;"><div class="r-b"><div class="image-rlink img-b img-p"><img src="images/s.gif"></div></div><div class="r-b"><div class="image-rlink img-b img-p"><img src="images/s.gif"></div></div><div class="r-b"><div class="image-rlink img-b img-p"><img src="images/s.gif"></div></div><div class="r-b"><div class="image-rlink img-b img-p"><img src="images/s.gif"></div></div></div><div class="image-row" style="height:250px;"><div class="r-b"><div class="image-rlink img-b img-p"><img src="images/s.gif"></div></div><div class="r-b"><div class="image-rlink img-b img-p"><img src="images/s.gif"></div></div><div class="r-b"><div class="image-rlink img-b img-p"><img src="images/s.gif"></div></div><div class="r-b"><div class="image-rlink img-b img-p"><img src="images/s.gif"></div></div></div></div>'
		}],
	share : [{
			id:'1829899',
			type : 'container',
			title : '宝贝描述',
			html : '<div class="container" d-t="宝贝描述"><div class="text-title"> 宝贝描述 </div><div class="layout-box"><div class="layout m-b property-itable col1" style="height:450px;"><div class="p-r pp-i-box"><div class="property-image img-b img-p"><img src="images/s.gif"></div></div><!-- 自动计算固定宽度 --><div class="p-n pp-t-box"><table class="property-tbody" border="1"><tbody><tr><!-- 自动计算固定宽度 --><td class="property-field" style="width:100px;">货&nbsp;&nbsp;&nbsp;&nbsp;号</td><td class="property-value" style="width:190px;">GW3502</td></tr><tr><td class="property-field">尺&nbsp;&nbsp;&nbsp;&nbsp;码</td><td class="property-value">S、M</td></tr><tr><td class="property-field">颜&nbsp;&nbsp;&nbsp;&nbsp;色</td><td class="property-value">驼色</td></tr><tr><td class="property-field">成&nbsp;&nbsp;&nbsp;&nbsp;分</td><td class="property-value">60%腈纶 + 40%锦纶</td></tr><tr><td class="property-field">季&nbsp;&nbsp;&nbsp;&nbsp;节</td><td class="property-value">春季&nbsp;秋季&nbsp;冬季</td></tr><tr><td class="property-field">面料弹性</td><td><table class="slider-table"><tbody><tr><td>无</td><td>微弹</td><td class="slider-point">高</td></tr></tbody></table></td></tr><tr><td class="property-field">版&nbsp;&nbsp;&nbsp;&nbsp;型</td><td><table class="slider-table"><tbody><tr><td>宽松</td><td class="slider-point">修身</td><td>紧身</td></tr></tbody></table></td></tr><tr><td class="property-field">长&nbsp;&nbsp;&nbsp;&nbsp;度</td><td><table class="slider-table"><tbody><tr><td class="slider-point">短</td><td>适中</td><td>长</td></tr></tbody></table></td></tr><tr><td colspan="2" class="property-colspan">蝙蝠T恤再次回归时尚潮人的视线，它可以隐藏拜拜肉，可以修饰不够丰满的上围，可以显得双腿更加纤细，追求气质感。那么要时尚也要风度的单品，就该闪亮登场了！独特的设计，大玩廓型障眼法，让你在这个季节轻松减重，高贵优雅。</td></tr></tbody></table></div></div></div></div>'
		}]
<%
out.write("});");
out.flush();  
out.close();
%>
