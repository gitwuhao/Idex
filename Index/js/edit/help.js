(function(CF,$){
	
	var AUTOSIZE={
				'.autosize' : '自动适应内容大小。'
		},
		LINK={
			link : '链接：设置图片的链接。'
		},
		IMAGE={
			src : '图片：设置图片的地址。'
		},
		TABLEEDITOR={
			editor : '编辑：\n<e class="h">Ctrl/s+鼠标单击\n双击表格层进行编辑</em>'
		},
		TEXTEDITOR={
			editor : '编辑：\n<e class="h">Ctrl`+鼠标单击\n双击文本层进行编辑</em>'
		},
		FLOAT={
				'atop' : {
					info : '顶对齐：将浮动布局对齐到顶部。',
					shortcuts : [
								 '选中浮动布局按快捷键：\n\t\tAlt`+`Shift`+`←\n',
								  '\t\t轻移：←\t\tShift`+`←'
					].join('')
				},
				'amiddle' :  {
					info : '垂直居中：将浮动布局垂直居中对齐。',
					shortcuts : [
								 '选中浮动布局按快捷键：\n\t\tAlt`+`Shift`+`M'
					].join('')
				},
				'abottom' :  {
					info : '底对齐：将浮动布局对齐到底部。',
					shortcuts : [
								 '选中浮动布局按快捷键：\n\t\tAlt`+`Shift`+`↓\n',
								  '\t\t轻移：↓\t\tShift`+`↓'
					].join('')
				},
				'aleft' : {
					info : '左对齐：将浮动布局对齐到左边。',
					shortcuts : [
								 '选中浮动布局快捷键：\n\t\tAlt`+`Shift`+`←\n',
								  '\t\t轻移：←\t\tShift`+`←'
					].join('')
				},
				'acenter' : {
					info : '水平居中：将浮动布局水平居中对齐。',
					shortcuts : [
								 '选中浮动布局快捷键：\n\t\tAlt`+`Shift`+`C'
					].join('')
				},
				'aright' :  {
					info : '右对齐：将浮动布局对齐到右边。',
					shortcuts : [
								 '选中浮动布局快捷键：\n\t\tAlt`+`Shift`+`→\n',
								  '\t\t轻移：→\t\tShift`+`→'
					].join('')
				},
				left : '左边距：设置浮动布局左边的位置',
				top : '上边距：设置浮动布局上边的位置',
				width : '宽度：设置浮动布局的宽度',
				height : '高度：设置浮动布局的高度'
			},
		help;

	help={
		'property-field' : {
			viewpanel : {
				width : '布局宽度：只能在最小550像素至最大1500像素之间。'
			},
			container : {
				src : '图片标题(可填)：布局块显示图片标题。',
				title : '标题：显示标题名、布局模块名和详情导航。'
			},
			'float-box' : {
				height : '高度：设置浮动层的高度。',
				src : '背景图片：设置浮动层的背景图片，清空输入框将取消背景图片。'
			},
			'float-image' : CF.merger({
				'.autosize' : '自动适应图片大小。'
			},FLOAT,LINK,IMAGE),
			'float-link' : CF.merger({
				link : '链接：',
			},FLOAT),
			'float-text' : CF.merger({},FLOAT,AUTOSIZE),
			'float-html' : CF.merger({},FLOAT,AUTOSIZE),
			'image-clink' : CF.merger({
				height : '高度：设置图片的高度。',
				src : '图片：'
			},LINK,IMAGE),
			'image-rlink' : CF.merger({
			},LINK,IMAGE),
			'image-item'  : CF.merger({
			},IMAGE),
			'property-itable' : CF.merger({
				height : '高度：设置表格的高度。',
				src : '图片：'
			},AUTOSIZE,TABLEEDITOR),
			'property-table'  : CF.merger({
			},TABLEEDITOR),
			'list-table'  : CF.merger({
			},TABLEEDITOR),
			'user-table'  : CF.merger({
			},TABLEEDITOR),
			'float-text'  : CF.merger({
			},TEXTEDITOR),
			'text-item'  : CF.merger({
			},TEXTEDITOR)
		},
		'right-panel-icon':{
			layoutpanel:{
				del : {
					info : '删除按钮：选中不需要的布局，然后点击该按钮进行删除。',
					shortcuts : [
						 '撤销：Alt`+`Ctrl`+`Z\t[Ctrl`+`Z]\n',
						 '重做：Shift`+`Ctrl`+`Z\t[Ctrl`+`Y]',
					].join('')
				},
				home : {
					info : '回到顶部：回到布局设计的顶部，同时还可以修改布局基本信息。',
					shortcuts : [
								 '点击布局设计和操作面板之间的空白区域，也可以回到顶部。'
					].join('')
					
				},
				back : {
					info : '返回：回到上一层。'
				},
				saveas : {
					info : '存储布局：将选中的布局，另存为模板方便下次使用。'
				},
				copy : {
					info : '复制：用选中的布局创建一个副本。'
				},
				new : {
					info : '新增布局'
				}
			},
			icon : {
				history : {
					info : '历史记录：查看操作记录、快照。\n快照最多可创建5个，操作记录最多可记录20步。',
					shortcuts : [
								 '面板切换：F6\n',
								 '撤销：Ctrl`+`Z````重做：Ctrl`+`Y'
								].join('')
				},
				checkimage : {
					info : '图片验证：查看或验证图片的。',
					shortcuts : '面板切换：F9'
				},
				exportps : {
					info : '导出：将当前布局以图片(png格式)模板的方式导出，在导入Ps制作相关图片。',
					shortcuts : '快捷键：F4'
				},
				browse : {
					info : '预览：预览当前描述，并生成代码。',
					shortcuts : '快捷键：F10'
				},
				guide : {
					info : '指南：查看ide的快捷键和详细操作指南等信息。',
					shortcuts : '快捷键：F1'
				},
				save : {
					info : '保存：将描述上传至云端服务器进行保存。',
					shortcuts : '快捷键：Ctrl`+`S'
				}
			}
		},
		'ui.form.text': [
						 '清空：Shift`+`Backspace\n',
						 '复制：Ctrl`+`C````粘贴：Ctrl`+`V\n',
						 '全选：Shift`+`单击```修改：Enter\n'
						].join(''),
		'vtype' : {
			spin : [
					 '调整：Shift`+`↑`/`↓\t[鼠标滚轮]\n'
					].join('')
		},
		getInfo : function(config){
			var type,
				content,
				item,
				info;

			type=this[config.type];
			if(!type){
				return null;
			}

			content=type[config.content];
			if(!content){
				return null;
			}

			item=content[config.name];
			if(!item && config.cls){
				item=content['.'+config.cls];
			}
			if(!item){
				return null;
			}
			if(item.info){
				info=item.info;
			}else{
				info=item;
			}

			var html=['<div class="helpinfo">',info,'</div>'],
				xtypeInfo,
				vtypeInfo=[];
			if(item.info){
				if(item.shortcuts){
					html.push('<div class="itemfield">',item.shortcuts,'</div>');
				}
			}else{
				 //if(config.type=='property-field'){
				html.push('<div class="itemfield">');
				
				config.vtype=config.vtype||[];

				$.it(config.vtype,function(index,type){
					vtypeInfo.push(this.vtype[type]);
				},this)
					
				html.push(vtypeInfo.join(''));
			
				xtypeInfo=this[config.xtype];

				if(xtypeInfo){
					 html.push( xtypeInfo);
				}
			
				html.push('</div>');
				//}
			}
			return html.join('').formatHTML();
		}
	};

$.getDoc().one('Idex.ready',function(){
	var $eventListener=$('.idex-event-listener');

	$eventListener.data('helpInstance',help);

	$eventListener.on('help',function(event,originalEvent){
		var data=originalEvent.data,
			info;

		info=help.getInfo(data);
		
		if(!info){
			console.info('--->help:',data);
			return;
		}
		
		var xtype='';
		if(data.item && data.item._name_){
			xtype=' '+data.item._name_;
		}
		var config={
			px : 'idex-ui',
			offset : data.offset || 'rb',
			align : data.align || 'tc',
			cls : 'helptip ' + data.type + xtype,
			html : info,
			target :  data.target
		};

		ui.quicktip.show(config);
	});
});
})(CF,jQuery);