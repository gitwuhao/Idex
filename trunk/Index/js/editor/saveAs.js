(function(CF,$){
var IDEX_ATTR_MAP=window.IDEX_ATTR_MAP;
$.push({
	_name_ : 'SaveAs',
	/*{
	*	title : title,
	*	target : target
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
 

			tempRules.img.src=function(attr){
				attr.name=IDEX_ATTR_MAP.SRC;
				attr.value='/s.gif';
			};

			tempRules.img[IDEX_ATTR_MAP.SRC]=tempRules.img.src;
				

			tempRules.div[IDEX_ATTR_MAP.HREF]=HTMLfilter.removeAttrHandle;
		 
			this.SaveAs.CLEAN_OUTPUT_RULES=CF.merger({},outRules,tempRules);
		});
	},
	show : function(config){
		this.logger(this);
		this.config=config;
		this.win=new ui.window({
			title : '另存为自定义布局',
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
			data,
			type,
			config=this.config,
			filterRule;
		isClean=form.getItem('isClean').getValue();
		title=form.getItem('title').getValue();
		

		if(!isClean){
			filterRule=this.CLEAN_OUTPUT_RULES;
		}else{
			filterRule=this.DEFAULT_OUTPUT_RULES;
		}
		
		type=config.layout._type_index_;

		html = HTMLfilter.getOuterHTML(config.activeElement,filterRule);


		data={
			method : 'insert',
			_t : '2',
			title : title,
			type : type,
			code : html
		};


		$.ajax({
			url:'/module.s',
			data : $.param(data),
			_$owner : this,
			_data : data,
			_target : config.target,
			type : 'POST',
			dataType : 'jsonp',
			jsonpCallback : $.getJSONPName(),
			success : function(id){
				var html;
				if(id && id>0){
					$.cache.put('custom_code',_data.code);
				}else if(id==-1){
					html='创建失败，超出限制!';
				}else{
					html='创建失败';
				}
				
				if(html){
					ui.quicktip.show({
						px : 'idex-ui',
						align : 'tc',
						offset : 'lt',
						cls : 'c3',
						html : '<em style="color:#FC7100;">'+html+'</em>',
						time : 3000,
						target :  this._target
					});
				}
			},
			error : function(){
			},
			complete : function(){
			}
		});
	},
	_save_ : function(data){
	

	},
	close:function(){
		this.logger(this);
		this.win.remove();
		delete this.config;
		delete this.win;
	}
});

})(CF,jQuery);