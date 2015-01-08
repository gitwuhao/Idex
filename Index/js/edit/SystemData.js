(function(){
var templateList,
	layoutRelation;

layoutRelation={
	'container' : {},
	'float-box' : {
		parent : 'container'
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
	'text-item' : {
		parent : 'container'
	},
	'html-item' : {
		parent : 'container'
	},
	'image-ctable' : {
		parent : 'container'
	},
	'image-col' : {
		parent : 'image-ctable'
	},
	'image-clink' : {
		parent : 'image-col'
	},
	'image-rtable' : {
		parent : 'container'
	},
	'image-fgrid' : {
		parent : 'container'
	},
	'image-row' : {
		parent : 'image-rtable'
	},
	'image-rlink' : {
		parent : 'image-row'
	},
	'property-table' : {
		parent : 'container'
	},
	'property-itable' : {
		parent : 'container'
	},
	'list-table' : {
		parent : 'container'
	},
	'user-table' : {
		parent : 'container'
	},
	'image-list' : {
		parent : 'container'
	},
	'image-item' : {
		parent : 'image-list'
	},
	'image-text' : {
		parent : 'container'
	}
};
templateList=[{
	type : 'container',
	title : '未命名模块',
	html : ['<div class="container" d-t="未命名模块">',
				'<div class="text-title">未命名模块</div>',
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
	type : 'float-image',
	html : ['<div class="float-image img-b img-p">',
				'<img src="/s.gif">',
			'</div> '].join('')
},{
	type : 'float-text',
	html : '<div class="float-text">标题<br>描述.....</div>'
},{
	type : 'float-html',
	html : '<div class="float-html">标题<br>描述.....</div>'
},{
	type : 'image-fgrid',
	html : ['<div class="layout image-fgrid" style="height:600px;">',
				'<div class="p-r-b" style="width:70%;height:33.3%;">',
					'<div class="image-fglink img-b img-p">',
						'<img src="/s.gif">',
					'</div>',
				'</div>',
				'<div class="p-b f-r" style="width:30%;height:66.7%;">',
					'<div class="image-fglink img-b img-p">',
						'<img src="/s.gif">',
					'</div>',
				'</div>',
				'<div class="p-r" style="width:30%;height:66.7%;">',
					'<div class="image-fglink img-b img-p">',
						'<img src="/s.gif">',
					'</div>',
				'</div>',
				'<div class="p-r-b" style="width:40%;height:33.4%;">',
					'<div class="image-fglink img-b img-p">',
						'<img src="/s.gif">',
					'</div>',
				'</div>',
				'<div class="p-n" style="width:70%;height:33.3%;">',
					'<div class="image-fglink img-b img-p">',
						'<img src="/s.gif">',
					'</div>',
				'</div>',
			'</div>'].join('')
},{
	type : 'image-rtable',
	html : ['<div class="layout image-rtable col4">',
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
					'<div class="r-b">',
						'<div class="image-rlink img-b img-p">',
						'<img src="/s.gif">',
						'</div>',
					'</div>',
				'</div>',
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
					'<div class="image-clink img-b img-p" style="height:50px;">',
					'<img src="/s.gif">',
					'</div>',
					'<div class="image-clink img-b img-p" style="height:300px;">',
					'<img src="/s.gif">',
					'</div>',
				'</div>',
				'<div class="image-col">',
					'<div class="image-clink img-b img-p" style="height:50px;">',
					'<img src="/s.gif">',
					'</div>',
					'<div class="image-clink img-b img-p" style="height:300px;">',
					'<img src="/s.gif">',
					'</div>',
					'<div class="image-clink img-b img-p" style="height:300px;">',
					'<img src="/s.gif">',
					'</div>',
				'</div>',
				'<div class="image-col">',
					'<div class="image-clink img-b img-p" style="height:100px;">',
					'<img src="/s.gif">',
					'</div>',
					'<div class="image-clink img-b img-p" style="height:200px;">',
					'<img src="/s.gif">',
					'</div>',
					'<div class="image-clink img-b img-p" style="height:150px;">',
					'<img src="/s.gif">',
					'</div>',
					'<div class="image-clink img-b img-p" style="height:195px;">',
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
	type : 'property-table',
	html : '<div class="layout property-table"><table class="property-tbody" border="1"><tbody><tr><td class="property-field">货号</td><td class="property-value">GW3502</td><td class="property-field">货号</td><td class="property-value">GW3502</td></tr><tr><td class="property-field">尺码</td><td class="property-value">S、M</td><td class="property-field">尺码</td><td class="property-value">S、M</td></tr><tr><td class="property-field">颜色</td><td class="property-value">驼色</td><td class="property-field">颜色</td><td class="property-value">驼色</td></tr><tr><td class="property-field">面料弹性</td><td class="property-value" colspan="3"><table class="slider-table"><tbody><tr><td>无</td><td>微弹</td><td class="slider-point">高</td><td>无</td><td>微弹</td></tr></tbody></table></td></tr><tr><td class="property-field">版型</td><td class="property-value" colspan="3"><table class="slider-table"><tbody><tr><td>宽松</td><td class="slider-point">修身</td><td>紧身</td><td>宽松</td><td>紧身</td></tr></tbody></table></td></tr><tr><td class="property-field">长度</td><td class="property-value" colspan="3"><table class="slider-table"><tbody><tr><td class="slider-point">短</td><td>适中</td><td>长</td><td>适中</td><td>长</td></tr></tbody></table></td></tr><tr><td colspan="4" class="property-colspan">蝙蝠T恤再次回归时尚潮人的视线，它可以隐藏拜拜肉，可以修饰不够丰满的上围，可以显得双腿更加纤细，追求气质感。那么要时尚也要风度的单品，就该闪亮登场了！独特的设计，大玩廓型障眼法，让你在这个季节轻松减重，高贵优雅。</td></tr></tbody></table></div>'
},{
	type : 'property-itable',
	html : ['<div class="layout property-itable col1" style="height:450px;"><div class="p-r pp-i-image-box"><div class="property-image img-b img-p"><img src="/s.gif"></div></div><div class="p-n pp-t-box"><table class="property-tbody" border="1"><tbody><tr><td class="property-field" style="width:100px;">货号</td><td class="property-value" style="width:190px;">GW3502</td></tr><tr><td class="property-field">尺码</td><td class="property-value">S、M</td></tr><tr><td class="property-field">颜色</td><td class="property-value">驼色</td></tr><tr><td class="property-field">成分</td><td class="property-value">60%腈纶+40%锦纶</td></tr><tr><td class="property-field">季节</td><td class="property-value">春季秋季冬季</td></tr><tr><td class="property-field">面料弹性</td><td><table class="slider-table"><tbody><tr><td>无</td><td>微弹</td><td class="slider-point">高</td></tr></tbody></table></td></tr><tr><td class="property-field">版型</td><td><table class="slider-table"><tbody><tr><td>宽松</td><td class="slider-point">修身</td><td>紧身</td></tr></tbody></table></td></tr><tr><td class="property-field">长度</td><td><table class="slider-table"><tbody><tr><td class="slider-point">短</td><td>适中</td><td>长</td></tr></tbody></table></td></tr><tr><td colspan="2" class="property-colspan">蝙蝠T恤再次回归时尚潮人的视线，它可以隐藏拜拜肉，可以修饰不够丰满的上围，可以显得双腿更加纤细，追求气质感。那么要时尚也要风度的单品，就该闪亮登场了！独特的设计，大玩廓型障眼法，让你在这个季节轻松减重，高贵优雅。</td></tr></tbody></table></div></div>'].join('')
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
				'<td width="20%">&nbsp;</td>',
				'<td width="20%">&nbsp;</td>',
				'<td width="20%">&nbsp;</td>',
				'<td width="20%">&nbsp;</td>',
				'<td width="20%">&nbsp;</td>',
				'</tr>',
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
				'<div class="image-item">',
					'<img src="/s.gif" />',
				'</div>',
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
	html : '<div class="layout text-item">标题<br>描述.....<br/><br/><br/></div>'
},{
	type : 'html-item',
	html : '<div class="layout html-item">标题<br>描述.....<br/><br/><br/></div>'
},{
	type : 'image-text',
	html : ['<div class="layout image-text w7" style="height:300px;">',
				'<div class="i-image-box">',
					'<div class="i-image-item img-b img-p"><img src="/s.gif"/></div>',
				'</div>',
				'<div class="i-text-box">',
					'<div class="i-text-item">说明...</div>',
				'</div>',
			  '</div>'].join('')
}];
localStorage['IDEX_LAYOUT_RELATION']=JSON.stringify(layoutRelation);
localStorage['IDEX_SYSTEM_TEMPLATE_LIST']=JSON.stringify(templateList);
})();