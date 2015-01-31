(function(CF,$,Idex){
 var indTemplate = {};

Idex.view.indTemplate=indTemplate;

indTemplate.init=function(tab){
	CF.merger(tab,{
		onRender : function(){

			var div,
				html=['<div class="x-ui-floatbar-box">',
							ui.getXTypeHTML(this.search),
					  '</div>'];
			div=$.createElement(html.join(''));
			this.$owner.$tabbarbox.before(div);

			this.$floatbox=$(div);

			var children=this.$floatbox.children();
 
			this.search.$owner=this;
			this.search=ui.getXTypeItem(this.search,children[1]);


			
			this.initModule();

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
		},
		initModule : function(){
			var html=['<div class="idex-ind-template-list-box idex-module-box">',
						'<div class="idex-ind-template-list-group">',
							'<div class="idex-ind-template-title-box">',
								'<div class="idex-bg-line"></div>',
								'<div class="idex-title">服装</div>',
							'</div>',
							'<div class="idex-ind-template-item-box">',
								'<div class="idex-module-item idex-shadow-box">',
									'<div class="idex-mini-tbar">',
										'<a href="/view/1/101010744" target="_IDEX_VIEW" title="预览">',
											'<div class="view idex-icon"></div>',
										'</a>',
										'<a href="/edit/1/101010744" target="_IDEX_EDIT" title="编辑">',
											'<div class="edit idex-icon"></div>',
										'</a>',
										'<div class="copy idex-icon" title="复制"></div>',
										'<div class="del idex-icon"></div>',
									'</div>',
									'<p>750px</p>',
									'<em>未命名模板</em>',
								'</div>',
								'<div class="idex-module-item idex-shadow-box">',
									'<div class="idex-mini-tbar">',
										'<a href="/view/1/101010744" target="_IDEX_VIEW" title="预览">',
											'<div class="view idex-icon"></div>',
										'</a>',
										'<a href="/edit/1/101010744" target="_IDEX_EDIT" title="编辑">',
											'<div class="edit idex-icon"></div>',
										'</a>',
										'<div class="copy idex-icon" title="复制"></div>',
										'<div class="del idex-icon"></div>',
									'</div>',
									'<p>750px</p>',
									'<em>未命名模板</em>',
								'</div>',
								'<div class="idex-module-item idex-shadow-box">',
									'<div class="idex-mini-tbar">',
										'<a href="/view/1/101010744" target="_IDEX_VIEW" title="预览">',
											'<div class="view idex-icon"></div>',
										'</a>',
										'<a href="/edit/1/101010744" target="_IDEX_EDIT" title="编辑">',
											'<div class="edit idex-icon"></div>',
										'</a>',
										'<div class="copy idex-icon" title="复制"></div>',
										'<div class="del idex-icon"></div>',
									'</div>',
									'<p>750px</p>',
									'<em>未命名模板</em>',
								'</div>',
								'<div class="idex-module-item idex-shadow-box">',
									'<div class="idex-mini-tbar">',
										'<a href="/view/1/101010744" target="_IDEX_VIEW" title="预览">',
											'<div class="view idex-icon"></div>',
										'</a>',
										'<a href="/edit/1/101010744" target="_IDEX_EDIT" title="编辑">',
											'<div class="edit idex-icon"></div>',
										'</a>',
										'<div class="copy idex-icon" title="复制"></div>',
										'<div class="del idex-icon"></div>',
									'</div>',
									'<p>750px</p>',
									'<em>未命名模板</em>',
								'</div>',
								'<div class="idex-module-item idex-shadow-box">',
									'<div class="idex-mini-tbar">',
										'<a href="/view/1/101010744" target="_IDEX_VIEW" title="预览">',
											'<div class="view idex-icon"></div>',
										'</a>',
										'<a href="/edit/1/101010744" target="_IDEX_EDIT" title="编辑">',
											'<div class="edit idex-icon"></div>',
										'</a>',
										'<div class="copy idex-icon" title="复制"></div>',
										'<div class="del idex-icon"></div>',
									'</div>',
									'<p>750px</p>',
									'<em>未命名模板</em>',
								'</div>',
								'<div class="idex-module-item idex-shadow-box">',
									'<div class="idex-mini-tbar">',
										'<a href="/view/1/101010744" target="_IDEX_VIEW" title="预览">',
											'<div class="view idex-icon"></div>',
										'</a>',
										'<a href="/edit/1/101010744" target="_IDEX_EDIT" title="编辑">',
											'<div class="edit idex-icon"></div>',
										'</a>',
										'<div class="copy idex-icon" title="复制"></div>',
										'<div class="del idex-icon"></div>',
									'</div>',
									'<p>750px</p>',
									'<em>未命名模板</em>',
								'</div>',
								'<div class="idex-module-item idex-shadow-box">',
									'<div class="idex-mini-tbar">',
										'<a href="/view/1/101010744" target="_IDEX_VIEW" title="预览">',
											'<div class="view idex-icon"></div>',
										'</a>',
										'<a href="/edit/1/101010744" target="_IDEX_EDIT" title="编辑">',
											'<div class="edit idex-icon"></div>',
										'</a>',
										'<div class="copy idex-icon" title="复制"></div>',
										'<div class="del idex-icon"></div>',
									'</div>',
									'<p>750px</p>',
									'<em>未命名模板</em>',
								'</div>',
								'<div class="idex-module-item idex-shadow-box">',
									'<div class="idex-mini-tbar">',
										'<a href="/view/1/101010744" target="_IDEX_VIEW" title="预览">',
											'<div class="view idex-icon"></div>',
										'</a>',
										'<a href="/edit/1/101010744" target="_IDEX_EDIT" title="编辑">',
											'<div class="edit idex-icon"></div>',
										'</a>',
										'<div class="copy idex-icon" title="复制"></div>',
										'<div class="del idex-icon"></div>',
									'</div>',
									'<p>750px</p>',
									'<em>未命名模板</em>',
								'</div>',
								'<div class="idex-module-item idex-shadow-box">',
									'<div class="idex-mini-tbar">',
										'<a href="/view/1/101010744" target="_IDEX_VIEW" title="预览">',
											'<div class="view idex-icon"></div>',
										'</a>',
										'<a href="/edit/1/101010744" target="_IDEX_EDIT" title="编辑">',
											'<div class="edit idex-icon"></div>',
										'</a>',
										'<div class="copy idex-icon" title="复制"></div>',
										'<div class="del idex-icon"></div>',
									'</div>',
									'<p>750px</p>',
									'<em>未命名模板</em>',
								'</div>',
								'<div class="idex-module-item idex-shadow-box">',
									'<div class="idex-mini-tbar">',
										'<a href="/view/1/101010744" target="_IDEX_VIEW" title="预览">',
											'<div class="view idex-icon"></div>',
										'</a>',
										'<a href="/edit/1/101010744" target="_IDEX_EDIT" title="编辑">',
											'<div class="edit idex-icon"></div>',
										'</a>',
										'<div class="copy idex-icon" title="复制"></div>',
										'<div class="del idex-icon"></div>',
									'</div>',
									'<p>750px</p>',
									'<em>未命名模板</em>',
								'</div>',
								'<div class="idex-module-item idex-shadow-box">',
									'<div class="idex-mini-tbar">',
										'<a href="/view/1/101010744" target="_IDEX_VIEW" title="预览">',
											'<div class="view idex-icon"></div>',
										'</a>',
										'<a href="/edit/1/101010744" target="_IDEX_EDIT" title="编辑">',
											'<div class="edit idex-icon"></div>',
										'</a>',
										'<div class="copy idex-icon" title="复制"></div>',
										'<div class="del idex-icon"></div>',
									'</div>',
									'<p>750px</p>',
									'<em>未命名模板</em>',
								'</div>',
								'<div class="idex-module-item idex-shadow-box">',
									'<div class="idex-mini-tbar">',
										'<a href="/view/1/101010744" target="_IDEX_VIEW" title="预览">',
											'<div class="view idex-icon"></div>',
										'</a>',
										'<a href="/edit/1/101010744" target="_IDEX_EDIT" title="编辑">',
											'<div class="edit idex-icon"></div>',
										'</a>',
										'<div class="copy idex-icon" title="复制"></div>',
										'<div class="del idex-icon"></div>',
									'</div>',
									'<p>750px</p>',
									'<em>未命名模板</em>',
								'</div>',
							'</div>',
						'</div>',
						'<div class="idex-ind-template-list-group">',
							'<div class="idex-ind-template-title-box">',
								'<div class="idex-bg-line"></div>',
								'<div class="idex-title">服装</div>',
							'</div>',
							'<div class="idex-ind-template-item-box">',
								'<div class="idex-module-item idex-shadow-box">',
									'<div class="idex-mini-tbar">',
										'<a href="/view/1/101010744" target="_IDEX_VIEW" title="预览">',
											'<div class="view idex-icon"></div>',
										'</a>',
										'<a href="/edit/1/101010744" target="_IDEX_EDIT" title="编辑">',
											'<div class="edit idex-icon"></div>',
										'</a>',
										'<div class="copy idex-icon" title="复制"></div>',
										'<div class="del idex-icon"></div>',
									'</div>',
									'<p>750px</p>',
									'<em>未命名模板</em>',
								'</div>',
								'<div class="idex-module-item idex-shadow-box">',
									'<div class="idex-mini-tbar">',
										'<a href="/view/1/101010744" target="_IDEX_VIEW" title="预览">',
											'<div class="view idex-icon"></div>',
										'</a>',
										'<a href="/edit/1/101010744" target="_IDEX_EDIT" title="编辑">',
											'<div class="edit idex-icon"></div>',
										'</a>',
										'<div class="copy idex-icon" title="复制"></div>',
										'<div class="del idex-icon"></div>',
									'</div>',
									'<p>750px</p>',
									'<em>未命名模板</em>',
								'</div>',
								'<div class="idex-module-item idex-shadow-box">',
									'<div class="idex-mini-tbar">',
										'<a href="/view/1/101010744" target="_IDEX_VIEW" title="预览">',
											'<div class="view idex-icon"></div>',
										'</a>',
										'<a href="/edit/1/101010744" target="_IDEX_EDIT" title="编辑">',
											'<div class="edit idex-icon"></div>',
										'</a>',
										'<div class="copy idex-icon" title="复制"></div>',
										'<div class="del idex-icon"></div>',
									'</div>',
									'<p>750px</p>',
									'<em>未命名模板</em>',
								'</div>',
								'<div class="idex-module-item idex-shadow-box">',
									'<div class="idex-mini-tbar">',
										'<a href="/view/1/101010744" target="_IDEX_VIEW" title="预览">',
											'<div class="view idex-icon"></div>',
										'</a>',
										'<a href="/edit/1/101010744" target="_IDEX_EDIT" title="编辑">',
											'<div class="edit idex-icon"></div>',
										'</a>',
										'<div class="copy idex-icon" title="复制"></div>',
										'<div class="del idex-icon"></div>',
									'</div>',
									'<p>750px</p>',
									'<em>未命名模板</em>',
								'</div>',
								'<div class="idex-module-item idex-shadow-box">',
									'<div class="idex-mini-tbar">',
										'<a href="/view/1/101010744" target="_IDEX_VIEW" title="预览">',
											'<div class="view idex-icon"></div>',
										'</a>',
										'<a href="/edit/1/101010744" target="_IDEX_EDIT" title="编辑">',
											'<div class="edit idex-icon"></div>',
										'</a>',
										'<div class="copy idex-icon" title="复制"></div>',
										'<div class="del idex-icon"></div>',
									'</div>',
									'<p>750px</p>',
									'<em>未命名模板</em>',
								'</div>',
								'<div class="idex-module-item idex-shadow-box">',
									'<div class="idex-mini-tbar">',
										'<a href="/view/1/101010744" target="_IDEX_VIEW" title="预览">',
											'<div class="view idex-icon"></div>',
										'</a>',
										'<a href="/edit/1/101010744" target="_IDEX_EDIT" title="编辑">',
											'<div class="edit idex-icon"></div>',
										'</a>',
										'<div class="copy idex-icon" title="复制"></div>',
										'<div class="del idex-icon"></div>',
									'</div>',
									'<p>750px</p>',
									'<em>未命名模板</em>',
								'</div>',
								'<div class="idex-module-item idex-shadow-box">',
									'<div class="idex-mini-tbar">',
										'<a href="/view/1/101010744" target="_IDEX_VIEW" title="预览">',
											'<div class="view idex-icon"></div>',
										'</a>',
										'<a href="/edit/1/101010744" target="_IDEX_EDIT" title="编辑">',
											'<div class="edit idex-icon"></div>',
										'</a>',
										'<div class="copy idex-icon" title="复制"></div>',
										'<div class="del idex-icon"></div>',
									'</div>',
									'<p>750px</p>',
									'<em>未命名模板</em>',
								'</div>',
								'<div class="idex-module-item idex-shadow-box">',
									'<div class="idex-mini-tbar">',
										'<a href="/view/1/101010744" target="_IDEX_VIEW" title="预览">',
											'<div class="view idex-icon"></div>',
										'</a>',
										'<a href="/edit/1/101010744" target="_IDEX_EDIT" title="编辑">',
											'<div class="edit idex-icon"></div>',
										'</a>',
										'<div class="copy idex-icon" title="复制"></div>',
										'<div class="del idex-icon"></div>',
									'</div>',
									'<p>750px</p>',
									'<em>未命名模板</em>',
								'</div>',
								'<div class="idex-module-item idex-shadow-box">',
									'<div class="idex-mini-tbar">',
										'<a href="/view/1/101010744" target="_IDEX_VIEW" title="预览">',
											'<div class="view idex-icon"></div>',
										'</a>',
										'<a href="/edit/1/101010744" target="_IDEX_EDIT" title="编辑">',
											'<div class="edit idex-icon"></div>',
										'</a>',
										'<div class="copy idex-icon" title="复制"></div>',
										'<div class="del idex-icon"></div>',
									'</div>',
									'<p>750px</p>',
									'<em>未命名模板</em>',
								'</div>',
								'<div class="idex-module-item idex-shadow-box">',
									'<div class="idex-mini-tbar">',
										'<a href="/view/1/101010744" target="_IDEX_VIEW" title="预览">',
											'<div class="view idex-icon"></div>',
										'</a>',
										'<a href="/edit/1/101010744" target="_IDEX_EDIT" title="编辑">',
											'<div class="edit idex-icon"></div>',
										'</a>',
										'<div class="copy idex-icon" title="复制"></div>',
										'<div class="del idex-icon"></div>',
									'</div>',
									'<p>750px</p>',
									'<em>未命名模板</em>',
								'</div>',
								'<div class="idex-module-item idex-shadow-box">',
									'<div class="idex-mini-tbar">',
										'<a href="/view/1/101010744" target="_IDEX_VIEW" title="预览">',
											'<div class="view idex-icon"></div>',
										'</a>',
										'<a href="/edit/1/101010744" target="_IDEX_EDIT" title="编辑">',
											'<div class="edit idex-icon"></div>',
										'</a>',
										'<div class="copy idex-icon" title="复制"></div>',
										'<div class="del idex-icon"></div>',
									'</div>',
									'<p>750px</p>',
									'<em>未命名模板</em>',
								'</div>',
								'<div class="idex-module-item idex-shadow-box">',
									'<div class="idex-mini-tbar">',
										'<a href="/view/1/101010744" target="_IDEX_VIEW" title="预览">',
											'<div class="view idex-icon"></div>',
										'</a>',
										'<a href="/edit/1/101010744" target="_IDEX_EDIT" title="编辑">',
											'<div class="edit idex-icon"></div>',
										'</a>',
										'<div class="copy idex-icon" title="复制"></div>',
										'<div class="del idex-icon"></div>',
									'</div>',
									'<p>750px</p>',
									'<em>未命名模板</em>',
								'</div>',
							'</div>',
						'</div>',
					  '</div>'];
			
			this.$tabview.html(html.join(''));
		}
	});

	tab.onRender();

	delete tab.onRender;
};

})(CF,jQuery,Idex);