/*
 * Canvas2Image v0.1
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */

var Canvas2Image = (function() {

	// check if we have canvas support
	var bHasCanvas = false;
	var oCanvas = document.createElement("canvas");
	if (oCanvas.getContext("2d")) {
		bHasCanvas = true;
	}

	// no canvas, bail out.
	if (!bHasCanvas) {
		return {
			saveAsBMP : function(){},
			saveAsPNG : function(){},
			saveAsJPEG : function(){}
		}
	}

	var bHasImageData = !!(oCanvas.getContext("2d").getImageData),
		bHasDataURL = !!(oCanvas.toDataURL);
	//var bHasBase64 = !!(window.btoa);

	return {
		/*
		{
			canvas : canvas,
			isReturnImg:false,
			width: width,
			height: height,
			title : ''
		}
		*/
		saveAsPNG : function(oCanvas, filename) {
			if (!bHasDataURL) {
				alert('应该浏览器无法导出图片...');
				return false;
			}
			return this.saveAs(oCanvas,'png',filename);
		},
		saveAsJPEG : function(oCanvas, filename) {
			if (!bHasDataURL) {
				alert('应该浏览器无法导出图片...');
				return false;
			}
			return this.saveAs(oCanvas,'jpg',filename);
		},
		saveAs : function(oCanvas,type,filename){
			var data = this.getImageStreamData(oCanvas,type);
			if(data){
				saveFile(data,type,filename);
				return true;
			}
			return false;
		},
		getImageStreamData : function(oCanvas,type){
			var mime;
			if(type=='jpg'){
				mime='image/jpeg';
			}else if(type=='png'){
				mime='image/png';
			}
			try{
				var strData = oCanvas.toDataURL(mime);
				return strData.replace(mime, 'image/octet-stream');
			}catch(e){
				console.error(e);
			}
			return null;
		}
	};

	function saveFile2(strData,type,filename) {
		var oGrayImg = new Image();
		oGrayImg.src = strData;
		$(document.body).empty();
		$(document.body).append(oGrayImg);
	}

	function saveFile(strData,type,filename) {

		var save_link = document.createElement('a');
		save_link.href = strData;
		save_link.download = filename+'.'+type;
	   
		//var event = document.createEvent('MouseEvents');
		//event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		//save_link.dispatchEvent(event);
		save_link.click();
	};

})();