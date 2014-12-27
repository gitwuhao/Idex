(function(CF,$){
	var IDEX_ATTR_MAP=window.IDEX_ATTR_MAP;
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
							this.setAttribute(IDEX_ATTR_MAP.ID,this.id);
							this.removeAttribute('id');
						}
					}, 
					'^name' : function(){
						if(this.name){
							this.setAttribute(IDEX_ATTR_MAP.NAME,this.name);
							this.removeAttribute('name');
						}
					},
					'^class' : function(){
						if(this.className){
							this.setAttribute(IDEX_ATTR_MAP.CLASS,this.className);
							this.removeAttribute('class');
						}
					},
					'style' : function(attr){
						HTMLfilter.removeStyle(this,{
							'@remove' : ['position','background-image','widows','^_','^-','orphans','image$']
						});
						attr.value=HTMLfilter.getStyleText(this.style);
					},
					'^idex' : function(){
						
					}
				},
				'a'  :  function(){
					var key='href',
						i_key=IDEX_ATTR_MAP.HREF,
						href,
						_href_;
					
					href=this.getAttribute(key);
					_href_=this.getAttribute(i_key);
					
					if(/^javascript:/i.test(href)){
						this.removeAttribute(key);
					}else if(/^javascript:/i.test(_href_)){
						this.removeAttribute(i_key);
					}else if(href){
						this.setAttribute(i_key,href);
						this.removeAttribute(key);
					}
				},
				'input'  :  function(){
					if(/^submit$/i.test(this.type)){
						this.setAttribute(IDEX_ATTR_MAP.TYPE,'submit');
						this.type='button';
					}
				},
				'@remove' : ['meta','iframe','style','noscript','script','link','html','^body$','^head$','^title$','frame','object','param','#comment',':']
			},element);

			//HTMLfilter.getOuterHTML(element,this.app.ViewPanel.__OUTPUT_RULES__);
				
			this.app.isLocked=false;
			return element.innerHTML;
		}
	});
	
})(CF,jQuery);