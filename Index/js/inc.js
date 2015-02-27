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
		STYLE_COLOR : 'idex-style-color'
	};
 

	KEY.CACHE = {
		FGRID_TEMPLATE : 'IDEX_FIXED_GRID_TEMPLATE',
		LAYOUT_RELATION :'IDEX_LAYOUT_RELATION',
		SYSTEM_TEMPLATE : 'IDEX_SYSTEM_TEMPLATE',
		PREVIEW_HTML : 'IDEX_PREVIEW_HTML',
		PREVIEW_TYPE : 'IDEX_PREVIEW_TYPE',
		NUM_IID : 'IDEX_NUM_IID',
		TO_PS_HTML : 'IDEX_TO_PS_HTML',
		TO_PS_CALLBACK : 'IDEX_TO_PS_CALLBACK'
	};
	
	
	KEY.ACTION = {
		TEMPLATE : 1,
		DESC : 2,
		RENOVATION : 3,
		CUSTOM : 8,
		SNAPSHOT :9
	};

	KEY.WIN_NAME = {
		EDIT : '_IDEX_EDIT',
		VIEW : '_IDEX_VIEW'
	};

	KEY.APP_CONFIG={
		CONTEXT_MAX_LENGTH : 30 * 1000
	};

	KEY.URL ={
		GUID_URL : 'http://bangpai.taobao.com/group/thread/16499510-293754315.htm'	
	};

	window.APP_KEY_MAP=KEY;

	if(window.$){
		window.$.initDebug=function(){
			$.loadJSQueue('/js/dev/debug.js');
		};
	}
})();