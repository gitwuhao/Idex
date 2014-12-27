(function(CF,$){
	var __INDEX__=parseInt((''+$.timestamp()).match(/(\d{5}$)/)[0]),
		__SUFFIX__='PR'+$.randomChar(3);


		function getPanelID(){
			return (__INDEX__++ )  + __SUFFIX__;
		};



	$.push({
		_isUIModule_:true,
		_className_ : 'TabPanel',
		_name_ : 'PropertyPanel',
		autoRender:false,
		cls:'idex-property-tab-panel',
		items : [{
			active:true,
			cls:'property',
			label:'属性'
		}],
		initModule : function(){
			this.logger(this);
			this.createPanel();

			this.$layoutTabView=this.getTab('property').$tabview;

			var html=['<div class="idex-ui-property-disabled-panel"></div>'];
			var div=$.createElement(html.join(''));
			this.$layoutTabView.append(div);
			this.$disabledPanel=$(div);

		},
		setActive : function(layout){
			this.logger(this);
			if(this.activePanel && (this.activePanel == layout)){
				return;
			}else if(this.activePanel){
				$(this.activePanel).hide();
			}
			var panel=this.getPanel(layout);
			this.activePanel=panel;
			$(panel).show();
			if(!layout){
				this.on('propertyFormShow');
			}else{
				layout.on('propertyFormShow');
			}
			this.activeForm=layout.form;
		},
		getPanel:function(layout){
			this.logger(this);
			var id=layout.__PROPERTY_PANEL_ID__;
			if(id){
				return this.app.get(id);
			}
			layout.__PROPERTY_PANEL_ID__=getPanelID();
			var form=layout.getPropertyForm(this.$layoutTabView[0]);
			layout.getPropertyForm=CF.emptyFunction;
			return form.$elem[0];
		},
		disabledForm : function(){
			this.logger(this);
			if(this.activeForm && !this.isDisabledForm){
				this.activeForm.disabled();
				this.$elem.addClass('disabled');
				this.isDisabledForm=true;
			}
		},
		enabledForm : function(){
			this.logger(this);
			if(this.activeForm && this.isDisabledForm){
				this.activeForm.enabled();
				this.$elem.removeClass('disabled');
				delete this.isDisabledForm;
			}
		}
	});

})(CF,jQuery);