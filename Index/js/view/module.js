(function(CF,$,Idex){

var TAB;

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
				if(tab.search){
					tab.search.setValue('');
				}
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
				if(tab && tab.onSearch){
					tab.onSearch(this.getValue(),this.$elem[0]);
				}
			}
		}],
		items : [{
			label:'装修模块',
			name : 'module',
			onLoad:function(){
				var module=new Idex.Module({
					COUNT : Idex.getVersionLimit('rcount'),
					CACHE_KEY : 'renovation_list',
					ACTION_TYPE : Idex.TYPE_MAP.RENOVATION
				});
				
				CF.merger(this,module);

				this.initModule();

				
				this.search=this.$owner.getItem('search');
			}
		},{
			label:'自定义模块',
			name : 'custom',
			onLoad:function(){
				var module=new Idex.Module({
					COUNT : Idex.getVersionLimit('ccount'),
					CACHE_KEY : 'custom_list',
					ACTION_TYPE : Idex.TYPE_MAP.CUSTOM,
					copyItemValue : function(item){
						return {
							id : item.id,
							type : item.type,
							title : item.title
						};
					},
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

				this.search=this.$owner.getItem('search');
			}
		}]
	});
};

Idex.addEventListener('anchor.custom',function(event){
	this.setViewPanel('module');
	initTab(this.activeViewPanel);
	TAB.setCurrentTab(TAB.getTab('custom'));
});


Idex.addEventListener('anchor.module',function(event){
	this.setViewPanel('module');
	initTab(this.activeViewPanel);
	TAB.setCurrentTab(TAB.getTab('module'));
});


})(CF,jQuery,Idex);