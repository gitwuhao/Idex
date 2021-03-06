(function(CF,$,Idex){		
var LINK_TARGET = Idex.LINK_TARGET,
	ACTION_TYPE = Idex.TYPE_MAP.DESC,
	list=Idex.view.list;

list.initTabPanel=function(tab){
CF.merger(tab,{
	initTab : function(){
		var html=[
			'<div class="idex-form-box"></div>',
			'<div class="idex-list-box">',
				'<div class="idex-list-view not-result">',
					'空空的列表...',
				'</div>',
				'<div class="idex-status-box"></div>',
			'</div>',
		  ].join('');
		this.$tabview.html(html);

		this.$formbox=this.$tabview.children('.idex-form-box:first');
		this.$listbox=this.$tabview.children('.idex-list-box:first');
		this.$viewbox=this.$listbox.children('.idex-list-view:first');
		this.$statusbox=this.$listbox.children('.idex-status-box:first');
		
		var form=list.getForm();

		delete list.getForm;
		 
		form.render=this.$formbox[0];

		form.$owner=this;

		form.tab=this.$owner;

		form.tabPanel=this;

		this.form=new ui.form(form);

		var div,
			html=['<div class="x-ui-floatbar-box">',
					'<div class="idex-sortbar-box">'
				 ];

		for(var i=0,len=this.sortbar.length;i<len;i++){
			var cls,
				item=this.sortbar[i];
			html.push(	'<div class="idex-sort-button" >',item.label,
							'<div class="idex-icon sort"></div>',
						'</div>');
		}
		html.push(  '</div>',
					'<div class="idex-search-box"></div>',
				  '</div>');
		div=$.createElement(html.join(''));

		this.$owner.$tabbarbox.before(div);
		this.$floatbox=$(div);

		var children=this.$floatbox.children();

		this.initSortBarBox(children[0]);
		this.initSearchText(children[1]);
	},
	onShowAfter : function(){
		this.$floatbox.show();
	},
	onHideAfter : function(){
		this.$floatbox.hide();
	},
	sortbar : [{
		field :'publish_time',
		label :'发布时间'
		//type : 'asc',
		//orderType : 0
	},{
		field :'edit_time',
		label :'编辑时间'
	}],
	sortButtonClick : function(item){
		if(this.activeSortItem){
			this.activeSortItem.$elem.removeClass('desc asc');
		}
		if(item.type=='desc'){
			item.type='asc';
			item.orderType=0;
		}else{
			item.type='desc';
			item.orderType=1;
		}
		item.$elem.addClass(item.type);
		this.activeSortItem=item;
		
		this.form.$orderCol.val(item.field);
		this.form.$orderType.val(item.orderType);

		this.form.submit();

	},
	showSortBar : function(){
		this.$sortbarbox.show();
		if(this.activeSortItem){
			this.form.$orderCol.val(this.activeSortItem.field);
			this.form.$orderType.val(this.activeSortItem.orderType);
		}
	},
	hideSortBar : function(){
		this.$sortbarbox.hide();
		this.form.$orderCol.val('');
		this.form.$orderType.val('');
		if(this.activeSortItem){
			this.activeSortItem.$elem.removeClass('desc asc');
		}
	},
	initSortBarBox : function(sortbarbox){
		this.$sortbarbox=$(sortbarbox);

		var children=this.$sortbarbox.children();
	
		for(var i=0,len=this.sortbar.length;i<len;i++){
			var item = this.sortbar[i];
			item.$elem=$(children[i]);

			item.$elem.click({
				item : item,
				$owner : this
			},function(event){
				var data=event.data;
				data.$owner.sortButtonClick(data.item);
			});
		}
	},
	initSearchText : function(searchbox){
		this.seach.render = searchbox;

		var seach=new ui.form.text(this.seach);

		seach.form=this.form;

		this.seach=seach;
	},
	seach : {
		icon :'search',
		placeholder : '粘贴宝贝链接回车查询',
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

			this.$text.on("paste",{
				me : this
			},function(event){
				var array,
					value=$.getClipboardTextData(event);
				if(!value){
				}else if(value.indexOf('item.taobao.com')>-1 || value.indexOf('detail.tmall.com')>-1){
					array=value.match(/id=(\d{10,13})/i);
					if(array && array.length==2){
						this.value=array[1];
					}
				}else if(event.data.me.REG_NUMIID.test(value)){
					this.value=value;
				}
				return false;
			});
		},
		onIconmousedown : function(event){
			this.submit();
		},
		REG_NUMIID : /^[1234]\d{9,12}$/,
		showQuicktip : function(html){
			ui.quicktip.show({
				align : 'lc',
				offset : 'lt',
				cls : 'list-search-quicktip c1',
				html : html,
				target :  this.$elem[0]
			});
		},
		submit : function(){
			var value=this.value;
			if(!this.REG_NUMIID.test(value)){
				this.showQuicktip('宝贝ID不正确，可直接复制宝贝链接贴入。<div class="shortcuts c2">清空：Shift`+`Backspace</div>'.formatHTML());
				return;
			}
			this.form.query('numIID='+value,this.form.Q_TYPE.GET);
		}
	}
});
tab.initTab();
delete tab.initTab;
};

list.getForm= function(){
return {
	notLabelPadding : true,
	items : [{
		label:'宝贝名称',
		name : 'title',
		maxlength : 10,
		placeholder : '填写宝贝名称'
	},{
		label:'商家编码',
		name : 'outerId',
		maxlength : 50,
		placeholder : '填写商家编码'
	},{
		label:'详情类型',
		xtype:'radio',
		name : 'isDesc',
		items:[{
			label:'全部&nbsp;&nbsp;&nbsp;',
			value : '',
			checked : true
		},{
			label:'默认&nbsp;&nbsp;&nbsp;',
			value:'0'
		},{
			label:'Idex&nbsp;&nbsp;&nbsp;',
			value:'1'
		}]
	},{
		label:'宝贝状态',
		xtype:'radio',
		name : 'status',
		items:[{
			label:'全部&nbsp;&nbsp;&nbsp;',
			value : '',
			checked : true
		},{
			label:'出售中&nbsp;',
			value:'1'
		},{
			label:'仓库中&nbsp;',
			value:'2'
		}]
	},{
		label:'宝贝分类',
		html : '<input type="hidden" name="sellerCids"/><input type="hidden" name="orderCol"/><input type="hidden" name="orderType"/><div class="category-label"><div class="del x-ui-icon"></div><div class="label"></div></div>'
	},{
		cls :'tree-item',
		html : ' '
	}],
	loadTree : function(){
		//http://idex.oilan.com/config.s?type=1
		var key='seller_category_tree',
			data;

		data=$.cache.get(key);
		if(!data){
			$.jsonp({
				url:'/config.s',
				data : 'method=get&type=1',
				$owner : this,
				success : function(json){
					if(!$.cache.isEmpty(json)){
						json=$.cache.buildTreeData(json);
						$.cache.put(key,JSON.stringify(json),new Date());
						this.$owner.createTree(json);
					}
				},
				error : function(){

				}
			});
		}else{
			this.createTree(JSON.parse(data));
		}
	},
	createTree:function(data){
		this.tree=new ui.tree({
			form : this,
			render: $('.tree-item td',this.$elem),
			cls : 'idex-tree-box',
			items: data,
			onNodeClick : function(node,event){
				this.form.on('nodeClick',node);
			}
		});
	},
	onRenderAfter : function(){
		this.$listbox=this.$owner.$listbox;
		this.$viewbox=this.$owner.$viewbox;
		this.$statusbox=this.$owner.$statusbox;

		this.loadTree();

		this.pageSize=$.toNumber(localStorage[this.KEY_PAGE_SIZE]);

		this.$sellerCids=$('[name="sellerCids"]',this.$elem);
		this.$orderCol=$('[name="orderCol"]',this.$elem);
		this.$orderType=$('[name="orderType"]',this.$elem);

		this.$category=$('.category-label',this.$elem);
		this.$categoryLabel=this.$category.children(".label");
		this.$categoryDel=this.$category.children(".del");
		this.$categoryDel.click({
			me : this
		},function(event){
			event.data.me.resetSellerCat();
		});

		this.$listbox.click({
			me : this
		},function(event){
			var type,
				target=event.target,
				parentElement=target.parentElement;
			if($.hasClass(target,'create') || $.hasClass(parentElement,'create')){
				type='create';
			}else if($.hasClass(target,'reset') || $.hasClass(target.parentElement,'reset')){
				type='reset';
			}else{
				return;
			}

			if(type){
				var itemElement=$(target).parentsUntil('.idex-list-item').parent();
				event.data.me.on(type+'Click',itemElement[0]);
			}
		});
	},
	onCreateClick : function(element){
		var data=$.data(element);
		Idex.view.template.select({
			id : data['item-id'],
			element : element,
			callback : function(state){
				var errorMsg,
					$create,
					$content=$(element).children('.idex-item-content');
				$create=$content.children('.create');
				if(state==1){
					var num_iid=this.id,
						html=['<div class="idex-item-buttons">',
								'<a class="x-ui-button publish" href="/view/',ACTION_TYPE,'/',num_iid,'" target="',LINK_TARGET.VIEW,'">',
									'<div class="x-ui-label">',
										'发布',
									'</div>',
								'</a>',
								'<a class="x-ui-button edit" href="/edit/',ACTION_TYPE,'/',num_iid,'" target="',LINK_TARGET.EDIT,'">',
									'<div class="x-ui-label">',
										'编辑',
									'</div>',
								'</a>',
							'</div>'];

					$create.remove();
					$content.append(html.join(''));
				}else if(state==-1){
					errorMsg='创建的Idex详情描述已超出上限，赶紧去升级服务吧!';
				}else{
					errorMsg='创建失败!';
				}

				if(errorMsg){
					ui.quicktip.show({
						align : 'tc',
						offset : 'lt',
						cls : 'c1',
						html : errorMsg,
						time : 5000,
						target :  $create[0]
					});
				}
			}
		});
	},
	onResetClick : function(element){
		CF.info('onResetClick');
	},
	resetSellerCat : function(){
		this.$category.hide();
		this.$sellerCids.val('');
		this.tree.removeActiveNode();
	},
	onNodeClick : function(node){
		this.$category.show();
		this.$categoryLabel.text(node.label);
		var list=[],
			children;

		children=node.children;
		if(children){
			for(var i=0,len=children.length;i<len;i++){
				var n=children[i];
				list.push(n.cid);
			}
		}else{
			list.push(node.cid);
		}
		this.$sellerCids.val(list.join(','));
	},
	query : function (data,type){
		var method;
		if(type==this.Q_TYPE.GET){
			method='get';
		}else{
			method='query';
		}


		if(type!=this.Q_TYPE.LOAD){
			this.page=null;
		}

		if(data){
			data='method='+method+'&'+data;
		}else{
			data='method='+method;
		}
		//获取分页尺寸
		if(!this.pageSize){
			data=data+'&pageSize=1&page=1';
		}else if(!this.page){
			data=data+'&page=1';
		}


		this.$statusbox.empty();

		$.jsonp({
			url:'/item.s',
			data : data,
			$type : type,
			$owner : this,
			success : function(json){
				if(!this.$owner.pageSize){
					this.$owner.pageSize=$.toNumber(localStorage[this.$owner.KEY_PAGE_SIZE]);
					if(!this.$owner.pageSize){
						console.error('pageSize is null...');
					}
				}
				this.$owner.onLoadList(json,this.$type);
			},
			error : function(){
				//this.$owner.$statusbox.append(this.$owner.LOAD_MORE_HTML);
			},
			complete : function(){
				this.$owner.isSubmiting=false;
				this.$owner.getItem('submit').enabled();
			}
		});
	},
	KEY_PAGE_SIZE : 'IDEX_LIST_PAGE_SIZE',
	pageSize : null,
	page : null,
	loadMoreList : function(){
		this.removeAutoLoadListener();
		if(!this.page){
			this.page=2;
		}else{
			this.page++;
		}
		var param=null;
		if(!this.queryParam){
			param='page='+this.page;
		}else{
			param=this.queryParam+'&page='+this.page;
		}
		this.query(param,this.Q_TYPE.LOAD);
		//CF.info('load more');
	},
	Q_TYPE : {
		SUBMIT : 1,
		GET : 2,
		LOAD : 3
	},
	NOT_MORE_HTML : '<div class="idex-not-more-list">没有更多宝贝显示</div>',
	//LOAD_MORE_HTML : '<div class="idex-load-more-list">点击加载更多</div>',
	onLoadList : function(json,type){
		var qType=this.Q_TYPE,
			html;

		if(type==qType.LOAD){
			this.$statusbox.append(this.NOT_MORE_HTML);
		}
		if(!json){

			this.removeAutoLoadListener();

			if(type==qType.LOAD){
				return;
			}else if(type==qType.SUBMIT){
				html='没有找到你要的宝贝...';
				this.tabPanel.seach.showQuicktip('试试这里...');
			}else{
				html='没有找到对应的宝贝...';
			}
									
			this.tabPanel.hideSortBar();

			this.$viewbox.addClass('not-result');
			this.$viewbox.html(html);
			this.$statusbox.empty();
			return;
		}
		html=this.buildHTMLByJSON(json);
		if(type==qType.LOAD){
			this.$viewbox.append(html.join(''));
		}else{
			this.$viewbox.removeClass('not-result');
			this.$viewbox.html(html.join(''));
			//滚动到顶部
			this.$listbox[0].scrollTop=0;
		}

		if(json.length==this.pageSize){
			this.addAutoLoadListener();
			if(type==qType.SUBMIT){
				this.tabPanel.showSortBar();
			}
		}else{
			//this.$statusbox.append(this.NOT_MORE_HTML);
			this.removeAutoLoadListener();
			if(type==qType.SUBMIT || type==qType.GET){
				this.tabPanel.hideSortBar();
			}
		}
		this.$viewbox.children('.idex-list-item[idex-item-id]').each(function(index,elem){
			var $elem=$(elem);
			$.data(elem,'item-id',$elem.attr('idex-item-id'));
			$elem.removeAttr('idex-item-id');
		});
		//CF.info(json);
	},
	buildHTMLByJSON : function(json){
		var html=[];
		$.it(json,function(i,item){
			html.push(
			'<div class="idex-list-item" idex-item-id="',item.num_iid,'">',
				'<div class="idex-item-img"><img src="',item.pic_url,'_150x150.jpg"/></div>',
				'<div class="idex-item-content">',
					'<div class="idex-item-title">',
						'<a href="http://item.taobao.com/item.htm?id=',item.num_iid,'" target="_TB_ITEM">',
							item.title,
						'</a>',
					'</div>');

			if(item.status==3){
				html.push(
					'<div class="idex-item-type">',
						'<div class="invalid">失效</div>',
					'</div>'
				);
			}else if(item.is_desc==0){
				html.push(
					'<div class="x-ui-button create"><div class="x-ui-label">创建</div></div>'
				);
			}else{
				html.push(
					'<div class="idex-item-buttons">',
						'<a class="x-ui-button publish" href="/view/',ACTION_TYPE,'/',item.num_iid,'" target="',LINK_TARGET.VIEW,'">',
							'<div class="x-ui-label">',
								'发布',
							'</div>',
						'</a>',
						'<a class="x-ui-button edit" href="/edit/',ACTION_TYPE,'/',item.num_iid,'" target="',LINK_TARGET.EDIT,'">',
							'<div class="x-ui-label">',
								'编辑',
							'</div>',
						'</a>',
					'</div>'
				);
			}
			
			if(item.edit_time && item.is_desc!=0){
				html.push(
					'<div class="idex-item-detail">',
						'最后编辑时间：',item.edit_time);
				if(item.last_user_nick){
					html.push(
						'<span class="last-user">',item.last_user_nick,'</span>'
						);
				}
				/*
				html.push(
						'&nbsp;&nbsp;&nbsp;&nbsp;<a href="#list" class="reset" title="清空宝贝的Idex详情，选择模板重新创建。">清空详情</a>'
						);
				*/
				if(item.publish_time){
					html.push(
						'<br/>',
						'最后发布时间：',item.publish_time
					);
					if(item.status!=3){
						html.push(
						'<span class="revert"><a href="http://upload.taobao.com/auction/publish/edit.htm?item_num_id=',item.num_iid,'&auto=false" target="_blank">还原</a></span>'
						);
					}
				}
				html.push(
					'</div>'
				);
			}

			html.push(
				'</div>',
			'</div>'
			);
		});

		return html;
	},
	addAutoLoadListener:function(){
		if(this.isAutoLoadListener){
			return;
		}
		this.isAutoLoadListener=true;
		this.$listbox.on('scroll',{
			me : this
		},function(event){
			if(this.scrollTop + this.clientHeight + 100 > this.scrollHeight){
				event.data.me.loadMoreList();
			}
		});
	},
	removeAutoLoadListener:function(){
		delete this.isAutoLoadListener;
		this.$listbox.off('scroll');
	},
	submit : function(){
		if(this.isSubmiting){
			return;
		}
		this.getItem('submit').disabled();
		this.isSubmiting=true;
		var param;
		param=this.getParam(true);
		this.queryParam=param;
		this.query(param,this.Q_TYPE.SUBMIT);
	},
	buttons:[{
		label:'查询',
		name : 'submit',
		onClick:function(){
			this.$owner.submit();
		}
	},{
		label:'重置',
		name : 'reset',
		onClick:function(){
			var form=this.$owner;
			form.getItem('title').setValue('');
			form.getItem('outerId').setValue('');
			form.getItem('isDesc').setValue('');
			form.getItem('status').setValue('');

			//form.$orderCol.val('');
			//form.$orderType.val('');
			form.tabPanel.hideSortBar();
			form.resetSellerCat();
		}
	}]
};
};
})(CF,jQuery,$.Idex);
