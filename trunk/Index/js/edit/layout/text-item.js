(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsSingleLayout',
		_name_ : 'text-item',
		title : '文本',
		getPropertyForm : function (box){
			this.logger(this);
			var me=this;
			this.form=this.app.CreatePropertyForm({
				$owner : this,
				id : this.__PROPERTY_PANEL_ID__,
				render : box,			
				items : [{
					label:'左',
					name : 'paddingLeft',
					placeholder :'边距',
					unit:'px',
					maxlength : 3,
					vtype : ['spin'],
					xtype:'text',
					width:'110px'
				},{
					label:'右',
					name : 'paddingRight',
					placeholder :'边距',
					unit:'px',
					maxlength : 3,
					vtype : ['spin'],
					xtype:'text',
					width:'110px'
				},{
					label:'行高',
					name : 'height',
					unit:'px',
					maxlength : 3,
					vtype : ['spin'],
					xtype:'text',
					getDesc : '设置行高'
				},'||',{
					isPadding : true,
					width : '10px'
				},{
					label:'编辑',
					xtype:'button',
					name :'editor',
					onClick : function(){
						me.onEditor();
					}
				}]
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
		}
	});

})(CF,jQuery);