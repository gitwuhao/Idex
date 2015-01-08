(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsLayout',
		_name_ : 'image-text',
		title : '图文',
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
					xtype:'text',
					getDesc : '设置图文高度'
				},{
					label:'比例',
					cls:'s3 breakline',
					xtype:'radio',
					name: 'wtype',
					items:[{
						label : '3:7',
						value : '3'
					},{
						label : '4:6',
						value : '4'
					},{
						label : '5:5',
						value : '5'
					},{
						label : '6:4',
						value : '6'
					},{
						label : '7:3',
						value : '7'
					}],
					getDesc : '修改比例'
				},{
					label:'风格',
					cls:'s3',
					xtype:'radio',
					name: 'pstyle',
					items:[{
						label : ' 1图',
						value : '1'
					},{
						label : ' 2图',
						value : '2'
					}],
					getDesc : '修改图文风格'
				},{
					label:' ',
					cls:'s3',
					xtype:'radio',
					name: 'vstyle',
					items:[{
						label : '图左',
						value : 'l'
					},{
						label : '图右',
						value : 'r'
					}],
					getDesc : '修改图文风格'
				}]
			});
			return this.form;
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
		setPstyle : function(value){
		
		},
		getPstyle : function(){
			this.logger(this);
			return $('img',this.activeElement).length;
		},
		setVstyle : function(value){
			this.logger(this);
			var activeElement=this.activeElement;

			$(activeElement.firstElementChild).insertAfter(activeElement.lastElementChild);
		},
		getVstyle : function(){
			this.logger(this);
			var value,
				div=this.activeElement.firstElementChild;
			if($.hasClass(div,'i-box')){
				value='l';
			}else if($.hasClass(div,'t-box')){
				value='r';
			}
			return value;
		},
		setWtype : function(value){
			this.logger(this);
			var activeElement=this.activeElement;
			$.removeClass(activeElement,'w3 w4 w5 w6 w7');
			$.addClass(activeElement,'w'+value);
		},
		getWtype : function(){
			this.logger(this);
			var value=0,
				activeElement=this.activeElement;
			if($.hasClass(activeElement,'w3')){
				value=3;
			}else if($.hasClass(activeElement,'w4')){
				value=4;
			}else if($.hasClass(activeElement,'w5')){
				value=5;
			}else if($.hasClass(activeElement,'w6')){
				value=6;
			}else if($.hasClass(activeElement,'w7')){
				value=7;
			}
			return value;
		}
	});

})(CF,jQuery);