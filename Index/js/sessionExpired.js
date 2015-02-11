(function(CF,$){
var SING_KEY = $.cache.getSigKey(),
	AUTH_URL = 'https://oauth.taobao.com/authorize?response_type=code&client_id=23029943&redirect_uri=http://idex.oilan.com.cn/auth.s?_unlock='+SING_KEY,
	WIN_NAME = 'IDEX_AUTH_WIN';
$.sessionExpired={
	show : function(){
		if(this.win){
			return;
		}
		this.win=new ui.window({
			$owner : this,
			title : 'Idex - 已锁定',
			css : {
				'width': '300px',
				'height': '150px',
				'overflow' : 'hidden'
			},
			html : ['<div style="text-align: center;padding-top: 20%;color: #888;">',
						'当前会话已过期',
						'<a href="##a" ',
							'target="',WIN_NAME,'" ',
							'onclick="$.sessionExpired.open(); return false;" ',
							'style="color: #F24117;text-decoration: none;">',
						'点击登录',
						'</a>',
					'进行解锁!<br/><span id="state-label" style="color: #FF9100;"></span></div>'].join(''),
			closable : false,
			onCloseAfter : function(){
				this.$owner.onClose();
			}
		});
		this.win.show();
		this.win.$stateLabel=$('#state-label');

	},
	open : function(){
		if(this.authWin == null || this.authWin.closed){
			this.authWin=window.open('/auth.html',WIN_NAME,'width=800,height=700,toolbar=no, menubar=no, status=no');
		}else{
			this.authWin.focus();
		}
	},
	onClose : function(){
		this.win.remove();
		delete this.win;
	},
	close : function(){
		if(this.win){
			ui.window.close();
		}
	},
	fail : function(){
		if(this.win){
			this.win.$stateLabel.text('解锁失败：登录的用户不是当前锁定的用户！');
			$.setTimeout(function(){
				this.$stateLabel.text('');
			},15000,this.win);
		}
	}
};

$.getDoc().on('sessionExpired',function(event){
	if(window.ui && ui.window){
		$.sessionExpired.show();
	}
});
})(CF,jQuery);