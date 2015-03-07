(function(CF,$){
var BORDER_COLOR='border-top-color';
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
		$.style(this.activeElement.firstElementChild,BORDER_COLOR,(value||'#DDD'));
	},
	getColor : function(){
		return $.style(this.activeElement.firstElementChild,BORDER_COLOR);
	}
});
})(CF,jQuery);