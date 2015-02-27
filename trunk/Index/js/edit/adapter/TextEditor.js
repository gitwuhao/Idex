(function(CF,$){

	$.push({
		_name_ : 'TextEditor',
		initModule : function(){
			this.logger(this);
			$.getDoc().one('editoruiready',{
				app : this.app,
				module : this
			},function(event,editor){	
				var data=event.data,
					module=data.module;
				module.onReady(editor);
			});
		},
		init : function(){
			if(ui.editor instanceof ui.toolbar){
				$.getDoc().trigger('editoruiready',ui.editor);
			}else{
				var editorPath=BASE_PATH+'editor/';
				$.includePack('css',editorPath+'css/editor.css');
				$.loadJSQueue(
					editorPath+'js/editor.config.js',
					editorPath+'js/core/browser.js',
					editorPath+'js/core/utils.js',
					editorPath+'js/core/EventBase.js',
					editorPath+'js/core/dtd.js',
					editorPath+'js/core/domUtils.js',
					editorPath+'js/core/Range.js',
					editorPath+'js/core/Selection.js',
					editorPath+'js/core/Editor.js',
					editorPath+'js/core/node.js',
					editorPath+'js/core/htmlparser.js',
					editorPath+'js/plugins/inserthtml.js',
					editorPath+'js/plugins/justify.js',
					editorPath+'js/plugins/font.js',
					editorPath+'js/plugins/horizontal.js',
					editorPath+'js/plugins/paste.js',
					editorPath+'js/plugins/basestyle.js',
					editorPath+'js/plugins/removeformat.js',
					editorPath+'js/plugins/list.js',
					editorPath+'js/plugins/undo.js',
					editorPath+'js/editor.js'
				);
			}
		},
		onReady : function(editor){
			editor.initEditor(this.app.ViewPanel.$popuBox);
			
			this.instance=editor;

			var me=this;
			function clickHandle(){
				me.on(this.cls);	
			};
			editor.getItem('exiteditor').onClick = clickHandle;
			editor.$box.addClass('idex-desc-box');
			
			
			$.setTimeout(function(){
				this.initCallBack();
				delete this.initCallBack;
			},50,this);

			delete this.onReady;

		},
		onExiteditor : function(){

			var html=this.instance.getContent();

			this.instance.hide();
			
			this.instance.$container.removeAttr('style');
			ui.popu.removeMask();
			
			this.app.ViewPanel.enabledSrcoll();

			ui.UndoManager.start();

			//if(this.instance.hasChange()){
				this.instance.reset();
				this.config.callback(html);
			//}else{
			//	this.instance.reset();
			//}
			
			delete this.config;

			
			this.app.isLocked=false;

			
			this.app.$eventElement.off('.one');

		},
		render : function(config){
			if(this.app.isLocked){
				return;
			}
			
			if(this.init){
				this.initCallBack=function(){
					this.render(config);
				};
				this.init();
				delete this.init;
				return;
			}else if(this.config){
				return;
			}
			
			
			if(this.instance==null || this.instance.$elem==null || !config.target){
				return;
			}

			this.app.isLocked=true;

			this.config=config;

			this.app.trigger('cleanfloatpanel');

			this.app.ViewPanel.disabledSrcoll();
			
			ui.UndoManager.stop();

			var target=config.target,
				$target=$(target),
				offset=$.getOffsetParentPoint(target,target.offsetParent),
				width=target.clientWidth,
				height=target.clientHeight,
				cStyle=window.getComputedStyle(target),
				paddingRight=$target.outerWidth() - width,
				paddingBottom=$target.outerHeight() - height,
				bgColor,
				zindex=0;

			//this.srcollToElement(target);

			zindex=ui.popu.createMask({
				$elem : this.instance.$elem,
				target : this.instance.getItem('exiteditor').$elem[0],
				onClick : function(event){
					this.$elem.addClass('shake-animation');
					$.setTimeout(function(){
						this.$elem.removeClass('shake-animation');
						ui.quicktip.show({
							time : 2000,
							//px : 'idex-ui',
							html : '<span style="color: #0A0;">点击退出按钮完成编辑</span>',
							offset : 'tl',
							align : 'tc',
							cls : 'qit-autosize',
							target : this.target
						});
					},1500,this);
					event.stopBubble();
				}
			});
			
			zindex++;

			bgColor=cStyle['background-color'];
			var array=bgColor.match(/(\d+)/g);
			if(array && array[3]=='0'){
				//bgColor='#FFF';
				bgColor='';
			}

			var css={
				left : offset.left,
				top : offset.top,
				width : width,
				'min-height' : height,
				padding : cStyle.padding,
				'background-color' : bgColor,
				//'padding-right' : paddingRight,
				//'padding-bottom' : paddingBottom,
				'z-index' : zindex
			};
			/*
			if(height>500){
				css.height=500;
			}else{
				css['min-height']=height;
			}
			*/
			this.instance.$container.css(css);
			
			this.instance.setContent(target.innerHTML);

			$.removeClass(target,'idex-r-active');

			this.instance.show();

			if(this.initOffset){
				this.initOffset($target.offset());
			}
			
			zindex++;

			this.instance.$elem.css({
				'z-index' : zindex
			});

			this.app.$eventElement.one('esc.one',{
				me : this,
			},function(event){
				$.setTimeout(function(){
					this.onExiteditor();
				},100,event.data.me);
				return false;
			});

		},
		initOffset : function(offset){
			var $elem=this.instance.$elem,
				top=offset.top - $elem[0].clientHeight - 5;
			if(top<=0){
				top=2;
			}
			$elem.css({
				left : offset.left,
				top : top
			});
			
			delete this.initOffset;
		}
	});
	
})(CF,jQuery);