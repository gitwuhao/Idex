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
			var len=this.getAll(activeElement).length,
				LayoutPanel=this.app.LayoutPanel;
			if(len==1){
				LayoutPanel.disabled('del');
			}else{
				LayoutPanel.enabled('del');
			}

			LayoutPanel.enabled('copy');
			LayoutPanel.disabled('new');
			LayoutPanel.disabled('saveas');
		}
	});

})(CF,jQuery);