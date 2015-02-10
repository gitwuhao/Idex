(function(CF,$){
	$.sessionExpired={
		show : function(){
			console.info('show auth win...');
		}
	};

	$.getDoc().on('sessionExpired',function(event){
		$.sessionExpired.show();
	});
})(CF,jQuery);