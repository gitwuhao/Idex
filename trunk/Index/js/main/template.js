(function(CF,$,Idex){ 
var template = {};

Idex.view.template=template;

template.init=function(tab){
	CF.merger(tab,{
		onRender : function(){

			var div,
				html=['<div class="x-ui-floatbar-box">',
							ui.getXTypeHTML(this.refresh),
							ui.getXTypeHTML(this.search),
					  '</div>'];
			div=$.createElement(html.join(''));
			this.$owner.$tabbarbox.before(div);

			this.$floatbox=$(div);

			var children=this.$floatbox.children();


			this.refresh.$owner=this;
			this.refresh=ui.getXTypeItem(this.refresh,children[0]);

			this.search.$owner=this;
			this.search=ui.getXTypeItem(this.search,children[1]);




			var module=new Idex.Module({
				COUNT : Idex.getVersionLimit('tcount'),
				isView : true,
				CACHE_KEY : 'template_list',
				ACTION_TYPE : Idex.TYPE_MAP.TEMPLATE
			});
			
			CF.merger(this,module);

			this.initModule();


		},
		refresh : {
			xtype : 'button',
			icon : true,
			cls : 'refresh',
			title : "刷新",
			onClick:function(){
				if(this.$owner.isActionBusy(this.$elem[0])){
					return;
				}
				this.$owner.query();
				if(this.$owner.search){
					this.$owner.search.setValue('');
				}
			}
		},
		search : {
			xtype:'text',
			icon :'search',
			placeholder : '输入关键字',
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
				this.$owner.onSearch(this.getValue(),this.$elem[0]);
			}
		},
		onShowAfter : function(){
			this.$floatbox.show();
		},
		onHideAfter : function(){
			this.$floatbox.hide();
		}
	});

	tab.onRender();

	delete tab.onRender;
};


CF.merger(template,{	
	select : function(callback){
		if(this.win){
			return;
		}
		this.win=new ui.window({
			title : '选择模板',
			cls : 'idex-win-template-select',
			html : '<div class="idex-module-box"><div class="idex-module-item idex-shadow-box blank"><p>空白</p><em>点击创建</em></div><div class="idex-module-item idex-shadow-box"><div class="datetime">10:05<span>&nbsp;&nbsp;123旗舰店</span></div><div class="idex-mini-tbar"><a href="/view/1/101010744" target="_IDEX_VIEW" title="预览"><div class="view idex-icon"></div></a><a href="/edit/1/101010744" target="_IDEX_EDIT" title="编辑"><div class="edit idex-icon"></div></a><div class="copy idex-icon" title="复制"></div><div class="del idex-icon"></div></div><p>760px</p><em>未命名模板</em></div><div class="idex-module-item idex-shadow-box"><div class="datetime">2015-01-28<span>&nbsp;&nbsp;123旗舰店</span></div><div class="idex-mini-tbar"><a href="/view/1/101010745" target="_IDEX_VIEW" title="预览"><div class="view idex-icon"></div></a><a href="/edit/1/101010745" target="_IDEX_EDIT" title="编辑"><div class="edit idex-icon"></div></a><div class="copy idex-icon" title="复制"></div><div class="del idex-icon"></div></div><p>760px</p><em>服装模板</em></div><div class="idex-module-item idex-shadow-box"><div class="datetime">10:05<span>&nbsp;&nbsp;123旗舰店</span></div><div class="idex-mini-tbar"><a href="/view/1/101010796" target="_IDEX_VIEW" title="预览"><div class="view idex-icon"></div></a><a href="/edit/1/101010796" target="_IDEX_EDIT" title="编辑"><div class="edit idex-icon"></div></a><div class="copy idex-icon" title="复制"></div><div class="del idex-icon"></div></div><p>760px</p><em>服装模板</em></div><div class="idex-module-item idex-shadow-box"><div class="datetime">10:05<span>&nbsp;&nbsp;123旗舰店</span></div><div class="idex-mini-tbar"><a href="/view/1/101010797" target="_IDEX_VIEW" title="预览"><div class="view idex-icon"></div></a><a href="/edit/1/101010797" target="_IDEX_EDIT" title="编辑"><div class="edit idex-icon"></div></a><div class="copy idex-icon" title="复制"></div><div class="del idex-icon"></div></div><p>760px</p><em>服装模板</em></div><div class="idex-module-item idex-shadow-box"><div class="datetime">10:05<span>&nbsp;&nbsp;123旗舰店</span></div><div class="idex-mini-tbar"><a href="/view/1/101010798" target="_IDEX_VIEW" title="预览"><div class="view idex-icon"></div></a><a href="/edit/1/101010798" target="_IDEX_EDIT" title="编辑"><div class="edit idex-icon"></div></a><div class="copy idex-icon" title="复制"></div><div class="del idex-icon"></div></div><p>760px</p><em>服装模板</em></div></div>',
			callback : callback,
			onCloseAfter : function(){
				this.$owner.close();
			}
		});
		this.win.$owner = this;
		this.win.show();
	},
	close : function(){
		this.win.remove();
		delete this.win;
	}
});

})(CF,jQuery,Idex);