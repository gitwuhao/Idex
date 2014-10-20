(function(CF,$){
	var module={};
	CF.merger(module,Idex.view.module,{
		items : [{
			active:true,
			label:'自定义模块',
			onTagClick:function(){
				console.info("onTagClick:"+this.label);
			},
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
			onTagClick:function(){
				console.info("onTagClick:"+this.label);

			},
			onLoad:function(){
				var html=['<div class="idex-module-box">',
					'<div class="idex-module-item idex-shadow-box">',
						'<p>空白</p>',
						'<em>创建装修模块</em>',
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
		}],
		onShow : function(){
			this.$render.show();
		
		},
		onHide : function(){
			this.$render.hide();
			
		}
	});

	Idex.view.module.init=function(){
		Idex.view.module=new ui.tab(module);
	};	

})(CF,jQuery);