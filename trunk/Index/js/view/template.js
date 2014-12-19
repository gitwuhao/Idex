(function(){
	Idex.view.template.init=function(tab){
		CF.merger(tab,{
			onRender : function(){
				var html=['<div class="idex-module-box">',
							'<div class="idex-module-item idex-shadow-box blank">',
								'<p>空白</p>',
								'<em>点击创建</em>',
							'</div>',
							'<div class="idex-module-item idex-shadow-box">',
								'<div class="idex-mini-tbar">',
									'<div class="edit idex-icon"></div>',
									'<div class="copy idex-icon"></div>',
									'<div class="del idex-icon"></div>',
								'</div>',
								'<p>750px</p>',
								'<em>淘宝模板</em>',
							'</div>',
							'<div class="idex-module-item idex-shadow-box">',
								'<div class="idex-mini-tbar">',
									'<div class="edit idex-icon"></div>',
									'<div class="copy idex-icon"></div>',
									'<div class="del idex-icon"></div>',
								'</div>',
								'<p>790px</p>',
								'<em>天猫模板</em>',
							'</div>',
							'<div class="idex-module-item idex-shadow-box">',
								'<div class="idex-mini-tbar">',
									'<div class="edit idex-icon"></div>',
									'<div class="copy idex-icon"></div>',
									'<div class="del idex-icon"></div>',
								'</div>',
								'<p>750px</p>',
								'<em>品牌形象</em>',
							'</div>',
							'<div class="idex-module-item idex-shadow-box">',
								'<div class="idex-mini-tbar">',
									'<div class="edit idex-icon"></div>',
									'<div class="copy idex-icon"></div>',
									'<div class="del idex-icon"></div>',
								'</div>',
								'<p>750px</p>',
								'<em>品牌形象品牌形象</em>',
							'</div>',
							'<div class="idex-module-item idex-shadow-box">',
								'<div class="idex-mini-tbar">',
									'<div class="edit idex-icon"></div>',
									'<div class="copy idex-icon"></div>',
									'<div class="del idex-icon"></div>',
								'</div>',
								'<p>750px</p>',
								'<em>品牌形象品牌形象</em>',
							'</div>',
						  '</div>'];
				this.$tabview.html(html.join(''));


				
				var div,
					html=['<div class="x-ui-floatbar-box">',
								ui.getXTypeHTML(this.refresh),
								ui.getXTypeHTML(this.search),
						  '</div>'];
				div=$.createElement(html.join(''));
				this.$owner.$tabbarbox.before(div);

				this.$floatbox=$(div);
				
				var children=this.$floatbox.children();

				this.refresh=ui.getXTypeItem(this.refresh,children[0]);

				this.search=ui.getXTypeItem(this.search,children[1]);
			},
			refresh : {
				xtype : 'button',
				icon : true,
				cls : 'refresh',
				title : "刷新",
				onClick:function(){

				}
			},
			search : {
				xtype:'text',
				icon :'search',
				placeholder : '输入模块名进行检索',
				onRenderAfter : function(){
					this.callPrototypeMethod();
					this.addEventListener('textkeydown',function(event){
						 if(event.keyCode==13){
							this.value=this.$text.val();
							if(this.value){
								this.submit();
							}
						 }
					});
				},
				onIconmousedown : function(event){
					this.submit();
				},
				submit : function(){

				}
			},
			onShowAfter : function(){
				this.$floatbox.show();
			},
			onHideAfter : function(){
				this.$floatbox.hide();
			},
			getList : function(){
				$.cache.get('template_list');
			
			}
		});

		tab.onRender();

		delete tab.onRender;
	};

})();