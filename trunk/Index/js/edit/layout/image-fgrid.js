(function(CF,$){
var CACHE_KEY=window.APP_KEY_MAP.CACHE;

	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsLayout',
		_name_ : 'image-fgrid',
		title : '格子拼图',
		initModule : function(){
			this.logger(this);
		},
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
					maxlength : 4,
					minValue : 100,
					maxValue : 1500,
					vtype : ['spin'],
					xtype:'text',
					getDesc : '修改高度'
				},{
					label:'图片',
					xtype:'radio',
					name: 'picture',
					cls : 'breakline picture-group-style',
					items:[{
						label : '1张',
						value : '1'
					},{
						label : '2张',
						value : '2'
					},{
						label : '3张',
						value : '3'
					},{
						label : '4张',
						value : '4'
					},{
						label : '5张',
						value : '5'
					},{
						label : '6张',
						value : '6'
					}],
					getDesc : '修改拼图模板',
					onClick : function(item){
						me.setPicture(item.value,item);
					},
					onChange : CF.emptyFunction
				}]
			});
			return this.form;
		},
		setHeight : function(value){
			this.logger(this);
			this.activeElement.style.height=value+'px';
		},
		getHeight : function(){
			this.logger(this);
			return this.activeElement.offsetHeight;
		},
		setPicture : function(value,item){
			this.logger(this);
			var index,
				templates=this.getTemplates(),
				array,
				length,
				html,
				offsetHeight,
				$activeElement=$(this.activeElement);


			if(!templates){
				return;
			}

			array=templates[value];
			
			length=array.length;


			index=array.index || 0;
			
			html=array[index];

			if(this.config && this.config.id){
				ui.quicktip.remove(this.config.id);
			}
			
			this.config={
				html : [(index+1),'&nbsp;/&nbsp;<span style="color: #F90;">',length,'</span>'].join(''),
				px : 'idex-ui',
				offset : 'rt',
				align :'tc',
				cls : 'fgrid-page-value qit-autosize',
				target : item.$elem[0]
			};

			ui.quicktip.show(this.config);

			var div=$.createElement(html);
			

			var undoValue={
				html : this.activeElement.innerHTML,
				height : this.activeElement.offsetHeight+'px'
			};

			$activeElement.empty();
			
			$activeElement.append(div);
			
			offsetHeight=div.offsetHeight;

			
			$activeElement.append(div.children);

			$(div).remove();
			
			this.activeElement.style.height=offsetHeight+'px';

			index++;
			if(length <= index){
				index=0;
			}
			array.index=index;

			this.form.getItem('height').setValue(offsetHeight);
			
			this.app.LayoutPanel.removeChildrenNavList(this.activeElement);

			this.addUndo(undoValue);

		},
		addUndo: function(undoValue){
			this.logger(this);
			var elementID=this.activeElement.id,
				title='修改拼图模板',
				height=this.activeElement.offsetHeight+'px',
				html = this.activeElement.innerHTML,
				lastCommand=this.app.HistoryPanel.getLastCommand();

			if(lastCommand.elementID==elementID &&
				lastCommand.title==title){
				lastCommand.redoValue.height = height;
				lastCommand.redoValue.html = html;
				this.app.HistoryPanel.updateLastCommand();
				return lastCommand;
			}

			this.app.HistoryPanel.addUndo({
				panel : this ,
				elementID : elementID,
				title : title,
				type : 'changegrid',
				undoValue : undoValue,
				redoValue : {
					html : html,
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
					element.style.height=value.height;
					element.innerHTML=value.html;
					
					this.app.LayoutPanel.removeChildrenNavList(element);
					element.click();
				}
			});
		},
		getPicture : function(){
			this.logger(this);
			return this.getChildren(this.activeElement).length;
		},
		onPropertyFormShowAfter : function(){
			this.getTemplates();
		},
		getTemplates : function(){
			if(!this.templates){
				var data=localStorage[CACHE_KEY.FGRID_TEMPLATE];
				try{
					this.templates=JSON.parse(data);
				}catch(e){
					this.templates=null;
					$.loadJSQueue("/js/edit/SystemData.js");
				}
			}
			return this.templates;
		}
	});

})(CF,jQuery);