(function(CF,$,Idex){
var LINK_TARGET = Idex.LINK_TARGET;

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
	isActionBusy : function (target){
		var now=$.timestamp();
		if(this.lastActionTime + 2000  > now){
			if(target){
				ui.quicktip.show({
					align : 'tc',
					offset : 'lt',
					cls : 'c1',
					html : '操作太频繁 !',
					time : 3000,
					target :  target
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
		this.rerenderList();
	},
	rerenderList : function(){
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
		if(this.currentKeyWord){
			this.rerenderList();
			return;
		}
		$.jsonp({
			url:'/module.s',
			data : 'method=query&_t=' + this.ACTION_TYPE,
			$owner : this,
			success : function(json){
				if(json && json.length>0){
					this.$owner.initRawData(json||[]);
					this.$owner.saveCache();
				}else{
					this.$owner.$moduleBox.html('<div class="error-msg">空空的...</div>');
				}
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
		$.jsonp({
			url:'/module.s',
			data : 'method=copy&id='+item.id+'&_t='+this.ACTION_TYPE,
			$owner : this,
			item : item,
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
		$.jsonp({
			url:'/module.s',
			data : 'method=insert&_t='+this.ACTION_TYPE,
			_$owner : this,
			_target : target,
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
		$.jsonp({
			url:'/module.s',
			data : 'method=delete&id='+item.id+'&_t='+this.ACTION_TYPE,
			$owner : this,
			item : item,
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
				date=new Date(Date.parseStr(item.modified)).stringify();
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
		var date,
			html;
		if(item.modified){
			date=new Date(Date.parseStr(item.modified)).stringify();
		}else{
			date='';
		}

		html=['<div class="idex-module-item idex-shadow-box">'];
		html.push('<div class="datetime">',date,
					'<span>&nbsp;&nbsp;',
						item.last_user_nick,
					'</span>',	
				  '</div>');


		html.push('<div class="idex-mini-tbar" data-id="',item.id,'">');
		
		if(this.isView){
			html.push(
					'<a href="/view/',this.ACTION_TYPE,'/',item.id,'" target="',LINK_TARGET.VIEW,'" title="预览">',
						'<div class="view idex-icon"></div>',
					'</a>'
					 );
		}

		html.push(
					'<a href="/edit/',this.ACTION_TYPE,'/',item.id,'" target="',LINK_TARGET.EDIT,'" title="编辑">',
						'<div class="edit idex-icon"></div>',
					'</a>'
				 );
		if(isAdd){
			html.push('<div class="copy idex-icon" title="复制"></div>');
		}
		
		html.push(
							'<div class="del idex-icon"></div>',
						'</div>',
						'<p>',item.width,'px</p>',
						'<em>',item.title,'</em>',
				'</div>');
		
		return html.join('');
	},
	onSearch : function(val,target){
		var keyword=$.trim(val||''),
			html;
		if(this.currentKeyWord==keyword || this.listJSON.length==0){
			return;
		}
		html=this.buildListHTMLByJSON(this.listJSON,keyword);
		if(html){
			this.renderListByHTML(html);
			this.currentKeyWord=keyword;
			return;
		}

		if(target){
			ui.quicktip.show({
				align : 'lc',
				offset : 'lt',
				cls : 'c1',
				html : '没有找到你要的模块 !',
				time : 3000,
				target :  target
			});
			this.rerenderList();
		}
	},
	onShowBefore : function(){
		if(this.search){
			this.search.setValue('');
		}
		/*
		if(this.currentKeyWord){
			this.rerenderList();
		}
		*/
	}
};

})(CF,jQuery,$.Idex);
