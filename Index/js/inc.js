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
		FGRID_TEMPLATE : 'FIXED_GRID_TEMPLATE',
		LAYOUT_RELATION :'LAYOUT_RELATION',
		SYSTEM_TEMPLATE : 'SYSTEM_TEMPLATE',
		PREVIEW_HTML : 'PREVIEW_HTML',
		PREVIEW_TYPE : 'PREVIEW_TYPE',
		NUM_IID : 'NUM_IID',
		TO_PS_HTML : 'TO_PS_HTML',
		TO_PS_CALLBACK : 'TO_PS_CALLBACK'
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

	KEY.CACHE_VERSION={
		SYS_DATA : 1,
		TPL_DATA : 1,
		TEXT_EDITOR : 1,
		TABLE_EDITOR : 1
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