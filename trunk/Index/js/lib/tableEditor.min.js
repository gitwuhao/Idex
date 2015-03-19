var editorPath=window.BASE_PATH+'teditor/';
$.includePack('css',editorPath+'css/imports.css');				
$.loadJSQueue(
		editorPath+'js/ui.js',
		editorPath+'js/core/commands.js',
		editorPath+'js/core/selectedMergeCell.js',
		editorPath+'js/core/selected.js',
		editorPath+'js/core/add.js',
		editorPath+'js/core/split.js',
		editorPath+'js/core/style.js',
		editorPath+'js/core/merge.js',
		editorPath+'js/core/delrow.js',
		editorPath+'js/core/delcol.js',
		editorPath+'js/core/InsertImage.js',
		editorPath+'js/core/slider.js',
		editorPath+'js/core/ImportTable.js',
		editorPath+'js/core/EventListener.js'
);