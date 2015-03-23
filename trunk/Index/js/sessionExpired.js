(function(CF,$){
var SING_KEY = $.cache.getSigKey(),
	appKey=[],
	array,
	s,
	nick='',
	AUTH_URL,
	WIN_NAME = 'IDEX_AUTH_WIN';


array=$.LS[$.cache.KEY_SING].split('#');
if(array[1]){
	s=array[1].split('');
	for(var i=0,len=s.length;i<len;i++){
		if((i+1)%2==0){
			appKey.push(s[i]);
		}
	}
	appKey=appKey.join('');
	AUTH_URL='https://oauth.taobao.com/authorize?response_type=code&client_id='+appKey+'&redirect_uri=http://idex.oilan.com.cn/auth.s?_unlock='+SING_KEY;
}else{
	AUTH_URL='http://idex.oilan.com/';
}
if(array[2]){
	nick='用户【'+decodeURIComponent(array[2].replace(/\|/g,'%'))+'】';
}



//'http://idex.oilan.com/auth.s?_unlock=CB0BB2CB',
$.sessionExpired={
	show : function(){
		if(this.win){
			return;
		}
		this.win=new ui.window({
			$owner : this,
			title : nick+'已锁定',
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
			this.authWin=window.open(AUTH_URL,WIN_NAME,'width=800,height=700,toolbar=no, menubar=no, status=no');
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
			if(this.win.hideStateLabelID){
				return;
			}
			this.win.$stateLabel.text('解锁失败：登录的用户不是当前锁定的用户！');
			this.win.hideStateLabelID=$.setTimeout(function(){
				this.$stateLabel.text('');
				delete this.hideStateLabelID;
			},10000,this.win);
		}
	}
};

$.getDoc().on('sessionExpired',function(event){
	if(window.ui && ui.window){
		$.sessionExpired.show();
	}
});
})(CF,jQuery);