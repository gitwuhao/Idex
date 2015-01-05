(function(CF,$){

var CACHE_KEY = {
	PIC_TREE : 'pic_category_tree'
};

$.push({
_name_ : 'SelectPicture',
initModule : function(){
	this.logger(this);

	this.app.addEventListener('readyafter',function(event){
		this.SelectPicture.on('readyAfter');
	});
},
onReadyAfter : function(){
	var data=this.app.ViewPanel.data;
	this.pictureTitlePrefix='idex_'+data.type+'_'+data.id+'_';
	console.info(this.pictureTitlePrefix);
},
show : function(){
	var me=this;
	if(this.win){
		return;
	}
	this.win=new ui.window(this.getWinConfig());
	this.win.$owner = this;
	this.win.show();
},
onSelect : function(img){
	var src=img.src.replace(this.PIC_SIZING,'');
	console.info('select:' + src);
},
PIC_SIZING : '_150x150.jpg',
getTreeData : function(){
	return $.cache.get(CACHE_KEY.PIC_TREE);
},
saveTreeData : function(json){
	if(!json){
		$.cache.remove(CACHE_KEY.PIC_TREE);
		return;
	}
	$.cache.put(CACHE_KEY.PIC_TREE,JSON.stringify(json));
},
loadTreeData : function(callback){
	var treeData=this.getTreeData();
	if(treeData){
		callback(JSON.parse(treeData));
		return;
	}
	$.ajax({
		url:'/picture.s',
		data : 'method=getCat',
		_$owner : this,
		_$callback : callback,
		type : 'POST',
		dataType : 'jsonp',
		jsonpCallback : $.getJSONPName(),
		success : function(json){
			if(json && json.length>0){
				json=$.cache.buildTreeData(json);
				if(json && json.length>0){
					this._$owner.saveTreeData(json);
				}
				this._$callback(json);
			}else if(json.errorMsg){
				console.error('loadTreeData :'+json.errorMsg);
				this._$callback();
			}
		},
		error : function(){

		}
	});
},
loadAutoMatchList : function(cid,callback){
	$.ajax({
		url:'/picture.s',
		data : 'method=query&pageSize=100&cid='+cid,
		type : 'POST',
		dataType : 'jsonp',
		jsonpCallback : $.getJSONPName(),
		_callback : callback,
		success : function(json){
			this._callback.execute(json);
		},
		error : function(){
			this._callback.execute();
		}
	});
},
close:function(){
	this.logger(this);
	this.win.remove();
	delete this.win;
},
getWinConfig : function(){
	return {
		title : '选择图片',
		cls : 'idex-select-pic-win x-ui-scrollbar',
		item : {
			xtype:'tab',
			items : [this.getPicListConfig(),{
				label: '上传图片',
				name : 'upload',
				onBindEvent:function(){
					this.$tag.bindHover();
					//<a href="http://tadget.taobao.com/redaction/manager.htm" target="_IDEX_TB_PIC"></a>
				}
			}]
		},
		onCloseAfter : function(){
			this.$owner.close();
		}
	};
},
getPicListConfig : function(){
	return {
		label: '图片库',
		name : 'picList',
		html : ['<div class="idex-pic-tree uns"></div>',
				'<div class="idex-pic-list uns"></div>',
				'<div class="idex-pic-match-list uns">',
					'<div class="idex-pic-item">',
						'<img/>',
						'<div class="pic-title">0x0</div>',
					'</div>',
				'</div>'].join(''),
		onLoad:function(){
			var div,
				html=['<div class="x-ui-floatbar-box uns">',
						'<div class="idex-pic-left-box">',
						'</div>',
						'<div class="idex-pic-right-box">',
						'</div>',
						'<div class="idex-pic-match-status-box">',
							'当前分类：<em class="cat-l cB">最近上传</em>',
							'<span class="status-l">正在匹配',
								'<em class="s1">.</em>',
								'<em class="s2">.</em>',
								'<em class="s3">.</em>',
							'</span>',
							'<span class="progress-l">正在检索：',
								'<em class="num">1</em>&nbsp;/&nbsp;',
								'<em class="count cB">100</em>',
							'</span>',
							'<span class="match-l">已匹配：',
								'<em class="num">39</em>&nbsp;/&nbsp;',
								'<em class="count cB">49</em>',
							'</span>',
						'</div>',
					  '</div>'];


			div=$.createElement(html.join(''));

			this.$owner.$tabbarbox.before(div);

			this.$floatbar=$(div);
			var children=this.$floatbar.children();
			this.$picLeftBox=$(children[0]);
			this.$picRightBox=$(children[1]);
			this.$picMatchStatusBox=$(children[2]);

			children=this.$tabview.children();
			this.$picTree=$(children[0]);
			this.$picList=$(children[1]);
			this.$picMatchList=$(children[2]);

			this.$context = this.$owner.$owner.$owner;

			this.initUI();
			this.initTree();
		},
		initUI : function(){
			var button=this.refreshTreeButton;
			button.render = this.$picLeftBox[0];
			button.$owner=this;
			this.refreshTreeButton=new ui.button(button);

			button=this.autoMatchButton;
			button.render = this.$picLeftBox[0];
			button.$owner=this;
			button.$context=this.$context;
			this.autoMatchButton=new ui.button(button);

			button=this.cancelMatchButton;
			button.render = this.$picMatchStatusBox[0];
			button.$owner=this;
			button.$context=this.$context;
			this.cancelMatchButton=new ui.button(button);
		},
		initTree : function(){
			var me=this;
			this.$context.loadTreeData(function(json){
				if(!json){
					me.$pictureTree.html('加载失败...');
				}else{
					me.createTree(json);
				}
			});
		},
		cancelMatchButton :{
			xtype : 'button',
			cls : 'cancel-match',
			label : '取消',
			onClick:function(){

			}
		},
		autoMatchButton :{
			xtype : 'button',
			icon : 'auto-match',
			label : '自动匹配',
			onClick:function(){
				this.$owner.loadAutoMatchList();
			}
		},
		refreshTreeButton :{
			xtype : 'button',
			icon : 'refresh',
			label : '刷新分类',
			onClick:function(){
				this.$owner.refreshTree();
			}
		},
		loadAutoMatchList:function(){
			this.$context.loadAutoMatchList(this.currentCID,CF.getCallback(this.buildMatchPicList,this));
		},
		buildMatchPicList : function(json){
			if(json && json.length>0){

			}
		},
		refreshTree : function(){
			if(this.tree && this.tree.remove){
				this.tree.remove();
			}
			this.autoMatchButton.$elem.hide();
			this.$context.saveTreeData();
			this.$picTree.empty();
			this.initTree();
		},
		onShowAfter : function(){
			this.$floatbar.show();
		},
		onHideAfter : function(){
			this.$floatbar.hide();
		},
		isInitTree : true,
		createTree : function(json){
			if(json && json.insert){
				json.insert(0,{label : '<span class="cB">最近上传</span>'});
			}
			this.tree=new ui.tree({
				$owner : this,
				render: this.$picTree,
				cls : 'idex-tree-box none-icon',
				items : json,
				onNodeClick : function(node,event){
					this.$owner.on('nodeClick',node);
				}
			});

			if(this.isInitTree){
				$.setTimeout(function(){
					this.tree.items[0].$node.click();
				},100,this);
			}
			delete this.isInitTree;
		},
		onNodeClick : function(node){

			this.autoMatchButton.$elem.hide();

			this.currentCID=node.cid  || '';
			this.currentPageNo=1;

			this.loadPicList({
				cid : this.currentCID
			});
		},
		PAGE_SIZE : 12,
		loadPicList : function(paramObject){
			if(this.isBuilding){
				return;
			}
			this.isBuilding=true;
			this.removePageToolBar();

			ui.popu.createInnerLoadingAnimation({
				$elem : this.$picList,
				css : {
					'height': '200px',
					'width': '400px',
					'margin': '100px auto',
					'overflow': 'hidden'
				}
			});

			var args='method=query&pageSize='+this.PAGE_SIZE;

			if(paramObject){
				args=args +'&'+$.param(paramObject);
			}

			$.ajax({
				url:'/picture.s',
				data : args,
				type : 'POST',
				dataType : 'jsonp',
				jsonpCallback : $.getJSONPName(),
				$owner : this,
				success : function(json){
					$.setTimeout(function(_json){
						this.buildPicList(_json);
					},500,this.$owner,[json]);
				},
				error : function(){
					this.$owner.buildPicList(-1);
				}
			});
		},
		buildPicList : function(json){
			var html,
				errorMsg;
			if(json && json.total>0){
				html=[];
				var result=json.result;
				for(var i=0,len=result.length;i<len;i++){
					var item=result[i];
					html.push('<div class="idex-pic-item" title="',item.title,'">',
								'<img src="',item.path,this.$context.PIC_SIZING,'"/>',
								'<div class="pic-title">',item.pixel,'</div>',
								'<div class="select-title">选择</div>',
							  '</div>');
				}
				html=html.join('');
				this.buildPageToolBar(json.total);
			}else if(json==-1){
				errorMsg='加载失败...';
			}else if(json && json.errorMsg){
				console.error('buildPicList :'+json.errorMsg);
				errorMsg='加载失败【'+json.errorMsg+'】';
			}else{
				errorMsg='没有找到图片...';
			}
			if(errorMsg){
				html='<div class="error-msg">'+errorMsg+'</div>';
			}

			this.$picList.html(html);

			if(json && json.total>0){
				this.bindPicItemEvent();
				this.autoMatchButton.$elem.show();
			}
			this.isBuilding=false;
		},
		bindPicItemEvent : function(){
			this.$picList.children('.idex-pic-item').click({
				$context : this.$context
			},function(event){
				event.data.$context.onSelect($(this).children('img')[0]);
			});
		},
		buildPageToolBar : function(total){
			this.getPageToolBarHTML({
				pageNo : this.currentPageNo,
				pageSize : this.PAGE_SIZE,
				total : total
			});
		},
		/*
		{
			pageNo : pageNo,
			pageSize : pageSize,
			total : total
		}
		*/
		getPageToolBarHTML : function(config){

			var total=parseInt(config.total),
				css_label='idex-page-label',
				css_button='idex-page-button',
				startPageNo,
				endPageNo,
				pageCount,
				pageSize=parseInt(config.pageSize),
				pageNo=parseInt(config.pageNo),
				html;

			pageCount=Math.floor(total/pageSize) + ((total % pageSize) >0 ?  1 : 0);

			if(pageCount==1){
				return;
			}

			html=['<div class="idex-page-toolbar">'];

			if(!pageNo || pageNo==1){
				html.push('<div class="',css_label,'">上一页</div>');
			}else{
				html.push('<div class="',css_button,' prev">上一页</div>');
			}

			if(1 < pageNo-2){
				startPageNo=pageNo-2;
			}else{
				startPageNo=pageNo;
			}

			if(startPageNo>=2){
				html.push('<div class="',css_button,' num">1</div>');
			}

			if(startPageNo>3){
				html.push('<div class="more">...</div>');
			}else if(startPageNo==3){
				html.push('<div class="',css_button,' num">2</div>');
			}

			if(pageCount > (pageNo+2)){
				endPageNo=pageNo+2;
				if(endPageNo<5){
					endPageNo=5;
				}
			}else{
				endPageNo=pageCount;
			}

			for(var i=startPageNo;i<=endPageNo;i++){
				var isActive=false;
				if(i==pageNo){
					isActive=true;
				}
				html.push('<div class="',css_button,' num',(isActive ? ' active' : ''),'">',i,'</div>');
			}

			if(pageCount == endPageNo+1){
				html.push('<div class="',css_button,' num">',pageCount,'</div>');
			}else if(pageCount > endPageNo){
				html.push('<div class="more">...</div>');
			}

			if(pageCount==pageNo){
				html.push('<div class="',css_label,'">下一页</div>');
			}else{
				html.push('<div class="',css_button,' next">下一页</div>');
			}
			html.push('</div>');

			this.$picRightBox.html(html.join(''));
			this.bindPageToolBarEvent();
		},
		bindPageToolBarEvent : function(){
			var $toolbar=this.$picRightBox.children('.idex-page-toolbar:first');
			$toolbar.children('.idex-page-button').click({
				$owner : this
			},function(event){
				var $owner=event.data.$owner,
					pageNo;
				if($.hasClass(this,'prev')){
					pageNo=parseInt($owner.currentPageNo)-1;
				}else if($.hasClass(this,'num')){
					pageNo=this.innerText;
					if(pageNo==$owner.currentPageNo){
						return;
					}
				}else if($.hasClass(this,'next')){
					pageNo=parseInt($owner.currentPageNo)+1;
				}
				$owner.currentPageNo=pageNo;
				$owner.loadPicList({
					cid : $owner.currentCID,
					pageNo : pageNo
				});
			});
		},
		removePageToolBar : function(){
			this.$picRightBox.empty();
		}
	};
}
});
})(CF,jQuery);