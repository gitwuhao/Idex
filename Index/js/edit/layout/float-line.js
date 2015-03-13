(function(CF,$){
var H_BORDER_COLOR='border-top-color',
	V_BORDER_COLOR='border-left-color';
$.push({
	_isLayoutModule_ : true,
	_className_ : 'AbsFloatLayout',
	_name_ : 'float-line',
	title : '分割线',
	initModule : function(){
		this.logger(this);
		this.app.bindReadyAfter(this);
	},
	onAppReadyAfter : function(){
		var item=this.app.layout.getLayout('split-line');
		item.extend(this);
	},
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
	setHeight : CF.emptyFunction,
	getFormItemConfig : function(){
		var items=this.getBasePropertyForm();
		items.push('|||',{
			label:'风格',
			name : 'style',
			width:'199px',
			xtype:'radio',
			items:[{
				label : '实线',
				value : '1'
			},{
				label : '虚线',
				value : '2'
			},{
				label : '点状',
				value : '3'
			}],
			getDesc : '设置风格'
		},{
			name : 'color',
			width:'20px',
			xtype:'color',
			getDesc : '设置分割线颜色'
		},{
			label:' ',
			name : 'type',
			xtype:'radio',
			items:[{
				label : '横线',
				value : '1'
			},{
				label : '竖线',
				value : '2'
			}],
			getDesc : '设置分割线类型'		
		});
		return items;
	},
	onNew : function(element){
		this.logger(this);
		if(!this.form){
			this.getPropertyForm();
		}
		$.style(element,'width','50px');
		$.style(element,'height','100px');
		var activeElement=this.activeElement;
		this.activeElement=element;
		this.setOffset(0,-2000);
		this.activeElement=activeElement;
	},
	setColor : function(value){
		var border_color=H_BORDER_COLOR;
		if(this.getType()==2){
			border_color=V_BORDER_COLOR;
		}
		$.style(this.activeElement.firstElementChild,border_color,(value||'#DDD'));
	},
	getColor : function(){
		var border_color=H_BORDER_COLOR;
		if(this.getType()==2){
			border_color=V_BORDER_COLOR;
		}
		return $.style(this.activeElement.firstElementChild,border_color);
	},
	setType : function(value){
		var element=this.activeElement,
			width=element.clientWidth,
			height=element.clientHeight;
		$.style(element,'width',height);
		$.style(element,'height',width);


		
		var border_color=H_BORDER_COLOR;
		if(this.getType()==2){
			border_color=V_BORDER_COLOR;
		}
		color=$.style(element.firstElementChild,border_color);

		$.style(element.firstElementChild,border_color,'');
		
		
		$.removeClass(element,'h v');

		if(value==2){
			border_color=V_BORDER_COLOR;
			$.addClass(element,'v');
		}else{
			$.addClass(element,'h');
		}
		$.style(element.firstElementChild,border_color,color);
	},
	getType : function(){
		var element=this.activeElement,
			type=1;

		$.removeClass(element,'h v');

		if($.hasClass(element,'v')){
			type=2;
			$.addClass(element,'v');
		}else{
			$.addClass(element,'h');
		}
		return type;
	}
});
})(CF,jQuery);