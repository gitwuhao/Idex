(function(CF,$){	
var html,comment;
comment={
	show : function(){
		if(this.win){
			return;
		}
		this.win=new ui.window({
			title : '帮助中心',
			cls : 'idex-news-center',
			item : {
				xtype:'tab',
				items : [{
					label: '帮助',
					name : 'announce',
					html : ['<div class="idex-news-list-box left">',
								'<div class="idex-news-item">',
									'<a href="">保险分销、服务商品、合作商家、百川无线关闭二手属性的公告</a>',
								'</div>',
								'<div class="idex-news-item">',
									'<a href="">保险分销、服务商品、合作商家、百川无线关闭二手属性的公告</a>',
								'</div>',
								'<div class="idex-news-item">',
									'<a href="">保险分销、服务商品、合作商家、百川无线关闭二手属性的公告</a>',
								'</div>',
								'<div class="idex-news-item">',
									'<a href="">保险分销、服务商品、合作商家、百川无线关闭二手属性的公告</a>',
								'</div>',
								'<div class="idex-news-item">',
									'<a href="">保险分销、服务商品、合作商家、百川无线关闭二手属性的公告</a>',
								'</div>',
							'</div>',
							'<div class="idex-news-list-box right">',
								'<div class="idex-news-item">',
									'<a href="">保险分销、服务商品、合作商家、百川无线关闭二手属性的公告</a>',
								'</div>',
								'<div class="idex-news-item">',
									'<a href="">保险分销、服务商品、合作商家、百川无线关闭二手属性的公告</a>',
								'</div>',
								'<div class="idex-news-item">',
									'<a href="">保险分销、服务商品、合作商家、百川无线关闭二手属性的公告</a>',
								'</div>',
								'<div class="idex-news-item">',
									'<a href="">保险分销、服务商品、合作商家、百川无线关闭二手属性的公告</a>',
								'</div>',
								'<div class="idex-news-item">',
									'<a href="">保险分销、服务商品、合作商家、百川无线关闭二手属性的公告</a>',
								'</div>',
								'<div class="idex-news-item">',
									'<a href="">保险分销、服务商品、合作商家、百川无线关闭二手属性的公告</a>',
								'</div>',
							'</div>'].join('')
				},{
					label: '公告',
					name : 'help',
					html : ''
				}]
			},
			onCloseAfter : function(){
				this.$owner.close();
			}
		});
		this.win.$owner = this;
		this.win.show();
	},
	close:function(){
		this.win.remove();
		delete this.win;
	}
};
html=[
'<style>',
	'.x-ui-window.idex-news-center{',
	'}',
	'.idex-news-center .x-ui-win-body{',
		'width: 500px;',
		'height: 300px;',
		'padding: 5px;',
	'}',
	'.idex-news-center .idex-news-list-box{',
		'float: left;',
		'width: 235px;',
		'height: 255px;',
	'}',
	'.idex-news-center .idex-news-list-box.left{',
		'margin-right: 10px',
	'}',
	'.idex-news-center .idex-news-list-box.right{',
		'padding-left: 20px;',
		'border-left: 1px solid #DDD;',
	'}',
	'.idex-news-center .idex-news-item{',
	'}',
'</style>'
].join('');
$.getBody().append(html);
$.getDoc().click(function(event){
	if($(event.target).closest('.comment.idex-nav-icon').length>0){
		comment.show();
	}
});
})(CF,jQuery);