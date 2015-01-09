(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsSingleLayout',
		_name_ : 'property-itable',
		title : '属性表格',
		getPropertyForm : function (box){
			this.logger(this);
			var me=this;
			this.form=this.app.CreatePropertyForm({
				$owner : this,
				id : this.__PROPERTY_PANEL_ID__,
				render : box,			
				items : [{
					label:'高度',
					name : 'height',
					unit:'px',
					maxlength : 3,
					vtype : ['spin','required'],
					width:'195px',
					xtype:'text',
					getDesc : '设置高度'
				},'',{
					xtype:'button',
					cls : 'autosize',
					onClick : function(){
						me.autoSize();
					}
				},
				CF.merger({
					placeholder :'填写图片地址',
					getDesc : '修改图片地址'
				},this.app.ui.FORMITEM.img),
				'SIZE',{
					label:'列数',
					xtype:'radio',
					name: 'col',
					items:[{
						label : '1列',
						value : '1'
					},{
						label : '2列',
						value : '2'
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
		getImgElement : function(){
			return $('.property-image:first img',this.activeElement)[0];
		},
		setHeight : function(value){
			this.logger(this);
			if(value){
				this.activeElement.style.height=value + 'px';
			}else{
				this.activeElement.style.height='';		
			}
		},
		getHeight : function(){
			this.logger(this);
			return this.activeElement.offsetHeight;
		},
		setCol : function(value,item){
			this.logger(this);
			var $table=$('.property-tbody:first',this.activeElement),
				rows=$table[0].rows,
				oldCol=item.$owner.value,
				$remove=null,
				col,
				maxCellIndex=value * 2;
			
			if(oldCol>value){
				$remove=$();
			}

			if(/\s*col1\s*/g.test(this.activeElement.className)){
				col='col1';
				$.removeClass(this.activeElement,'col1');
			}else{
				col='col2';
				$.removeClass(this.activeElement,'col2');
			}

			var undoValue={
				html : this.activeElement.innerHTML,
				col : col,
				height : this.getHeight()
			};
			
			$.addClass(this.activeElement,'col'+value);

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
			this.autoHeight();
			this.addUndo(undoValue);
		},
		addUndo: function(undoValue){
			this.logger(this);
			var elementID=this.activeElement.id,
				title='修改属性表格',
				html = this.activeElement.innerHTML,
				col=undoValue.col=='col2' ? 'col1' : 'col2',
				height=this.getHeight(),
				lastCommand=this.app.HistoryPanel.getLastCommand();

			if(lastCommand.elementID==elementID &&
				lastCommand.title==title){
				lastCommand.redoValue={
					html : html,
					col : col,
					height : height
				};
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
					html : html,
					col : col,
					height : height
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
					$.removeClass(element,'col1 col2');
					$.addClass(element,value.col);
					element.style.height=value.height+'px';
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
		autoSize : function(){
			this.logger(this);
			var item=this.form.getItem('height'),
				$tbody=$('.property-tbody:first',this.activeElement);
			
			$tbody.css('height','100px');

			$.setTimeout(function(){
				item.$text.focus();
				item.$text.val($tbody[0].offsetHeight);
				item.$text.blur();
				$tbody.css('height','');
			},100,this);
		},
		autoHeight : function(){
			this.logger(this);
			var height=this.getTableHeight(),
				item=this.form.getItem('height');
			item.$text.val(this.getTableHeight());
			this.setHeight(height);
		},
		getTableHeight : function(){
			return $('.property-tbody:first',this.activeElement)[0].offsetHeight;
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