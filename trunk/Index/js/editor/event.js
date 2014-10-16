(function(CF,$){
	$.push({
		_name_ : '_temp_module_',
		initModule : function(){
			this.logger(this);
			this.app.event=this.event;
		},
		event:{
			isTargetHandle : function(event){
				if(event.target.__isEventDispatch__){
					return true;
				}
				return false;
			},
			targetHandle:function(event){
				if(!event.target.__isEventDispatch__){
					event.target.__isEventDispatch__=true;
					return true;
				}
				return false;
			},
			removeTargetHandle:function(event){
				if(event.target.__isEventDispatch__){
					delete event.target.__isEventDispatch__;
					return true;
				}
				return false;
			}
			
		}
	});
})(CF,jQuery);