(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsFloatLayout',
		_name_ : 'float-text',
		title : '文本',
		getPropertyForm : function (box){
			this.logger(this);
			var me=this;
			var items=this.getBasePropertyForm();
			items.push({
					isPadding: true,
					width: '33px'
				},{
					xtype:'button',
					cls : 'autosize',
					onClick : function(){
						me.onAutoSize();
					}
				},'|||',{
					isPadding: true,
					width: '25px',
					height: '30px'
				},{
					label:'编辑',
					xtype:'button',
					name : 'editor',
					onClick : function(){
						me.onEditor();
					}
				});
			this.form=this.app.CreatePropertyForm({
				$owner : this,
				id : this.__PROPERTY_PANEL_ID__,
				render : box,
				items : items
			});
			return this.form;
		},
		onDblclick : function(event){
			this.editor();
		},
		onMouserightdown:function(event){
			this.editor();
		},
		onAutoSize : function(){
			this.activeElement.style.height='0px'
			$.setTimeout(function(){
				this.setHeight(this.activeElement.scrollHeight);
			},50,this);
		},
		editor : function(){
			$.setTimeout(function(){
				ui.dragdrop.hide();
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
				type='changefloattexthtml',
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