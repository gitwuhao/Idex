// Copyright 2007.  Adobe Systems, Incorporated.  All rights reserved.
// This script will export each layer in the document to a separate file.
// Written by Naoki Hada
// ZStrings and auto layout by Tom Ruark

/*
@@@BUILDINFO@@@ Export Layers To Files.jsx 1.0.0.16
*/

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop;

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 0;
// debugger; // launch debugger on next line



//=================================================================
// Globals
//=================================================================

///////////////////////////////////////////////////////////////////////////////
// Dispatch
///////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////////////////
// Functions
///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////
// Function: main
// Usage: the core routine for this script
// Input: <none>
// Return: <none>
///////////////////////////////////////////////////////////////////////////////

var cropArray=new Array(),
	activeDocument = app.activeDocument,
	historyState,
	displayDialogs = app.displayDialogs,
	jpegOptions = new JPEGSaveOptions();

jpegOptions.quality=12;

function initCropArray(){
	var item = new Object();
	item['region']=[0,0,750,500];
	item['name']='A1';
	cropArray.push(item);

	item = new Object();
	item['region']=[750,500,1500,1500];
	item['name']='A2';
	cropArray.push(item);
};

function getRegion(region){
	for ( var i = 0,len=region.length; i < len; i++ ) {
		region[i]=new UnitValue( region[i] +' pixels' );
	}
	return region;
};


function main() {
	
	historyState= activeDocument.activeHistoryState;
	
	app.displayDialogs = DialogModes.NO;

	initCropArray();


	var dir=Folder( activeDocument.path+'/ide_jpg/' );

	dir.create();

	for ( var i = 0,len=cropArray.length; i < len; i++ ) {
		var item=cropArray[i];
		saveAsJPEG(getRegion(item.region),item.name);
	}

	app.displayDialogs = displayDialogs;

	alert('   Finish ...\n   Browse Directory  :  ' + dir.fsName + '   ','Finish');

	 /*     var file = files[i];
	 

			var msg = "absoluteURI: " + dir.absoluteURI +
                            "\ndisplayName: " + dir.displayName +
                            "\nfsName: " + dir.fsName +
                            "\nfullName: " + dir.fullName +
                            "\nlocalizedName: " + dir.localizedName +
                            "\nname: " + dir.name +
                            "\npath: " + dir.path +
                            "\nrelativeURI: " +  dir.relativeURI;
            alert (msg);
     */
/*


var myWidth = new UnitValue( "500 pixels" );

alert

Folder( subFolderText ).create();

*/

	
	//alert(app.path);
	//alert(activeDocument.path);
	
	//alert(activeDocument.fullName);
	//alert(activeDocument.name);



//activeDocument.activeHistoryState = historyState;

    //return 'cancel'; // quit, returning 'cancel' (dont localize) makes the actions palette not record our script
    
};
/*
	[left, top, right, bottom].
*/
function saveAsJPEG(region,fileName){
	
	activeDocument.crop(region);
	

	activeDocument.saveAs( File(activeDocument.path+'/ide_jpg/'+fileName+'.jpg'), jpegOptions );

	
	activeDocument.activeHistoryState = historyState;
};






main();
