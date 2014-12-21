(function(){
	var count,
		RAW_DATA;
	
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
			ACTION_TYPE : 1,
			initList : function(){
				var data=$.cache.get(this.CACHE_KEY);
				if(data){
					this.initRawData(JSON.parse(data));
				}else{
					this.query();
				}
			},
			query : function(){
				$.ajax({
					url:'/module.s',
					data : 'method=query&type=' + this.ACTION_TYPE,
					$owner : this,
					type : 'POST',
					dataType : 'jsonp',
					success : function(json){
						this.$owner.initRawData(json||[]);
						this.$owner.saveCache();
					},
					error : function(){
					},
					complete : function(){
					}
				});
			},
			copyItemValue : function(item){
				return {
					id : item.id,
					width : item.width,
					title : item.title,
					modified : item.modified || '',
					last_user_nick : item.last_user_nick || ''
				};
			},
			insertRawData : function(index,item){
				/*
				var item=RAW_DATA[index];
				if(!item){
					return;
				}
				*/
				item=this.copyItemValue(item);
				RAW_DATA.insert(index,item);
				this.initRawData(RAW_DATA);
				this.saveCache();
			},
			delRawData : function(index){
				RAW_DATA.splice(index,1);
				this.initRawData(RAW_DATA);
				this.saveCache();
			},
			saveCache : function(){
				$.cache.put(this.CACHE_KEY,JSON.stringify(RAW_DATA),new Date());
			},
			initRawData : function(json){
				this.listJSON=json;
				this.MapJSON={};
				RAW_DATA=[];
				for(var i=0,len=json.length;i<len;i++){
					var item=json[i];
					item.index=i;
					this.MapJSON[item.id]=item;
					RAW_DATA.push(this.copyItemValue(item));
				}
				this.currentKeyWord='';
				this.renderListByHTML(this.buildListHTMLByJSON(this.listJSON));
			},
			onEdit : function(item,target){
				console.info('on edit['+item.id+']');
			},
			onCopy : function(item,target){
				$.ajax({
					url:'/module.s',
					data : 'method=copy&id='+item.id+'&type='+this.ACTION_TYPE,
					$owner : this,
					item : item,
					type : 'POST',
					dataType : 'jsonp',
					success : function(json){
						if(json && json.id>0){
							this.$owner.copyItem(this.item,json);
						}
					},
					error : function(){
					},
					complete : function(){
					}
				});
			},
			copyItem : function(item,copy){
				copy.title=item.title;
				copy.width=item.width;
				copy.modified=new Date().formatDateTime();
				this.insertRawData(item.index,copy);
				copy = this.MapJSON[copy.id];
				if(copy.$elem){
					copy.$elem.addClass('new');
					$.setTimeout(function(){
						this.$elem.removeClass('new');
					},1000,copy);
				}
			},
			onNew : function(item,target){
				$.ajax({
					url:'/module.s',
					data : 'method=insert&id='+item.id+'&type='+this.ACTION_TYPE,
					_$owner : this,
					_target : target,
					type : 'POST',
					dataType : 'jsonp',
					success : function(json){
						if(json && json.id>0){
							this._$owner.newItem(json);
						}else{
							ui.quicktip.show({
								align : 'tc',
								offset : 'lt',
								cls : 'c3',
								html : '创建失败',
								time : 1001,
								target :  this._target
							});
							$.setTimeout(function(){
								this.query();
							},1000,this._$owner)
						}
					},
					error : function(){
					},
					complete : function(){
					}
				});
			},
			newItem : function(item){
				this.insertRawData(0,item);
				item = this.MapJSON[item.id];
				if(item.$elem){
					item.$elem.addClass('new');
					$.setTimeout(function(){
						this.$elem.removeClass('new');
					},1000,item);
				}
			},
			onDel : function(item,target){
				item.$elem.addClass('del');

				ui.quicktip.confirm({
					$owner : this,
					item : item,
					align : 'tc',
					offset : 'lt',
					cls : 'del c1',
					target :  target,
					html : '确认删除 ?',
					yes : function(){
						this.$owner.confirmDel(this.item);
					},
					no : function(){
						this.item.$elem.removeClass('del');
					}
				});
			},
			confirmDel : function(item){
				$.ajax({
					url:'/module.s',
					data : 'method=delete&id='+item.id+'&type='+this.ACTION_TYPE,
					$owner : this,
					item : item,
					type : 'POST',
					dataType : 'jsonp',
					success : function(data){
						if(data==1){
							this.$owner.delItem(this.item);
						}
					},
					error : function(){
					},
					complete : function(){
					}
				});
			},
			delItem : function(item){
				item.$elem.addClass('del-ani');
				$.setTimeout(function(_item_){
					_item_.$elem.removeClass('del-ani');
					this.delRawData(_item_.index);
				},1000,this,[item]);
			},
			renderListByHTML : function(html){
				this.$moduleBox.html(html);

				var listMiniToolBar=$('.idex-mini-tbar',this.$moduleBox),
					MapJSON=this.MapJSON,
					me=this;
				listMiniToolBar.each(function(i,element){
					var item,
						id=$.attr(element,'data-id');

					$.removeAttr(element,'data-id');

					item=MapJSON[id];
					item.$elem=$(element.parentElement);
					
					$(element).children().click({
						item : item,
						$owner : me
					},function(event){
						var data=event.data,
							cls=this.className,
							type;
						if(cls.indexOf('copy')>-1){
							type='copy';
						}else if(cls.indexOf('edit')>-1){
							type='edit';
						}else if(cls.indexOf('del')>-1){
							type='del';
						}
						data.$owner.on(type,data.item,this);
					});
				});
			},
			buildListHTMLByJSON : function(json,keyword){
				var keyCode='<span class="c1">' + (keyword || '') + '</span>',
					isAdd=false,
					html=[];

				if(!keyword && json.length<count){
					html.push('<div class="idex-module-item idex-shadow-box blank">',
								'<p>空白</p>',
								'<em>点击创建</em>',
							   '</div>'
					);
					isAdd=true;
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
					var copyItem=CF.merger({},item,{
						title : title
					});
					html.push(this.getItemHTML(copyItem,isAdd));
				}
				return html.join('');
			},
			getItemHTML : function(item,isAdd){
				var date;
				if(item.modified){
					date=new Date(Date.parse(item.modified)).stringify();
				}else{
					date='';
				}

				return ['<div class="idex-module-item idex-shadow-box">',
								'<div class="datetime">',date,'&nbsp;&nbsp;',item.last_user_nick,'</div>',
								'<div class="idex-mini-tbar" data-id="',item.id,'">',
									'<div class="edit idex-icon"></div>',
									(isAdd ?  '<div class="copy idex-icon"></div>' : '' ), 
									'<div class="del idex-icon"></div>',
								'</div>',
								'<p>',item.width,'px</p>',
								'<em>',item.title,'</em>',
						'</div>'].join('');
			},
			onSearch : function(){
				var keyword=$.trim(this.search.getValue()||''),
					html;
				if(this.currentKeyWord==keyword || this.listJSON.length==0){
					return;
				}
				html=this.buildListHTMLByJSON(this.listJSON,keyword);
				if(!html){
					html=this.buildListHTMLByJSON(this.listJSON);
				}
				this.renderListByHTML(html);

				this.currentKeyWord=keyword;
			}
		});

		tab.onRender();

		delete tab.onRender;
	};

})();