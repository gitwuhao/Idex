$.getDoc().one('Idex.ready',function(){
	var title=$('.idex-desc-box').attr(window.APP_KEY_MAP.ATTR.TITLE);
	if(title){
		document.title="编辑【" + title + "】Idex - 帮你实现好创意！";
	}
	$('.idex-view-panel').addClass('panel-type'+window.getAppData().type);
});
$.getDoc().trigger('Idex.ready');
