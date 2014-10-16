(function(CF,$){

	$.push({
		_isUIModule_:true,
		_className_ : 'FloatTabPanel',
		_name_ : 'InfoPanel',
		autoRender:false,
		cls:'idex-info-tab-panel',
		items : [{
			active:true,
			label:'信息',
			onTagClick:function(){
			},
			onLoad:function(){
			}
		}],
		initModule : function(){
			this.logger(this);

		}
	});	
	
})(CF,jQuery);