(function(CF,$,Idex){
 var indTemplate = {};

Idex.view.indTemplate=indTemplate;

var listIndTemplate=[{
	title : '时尚服饰',
	list : [{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	},{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	},{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	},{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	}]
},{
	title : '鞋类箱包',
	list : [{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	},{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	},{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	},{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	}]
},{
	title : '家居日用',
	list : [{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	},{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	},{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	},{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	}]
},{
	title : '母婴用品',
	list : [{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	},{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	},{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	},{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	}]
},{
	title : '化妆美容',
	list : [{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	},{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	},{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	},{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	}]
},{
	title : '数码家电',
	list : [{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	},{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	},{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	},{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	}]
},{
	title : '食品酒水',
	list : [{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	},{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	},{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	},{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	}]
},{
	title : '珠宝配饰',
	list : [{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	},{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	},{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	},{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	}]
},{
	title : '其它',
	list : [{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	},{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	},{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	},{
		id:"101010806",
		width:"750",
		title:"未命名模板"
	}]
}];

indTemplate.init=function(tab){
	CF.merger(tab,{
		onRender : function(){

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


			
			this.initModule();

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
			this.$floatbox.show();
		},
		onHideAfter : function(){
			this.$floatbox.hide();
		},
		initModule : function(){
			
			
			this.$tabview.html('<div class="idex-ind-template-list-box idex-module-box"></div>');

			this.$listbox=this.$tabview.children('.idex-ind-template-list-box');

			this.initListBox(listIndTemplate);
		},
		initListBox : function(data){
			var html=['<div class="idex-ind-template-list-group">',
						'<div class="idex-ind-template-title-box">',
							'<div class="idex-bg-line"></div>',
							'<div class="idex-title">服装</div>',
						'</div>',
						'<div class="idex-ind-template-item-box">',
							'<div class="idex-module-item idex-shadow-box">',
								'<div class="idex-mini-tbar">',
									'<a href="/view/1/101010744" target="_IDEX_VIEW" title="预览">',
										'<div class="view idex-icon"></div>',
									'</a>',
									'<div class="copy idex-icon" title="复制"></div>',
								'</div>',
								'<p>750px</p>',
								'<em>未命名模板</em>',
							'</div>',
						'</div>',
					  '</div>'];
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
									'<p>',mitem.width,'</p>',
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