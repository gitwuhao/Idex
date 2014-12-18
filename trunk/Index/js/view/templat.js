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
			},
			onHideAfter : function(){
				console.info(this,'hide after...');
			},
			onShowAfter : function(){
				console.info(this,'show after...');
			}
		});

		tab.onRender();

		delete tab.onRender;
	};

})();