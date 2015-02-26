(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsSubLayoutContainer',
		_name_ : 'image-col',
		title : '列',
		onActiveElementAfter : function(activeElement,deActiveElement){
			this.logger(this);
			var len=this.getAll(activeElement).length,
				LayoutPanel=this.app.LayoutPanel;
			if(len==2){
				LayoutPanel.enabled('new');
				LayoutPanel.enabled('copy');
				LayoutPanel.disabled('del');
			}else if(len==3){
				LayoutPanel.enabled('new');
				LayoutPanel.enabled('copy');
				LayoutPanel.enabled('del');
			}else if(len==4){
				LayoutPanel.disabled('new');
				LayoutPanel.disabled('copy');
				LayoutPanel.enabled('del');
			}
			LayoutPanel.disabled('saveas');
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
			if(len==2){
			}else if(len==3){
			}else if(len==4){
			/*
			}else if(len==5){
				$parentElement.addClass('col5');
			*/
			}else{
				return;
			}
			$parentElement.removeClass('col2 col3 col4');
			$parentElement.addClass('col'+len);
		}
	});

})(CF,jQuery);