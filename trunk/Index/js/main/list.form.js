(function(CF,$,Idex){
Idex.view.list.getForm= function(){
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
			label:'描述类型',
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
						json=$.cache.buildTreeData(json);
						$.cache.put(key,JSON.stringify(json),new Date());
						this.$owner.createTree(json);
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
		KEY_PAGE_SIZE : 'idex_list_page_size',
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
			//console.info('load more');
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
			//console.info(json);
		},
		buildHTMLByJSON : function(json){
			var html=[];
			$.it(json,function(i,item){
				html.push(
				'<div class="idex-list-item">',
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
							'<div class="x-ui-button publish"><div class="x-ui-label">发布</div></div>',
							'<div class="x-ui-button edit"><div class="x-ui-label">编辑</div></div>',
						'</div>'
					);
				}

				if(item.edit_time){
					html.push(
						'<div class="idex-item-detail">',
							'最后编辑时间：',item.edit_time);
					if(item.last_user_nick){
						html.push(
							'<span class="last-user">',item.last_user_nick,'</span>'
							);
					}
					if(item.publish_time){
						html.push(
							'<br/>',
							'最后发布时间：',item.publish_time
						);
						if(item.status!=3){
							html.push(
							'<span class="revert"><a href="#list">还原</a></span>'
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
	}
};
})(CF,jQuery,Idex);
