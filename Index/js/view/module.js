(function(CF,$){
	Idex.Module=function(config){
		CF.merger(this,config);
	};

	Idex.Module.prototype={
		MODULE_TYPE : 't',
		CACHE_KEY : 'template_list',
		ACTION_TYPE : 1,
		COUNT : 0,
		RAW_DATA : [],
		lastActionTime : 0,
		initModule : function(){
			var div=$.createElement('<div class="idex-module-box"></div>');
			this.$tabview.html(div);
			this.$moduleBox=$(div);
			this.initList();
		},
		isActionBusy : function (element){
			var now=$.timestamp();
			if(this.lastActionTime + 2000  > now){
				if(element){
					ui.quicktip.show({
						align : 'tc',
						offset : 'lt',
						cls : 'c1',
						html : '操作太频繁 !',
						time : 3000,
						target :  element
					});
				}
				return true;
			}
			this.lastActionTime=now;
			return false;
		},
		initList : function(){
			var data=$.cache.get(this.CACHE_KEY);
			if(data){
				this.initRawData(JSON.parse(data));
			}else{
				this.query();
			}
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
		saveCache : function(){
			$.cache.put(this.CACHE_KEY,JSON.stringify(this.RAW_DATA),new Date());
		},
		initRawData : function(json){
			this.listJSON=json;
			this.MapJSON={};
			this.RAW_DATA=[];
			for(var i=0,len=json.length;i<len;i++){
				var item=json[i];
				item.index=i;
				this.MapJSON[item.id]=item;
				this.RAW_DATA.push(this.copyItemValue(item));
			}
			this.currentKeyWord='';
			this.renderListByHTML(this.buildListHTMLByJSON(this.listJSON));
		},
		insertRawData : function(index,item){
			item=this.copyItemValue(item);
			this.RAW_DATA.insert(index,item);
			this.initRawData(this.RAW_DATA);
			this.saveCache();
		},
		delRawData : function(index){
			this.RAW_DATA.splice(index,1);
			this.initRawData(this.RAW_DATA);
			this.saveCache();
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
		onCopy : function(item,target){
			if(this.isActionBusy(target)){
				return;
			}
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
		onNew : function(target){
			if(this.isActionBusy(target)){
				return;
			}
			$.ajax({
				url:'/module.s',
				data : 'method=insert&type='+this.ACTION_TYPE,
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
						},1000,this._$owner);
					}
				},
				error : function(){
				},
				complete : function(){
				}
			});
		},
		newItem : function(item){
			item.modified=new Date().formatDateTime();
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

			this.$moduleBox.children('.idex-module-item.blank:first').click({
				$owner : this
			},function(event){
				event.data.$owner.on('new',this);
			});

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
					}else{
						return;
					}
					data.$owner.on(type,data.item,this);
				});
			});
		},
		getBlankItemHTML : function(){
			return ['<div class="idex-module-item idex-shadow-box blank">',
						'<p>空白</p>',
						'<em>点击创建</em>',
					'</div>'].join('');
		},
		buildListHTMLByJSON : function(json,keyword){
			var keyCode='<span class="c1">' + (keyword || '') + '</span>',
				isAdd=false,
				html=[];

			if(!keyword && json.length<this.COUNT){
				var blankHTML=this.getBlankItemHTML();
				if(blankHTML){
					html.push(blankHTML);
				}
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
					title : title,
					last_user_nick : last_user_nick
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
								'<a href="/module/',this.MODULE_TYPE,'/',item.id,'" target="_blank">',
									'<div class="edit idex-icon"></div>',
								'</a>',
								(isAdd ?  '<div class="copy idex-icon"></div>' : '' ), 
								'<div class="del idex-icon"></div>',
							'</div>',
							'<p>',item.width,'px</p>',
							'<em>',item.title,'</em>',
					'</div>'].join('');
		},
		onSearch : function(val){
			var keyword=$.trim(val||''),
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
	};

	var TAB={
		floatbar : [{
			xtype : 'button',
			icon : true,
			cls : 'refresh',
			title : "刷新",
			onClick:function(){
				var tab=this.$owner.currentTab;
				if(tab && tab.refresh){
					tab.refresh();
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
				var tab=this.$owner.currentTab;
				if(tab && tab.search){
					tab.search(this.getValue());
				}
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
				var module=new Idex.Module({
					COUNT : Idex.getVersionLimit('rcount'),
					MODULE_TYPE : 'r',
					CACHE_KEY : 'renovation_list',
					ACTION_TYPE : 3
				});
				
				CF.merger(this,module);

				this.initModule();
			},
			refresh : function(){
				if(this.isActionBusy()){
					return;
				}
				this.query();
			},
			search : function(val){
				this.onSearch(val);
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