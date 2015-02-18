(function(CF,$){

	function getTextItemConfig(){
		return {
			getPropertyForm : function (box){
				this.logger(this);
				this.form=this.app.CreatePropertyForm({
					$owner : this,
					id : this.__PROPERTY_PANEL_ID__,
					render : box,
					items : this.getFormItemConfig()
				});
				return this.form;
			},
			onDblclick : function(event){
				this.editor();
			},
			onMouserightdown:function(event){
				this.editor();
			},
			editor : function(){
				$.setTimeout(function(){
					this.onEditor();
				},100,this);
			},
			onEditor : function(){
				this.app.TextEditor.render({
					me : this,
					target : this.activeElement,
					callback : function(html){
						var oldHTML = this.target.innerHTML;
						this.target.innerHTML=html;
						this.me.addUndo(oldHTML);
					}
				});
			},
			addUndo: function(undoValue){
				this.logger(this);
				var elementID=this.activeElement.id,
					title='编辑文本层',
					type='changetextitemhtml',
					redoValue = this.activeElement.innerHTML,
					lastCommand=this.app.HistoryPanel.getLastCommand();

				if(lastCommand.elementID==elementID &&
					lastCommand.title==title &&
					lastCommand.type==type){
					lastCommand.redoValue=redoValue;
					this.app.HistoryPanel.updateLastCommand();
					return lastCommand;
				}

				this.app.HistoryPanel.addUndo({
					panel : this ,
					elementID : elementID,
					title : title,
					type : type,
					undoValue : undoValue,
					redoValue : redoValue,
					undo : function(){
						this.execute(this.undoValue);
					},
					redo : function(){
						this.execute(this.redoValue);
					},
					execute : function(html){
						var element=this.app.get(this.elementID);
						element.innerHTML=html;
						element.click();
					}
				});
			},
			setPaddingTop : function(value){
				$.style(this.activeElement,'padding-top',value);
			},
			getPaddingTop : function(){
				var padding=this.activeElement.style['padding-top'];
				return (padding||'').replace('px','');
			},
			setPaddingBottom : function(value){
				$.style(this.activeElement,'padding-bottom',value);
			},
			getPaddingBottom : function(){
				var padding=this.activeElement.style['padding-bottom'];
				return (padding||'').replace('px','');
			},
			setPaddingLeft : function(value){
				$.style(this.activeElement,'padding-left',value);
			},
			getPaddingLeft : function(){
				var padding=this.activeElement.style['padding-left'];
				return (padding||'').replace('px','');
			},
			setPaddingRight : function(value){
				$.style(this.activeElement,'padding-right',value);
			},
			getPaddingRight : function(){
				var padding=this.activeElement.style['padding-right'];
				return (padding||'').replace('px','');
			},
			setBorder : function(value){
				var target=this.activeElement;
				$.removeClass(target,'idex-r-active s2 s3 s4');
				if(value=='2' || value=='3' || value=='4'){
					$.addClass(target,('s'+value));
				}else{
					$.style(target,'border-color','');
				}
			},
			getBorder : function(){
				var value='1',
					target=this.activeElement;
				if($.hasClass(target,'s2')){
					value='2';
				}else if($.hasClass(target,'s3')){
					value='3';
				}else if($.hasClass(target,'s4')){
					value='4';
				}
				return value;
			},
			setBColor : function(value){
				var target=this.activeElement;
				$.style(target,'border-color',value);
				$.removeClass(target,'idex-r-active');
			},
			getBColor : function(){
				return $.style(this.activeElement,'border-color');
			},
			setBgColor : function(value){
				$.style(this.activeElement,'background-color',value);
			},
			getBgColor : function(){
				return $.style(this.activeElement,'background-color');
			}
		};
	};
 

	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsSingleLayout',
		_name_ : 'text-item',
		title : '文本',
		initModule : function(){
			this.extend(this);
		},
		extend : function(layout){
			var config=getTextItemConfig();
			if(!layout.getFormItemConfig){
				layout.getFormItemConfig=this.getFormItemConfig;
			}
			CF.merger(layout,config);
			CF.setOwner(layout,layout);
		},
		getFormItemConfig : function(){
			var me=this;
			return [{
				label:'边框',
				name : 'border',
				width:'199px',
				xtype:'radio',
				items:[{
					label : '1',
					value : '1'
				},{
					label : '2',
					value : '2'
				},{
					label : '3',
					value : '3'
				},{
					label : '4',
					value : '4'
				}],
				getDesc : '设置边框'
			},{
				name : 'bColor',
				width:'18px',
				cls : 'padding',
				xtype:'color',
				getDesc : '设置边框颜色'
			},'||',{
				label:'上',
				name : 'paddingTop',
				placeholder :'边距',
				unit:'px',
				vtype : ['spin'],
				xtype:'text',
				minValue : 50,
				minValue : 1,
				width:'110px',
				getDesc : '修改上边距'
			},{
				label:'下',
				name : 'paddingBottom',
				placeholder :'边距',
				unit:'px',
				vtype : ['spin'],
				xtype:'text',
				minValue : 50,
				minValue : 1,
				width:'110px',
				getDesc : '修改下边距'
			},{
				label:'左',
				name : 'paddingLeft',
				placeholder :'边距',
				unit:'px',
				vtype : ['spin'],
				xtype:'text',
				minValue : 50,
				minValue : 1,
				width:'110px',
				getDesc : '修改左边距'
			},{
				label:'右',
				name : 'paddingRight',
				placeholder :'边距',
				unit:'px',
				vtype : ['spin'],
				xtype:'text',
				minValue : 50,
				minValue : 1,
				width:'110px',
				getDesc : '修改右边距'
			},'||',{
				label:'背景',
				name : 'bgColor',
				width:'110px',
				xtype:'color',
				getDesc : '设置背景颜色'
			},{
				isPadding : true,
				width : '50px'
			},{
				label:'编辑',
				xtype:'button',
				name :'editor',
				onClick : function(){
					me.onEditor();
				}
			}];
		}
	});

})(CF,jQuery);