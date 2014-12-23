(function(CF,$,Idex){

var TAB;

function onShowBefore(){
	if(this.currentKeyWord){
		this.$owner.getItem('search').setValue('');
		this.rerenderList();
	}
};
function initTab(render){
	if(TAB && TAB._owner_name_==ui.tab._owner_name_){
		return;
	}
	TAB=new ui.tab({
		render : render,
		floatbar : [{
			xtype : 'button',
			icon : true,
			cls : 'refresh',
			title : "刷新",
			onClick:function(){
				var tab=this.$owner.currentTab;
				if(tab.isActionBusy()){
					return;
				}
				tab.query();
			}
		},{
			xtype:'text',
			icon :'search',
			placeholder : '输入模块名进行检索',
			onRenderAfter : function(){
				this.callPrototypeMethod();
				this.addEventListener('textkeydown',function(event){
					 if(event.keyCode==13){
						this.value=this.$text.val();
						this.submit();
					 }
				});
			},
			onIconmousedown : function(event){
				this.submit();
			},
			submit : function(){
				var tab=this.$owner.currentTab;
				if(tab && tab.search){
					tab.onSearch(this.getValue(),this.$elem[0]);
				}
			}
		}],
		items : [{
			label:'自定义模块',
			name : 'custom',
			onLoad:function(){
				var module=new Idex.Module({
					COUNT : Idex.getVersionLimit('ccount'),
					MODULE_TYPE : 'c',
					CACHE_KEY : 'custom_list',
					ACTION_TYPE : 2,
					getItemHTML : function(item){
						return ['<div class="idex-module-item idex-shadow-box">',
										'<div class="idex-mini-tbar" data-id="',item.id,'">',
											'<div class="del idex-icon"></div>',
										'</div>',
										'<div class="bg idex-icon"></div>',
										'<em>',item.title,'</em>',
								'</div>'].join('');
					},
					getBlankItemHTML : function(){
					}
				});
				
				CF.merger(this,module);

				this.initModule();
			},
			onShowBefore : onShowBefore
		},{
			label:'装修模块',
			name : 'renovation',
			onLoad:function(){
				var module=new Idex.Module({
					COUNT : Idex.getVersionLimit('rcount'),
					MODULE_TYPE : 'r',
					CACHE_KEY : 'renovation_list',
					ACTION_TYPE : 3
				});
				
				CF.merger(this,module);

				this.initModule();
			},
			onShowBefore : onShowBefore
		}]
	});
};

Idex.addEventListener('anchor.custom',function(event){
	this.setViewPanel('custom');
	initTab(this.activeViewPanel);
	TAB.setCurrentTab(TAB.getTab('custom'));
});


Idex.addEventListener('anchor.renovation',function(event){
	this.setViewPanel('custom');
	initTab(this.activeViewPanel);
	TAB.setCurrentTab(TAB.getTab('renovation'));
});


})(CF,jQuery,Idex);