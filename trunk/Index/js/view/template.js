(function(){
	var count;

	Idex.view.template.init=function(tab){
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

				count=Idex.getVersionLimit('tcount');

				
				
				div=$.createElement('<div class="idex-module-box"></div>');
				this.$tabview.html(div);

				this.$moduleBox=$(div);

				this.initList();
			},
			refresh : {
				xtype : 'button',
				icon : true,
				cls : 'refresh',
				title : "刷新",
				onClick:function(){
					this.$owner.query();
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
					this.$owner.onSearch();
				}
			},
			onShowAfter : function(){
				this.$floatbox.show();
			},
			onHideAfter : function(){
				this.$floatbox.hide();
			},
			CACHE_KEY : 'template_list',
			initList : function(){
				var data=$.cache.get(this.CACHE_KEY);
				if(data){
					this.onLoad(JSON.parse(data));
				}else{
					this.query();
				}
			},
			query : function(){
				$.ajax({
					url:'/module.s',
					data : 'method=query&type=1',
					$owner : this,
					type : 'POST',
					dataType : 'jsonp',
					success : function(json){
						$.cache.put(this.$owner.CACHE_KEY,JSON.stringify(json));
						this.$owner.onLoad(json);
					},
					error : function(){
					},
					complete : function(){
					}
				});
			},
			onLoad : function(json){
				this.listJSON=json;
				this.currentKeyWord='';
				this.$moduleBox.html(this.buildListHTMLByJSON(json));
			},
			buildListHTMLByJSON : function(json,keyword){
				var keyCode='<span class="c1">' + (keyword || '') + '</span>',
					html=[];

				if(json.length<count){
					html.push('<div class="idex-module-item idex-shadow-box blank">',
								'<p>空白</p>',
								'<em>点击创建</em>',
							   '</div>'
					);
				}
				
				for(var i=0,len=json.length;i<len;i++){
					var date,
						item=json[i],
						last_user_nick,
						title;

					last_user_nick=item.last_user_nick||'';
					title=item.title||'';

					if(keyword){
						var isNot=true;
						if(title.indexOf(keyword)>-1){
							title=title.replaceAll(keyword,keyCode);
							isNot=false;
						}

						if(last_user_nick.indexOf(keyword)>-1){
							last_user_nick=last_user_nick.replaceAll(keyword,keyCode);
							isNot=false;
						}
						if(isNot){
							continue;
						}
					}
					if(item.modified){
						date=new Date(Date.parse(item.modified)).stringify();
					}else{
						date='';
					}
					html.push(
							'<div class="idex-module-item idex-shadow-box">',
								'<div class="datetime">',date,'&nbsp;&nbsp;',last_user_nick,'</div>',
								'<div class="idex-mini-tbar" data-id="',item.id,'">',
									'<div class="edit idex-icon"></div>',
									'<div class="copy idex-icon"></div>',
									'<div class="del idex-icon"></div>',
								'</div>',
								'<p>',item.width,'px</p>',
								'<em>',title,'</em>',
							'</div>'
					);
				}

				
				return html.join('');
			},
			onSearch : function(){
				var keyword=$.trim(this.search.getValue()||''),
					html;
				if(this.currentKeyWord==keyword){
					return;
				}
				html=this.buildListHTMLByJSON(this.listJSON,keyword);
				if(!html){
					html=this.buildListHTMLByJSON(this.listJSON);
				}
				this.$moduleBox.html(html);
				
				this.currentKeyWord=keyword;
			}
		});

		tab.onRender();

		delete tab.onRender;
	};

})();