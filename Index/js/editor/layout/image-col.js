(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsSubLayoutContainer',
		_name_ : 'image-col',
		title : '列',
		onActiveElementAfter : function(activeElement,deActiveElement){
			this.logger(this);
			var len=this.getAll(activeElement).length;
			if(len==3){
				this.app.LayoutPanel.enabled('new');
				this.app.LayoutPanel.enabled('copy');
				this.app.LayoutPanel.disabled('del');
			}else if(len==4){
				this.app.LayoutPanel.disabled('new');
				this.app.LayoutPanel.disabled('copy');
				this.app.LayoutPanel.enabled('del');
			}
			this.app.LayoutPanel.disabled('saveas');
			this.changeCol(activeElement);
		},
		onCopy : function(activeElement){
			this.logger(this);
		},
		onNew : function(activeElement){
			this.logger(this);
		},
		changeCol : function(activeElement){
			this.logger(this);
			var len=this.getAll(activeElement).length,
				parentElement=this.getParentElement(activeElement),
				$parentElement=$(parentElement);
			if($parentElement.hasClass('col'+len)){
				return;
			}
			$parentElement.removeClass('col3 col4');
			if(len==3){
				$parentElement.addClass('col3');
			}else if(len==4){
				$parentElement.addClass('col4');
			/*
			}else if(len==5){
				$parentElement.addClass('col5');
			*/
			}
		}
	});

})(CF,jQuery);