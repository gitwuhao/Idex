(function(CF,$){
	$.push({
		_isLayoutModule_ : true,
		_className_ : 'AbsSingleLayout',
		_name_ : 'user-table',
		title : '表格',
		getPropertyForm : function (box){
			this.logger(this);
			var me=this;
			this.form=this.app.CreatePropertyForm({
				$owner : this,
				id : this.__PROPERTY_PANEL_ID__,
				render : box,			
				items : [{
					isPadding: true,
					width: '10px',
					height: '30px'
				},{
					label:'编辑',
					xtype:'button',
					name :'editor',
					onClick : function(){
						me.onEditor();
					}
				}]
			});
			return this.form;
		},
		onEditor : function(){
			var $table=$('table:first',this.activeElement);
			this.app.TableEditor.render({
				me : this,
				activeElement : this.activeElement,
				target : $table[0],
				$target : $table
			});
		},
		onDblclick : function(event){
			this.editor();
		},
		onMouserightdown:function(event){
			this.editor();
		},
		editor : function(){
			$.setTimeout(function(){
				this.onEditor();
			},100,this);
		}
	});

})(CF,jQuery);