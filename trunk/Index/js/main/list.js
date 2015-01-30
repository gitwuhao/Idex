(function(CF,$,Idex){
var TAB;

function initTab(render){
	if(TAB && TAB._owner_name_==ui.tab._owner_name_){
		return;
	}
	TAB=new ui.tab({
		render : render,
		items : [{
			label:'描述列表',
			name : 'list',
			html :[
					'<div class="idex-form-box"></div>',
					'<div class="idex-list-box">',
						'<div class="idex-list-view not-result">',
							'空空的列表...',
						'</div>',
						'<div class="idex-status-box"></div>',
					'</div>',
				  ].join(''),
			onShowAfter : function(){
				this.$floatbox.show();
			},
			onHideAfter : function(){
				this.$floatbox.hide();
			},
			onLoad:function(){
				this.$formbox=this.$tabview.children('.idex-form-box:first');
				this.$listbox=this.$tabview.children('.idex-list-box:first');
				this.$viewbox=this.$listbox.children('.idex-list-view:first');
				this.$statusbox=this.$listbox.children('.idex-status-box:first');
				
				var form=Idex.view.list.getForm();
				
				delete Idex.view.list.getForm;

				form.render=this.$formbox[0];

				form.$owner=this;

				form.tab=this.$owner;

				form.tabPanel=this;

				this.form=new ui.form(form);


				var div,
					html=['<div class="x-ui-floatbar-box">',
							'<div class="idex-sortbar-box">'
						 ];

				for(var i=0,len=this.sortbar.length;i<len;i++){
					var cls,
						item=this.sortbar[i];
					html.push(	'<div class="idex-sort-button" >',item.label,
									'<div class="idex-icon sort"></div>',
								'</div>');
				}
				html.push(  '</div>',
							'<div class="idex-search-box"></div>',
						  '</div>');
				div=$.createElement(html.join(''));

				this.$owner.$tabbarbox.before(div);
				this.$floatbox=$(div);

				var children=this.$floatbox.children();

				this.initSortBarBox(children[0]);
				this.initSearchText(children[1]);
			},
			sortbar : [{
				field :'publish_time',
				label :'发布时间'
				//type : 'asc',
				//orderType : 0
			},{
				field :'edit_time',
				label :'编辑时间'
			}],
			sortButtonClick : function(item){
				if(this.activeSortItem){
					this.activeSortItem.$elem.removeClass('desc asc');
				}
				if(item.type=='desc'){
					item.type='asc';
					item.orderType=0;
				}else{
					item.type='desc';
					item.orderType=1;
				}
				item.$elem.addClass(item.type);
				this.activeSortItem=item;
				
				this.form.$orderCol.val(item.field);
				this.form.$orderType.val(item.orderType);

				this.form.submit();

			},
			showSortBar : function(){
				this.$sortbarbox.show();
				if(this.activeSortItem){
					this.form.$orderCol.val(this.activeSortItem.field);
					this.form.$orderType.val(this.activeSortItem.orderType);
				}
			},
			hideSortBar : function(){
				this.$sortbarbox.hide();
				this.form.$orderCol.val('');
				this.form.$orderType.val('');
				if(this.activeSortItem){
					this.activeSortItem.$elem.removeClass('desc asc');
				}
			},
			initSortBarBox : function(sortbarbox){
				this.$sortbarbox=$(sortbarbox);
	 
				var children=this.$sortbarbox.children();
			
				for(var i=0,len=this.sortbar.length;i<len;i++){
					var item = this.sortbar[i];
					item.$elem=$(children[i]);

					item.$elem.click({
						item : item,
						$owner : this
					},function(event){
						var data=event.data;
						data.$owner.sortButtonClick(data.item);
					});
				}
			},
			initSearchText : function(searchbox){
				this.seach.render = searchbox;

				var seach=new ui.form.text(this.seach);

				seach.form=this.form;

				this.seach=seach;
			},
			seach : {
				icon :'search',
				placeholder : '粘贴宝贝链接回车查询',
				onRenderAfter : function(){
					this.callPrototypeMethod();
					this.addEventListener('textkeydown',function(event){
						 if(event.keyCode==13){
							this.value=this.$text.val();
							if(this.value){
								this.submit();
							}
						 }
					});

					this.$text.on("paste",{
						me : this
					},function(event){
						var array,
							value=$.getClipboardTextData(event);
						if(!value){
						}else if(value.indexOf('item.taobao.com')>-1 || value.indexOf('detail.tmall.com')>-1){
							array=value.match(/id=(\d{10,13})/i);
							if(array && array.length==2){
								this.value=array[1];
							}
						}else if(event.data.me.REG_NUMIID.test(value)){
							this.value=value;
						}
						return false;
					});
				},
				onIconmousedown : function(event){
					this.submit();
				},
				REG_NUMIID : /^[1234]\d{9,12}$/,
				showQuicktip : function(html){
					ui.quicktip.show({
						align : 'lc',
						offset : 'lt',
						cls : 'list-search-quicktip c1',
						html : html,
						target :  this.$elem[0]
					});
				},
				submit : function(){
					var value=this.value;
					if(!this.REG_NUMIID.test(value)){
						this.showQuicktip('宝贝ID不正确，可直接复制宝贝链接贴入。<div class="shortcuts c2">清空：Shift`+`Backspace</div>'.formatHTML());
						return;
					}
					this.form.query('numIID='+value,this.form.Q_TYPE.GET);
				}
			}
		},{
			label:'描述模板',
			name : 'template',
			onLoad : function(){
				Idex.view.template.init(this);
			}
		}]
	});
};


Idex.addEventListener('anchor.list',function(event){
	this.setViewPanel('list');
	initTab(this.activeViewPanel);
	TAB.setCurrentTab(TAB.getTab('list'));
});


Idex.addEventListener('anchor.template',function(event){
	this.setViewPanel('list');
	initTab(this.activeViewPanel);
	TAB.setCurrentTab(TAB.getTab('template'));
});


})(CF,jQuery,Idex);
