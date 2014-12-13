(function(CF,$){
	var TAB={
		items : [{
			label:'自定义模块',
			name : 'module',
			onLoad:function(){
				var html=['<div class="idex-module-box">',
					'<div class="idex-module-item idex-shadow-box">',
						'<div class="idex-mini-tbar">',
							'<div class="del idex-icon"></div>',
						'</div>',
						'<div class="bg idex-icon"></div>',
						'<em>品牌形象品牌形象</em>',
					'</div>',
					'<div class="idex-module-item idex-shadow-box">',
						'<div class="idex-mini-tbar">',
							'<div class="del idex-icon"></div>',
						'</div>',
						'<div class="bg idex-icon"></div>',
						'<em>品牌形象品牌形象</em>',
					'</div>',
					'<div class="idex-module-item idex-shadow-box">',
						'<div class="idex-mini-tbar">',
							'<div class="del idex-icon"></div>',
						'</div>',
						'<div class="bg idex-icon"></div>',
						'<em>品牌形象品牌形象</em>',
					'</div>',
					'<div class="idex-module-item idex-shadow-box">',
						'<div class="idex-mini-tbar">',
							'<div class="del idex-icon"></div>',
						'</div>',
						'<div class="bg idex-icon"></div>',
						'<em>品牌形象品牌形象</em>',
					'</div>',
				  '</div>'];
				this.$tabview.html(html.join(''));
			}
		},{
			label:'装修模块',
			name : 'renovation',
			onLoad:function(){
				var html=['<div class="idex-module-box">',
					'<div class="idex-module-item idex-shadow-box">',
						'<p>空白</p>',
						'<em>点击创建模块</em>',
					'</div>',
					'<div class="idex-module-item idex-shadow-box">',
						'<div class="idex-mini-tbar">',
							'<div class="copy idex-icon"></div>',
							'<div class="del idex-icon"></div>',
						'</div>',
						'<p>750px</p>',
						'<em>淘宝模板</em>',
					'</div>',
					'<div class="idex-module-item idex-shadow-box">',
						'<div class="idex-mini-tbar">',
							'<div class="copy idex-icon"></div>',
							'<div class="del idex-icon"></div>',
						'</div>',
						'<p>790px</p>',
						'<em>天猫模板</em>',
					'</div>',
					'<div class="idex-module-item idex-shadow-box">',
						'<div class="idex-mini-tbar">',
							'<div class="copy idex-icon"></div>',
							'<div class="del idex-icon"></div>',
						'</div>',
						'<p>750px</p>',
						'<em>品牌形象</em>',
					'</div>',
					'<div class="idex-module-item idex-shadow-box">',
						'<div class="idex-mini-tbar">',
							'<div class="copy idex-icon"></div>',
							'<div class="del idex-icon"></div>',
						'</div>',
						'<p>750px</p>',
						'<em>品牌形象品牌形象</em>',
					'</div>',
					'<div class="idex-module-item idex-shadow-box">',
						'<div class="idex-mini-tbar">',
							'<div class="copy idex-icon"></div>',
							'<div class="del idex-icon"></div>',
						'</div>',
						'<p>750px</p>',
						'<em>品牌形象品牌形象</em>',
					'</div>',
				  '</div>'];
				this.$tabview.html(html.join(''));
			}
		}]
	};



	function initTab(render){
		if(TAB._owner_name_==ui.tab._owner_name_){
			return;
		}
		TAB.render=render;
		TAB=new ui.tab(TAB);
	};


	Idex.addEventListener('anchor.module',function(event){
		this.setViewPanel('module');
		initTab(this.activeViewPanel);
		TAB.setCurrentTab(TAB.getTab('module'));
	});



	Idex.addEventListener('anchor.renovation',function(event){
		this.setViewPanel('module');
		initTab(this.activeViewPanel);
		TAB.setCurrentTab(TAB.getTab('renovation'));
	});

})(CF,jQuery);