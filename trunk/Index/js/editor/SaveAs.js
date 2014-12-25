(function(CF,$){
$.push({
	_name_ : 'SaveAs',
	show : function(config){
		this.logger(this);
		var me=this;
		this.win=new ui.window({
			title : '另存为',
			width: '230px',
			padding: '10px 30px 10px 10px',
			item : {
				xtype:'form',
				notLabelPadding : true,
				autocomplete : 'off',
				items : [{
					label:'名称',
					clear:true,
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