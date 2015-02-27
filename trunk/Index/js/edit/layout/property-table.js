(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsSingleLayout',
		_name_ : 'property-table',
		title : '属性表格',
		getPropertyForm : function (box){
			this.logger(this);
			var me=this;
			this.form=this.app.CreatePropertyForm({
				$owner : this,
				id : this.__PROPERTY_PANEL_ID__,
				render : box,			
				items : [{
					label:'列数',
					xtype:'radio',
					cls:'s3',
					name: 'col',
					items:[{
						label : '1列',
						value : '1'
					},{
						label : '2列',
						value : '2'
					},{
						label : '3列',
						value : '3'
					}],
					onClick : function(item){
						me.setCol(item.value,item);
					},
					onChange : CF.emptyFunction
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
				}]
			});
			return this.form;
		},
		setCol : function(value,item){
			this.logger(this);
			var $table=$('.property-tbody:first',this.activeElement),
				rows=$table[0].rows,
				oldCol=item.$owner.value,
				$remove=null,

				maxCellIndex=value * 2;
			
			if(oldCol>value){
				$remove=$();
			}

			var undoValue={
				html : this.activeElement.innerHTML
			};

			$.it(rows,function(index,row){
				if($remove){
					var cellIndex=0;
					$.it(row.cells,function(index,cell){
						var colSpan=cell.colSpan;
						if(maxCellIndex < cellIndex + colSpan){
							if(maxCellIndex > cellIndex){
								cell.colSpan=maxCellIndex-cellIndex;
								if(cell.colSpan==1){
									cell.removeAttribute('colspan');
								}
							}else {
								$remove.push(cell);
							}
						}
						cellIndex += colSpan;
					});
				}else{
					var len=row.cells.length,
						cell,
						lastCell=row.lastElementChild;
					
					if(lastCell.colSpan==1){
						while(maxCellIndex > len ){

							cell=row.insertCell(len);
							cell.className='property-field';
							cell.innerHTML='&nbsp;';
							len++;
							
							cell=row.insertCell(len);
							cell.className='property-value';
							cell.innerHTML='&nbsp;';
							len++;

						}
					}else{
						lastCell.colSpan += maxCellIndex - (oldCol * 2);
					}
				}
			});

			if($remove){
				$remove.remove();
			}
			this.addUndo(undoValue);
		},
		addUndo: function(undoValue){
			this.logger(this);
			var elementID=this.activeElement.id,
				title='修改属性表格',
				html = this.activeElement.innerHTML,
				lastCommand=this.app.HistoryPanel.getLastCommand();

			if(lastCommand.elementID==elementID &&
				lastCommand.title==title){
				lastCommand.redoValue.html = html;
				this.app.HistoryPanel.updateLastCommand();
				return lastCommand;
			}

			this.app.HistoryPanel.addUndo({
				panel : this ,
				elementID : elementID,
				title : title,
				type : 'changeproperty',
				undoValue : undoValue,
				redoValue : {
					html : html
				},
				undo : function(){
					this.execute(this.undoValue);
				},
				redo : function(){
					this.execute(this.redoValue);
				},
				execute : function(value){
					var element=this.app.get(this.elementID);
					element.innerHTML=value.html;
					element.click();
				}
			});
		},
		getCol : function(){
			this.logger(this);
			var $table=$('.property-tbody:first',this.activeElement),
				col=0;
			$.it($table[0].rows[0].cells,function(index,cell){
				col += cell.colSpan;
			});
			col=col/2;
			return col;
		},
		onEditor : function(){
			var $table=$('table:first',this.activeElement);
			this.app.TableEditor.render({
				me : this,
				activeElement : this.activeElement,
				isPropertyTable : true,
				target : $table[0],
				$target : $table
			});
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
		}
	});

})(CF,jQuery);