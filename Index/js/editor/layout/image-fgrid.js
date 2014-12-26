(function(CF,$){

	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsLayout',
		_name_ : 'image-fgrid',
		title : '格子拼图',
		initModule : function(){
			this.logger(this);
		},
		onClick:function(event,target){
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
				array=this.templates[value],
				length=array.length,
				html,
				offsetHeight,
				$activeElement=$(this.activeElement);

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
					element.click();
				}
			});
		},
		getPicture : function(){
			this.logger(this);
			return this.getChildren(this.activeElement).length;
		},
		templates : {
			'1' : [
					'<div class="layout image-fgrid" style="height:300px;"><div class="p-n" style="width:100%;height:100%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"/></div></div></div>'
				  ],
			'2' : [
					'<div class="layout image-fgrid" style="height:300px;"><div class="p-r" style="width:50%;height:100%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-n" style="width:50%;height:100%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div></div>',
					'<div class="layout image-fgrid" style="height:300px;"><div class="p-r" style="width:70%;height:100%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-n" style="width:30%;height:100%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div></div>',
					'<div class="layout image-fgrid" style="height:300px;"><div class="p-r" style="width:30%;height:100%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-n" style="width:70%;height:100%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div></div>'
				  ],
			'3' : [
					'<div class="layout image-fgrid" style="height:300px;"><div class="p-r" style="width:33.5%;height:100%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:33.5%;height:100%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-n" style="width:33%;height:100%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div></div>',
					'<div class="layout image-fgrid" style="height:200px;"><div class="p-r" style="width:50%;height:100%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:25%;height:100%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-n" style="width:25%;height:100%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div></div>',
					'<div class="layout image-fgrid" style="height:200px;"><div class="p-r" style="width:25%;height:100%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:50%;height:100%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-n" style="width:25%;height:100%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div></div>',
					'<div class="layout image-fgrid" style="height:200px;"><div class="p-r" style="width:25%;height:100%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:25%;height:100%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-n" style="width:50%;height:100%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div></div>',
					'<div class="layout image-fgrid" style="height:500px;"><div class="p-r-b" style="width:50%;height:60%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-b" style="width:50%;height:60%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-n" style="width:100%;height:40%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div></div>'
				  ],
			'4' : [
					'<div class="layout image-fgrid" style="height:500px;"><div class="p-r" style="width:60%;height:100%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-b" style="width:40%;height:33%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-b" style="width:40%;height:33%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-n" style="width:40%;height:34%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div></div>',
					'<div class="layout image-fgrid" style="height:500px;"><div class="p-b" style="width:100%;height:60%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:33.5%;height:40%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:33.5%;height:40%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-n" style="width:33%;height:40%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div></div>',
					'<div class="layout image-fgrid" style="height:500px;"><div class="p-b" style="width:100%;height:60%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:25%;height:40%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:50%;height:40%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-n" style="width:25%;height:40%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div></div>',
					'<div class="layout image-fgrid" style="height:500px;"><div class="p-r" style="width:50%;height:100%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r-b" style="width:25%;height:60%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-b" style="width:25%;height:60%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-n" style="width:50%;height:40%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div></div>',
					'<div class="layout image-fgrid" style="height:500px;"><div class="p-r-b" style="width:33.5%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r-b" style="width:33.5%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-n f-r" style="width:33%;height:100%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:67%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div></div>',
					'<div class="layout image-fgrid" style="height:600px;"><div class="p-r-b" style="width:67%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-n f-r" style="width:33%;height:100%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:33.5%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:33.5%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div></div>'
				  ],
			'5' : [
					'<div class="layout image-fgrid" style="height:600px;"><div class="p-r-b" style="width:25%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"/></div></div><div class="p-r-b" style="width:25%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"/></div></div><div class="p-n f-r" style="width:50%;height:100%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"/></div></div><div class="p-r" style="width:25%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"/></div></div><div class="p-r" style="width:25%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"/></div></div></div>',
					'<div class="layout image-fgrid" style="height:600px;"><div style="width:33%;height:100%;" class="p-r"><div class="image-fglink img-b img-p"><img src="images/s.gif"/></div></div><div style="width:33.5%;height:50%;" class="p-r-b"><div class="image-fglink img-b img-p"><img src="images/s.gif"/></div></div><div style="width:33.5%;height:50%;" class="p-b"><div class="image-fglink img-b img-p"><img src="images/s.gif"/></div></div><div style="width:33.5%;height:50%;" class="p-r"><div class="image-fglink img-b img-p"><img src="images/s.gif"/></div></div><div style="width:33.5%;height:50%;" class="p-n"><div class="image-fglink img-b img-p"><img src="images/s.gif"/></div></div></div>',
					'<div class="layout image-fgrid" style="height:600px;"><div style="width:33.5%;height:50%;" class="p-r-b"><div class="image-fglink img-b img-p"><img src="images/s.gif"/></div></div><div style="width:33.5%;height:50%;" class="p-r-b"><div class="image-fglink img-b img-p"><img src="images/s.gif"/></div></div><div style="width:33%;height:100%;" class="p-n f-r"><div class="image-fglink img-b img-p"><img src="images/s.gif"/></div></div><div style="width:33.5%;height:50%;" class="p-r"><div class="image-fglink img-b img-p"><img src="images/s.gif"/></div></div><div style="width:33.5%;height:50%;" class="p-r"><div class="image-fglink img-b img-p"><img src="images/s.gif"/></div></div></div>',
					'<div class="layout image-fgrid" style="height:300px;"><div class="p-r-b" style="width:25%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r-b" style="width:50%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-b" style="width:25%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:50%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-n" style="width:50%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div></div>',
					'<div class="layout image-fgrid" style="height:500px;"><div class="p-r-b" style="width:50%;height:55%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-b" style="width:50%;height:55%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:25%;height:45%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:50%;height:45%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-n" style="width:25%;height:45%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div></div>',
					'<div class="layout image-fgrid" style="height:300px;"><div class="p-r" style="width:25%;height:100%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r-b" style="width:50%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-n f-r" style="width:25%;height:100%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:25%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:25%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div></div>',
					'<div class="layout image-fgrid" style="height:600px;"><div class="p-r-b" style="width:70%;height:33.3%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-b f-r" style="width:30%;height:66.7%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:30%;height:66.7%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r-b" style="width:40%;height:33.4%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-n" style="width:70%;height:33.3%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div></div>',
					'<div class="layout image-fgrid" style="height:500px;"><div class="p-r-b" style="width:75%;height:65%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-b" style="width:25%;height:65%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:25%;height:35%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:50%;height:35%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-n" style="width:25%;height:35%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div></div>',
					'<div class="layout image-fgrid" style="height:600px;"><div class="p-r-b" style="width:67%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-b" style="width:33%;height: 50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:33.5%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:33.5%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:33%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div></div>'
				  ],
			'6' : [
					'<div class="layout image-fgrid" style="height:300px;"><div class="p-r" style="width:25%;height:100%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r-b" style="width:50%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-b" style="width:25%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:25%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:25%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-n" style="width:25%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div></div>',
					'<div class="layout image-fgrid" style="height:600px;"><div class="p-r-b" style="width:67%;height:67%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-b" style="width:33%;height:33.5%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-b" style="width:33%;height:33.5%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:33.5%;height:33%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:33.5%;height:33%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-n" style="width:33%;height:33%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div></div>',
					'<div class="layout image-fgrid" style="height:300px;"><div class="p-r-b" style="width:50%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r-b" style="width:25%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-b" style="width:25%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:25%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:50%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-n" style="width:25%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div></div>',
					'<div class="layout image-fgrid" style="height:300px;"><div class="p-r-b" style="width:50%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r-b" style="width:25%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-b" style="width:25%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:25%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:25%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-n" style="width:50%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div></div>',
					'<div class="layout image-fgrid" style="height:300px;"><div class="p-r" style="width:25%;height:100%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r-b" style="width:50%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-b" style="width:25%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:25%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:25%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-n" style="width:25%;height:50%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div></div>',
					'<div class="layout image-fgrid" style="height:500px;"><div class="p-r-b" style="width:25%;height:60%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r-b" style="width:25%;height:60%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-b" style="width:50%;height:40%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-n f-r" style="width:25%;height:60%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r f-r" style="width:25%;height:60%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:50%;height:40%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div></div>',
					'<div class="layout image-fgrid" style="height:500px;"><div class="p-r-b" style="width:70%;height:40%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-b" style="width:30%;height:40%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:35%;height:60%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-r" style="width:35%;height:60%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-b" style="width:30%;height:30%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div><div class="p-n" style="width:30%;height:30%;"><div class="image-fglink img-b img-p"><img src="images/s.gif"></div></div></div>'
				]
		}
	});

})(CF,jQuery);