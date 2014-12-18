(function(CF,$){
	var TAB={
		floatbar : [{
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
				var div=$.createElement('<div class="idex-icon refresh"></div>');
				this.$elem.before(div);
				this.$refresh=$(div);
			},
			onIconmousedown : function(event){
				this.submit();
			},
			submit : function(){

			}
		}],
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
					'<div class="idex-module-item idex-shadow-box blank">',
						'<p>空白</p>',
						'<em>点击创建</em>',
					'</div>',
					'<div class="idex-module-item idex-shadow-box">',
						'<div class="datetime">2014-09-15&nbsp;&nbsp;张三</div>',
						'<div class="idex-mini-tbar">',
							'<div class="edit idex-icon"></div>',
							'<div class="copy idex-icon"></div>',
							'<div class="del idex-icon"></div>',
						'</div>',
						'<p>750px</p>',
						'<em>淘宝模板</em>',
					'</div>',
					'<div class="idex-module-item idex-shadow-box">',
						'<div class="datetime">2014-09-15&nbsp;&nbsp;张三</div>',
						'<div class="idex-mini-tbar">',
							'<div class="edit idex-icon"></div>',
							'<div class="copy idex-icon"></div>',
							'<div class="del idex-icon"></div>',
						'</div>',
						'<p>790px</p>',
						'<em>天猫模板</em>',
					'</div>',
					'<div class="idex-module-item idex-shadow-box">',
						'<div class="datetime">昨天14:16&nbsp;&nbsp;张三</div>',
						'<div class="idex-mini-tbar">',
							'<div class="edit idex-icon"></div>',
							'<div class="copy idex-icon"></div>',
							'<div class="del idex-icon"></div>',
						'</div>',
						'<p>750px</p>',
						'<em>品牌形象</em>',
					'</div>',
					'<div class="idex-module-item idex-shadow-box">',
						'<div class="datetime">14:16&nbsp;&nbsp;张三</div>',
						'<div class="idex-mini-tbar">',
							'<div class="edit idex-icon"></div>',
							'<div class="copy idex-icon"></div>',
							'<div class="del idex-icon"></div>',
						'</div>',
						'<p>750px</p>',
						'<em>品牌形象品牌形象</em>',
					'</div>',
					'<div class="idex-module-item idex-shadow-box">',
						'<div class="datetime">前天14:16&nbsp;&nbsp;张三</div>',
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