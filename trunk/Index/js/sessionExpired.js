(function(CF,$){
var AUTH_URL = 'https://oauth.taobao.com/authorize?response_type=code&client_id=23029943&redirect_uri=http://idex.oilan.com.cn/auth.s',
	WIN_NAME = 'IDEX_AUTH_WIN';
$.sessionExpired={
	show : function(){
		if(this.isWinShow){
			return;
		}
		var win=new ui.window({
			$owner : this,
			title : 'Idex - 已锁定',
			css : {
				'width': '300px',
				'height': '150px',
				'overflow' : 'hidden'
			},
			html : ['<div style="text-align: center;padding-top: 20%;">',
						'当前会话已过期，',
						'<a href="##a" ',
							'target="',WIN_NAME,'" ',
							'onclick="$.sessionExpired.open(); return false;" ',
							'style="color: #F24117;text-decoration: none;">',
						'登录',
						'</a>',
					'解锁!</div>'].join(''),
			closable : false,
			onCloseAfter : function(){
				delete this.$owner.isWinShow;
			}
		});
		win.show();

		this.isWinShow=true;
	},
	open : function(){
		if(this.authWin == null || this.authWin.closed){
			this.authWin=window.open('/auth.html',WIN_NAME,'width=800,height=700,toolbar=no, menubar=no, status=no');
		}else{
			this.authWin.focus();
		}
		//window.opener.$.sessionExpired.close();
	},
	close : function(){
		ui.window.close();
		delete this.isWinShow;
	}
};

$.getDoc().on('sessionExpired',function(event){
	if(window.ui && ui.window){
		$.sessionExpired.show();
	}
});
})(CF,jQuery);