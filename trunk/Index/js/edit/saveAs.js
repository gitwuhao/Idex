(function(CF,$){
var ATTR_KEY_MAP=window.APP_KEY_MAP.ATTR;

$.push({
	_name_ : 'CustomModule',
	CACHE_KEY : {
		CUSTOM_CODE : 'custom_code',
		CUSTOM_TEMPLATE_LIST : 'custom_list'
	},
	getCustomCodeKey : function(id){
		return this.CACHE_KEY.CUSTOM_CODE + '_' + id;
	},
	saveCustomCode : function(id,code){
		var date=new Date();
		date.addDays(7);
		$.cache.put(this.getCustomCodeKey(id),code,date);
		$.cache.remove(this.CACHE_KEY.CUSTOM_TEMPLATE_LIST);
	},
	getCustomCode : function(id){
		return $.cache.get(this.getCustomCodeKey(id));
	}
});

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
				attr.name=ATTR_KEY_MAP.SRC;
				attr.value='/s.gif';
			};

			tempRules.img[ATTR_KEY_MAP.SRC]=tempRules.img.src;
				

			tempRules.div[ATTR_KEY_MAP.HREF]=HTMLfilter.removeAttrHandle;
		 
			this.SaveAs.CLEAN_OUTPUT_RULES=CF.merger({},outRules,tempRules);
		});
	},
	show : function(config){
		this.logger(this);
		this.config=config;
		this.win=new ui.window({
			title : '另存为自定义布局',
			$owner : this,
			width: '280px',
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
				},{
					html : '<div style="padding-left: 21px;">长度：超出120字/1.5万字</div>'
				},{
					html : '<div style="padding-left: 21px;">长度：可输入15000字/1.5万字</div>'
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


		$.jsonp({
			url:'/module.s',
			data : $.param(data),
			_$owner : this,
			_customModule : this.app.CustomModule,
			_data : data,
			_target : config.target,
			success : function(id){
				var html;
				if(id && id>0){
					this._customModule.saveCustomCode(id,this._data.code);
				}else if(id==-1){
					html='保存失败，超出限制!';
				}else{
					html='保存失败...';
				}
				
				if(html){
					ui.quicktip.show({
						px : 'idex-ui',
						align : 'tc',
						offset : 'lt',
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
	close:function(){
		this.logger(this);
		this.win.remove();
		delete this.config;
		delete this.win;
	}
});

})(CF,jQuery);