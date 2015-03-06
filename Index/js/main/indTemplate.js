(function(CF,$,Idex){
 var indTemplate = {};

Idex.view.indTemplate=indTemplate;


indTemplate.init=function(tab){
	CF.merger(tab,{
		onRender : function(){

			//this.initUI();

			this.initModule();

		},
		initUI : function(){
		
			var div,
				html=['<div class="x-ui-floatbar-box">',
							ui.getXTypeHTML(this.search),
					  '</div>'];
			div=$.createElement(html.join(''));
			this.$owner.$tabbarbox.before(div);

			this.$floatbox=$(div);

			var children=this.$floatbox.children();
 
			this.search.$owner=this;
			this.search=ui.getXTypeItem(this.search,children[1]);
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
				this.$owner.onSearch(this.getValue(),this.$elem[0]);
			}
		},
		onShowAfter : function(){
			if(this.$floatbox){
				this.$floatbox.show();
			}
		},
		onHideAfter : function(){
			if(this.$floatbox){
				this.$floatbox.hide();
			}
		},
		initModule : function(){
			
			
			this.$tabview.html('<div class="idex-ind-template-list-box idex-module-box"></div>');

			this.$listbox=this.$tabview.children('.idex-ind-template-list-box');

			this.loadData();
		},
		CACHE_KEY : 'IDEX_IND_TEMPLATE_DATA',
		loadData : function(){
			var data=$.LS[this.CACHE_KEY];
			data=$.cache.parseJSON(data);
			if(!data){
				var me=this,
					jsonpName=$.getJSONPName();

				$.cache.put('callback',jsonpName,new Date());
				
				window[jsonpName]=function(data){
					$.LS[me.CACHE_KEY]=JSON.stringify(data);
					me.initListBox(data);
					delete window[jsonpName];
				};

				$.jsonp({
					url:'/template/data.js'
				});
			}else{
				this.initListBox(data);
			}
		},
		initListBox : function(data){
			var html=[];
			for(var i=0,len=data.length;i<len;i++){
				var item=data[i],
					list=item.list||[];
				html.push('<div class="idex-ind-template-list-group">',
							'<div class="idex-ind-template-title-box">',
								'<div class="idex-bg-line"></div>',
								'<div class="idex-title">',item.title,'</div>',
							'</div>',
							'<div class="idex-ind-template-item-box">');
				for(var n=0,lLen=list.length;n<lLen;n++){
					var mitem=list[n];
					html.push(	'<div class="idex-module-item idex-shadow-box">',
									'<div class="idex-mini-tbar">',
										'<a href="/preview/',mitem.id,'" target="_IDEX_VIEW" title="预览">',
											'<div class="view idex-icon"></div>',
										'</a>',
										'<div class="copy idex-icon" title="复制"></div>',
									'</div>',
									'<p>',mitem.width,'px</p>',
									'<em>',mitem.title,'</em>',
								'</div>');
				}
				html.push(	'</div>',
						'</div>');
			}

			this.$listbox.html(html.join(''));
		
		}
	});

	tab.onRender();

	delete tab.onRender;
};

})(CF,jQuery,$.Idex);