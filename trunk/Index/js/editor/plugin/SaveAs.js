(function(CF,$){
$.push({
	_name_ : 'SaveAs',
	initModule : function(){
		this.logger(this);
		this.app.addEventListener('saveAs',function(config){
			this.Template.saveAs(config);
		});
	},
	saveAs : function(config){
		this.logger(this);
		var me=this;
		this.win=new ui.window({
			title : '另存为',
			width: 300,
			item : {
				xtype:'form',
				autocomplete : 'off',
				items : [{
					label:'名称',
					clear:true,
					required:true,
					maxlength : 6,
					name: 'name',
					value: config.title || ''
				},{
					label:' ',
					xtype:'checkitem',
					name : "clean",
					value : true,
					text : '保留图片和链接'
				}]
			},
			buttons:[{
				label:'确定',
				cls:'submit',
				onClick : function(event){

				}
			},{
				label:'取消',
				cls:'cancel'
			}],
			onCloseAfter : function(){
				me.close();
			}
		});
		this.win.show();
	},
	close:function(){
		this.logger(this);
		this.win.remove();
		delete this.win;
	}
});

})(CF,jQuery);