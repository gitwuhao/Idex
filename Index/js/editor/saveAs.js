(function(CF,$){
var IDEX_ATTR_MAP=window.IDEX_ATTR_MAP;
$.push({
	_name_ : 'SaveAs',
	/*{
	*	title : title,
	*	layout : layout,
	*	activeElement : activeElement
	* }
	*/
	initModule : function(){	
		this.app.addEventListener('readyafter',function(event){
			var tempRules={
					img:{},
					div:{},
				},
				outRules = this.layout.__OUTPUT_RULES__;
			this.SaveAs.DEFAULT_OUTPUT_RULES=outRules;
 

			tempRules.img[IDEX_ATTR_MAP.SRC]=HTMLfilter.removeAttrHandle;
				
			tempRules.img.src=HTMLfilter.removeAttrHandle;

			tempRules.div[IDEX_ATTR_MAP.HREF]=HTMLfilter.removeAttrHandle;
		 
			this.SaveAs.CLEAN_OUTPUT_RULES=CF.merger({},outRules,tempRules);
		});
	},
	show : function(config){
		this.logger(this);
		this.config=config;
		this.win=new ui.window({
			title : '另存为',
			$owner : this,
			width: '230px',
			padding: '10px 30px 10px 10px',
			item : {
				xtype:'form',
				notLabelPadding : true,
				autocomplete : 'off',
				items : [{
					label:'名称',
					clear:true,
					maxlength : 10,
					name: 'title',
					value: config.title || ''
				},{
					label:' ',
					xtype:'checkitem',
					name : 'isClean',
					value : true,
					text : '保留图片和链接'
				}]
			},
			buttons:[{
				label:'确定',
				cls:'submit',
				onClick : function(event){
					this.$owner.$owner.submit();
				}
			},{
				label:'取消',
				cls:'cancel'
			}],
			onCloseAfter : function(){
				this.$owner.close();
			}
		});
		this.win.show();
	},
	CLEAN_OUTPUT_RULES : null,
	DEFAULT_OUTPUT_RULES : null,
	submit : function(){
		var form=this.win.form,
			title,
			isClean,
			html,
			config=this.config,
			filterRule;
		isClean=form.getItem('isClean').getValue();
		title=form.getItem('title').getValue();
		

		if(!isClean){
			filterRule=this.CLEAN_OUTPUT_RULES;
		}else{
			filterRule=this.DEFAULT_OUTPUT_RULES;
		}

		html = HTMLfilter.getOuterHTML(config.activeElement,filterRule);

		console.info(html);
	},
	close:function(){
		this.logger(this);
		this.win.remove();
		delete this.config;
		delete this.win;
	}
});

})(CF,jQuery);