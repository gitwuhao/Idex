(function(CF,$){

	$.push({
		_name_ : 'TableEditor',
		initModule : function(){
			this.logger(this);
			$.getDoc().one('teditoruiready',{
				app : this.app,
				module : this
			},function(event,editor){	
				var data=event.data,
					module=data.module;
				module.onReady(editor);
			});
		},
		init : function(callback){
			if(ui.teditor instanceof ui.toolbar){
				$.getDoc().trigger('teditoruiready',ui.teditor);
			}else{
				var editorPath=BASE_PATH+'teditor/';
				$.includePack('css',editorPath+'css/teditor.css');
				$.loadJSQueue(
						editorPath+'js/ui.js',
						editorPath+'js/core/commands.js',
						editorPath+'js/core/selectedMergeCell.js',
						editorPath+'js/core/selected.js',
						editorPath+'js/core/add.js',
						editorPath+'js/core/split.js',
						editorPath+'js/core/style.js',
						editorPath+'js/core/merge.js',
						editorPath+'js/core/delrow.js',
						editorPath+'js/core/delcol.js',
						editorPath+'js/core/InsertImage.js',
						editorPath+'js/core/slider.js',
						editorPath+'js/core/ImportTable.js',
						editorPath+'js/core/EventListener.js'
				);
			}
		},
		onReady : function(editor){
			
			editor.initEditor(this.app.ViewPanel.$popuBox);
			
			this.instance=editor; 

			var me=this;
			function clickHandle(){
				me.on(this.cls);	
			};
			editor.getItem('exiteditor').onClick = clickHandle;
			editor.$box.addClass('idex-desc-box');
			
			
			$.setTimeout(function(){
				this.initCallBack();
				delete this.initCallBack;
			},50,this);

			delete this.onReady;

		},
		initPropertyTable : function(){
			this.instance.addEventListener('queryCommandStateAfter',function(command){
				if(!this.startCell){
					return;
				}
				var type=command.name,
					array=this.selectedCellArray,
					point=array.point||{},
					startCell=this.startCell,
					len=array.length,
					cell;

				if(type=='merge'){
					var result=true;

					if(len<2 || point.startRowIndex!=point.endRowIndex){
						result=false;
					}else if(point.startCellIndex==0 && point.endCellIndex==point.cellLength-1){
						result=true;
					}else if(len%2==0 || /property\-field/i.test(startCell.className)){
						result=false;
					}

					if(result==false){
						this.disabledIcon('merge');
					}else{
						this.enabledIcon('merge');
					}
				}else if(type=='split'){
					if(startCell.colSpan>1 && len==1){
						this.enabledIcon('split');
					}else{
						this.disabledIcon('split');
					}
				}else if(type=='slider'){
					if(len==1 && !/property\-field/i.test(startCell.className)){
						this.enabledIcon('slider');
					}else{
						this.disabledIcon('slider');
					}
				}else if(type=='width'){
					if(len==1 
						&& /property\-value/i.test(startCell.className) 
						&& startCell.parentElement.cells.length>2
						&& startCell._s_row_index_==0
						){
						this.enabledIcon('width');
						if(len==1){
							this.getItem('width').setValue(startCell.clientWidth);
						}else{
							this.getItem('width').setValue('');
						}
					}else{
						this.disabledIcon('width');
						this.getItem('width').setValue('');
					}
				}
			});

			var commandMap={},
				commands=['importtable','addleftcol','addrightcol','delcol','height','image','x-ui-breakline','align','fontcolor','bordercolor','bgcolor','clearstyle','selectedcol','selectedtable'];
			for(var i=0,len=commands.length;i<len;i++){
				var v=commands[i];
				commandMap[v]=true;
			}
			this.instance.addEventListener('execCommandBefore',function(command){
				var type=command.name;
				if(type=='split'){
					var cell=this.startCell;
					this.commands.split.colSpan(cell.colSpan);
					if(cell.cellIndex%2==0){
						cell.className='property-field';
					}else{
						cell.className='property-value';
					}
					return false;
				}else if(commandMap[type]){
					return false;
				}
			});

			this.instance.addEventListener('addRowAfter',function(row){
				if(row.cells.length==1){	
					row.cells[0].className='property-colspan';
					return; 
				}
				$.it(row.cells,function(index,cell){
					if(cell.cellIndex%2==0){
						cell.className='property-field';
					}else{
						cell.className='property-value';
					}
				});
			});

			this.instance.addEventListener('addCellAfter mergeCellAfter',function(cell){
				if(cell.parentElement.cells.length==1){	
					cell.className='property-colspan';
					return; 
				}
				if(cell.cellIndex%2==0){
					cell.className='property-field';
				}else{
					cell.className='property-value';
				}
			});


			
			this.instance.addEventListener('mergeCellAfter',function(cell){
				var table=$('table.slider-table:first',cell)[0];
				if(table){
					cell.innerHTML=table.outerHTML;
				}
			});


			this.instance.addEventListener('cellPasteBefore',function(cell,event){
				$.setTimeout(function(cell){
					HTMLfilter.filter({
						isRemoveTransparentColor : true,
						'*' : {
							style:{
								'@keep':['^color$','^background-color$','font','text']
							},
							'@keep' : ['style']
						},
						'table' : function(){
							if(/slider\-table/g.test(this.className)){
								this.removeAttribute('style');
								this.className='slider-table';					
								return false;
							}
						},
						'li div' : HTMLfilter.HtmlConverterPlainText,
						'@keep' : ['table','td','tr','tbody','br','^p$','h1','h2','h3','h4','h5','h6',
								   '^b$','strong','sup','sub','hr','span','div','#text']
					},cell);
				},100,this,[cell]);
				return false;
			});

			this.commandButtons=this.instance.$buttonbar.children('.'+commands.join(',.')+',.x-ui-breakline,.x-ui-separator:eq(2),.x-ui-separator:last');
			this.commandButtons.css('display','none');
		},
		removePropertyTable : function(){
			this.instance.removeEventListener('queryCommandStateAfter execCommandBefore addRowAfter addCellAfter mergeCellAfter cellPasteBefore');
			this.commandButtons.css('display','');
			delete this.commandButtons;
		},
		initListTable : function(){
			this.instance.addEventListener('queryCommandStateAfter',function(command){
				if(!this.startCell){
					return;
				}
				var type=command.name,
					array=this.selectedCellArray,
					point=array.point||{},
					startCell=this.startCell,
					len=array.length,
					cell;
				if(type=='delrow'){
					if(len>1 || startCell._s_row_index_==0){
						this.disabledIcon('delrow');
					}else{
						this.enabledIcon('delrow');
					}
				}else if(type=='addtoprow'){
					if(startCell._s_row_index_==0){
						this.disabledIcon('addtoprow');
					}else{
						this.enabledIcon('addtoprow');
					}
				}else if(type=='addleftcol'){
					if(startCell._s_cell_index_==0){
						this.disabledIcon('addleftcol');
					}else{
						this.enabledIcon('addleftcol');
					}
				}else if(type=='split'){
					if(startCell.colSpan>1 && len==1){
						this.enabledIcon('split');
					}else{
						this.disabledIcon('split');
					}
				}else if(type=='merge'){
					if(len>1 && point.startRowIndex > 0 && point.startRowIndex==point.endRowIndex && 
					   point.startCellIndex==0 && point.endCellIndex==point.cellLength-1 
					){
						this.enabledIcon('merge');
					}else{
						this.disabledIcon('merge');
					}
				}else if(type=='width'){
					if((point.startRowIndex==0 && point.startRowIndex==point.endRowIndex) || 
					   (startCell._s_row_index_==0 && len==1)){
						this.enabledIcon('width');
						if(len==1){
							this.getItem('width').setValue(startCell.clientWidth);
						}else{
							this.getItem('width').setValue('');
						}
					}else{
						this.disabledIcon('width');
						this.getItem('width').setValue('');
					}
				}else if(type=='height'){
					if((point.startCellIndex==0 && point.startCellIndex==point.endCellIndex) || 
						(startCell._s_cell_index_==0 && len==1)){
						this.enabledIcon('height');
						if(len==1){
							this.getItem('height').setValue(startCell.clientHeight);
						}else{
							this.getItem('height').setValue('');
						}
					}else{
						this.disabledIcon('height');
						this.getItem('height').setValue('');
					}
				}
			});

			this.instance.addEventListener('cellPasteBefore',function(cell,event){
				$.setTimeout(function(cell){
					HTMLfilter.filter({
						'*' : {
							style:{
								'@keep':['^color$','font','text']
							},
							'@keep' : ['style']
						},
						'li div' : HTMLfilter.HtmlConverterPlainText,
						'@keep' : ['br','^p$','h1','h2','h3','h4','h5','h6',
								   '^b$','strong','sup','sub','hr','span','div','#text']
					},cell);
				},100,this,[cell]);
				return false;
			});

			var commandMap={},
				commands=['importtable','image','fontcolor','bordercolor','bgcolor','clearstyle','selectedtable','selectedcol','slider'];
			for(var i=0,len=commands.length;i<len;i++){
				var v=commands[i];
				commandMap[v]=true;
			}
			this.instance.addEventListener('execCommandBefore',function(command){
				var type=command.name;
				if(type=='split'){
					var cell=this.startCell;
					this.commands.split.colSpan(cell.colSpan);
					return false;
				}else if(commandMap[type]){
					return false;
				}
			});

			this.commandButtons=this.instance.$buttonbar.children('.'+commands.join(',.')+',.x-ui-breakline,.x-ui-separator:eq(2)');
			
			this.commandButtons.css('display','none');
		},
		removeListTable : function(){
			this.instance.removeEventListener('queryCommandStateAfter cellPasteBefore execCommandBefore');
			this.commandButtons.css('display','');
			delete this.commandButtons;
		},
		initBaseTable : function(){
			var commandMap={},
				commands=['image','slider'];
			for(var i=0,len=commands.length;i<len;i++){
				var v=commands[i];
				commandMap[v]=true;
			}
			this.instance.addEventListener('execCommandBefore',function(command){
				var type=command.name;
				if(type=='split'){
					var cell=this.startCell;
					this.commands.split.colSpan(cell.colSpan);
					return false;
				}else if(commandMap[type]){
					return false;
				}
			});

			
			this.instance.addEventListener('queryCommandStateAfter',function(command){
				if(!this.startCell){
					return;
				}
				var type=command.name,
					array=this.selectedCellArray,
					point=array.point||{},
					startCell=this.startCell,
					len=array.length,
					cell;
				if(type=='width'){
					if(startCell && len==1){
						this.getItem('width').setValue(startCell.clientWidth);
					}else{
						this.getItem('width').setValue('');
					}
				}else if(type=='height'){
					if(startCell && len==1){
						this.getItem('height').setValue(startCell.clientHeight);
					}else{
						this.getItem('height').setValue('');
					}
				}
			});

			this.commandButtons=this.instance.$buttonbar.children('.'+commands.join(',.')+',.x-ui-separator:last');
			
			this.commandButtons.css('display','none');
		},
		removeBaseTable : function(){
			this.instance.removeEventListener('execCommandBefore');
			this.commandButtons.css('display','');
			delete this.commandButtons;
		},
		onExiteditor : function(){
			this.instance.clearSelectedCell();
			var isChange=this.instance.hasChange();

			ui.UndoManager.start();

			if(isChange){
				var undoHTML=this.config.target.innerHTML;

				var redoHTML=this.instance.getContent();

				if(undoHTML!=redoHTML){
					this.config.target.innerHTML=redoHTML;
					this.config.undoHTML=undoHTML;
					this.config.redoHTML=redoHTML;
					this.addUndo();
				}
			}

			this.instance.reset();

			this.instance.hide();

			ui.popu.removeMask();
			
			this.app.ViewPanel.enabledSrcoll();
			
			if(this.config.isPropertyTable){
				this.removePropertyTable();
			}else if(this.config.isListTable){
				this.removeListTable();
			}else{
				this.removeBaseTable();
			}
			delete this.config;

			
			this.app.isLocked=false;

			this.app.$eventElement.off('.one');
			
		},
		addUndo : function(){
			var config=this.config,
				elementID=config.activeElement.id,
				title='编辑表格',
				type='tableeditor',
				undoValue = config.undoHTML,
				redoValue = config.redoHTML,
				lastCommand=this.app.HistoryPanel.getLastCommand();

			if(lastCommand.elementID==elementID &&
				lastCommand.title==title){
				lastCommand.redoValue=redoValue;
				this.app.HistoryPanel.updateLastCommand();
				return lastCommand;
			}

			this.app.HistoryPanel.addUndo({
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
					$('table:first',element).html(html);
					element.click();
				}
			});
		},
		srcollToElement : function(element){
			var offsetTop=element.offsetTop,
				viewPanel=this.app.ViewPanel.viewPanel,
				MAX_HEIGHT=window.innerHeight,
				height=element.clientHeight,
				scrollTop=viewPanel.scrollTop;
			if(scrollTop > offsetTop){
				viewPanel.scrollTop = offsetTop-5;
			}else if(scrollTop < offsetTop &&  
					 scrollTop + MAX_HEIGHT < offsetTop + height ){
				if(MAX_HEIGHT < height){
					viewPanel.scrollTop = offsetTop-5;
				}else{
					viewPanel.scrollTop +=  (offsetTop + height) - (viewPanel.scrollTop + MAX_HEIGHT);
				}
			}
		},
		render : function(config){
			if(this.app.isLocked){
				return;
			}
			
			if(this.init){
				this.initCallBack=function(){
					this.render(config);
				};
				this.init();
				delete this.init;
				return;
			}else if(this.config){
				return;
			}
			
			if(this.instance==null || this.instance.$elem==null){
				return;
			}
			
			this.app.isLocked=true;

			this.app.trigger('cleanfloatpanel');
			
			this.app.ViewPanel.disabledSrcoll();

			ui.UndoManager.stop();

			this.config=config;
			

			var target=config.target,
				$target=$(target),
				offset=$.getOffsetParentPoint(target,target.offsetParent),
				width=target.clientWidth + 1,
				height=target.clientHeight + 1,
				paddingRight=$target.outerWidth() - width,
				paddingBottom=$target.outerHeight() - height,
				zindex=0;
			

			this.srcollToElement(target);
			
			zindex=ui.popu.createMask({
				$elem : this.instance.$elem,
				target : this.instance.getItem('exiteditor').$elem[0],
				onClick : function(event){
					this.$elem.addClass('shake-animation');
					$.setTimeout(function(){
						this.$elem.removeClass('shake-animation');
						ui.quicktip.show({
							time : 2000,
							html : '<span style="color: #0A0;">点击退出按钮完成编辑</span>',
							offset : 'tl',
							align : 'tc',
							cls : 'qit-autosize',
							target : this.target
						});
					},1500,this);
					event.stopBubble();
				}
			});
			
			zindex++;

			if(height > window.innerHeight  - 10 ){
				height = window.innerHeight - 10;
			}

			var css={
				left : offset.left,
				top : offset.top,
				width : width,
				'max-height': '500px',
				//height : height,
				'z-index' : zindex
			};

			if(height>500){
				css.height=500;
			}else{
				css['min-height']=height;
			}

			this.instance.$container.css(css);

			this.instance.show();

			if(this.initOffset){
				this.initOffset($target.offset());
			}
			
			zindex++;

			this.instance.$elem.css({
				'z-index' : zindex
			});


				
			
			if(config.isPropertyTable){
				this.initPropertyTable();
			}else if(this.config.isListTable){
				this.initListTable();
			}else{
				this.initBaseTable();
			}

			this.instance.setTable(config.target.outerHTML);


			
			this.app.$eventElement.one('esc.one',{
				me : this,
			},function(event){
				$.setTimeout(function(){
					this.onExiteditor();
				},100,event.data.me);
				return false;
			});

		},
		initOffset : function(offset){
			var $elem=this.instance.$elem,
				top=offset.top - $elem[0].clientHeight - 5;
			if(top<=0){
				top=2;
			}
			$elem.css({
				left : offset.left,
				top : top
			});
			
			delete this.initOffset;
		}
	});
	
})(CF,jQuery);