(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsSingleLayout',
		_name_ : 'html-item',
		title : 'HTML代码',
		onMousedown : function(event,target){
			
			event.result=false;
		},
		getPropertyForm : function (box){
			this.logger(this);
			this.form=this.app.CreatePropertyForm({
				$owner : this,
				id : this.__PROPERTY_PANEL_ID__,
				render : box,			
				items : ['||',{
					isPadding : true,
					width : '15px'
				},{
					xtype:'textarea',
					cls : 'code',
					placeholder :'在此处粘贴HTML代码:',
					width : '200px',
					rows : 11
				}]
			});
			this.initCodeTextArea();
			return this.form;
		},
		initCodeTextArea : function(){
			var codeItem=this.form.getItem('code'),
				$text=codeItem.$text;
			$text.keydown(function(event){
				if(event.ctrlKey && event.keyCode==86){	
				}else{
					return false;
				}
			});
			var me=this;
			$text.on('paste',function(event){
				me.on('paste',event,this);
				return false;
			});
		},
		onPaste : function(event,target){	
			var html=$.getClipboardHTMLData(event),
				text=$.getClipboardTextData(event);
			if(html==''){
				html=text;					
			}else if(text.indexOf('<')>-1 && text.indexOf('>')>2){
				html=text;
			}
			html=this.app.HTMLEditor.filter(html);
			var undoValue=this.activeElement.innerHTML;
			this.activeElement.innerHTML=html;
			ui.quicktip.show({
				time : 2000,
				html : '<span style="color: #F90;">HTML代码粘贴成功</span>',
				px : 'idex-ui',
				offset : 'tl',
				align : 'tc',
				cls : 'qit-autosize copy-qit',
				target : target
			});
			this.addUndo(undoValue);
		},
		__undo_title__:'编辑代码层',
		__undo_type__:'changehtmlitemhtml',
		addUndo: function(undoValue){
			this.logger(this);
			var elementID=this.activeElement.id,
				title=this.__undo_title__,
				type=this.__undo_type__,
				redoValue = this.activeElement.innerHTML,
				lastCommand=this.app.HistoryPanel.getLastCommand();

			if(lastCommand.elementID==elementID &&
				lastCommand.title==title){
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