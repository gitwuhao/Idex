(function(CF,$,Idex){
var TAB;

function initTab(render){
	if(TAB && TAB._owner_name_==ui.tab._owner_name_){
		return;
	}
	TAB=new ui.tab({
		render : render,
		items : [{
			label:'查询详情',
			name : 'list',
			html :'<div class="error-msg">数据正在导入，暂时无法使用此功能<br/>可以去创建详情模板...</div>',
			onLoad : function(){
				if(!Idex.isImport){
					Idex.removeEventListener('importComplete');
					Idex.view.list.initTabPanel(this);
				}
			}
		},{
			label:'详情模板',
			name : 'template',
			onLoad : function(){
				Idex.view.template.init(this);
			}
		},{
			label:'系统模板',
			name : 'system',
			html :'<div class="error-msg">系统模板加载失败...</div>',
			onLoad : function(){
				Idex.view.systemTemplate.init(this);
			}
		}]
	});
};


Idex.addEventListener('anchor.list',function(event){
	this.setViewPanel('list');
	initTab(this.activeViewPanel);
	TAB.setCurrentTab(TAB.getTab('list'));
});


Idex.addEventListener('anchor.template',function(event){
	this.setViewPanel('list');
	initTab(this.activeViewPanel);
	TAB.setCurrentTab(TAB.getTab('template'));
});


Idex.addEventListener('importComplete',function(event){
	if(TAB && TAB.getTab){
		var tab=TAB.getTab('list');
		this.view.list.initTabPanel(tab);
	}
	delete Idex.isImport;
});

})(CF,jQuery,$.Idex);
