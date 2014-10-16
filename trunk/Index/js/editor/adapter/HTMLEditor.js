(function(CF,$){

	$.push({
		_name_ : 'HTMLEditor',
		initModule : function(){
			this.logger(this);
		},
		filter : function(html){
			
			if(this.app.isLocked){
				return;
			}

			if(/^\s*$/.test(html)){
				return html='';
			}
			
			this.app.isLocked=true;

			var element=$.createElement('<div></div>');
			element.innerHTML=html;

			HTMLfilter.filter({
				isRemoveEmptyAttr : true,
				//isRemoveInnerStyle : false,
				isRemoveTransparentColor : true,
				'*' :{
					'^id' : function(){
						if(this.id){
							this.setAttribute('_id_',this.id);
							this.removeAttribute('id');
						}
					}, 
					'^name' : function(){
						if(this.name){
							this.setAttribute('_na_',this.name);
							this.removeAttribute('name');
						}
					},
					'^class' : function(){
						if(this.className){
							this.setAttribute('_c_',this.className);
							this.removeAttribute('class');
						}
					}
				},
				'@remove' : ['meta','iframe','style','noscript','script','link','html','^body$','^head$','^title$','frame','#comment',':']
			},element);

			HTMLfilter.getOuterHTML(element,this.app.ViewPanel.__OUTPUT_RULES__);
				
			this.app.isLocked=false;
			return element.innerHTML;
		}
	});
	
})(CF,jQuery);