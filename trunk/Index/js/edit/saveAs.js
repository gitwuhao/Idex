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
 

		var win=new ui.window({
			title : '另存为',
			$owner : this,
			width: '250px',
			padding: '10px 30px 10px 10px',
			getCode : function(isSave){
				if(!isSave && this.cleanOutPutHTML){
					return this.cleanOutPutHTML;
				}else if(isSave && this.defaultOutPutHTML){
					return this.defaultOutPutHTML;
				}

				var filterRule,
					html;
				if(!isSave){
					filterRule=this.$owner.CLEAN_OUTPUT_RULES;
				}else{
					filterRule=this.$owner.DEFAULT_OUTPUT_RULES;
				}
				html = HTMLfilter.getOuterHTML(this.$owner.config.activeElement,filterRule);
				if(!isSave){
					this.cleanOutPutHTML=html;
				}else{
					this.defaultOutPutHTML=html;
				}
				return html;
			},
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
					name : 'isSave',
					value : true,
					text : '保留图片和链接',
					onChecked : function(){
						this.callPrototypeMethod();
						if(this.$owner){
							var win=this.$owner.$owner;
							win.htmlCode=win.getCode(this.value);
							win.$owner.updateCount(win.htmlCode.length);
						}
					}
				},/*{
					html : '<div style="padding-left: 21px;">长度：4.3K/5K</div>'
				},*/{
					html : ['<div style="padding-left: 21px;">',
								'源码：',
								'<span class="code-count-box">',
									'<span class="c1"></span>',
									'/5K',
								'</span>',
							'</div>'].join('')
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

		
		this.win=win;

		win.show();

		win.$codeCountBox=$('.code-count-box',win.$body);
		win.$countValue=win.$codeCountBox.children('.c1');
		win.htmlCode=win.getCode(true);
		this.updateCount(win.htmlCode.length);

	},
	/*最多5K*/
	CONTEXT_MAX_LENGTH : 5 * 1000,
	updateCount : function(length){
		var val=length-this.CONTEXT_MAX_LENGTH,
			win=this.win;
		if(val > 0){
			win.$countValue.css('color','#FF0000');
			win.$codeCountBox.attr('title','已超出'+Number.stringify(val)+'字');
			win.buttons.submit.disabled();
		}else{
			win.$countValue.css('color','#1AA8FF');
			win.$codeCountBox.attr('title','还剩'+Number.stringify(Math.abs(val))+'字');
			win.buttons.submit.enabled();
		}
		win.$countValue.text(Number.toPrecision((length/1000),1)+'K');
	},
	CLEAN_OUTPUT_RULES : null,
	DEFAULT_OUTPUT_RULES : null,
	submit : function(){
		var form=this.win.form,
			title,
			html,
			data,
			config=this.config,
			filterRule;
 
		title=form.getItem('title').getValue();

		data={
			method : 'save',
			atype : '2',
			title : title,
			type : config.layout._type_index_,
			code : this.win.htmlCode
		};


		$.jsonp({
			url:'/edit.s',
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
					this.onError(html);
				}
			},
			error : function(){
				this.onError('保存失败...');
			},
			onError : function(html){
				ui.quicktip.show({
					px : 'idex-ui',
					align : 'tc',
					offset : 'lt',
					html : '<em style="color:#FC7100;">'+html+'</em>',
					time : 3000,
					target :  this._target
				});
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