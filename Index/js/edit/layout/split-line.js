(function(CF,$){
var BORDER_COLOR='border-top-color';


function getLineConfig(){
return {
	setPaddingTop : function(value){
		$.style(this.activeElement,'margin-top',value);
	},
	getPaddingTop : function(){
		var padding=this.activeElement.style['margin-top'];
		return (padding||'').replace('px','');
	},
	setPaddingBottom : function(value){
		$.style(this.activeElement,'padding-bottom',value);
	},
	getPaddingBottom : function(){
		var padding=this.activeElement.style['padding-bottom'];
		return (padding||'').replace('px','');
	},
	setPaddingLeft : function(value){
		$.style(this.activeElement,'margin-left',value);
	},
	getPaddingLeft : function(){
		var padding=this.activeElement.style['margin-left'];
		return (padding||'').replace('px','');
	},
	setPaddingRight : function(value){
		$.style(this.activeElement,'margin-right',value);
	},
	getPaddingRight : function(){
		var padding=this.activeElement.style['margin-right'];
		return (padding||'').replace('px','');
	},
	setStyle : function(value){
		$.removeClass(this.activeElement,'idex-r-active s2 s3');
		if(value=='2' || value=='3'){
			$.addClass(this.activeElement,('s'+value));
		}
	},
	getStyle : function(){
		var value='1',
			target=this.activeElement;
		if($.hasClass(target,'s2')){
			value='2';
		}else if($.hasClass(target,'s3')){
			value='3';
		}
		return value;
	},
	setColor : function(value){
		$.style(this.activeElement,BORDER_COLOR,(value||'#DDD'));
	},
	getColor : function(){
		return $.style(this.activeElement,BORDER_COLOR);
	}
};
};
 

$.push({
	_isLayoutModule_ : true,
	_className_ : 'AbsSingleLayout',
	_name_ : 'split-line',
	title : '分割线',
	initModule : function(){
		this.extend(this);
	},
	getLineItemConfig : getLineConfig,
	extend : function(layout){
		var config=this.getLineItemConfig();
		CF.apply(layout,config);
		CF.setOwner(layout,layout);
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
	getFormItemConfig : function(){
		return this.getBaseLineItemConfig();
	},
	getBaseLineItemConfig : function(){
		return [{
			label:'上',
			name : 'paddingTop',
			placeholder :'边距',
			unit:'px',
			maxlength : 3,
			vtype : ['spin'],
			xtype:'text',
			maxValue : 50,
			minValue : 1,
			width:'110px',
			getDesc : '修改上边距'
		},{
			label:'下',
			name : 'paddingBottom',
			placeholder :'边距',
			unit:'px',
			maxlength : 3,
			vtype : ['spin'],
			xtype:'text',
			maxValue : 50,
			minValue : 1,
			width:'110px',
			getDesc : '修改下边距'
		},{
			label:'左',
			name : 'paddingLeft',
			placeholder :'边距',
			unit:'px',
			maxlength : 3,
			vtype : ['spin'],
			xtype:'text',
			maxValue : 50,
			minValue : 1,
			width:'110px',
			getDesc : '修改左边距'
		},{
			label:'右',
			name : 'paddingRight',
			placeholder :'边距',
			unit:'px',
			maxlength : 3,
			vtype : ['spin'],
			xtype:'text',
			maxValue : 50,
			minValue : 1,
			width:'110px',
			getDesc : '修改右边距'
		},'|||',{
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
		}];
	}
});
})(CF,jQuery);