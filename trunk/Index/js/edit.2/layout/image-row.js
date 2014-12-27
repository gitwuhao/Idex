(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsSubLayoutContainer',
		_name_ : 'image-row',
		title : '行',
		initModule : function(){
			this.logger(this);
		},
/*
		onNew : function(element){
			this.logger(this);
			var node=this.getPrevElement(element);
			if(!node){
				node=this.getNextElement(element);
			}
			element.innerHTML=this.getInnerHTML(node);
			element.style.cssText=node.style.cssText;
		},
*/
		onActiveElementAfter:function(activeElement,deActiveElement){
			this.logger(this);
			this.callPrototypeMethod();
			this.app.LayoutPanel.disabled('new');
			this.app.LayoutPanel.disabled('saveas');
		}
	});

})(CF,jQuery);