(function(CF,$){
	var list={};
	CF.merger(list,Idex.view.list,{
		items : [{
			active:true,
			label:'描述列表',
			html :[
				    '<div class="idex-list-form-box"></div>',
				    '<div class="idex-list-splitline"></div>',
				    '<div class="idex-list-view-box"></div>',
				  ].join(''),
			_form_ : {
				items : [{
					label:'宝贝编号',
					name : 'id',
					placeholder : '粘贴宝贝ID或链接'
				},{
					label:'宝贝标题',
					name : 'title',
					placeholder : '填写宝贝标题'
				},{
					label:'商家编码',
					name : 'code',
					placeholder : '填写商家编码'
				},{
					label:'描述类型',
					xtype:'radio',
					name : 'type',
					items:[{
						label:'全部&nbsp;&nbsp;&nbsp;',
						value : '1',
						checked : true
					},{
						label:'默认&nbsp;&nbsp;&nbsp;',
						value:'2'
					},{
						label:'Idex&nbsp;&nbsp;&nbsp;',
						value:'3'
					}]
				},{
					label:'商家分类',
					name : 'itemid',
				}],
				buttons:[{
					label:'查询',
					onClick:function(){

					}
				},{
					label:'重置',
					onClick:function(){

					}
				}]
			},
			onTagClick:function(){
				console.info("onTagClick:"+this.label);
			},
			onLoad:function(){
				this.$formbox=this.$tabview.children('.idex-list-form-box:first');
				this.$viewbox=this.$tabview.children('.idex-list-view-box:first');

				this._form_.render=this.$formbox[0];

				this.form=new ui.form(this._form_);
			}
		},{
			label:'描述模板',
			onTagClick:function(){
				console.info("onTagClick:"+this.label);

			},
			onLoad:function(){
				
			}
		}],
		onShow : function(){
			this.$render.show();
		
		},
		onHide : function(){
			this.$render.hide();
			
		}
	});

	Idex.view.list.init=function(){
		Idex.view.list=new ui.tab(list);
	};	

})(CF,jQuery);