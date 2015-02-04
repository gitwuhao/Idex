(function(){
	
	var KEY={};

	KEY.ATTR = {
		HREF : 'idex-href',
		SRC : 'idex-src',
		TYPE : 'idex-type',
		ID : 'idex-id',
		NAME : 'idex-name',
		TITLE : 'idex-title',
		CLASS : 'idex-class',
		STYLE_COLOR : 'idex-style-color',
		PREVIEW : 'IDEX_PREVIEW'
	};
 

	KEY.CACHE = {
		FGRID_TEMPLATE : 'IDEX_FIXED_GRID_TEMPLATE',
		LAYOUT_RELATION :'IDEX_LAYOUT_RELATION',
		SYSTEM_TEMPLATE : 'IDEX_SYSTEM_TEMPLATE',
		PREVIEW_HTML : 'IDEX_PREVIEW_HTML',
		PREVIEW_TYPE : 'IDEX_PREVIEW_TYPE',
		TO_PS_HTML : 'IDEX_TO_PS_HTML',
		TO_PS_CALLBACK : 'IDEX_TO_PS_CALLBACK'
	};
	
	
	KEY.ACTION = {
		TEMPLATE : 1,
		DESC : 2,
		RENOVATION : 3,
		CUSTOM : 8
	};

	KEY.WIN_NAME = {
		EDIT : '_IDEX_EDIT',
		VIEW : '_IDEX_VIEW'
	};

	window.APP_KEY_MAP=KEY;

	if(window.$){
		window.$.initDebug=function(){
			$.loadJSQueue('/js/dev/debug.js');
		};
	}
})();