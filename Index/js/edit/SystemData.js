(function(){
var CACHE_KEY=window.APP_KEY_MAP.CACHE,
	systemTemplate,
	fixedGridTemplate,
	layoutRelation;

layoutRelation={
	'container' : {
		tid : 1
	},
	'float-box' : {
		parent : 'container',
		tid : 10
	},
	'image-ctable' : {
		parent : 'container',
		tid : 11
	},
	'image-rtable' : {
		parent : 'container',
		tid : 12
	},
	'image-fgrid' : {
		parent : 'container',
		tid : 13
	},
	'html-item' : {
		parent : 'container',
		tid : 14
	},
	'text-item' : {
		parent : 'container',
		tid : 15
	},
	'property-table' : {
		parent : 'container',
		tid : 16
	},
	'property-itable' : {
		parent : 'container',
		tid : 17
	},
	'list-table' : {
		parent : 'container',
		tid : 18
	},
	'user-table' : {
		parent : 'container',
		tid : 19
	},
	'image-list' : {
		parent : 'container',
		tid : 20
	},
	'image-text' : {
		parent : 'container',
		tid : 21
	},
	'double-image-text' : {
		parent : 'container',
		tid : 22
	},
	'split-line' : {
		parent : 'container',
		tid : 23
	},
	'float-link' : {
		parent : 'float-box'
	},
	'float-image' : {
		parent : 'float-box'
	},
	'float-text' : {
		parent : 'float-box'
	},
	'float-html' : {
		parent : 'float-box'
	},
	'float-line' : {
		parent : 'float-box'
	},
	'image-col' : {
		parent : 'image-ctable'
	},
	'image-clink' : {
		parent : 'image-col'
	},
	'image-ctext' : {
		parent : 'image-col'
	},
	'image-row' : {
		parent : 'image-rtable'
	},
	'image-rlink' : {
		parent : 'image-row'
	},
	'image-item' : {
		parent : 'image-list'
	}
};
systemTemplate=[{
	type : 'container',
	title : '未命名模块',
	html : ['<div class="container" idex-title="未命名模块">',
				'<div class="text-title s1">',
					'<div class="title-bg"></div>',
					'<div class="title-label">未命名模块</div>',
				'</div>',
				'<div class="layout-box"></div>',
			'</div> '].join('')
},{
	type : 'float-box',
	html : ['<div class="layout float-box img-b img-p" style="height:300px;">',
				'<div class="float-box-bg">',
				'</div>',
			'</div> '].join('')
},{
	type : 'float-link',
	html : ['<div class="float-link"></div> '].join('')
},{
	type : 'float-line',
	html : ['<div class="float-line"><div class="bg"></div></div> '].join('')
},{
	type : 'float-image',
	html : ['<div class="float-image img-b img-p">',
				'<img src="/s.gif">',
			'</div> '].join('')
},{
	type : 'float-text',
	html : '<div class="float-text">&nbsp;</div>'
},{
	type : 'float-html',
	html : '<div class="float-html">&nbsp;</div>'
},{
	type : 'image-fgrid',
	html : ['<div class="layout image-fgrid" style="height:300px;">',
				'<div class="p-n" style="width:100%;height:100%;">',
					'<div class="image-flink img-b img-p">',
						'<img src="/s.gif"/>',
					'</div>',
				'</div>',
			'</div>'].join('')
},{
	type : 'image-rtable',
	html : ['<div class="layout image-rtable col3">',
				'<div class="image-row" style="height:250px;">',
					'<div class="r-b">',
						'<div class="image-rlink img-b img-p">',
						'<img src="/s.gif">',
						'</div>',
					'</div>',
					'<div class="r-b">',
						'<div class="image-rlink img-b img-p">',
						'<img src="/s.gif">',
						'</div>',
					'</div>',
					'<div class="r-b">',
						'<div class="image-rlink img-b img-p">',
						'<img src="/s.gif">',
						'</div>',
					'</div>',
				'</div>',
			'</div>'].join('')
},{
	type : 'image-ctable',
	html : ['<div class="layout image-ctable col3">',
				'<div class="image-col">',
					'<div class="image-clink img-b img-p" style="height:300px;">',
						'<img src="/s.gif">',
					'</div>',
				'</div>',
				'<div class="image-col">',
					'<div class="image-clink img-b img-p" style="height:300px;">',
						'<img src="/s.gif">',
					'</div>',
				'</div>',
				'<div class="image-col">',
					'<div class="image-clink img-b img-p" style="height:300px;">',
						'<img src="/s.gif">',
					'</div>',
				'</div>',
			'</div>'].join('')
},{
	type : 'image-col',
	html : ['<div class="image-col">',
				'<div class="image-clink img-b img-p" style="height:100px;">',
					'<img src="/s.gif">',
				'</div>',
			'</div>'].join('')
},{
	type : 'image-clink',
	html : ['<div class="image-clink img-b img-p" style="height:100px;">',
				'<img src="/s.gif">',
			'</div>'].join('')
},{
	type : 'image-ctext',
	html : '<div class="image-ctext" style="height:300px;">&nbsp;</div>'
},{
	type : 'property-table',
	html : ['<div class="layout property-table">',
			'<table class="property-tbody" border="1">',
				'<tbody>',
					'<tr>',
						'<td class="property-field">货 &nbsp; &nbsp; &nbsp;号</td>',
						'<td class="property-value">&nbsp;</td>',
						'<td class="property-field">货 &nbsp; &nbsp; &nbsp;号</td>',
						'<td class="property-value">&nbsp;</td>',
					'</tr>',
					'<tr>',
						'<td class="property-field">尺 &nbsp; &nbsp; &nbsp;码</td>',
						'<td class="property-value">&nbsp;</td>',
						'<td class="property-field">尺 &nbsp; &nbsp; &nbsp;码</td>',
						'<td class="property-value">&nbsp;</td>',
					'</tr>',
					'<tr>',
						'<td class="property-field">颜 &nbsp; &nbsp; &nbsp;色</td>',
						'<td class="property-value">&nbsp;</td>',
						'<td class="property-field">颜 &nbsp; &nbsp; &nbsp;色</td>',
						'<td class="property-value">&nbsp;</td>',
					'</tr>',
					'<tr>',
						'<td class="property-field">面料弹性</td>',
						'<td class="property-value" colspan="3">',
							'<table class="slider-table"><tbody><tr><td>无弹</td><td>微弹</td><td class="slider-point">高弹</td><td>无弹</td><td>微弹</td></tr></tbody></table>',
						'</td>',
					'</tr>',
					'<tr>',
						'<td class="property-field">版 &nbsp; &nbsp; &nbsp;型</td>',
						'<td class="property-value" colspan="3">',
							'<table class="slider-table"><tbody><tr><td>宽松</td><td class="slider-point">修身</td><td>紧身</td><td>宽松</td><td>紧身</td></tr></tbody></table>',
						'</td>',
					'</tr>',
					'<tr>',
						'<td class="property-field">长 &nbsp; &nbsp; &nbsp;度</td>',
						'<td class="property-value" colspan="3">',
							'<table class="slider-table"><tbody><tr><td class="slider-point">短款</td><td>适中</td><td>长款</td><td>适中</td><td>长款</td></tr></tbody></table>',
						'</td>',
					'</tr>',
					'<tr>',
						'<td colspan="4" class="property-colspan">&nbsp;</td>',
					'</tr>',
				'</tbody>',
			'</table>',
		'</div>'].join('')
},{
	type : 'property-itable',
	html : ['<div class="layout property-itable col1 w6" style="height:400px;">',
			  '<div class="p-r pp-i-image-box">',
				'<div class="property-image img-b img-p"><img idex-src="/s.gif"/></div>',
			  '</div>',
			  '<div class="p-n pp-t-box">',
				'<table class="property-tbody" border="1">',
				  '<tbody>',
					'<tr>',
					  '<td class="property-field" style="width:100px;">货 &nbsp; &nbsp; &nbsp;号</td>',
					  '<td class="property-value" style="width:190px;">GW3502</td>',
					'</tr>',
					'<tr>',
					  '<td class="property-field">尺 &nbsp; &nbsp; &nbsp;码</td>',
					  '<td class="property-value">S、M</td>',
					'</tr>',
					'<tr>',
					  '<td class="property-field">颜 &nbsp; &nbsp; &nbsp;色</td>',
					  '<td class="property-value">驼色</td>',
					'</tr>',
					'<tr>',
					  '<td class="property-field">成 &nbsp; &nbsp; &nbsp;分</td>',
					  '<td class="property-value">60%腈纶+40%锦纶</td>',
					'</tr>',
					'<tr>',
					  '<td class="property-field">季 &nbsp; &nbsp; &nbsp;节</td>',
					  '<td class="property-value">春季、秋季、冬季</td>',
					'</tr>',
					'<tr>',
					  '<td class="property-field">面料弹性</td>',
					  '<td><table class="slider-table">',
						  '<tbody>',
							'<tr>',
							  '<td>无弹</td>',
							  '<td>微弹</td>',
							  '<td class="slider-point">高弹</td>',
							'</tr>',
						  '</tbody>',
						'</table></td>',
					'</tr>',
					'<tr>',
					  '<td class="property-field">版 &nbsp; &nbsp; &nbsp;型</td>',
					  '<td><table class="slider-table">',
						  '<tbody>',
							'<tr>',
							  '<td>宽松</td>',
							  '<td class="slider-point">修身</td>',
							  '<td>紧身</td>',
							'</tr>',
						  '</tbody>',
						'</table></td>',
					'</tr>',
					'<tr>',
					  '<td class="property-field">长 &nbsp; &nbsp; &nbsp;度</td>',
					  '<td><table class="slider-table">',
						  '<tbody>',
							'<tr>',
							  '<td class="slider-point">短款</td>',
							  '<td>适中</td>',
							  '<td>长款</td>',
							'</tr>',
						  '</tbody>',
						'</table></td>',
					'</tr>',
					'<tr>',
					  '<td colspan="2" class="property-colspan">&nbsp;</td>',
					'</tr>',
				  '</tbody>',
				'</table>',
			  '</div>',
			'</div>'].join('')
},{
	type : 'list-table',
	html : ['<div class="layout list-table">',
				'<table border="1" class="list-tbody">',
				'<tbody>',
				'<tr>',
				'<td style="width:20%;">&nbsp;</td>',
				'<td style="width:20%;">&nbsp;</td>',
				'<td style="width:20%;">&nbsp;</td>',
				'<td style="width:20%;">&nbsp;</td>',
				'<td style="width:20%;">&nbsp;</td>',
				'</tr>',
				'<tr>',
				'<td>&nbsp;</td>',
				'<td>&nbsp;</td>',
				'<td>&nbsp;</td>',
				'<td>&nbsp;</td>',
				'<td>&nbsp;</td>',
				'</tr>',
				'</tbody>',
				'</table>',
			'</div>'].join('')
},{
	type : 'user-table',
	html : ['<div class="layout user-table">',
				'<table border="1" class="user-tbody">',
				'<tbody>',
				'<tr>',
				'<td>&nbsp;</td>',
				'<td>&nbsp;</td>',
				'<td>&nbsp;</td>',
				'<td>&nbsp;</td>',
				'<td>&nbsp;</td>',
				'</tr>',
				'<tr>',
				'<td>&nbsp;</td>',
				'<td>&nbsp;</td>',
				'<td>&nbsp;</td>',
				'<td>&nbsp;</td>',
				'<td>&nbsp;</td>',
				'</tr>',
				'</tbody>',
				'</table>',
			'</div>'].join('')
},{
	type : 'image-list',
	html : ['<div class="layout image-list img-b img-p">',
				'<div class="image-item">',
					'<img src="/s.gif" />',
				'</div>',
			'</div>'].join('')
},{
	type : 'image-item',
	html : ['<div class="image-item">',
				'<img src="/s.gif" />',
			'</div>'].join('')
},{
	type : 'text-item',
	html : '<div class="layout text-item">&nbsp;</div>'
},{
	type : 'html-item',
	html : '<div class="layout html-item">&nbsp;</div>'
},{
	type : 'image-text',
	html : ['<div class="layout image-text w7" style="height:300px;">',
				'<div class="i-image-box">',
					'<div class="i-image-item img-b img-p"><img src="/s.gif"/></div>',
				'</div>',
				'<div class="i-text-box">',
					'<div class="i-text-item"></div>',
				'</div>',
			  '</div>'].join('')
},{
	type : 'double-image-text',
	html : ['<div class="layout double-image-text" style="height:200px;">',
				'<div class="i-image-box">',
					'<div class="i-image-item img-b img-p">',
						'<img src="/s.gif"/>',
					'</div>',
				'</div>',
				'<div class="i-text-box">',
					'<div class="i-text-item"></div>',
				'</div>',
				'<div class="i-image-box">',
					'<div class="i-image-item img-b img-p">',
						'<img src="/s.gif"/>',
					'</div>',
				'</div>',
				'<div class="i-text-box">',
					'<div class="i-text-item"></div>',
				'</div>',
			'</div>'].join('')
},{
	type : 'split-line',
	html : '<div class="layout split-line"></div>'
}];

fixedGridTemplate = {
	'1' : [
			'<div class="layout image-fgrid" style="height:300px;"><div class="p-n" style="width:100%;height:100%;"><div class="image-flink img-b img-p"><img src="/s.gif"/></div></div></div>'
		  ],
	'2' : [
			'<div class="layout image-fgrid" style="height:300px;"><div class="p-r" style="width:50%;height:100%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-n" style="width:50%;height:100%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div></div>',
			'<div class="layout image-fgrid" style="height:300px;"><div class="p-r" style="width:70%;height:100%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-n" style="width:30%;height:100%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div></div>',
			'<div class="layout image-fgrid" style="height:300px;"><div class="p-r" style="width:30%;height:100%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-n" style="width:70%;height:100%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div></div>'
		  ],
	'3' : [
			'<div class="layout image-fgrid" style="height:300px;"><div class="p-r" style="width:33.5%;height:100%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:33.5%;height:100%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-n" style="width:33%;height:100%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div></div>',
			'<div class="layout image-fgrid" style="height:200px;"><div class="p-r" style="width:50%;height:100%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:25%;height:100%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-n" style="width:25%;height:100%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div></div>',
			'<div class="layout image-fgrid" style="height:200px;"><div class="p-r" style="width:25%;height:100%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:50%;height:100%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-n" style="width:25%;height:100%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div></div>',
			'<div class="layout image-fgrid" style="height:200px;"><div class="p-r" style="width:25%;height:100%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:25%;height:100%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-n" style="width:50%;height:100%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div></div>',
			'<div class="layout image-fgrid" style="height:500px;"><div class="p-r-b" style="width:50%;height:60%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-b" style="width:50%;height:60%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-n" style="width:100%;height:40%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div></div>'
		  ],
	'4' : [
			'<div class="layout image-fgrid" style="height:500px;"><div class="p-r" style="width:60%;height:100%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-b" style="width:40%;height:33%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-b" style="width:40%;height:33%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-n" style="width:40%;height:34%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div></div>',
			'<div class="layout image-fgrid" style="height:500px;"><div class="p-b" style="width:100%;height:60%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:33.5%;height:40%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:33.5%;height:40%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-n" style="width:33%;height:40%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div></div>',
			'<div class="layout image-fgrid" style="height:500px;"><div class="p-b" style="width:100%;height:60%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:25%;height:40%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:50%;height:40%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-n" style="width:25%;height:40%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div></div>',
			'<div class="layout image-fgrid" style="height:500px;"><div class="p-r" style="width:50%;height:100%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r-b" style="width:25%;height:60%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-b" style="width:25%;height:60%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-n" style="width:50%;height:40%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div></div>',
			'<div class="layout image-fgrid" style="height:500px;"><div class="p-r-b" style="width:33.5%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r-b" style="width:33.5%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-n f-r" style="width:33%;height:100%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:67%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div></div>',
			'<div class="layout image-fgrid" style="height:600px;"><div class="p-r-b" style="width:67%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-n f-r" style="width:33%;height:100%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:33.5%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:33.5%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div></div>'
		  ],
	'5' : [
			'<div class="layout image-fgrid" style="height:600px;"><div class="p-r-b" style="width:25%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"/></div></div><div class="p-r-b" style="width:25%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"/></div></div><div class="p-n f-r" style="width:50%;height:100%;"><div class="image-flink img-b img-p"><img src="/s.gif"/></div></div><div class="p-r" style="width:25%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"/></div></div><div class="p-r" style="width:25%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"/></div></div></div>',
			'<div class="layout image-fgrid" style="height:600px;"><div class="p-r" style="width:33%;height:100%;"><div class="image-flink img-b img-p"><img src="/s.gif"/></div></div><div style="width:33.5%;height:50%;" class="p-r-b"><div class="image-flink img-b img-p"><img src="/s.gif"/></div></div><div style="width:33.5%;height:50%;" class="p-b"><div class="image-flink img-b img-p"><img src="/s.gif"/></div></div><div style="width:33.5%;height:50%;" class="p-r"><div class="image-flink img-b img-p"><img src="/s.gif"/></div></div><div style="width:33.5%;height:50%;" class="p-n"><div class="image-flink img-b img-p"><img src="/s.gif"/></div></div></div>',
			'<div class="layout image-fgrid" style="height:600px;"><div class="p-r-b" style="width:33.5%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"/></div></div><div style="width:33.5%;height:50%;" class="p-r-b"><div class="image-flink img-b img-p"><img src="/s.gif"/></div></div><div style="width:33%;height:100%;" class="p-n f-r"><div class="image-flink img-b img-p"><img src="/s.gif"/></div></div><div style="width:33.5%;height:50%;" class="p-r"><div class="image-flink img-b img-p"><img src="/s.gif"/></div></div><div style="width:33.5%;height:50%;" class="p-r"><div class="image-flink img-b img-p"><img src="/s.gif"/></div></div></div>',
			'<div class="layout image-fgrid" style="height:300px;"><div class="p-r-b" style="width:25%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r-b" style="width:50%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-b" style="width:25%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:50%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-n" style="width:50%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div></div>',
			'<div class="layout image-fgrid" style="height:500px;"><div class="p-r-b" style="width:50%;height:55%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-b" style="width:50%;height:55%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:25%;height:45%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:50%;height:45%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-n" style="width:25%;height:45%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div></div>',
			'<div class="layout image-fgrid" style="height:300px;"><div class="p-r" style="width:25%;height:100%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r-b" style="width:50%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-n f-r" style="width:25%;height:100%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:25%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:25%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div></div>',
			'<div class="layout image-fgrid" style="height:600px;"><div class="p-r-b" style="width:70%;height:33.3%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-b f-r" style="width:30%;height:66.7%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:30%;height:66.7%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r-b" style="width:40%;height:33.4%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-n" style="width:70%;height:33.3%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div></div>',
			'<div class="layout image-fgrid" style="height:500px;"><div class="p-r-b" style="width:75%;height:65%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-b" style="width:25%;height:65%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:25%;height:35%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:50%;height:35%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-n" style="width:25%;height:35%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div></div>',
			'<div class="layout image-fgrid" style="height:600px;"><div class="p-r-b" style="width:67%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-b" style="width:33%;height: 50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:33.5%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:33.5%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:33%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div></div>'
		  ],
	'6' : [
			'<div class="layout image-fgrid" style="height:300px;"><div class="p-r" style="width:25%;height:100%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r-b" style="width:50%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-b" style="width:25%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:25%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:25%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-n" style="width:25%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div></div>',
			'<div class="layout image-fgrid" style="height:600px;"><div class="p-r-b" style="width:67%;height:67%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-b" style="width:33%;height:33.5%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-b" style="width:33%;height:33.5%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:33.5%;height:33%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:33.5%;height:33%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-n" style="width:33%;height:33%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div></div>',
			'<div class="layout image-fgrid" style="height:300px;"><div class="p-r-b" style="width:50%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r-b" style="width:25%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-b" style="width:25%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:25%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:50%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-n" style="width:25%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div></div>',
			'<div class="layout image-fgrid" style="height:300px;"><div class="p-r-b" style="width:50%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r-b" style="width:25%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-b" style="width:25%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:25%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:25%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-n" style="width:50%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div></div>',
			'<div class="layout image-fgrid" style="height:300px;"><div class="p-r" style="width:25%;height:100%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r-b" style="width:50%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-b" style="width:25%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:25%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:25%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-n" style="width:25%;height:50%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div></div>',
			'<div class="layout image-fgrid" style="height:500px;"><div class="p-r-b" style="width:25%;height:60%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r-b" style="width:25%;height:60%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-b" style="width:50%;height:40%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-n f-r" style="width:25%;height:60%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r f-r" style="width:25%;height:60%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:50%;height:40%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div></div>',
			'<div class="layout image-fgrid" style="height:500px;"><div class="p-r-b" style="width:70%;height:40%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-b" style="width:30%;height:40%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:35%;height:60%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-r" style="width:35%;height:60%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-b" style="width:30%;height:30%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div><div class="p-n" style="width:30%;height:30%;"><div class="image-flink img-b img-p"><img src="/s.gif"></div></div></div>'
		]
};
localStorage[CACHE_KEY.LAYOUT_RELATION]=JSON.stringify(layoutRelation);
localStorage[CACHE_KEY.SYSTEM_TEMPLATE]=JSON.stringify(systemTemplate);
localStorage[CACHE_KEY.FGRID_TEMPLATE]=JSON.stringify(fixedGridTemplate);
})();