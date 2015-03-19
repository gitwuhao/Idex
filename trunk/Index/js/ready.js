$.getDoc().one('Idex.ready',function(){
	var title=$('.idex-desc-box').attr(window.APP_KEY_MAP.ATTR.TITLE);
	document.title="编辑【" + title + "】Idex - 帮你实现好创意！";
});
$.getDoc().trigger('Idex.ready');
