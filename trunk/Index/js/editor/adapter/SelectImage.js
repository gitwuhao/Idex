(function(CF,$){
	$.push({
		_name_ : 'SelectImage',
		initModule : function(){
			this.logger(this);
		},
		show : function(){
			var me=this;
			if(this.win){
				return;
			}

			this.win=new ui.window({
				title : '设置显示标题',
				width: 300,
				item : {
					xtype:'form',
					autocomplete : 'off',
					items : [{
						label:'名称',
						clear:true,
						required:true,
						maxlength : 6,
						name: 'name'
					},{
						label:' ',
						xtype:'checkitem',
						name : "clean",
						value : true,
						text : '保留图片和链接'
					},{
						label:'共享',
						xtype : 'checkitem',
						name : 'share'
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