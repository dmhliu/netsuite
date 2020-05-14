/**
 * zplfun.js
 * @NApiVersion 2.x
 * @NModuleScope Public
 * Module Description
 * Version    Date            Author           Remarks
 * 0.10.16     16 Oct 2018     azalea
 * 
 * regression testing: need to check scripts that load this module
 * transactions saving -
 * item save 
 * item print / regen label buttons
 *
 */
	define(['N/record','N/log', 'N/runtime'], function(record, log, runtime){

	function encode64(text){
		var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};
		return Base64.encode(text);
	} //function encode64
	
	  /**
     * Function definition getZplText: given an item, returns zpl txt 
     * 
     * @param {Object}  context
     * @param {Record}  context.objItem item record
     * @param {integer} context.numCopies number of labels per record to generate
     * @param {integer} context.labelFormatId     //override the items preferred labelformat
     * version 0.10.16
     */

	function genItemZPL(context)	{
		log.audit({title: 'zplfun.genItemZpl'});
   		var rec = context.objItem;
   		var qty = (context.numCopies) ? context.numCopies : 1; 
   		var labelformat = 1;									//default to standard
   		if (context.labelFormatId) {	
   			labelformat = context.labelFormatId;
   		} else  {
   			labelformat = rec.getValue({fieldId :'custitem_az_itemlabel_format_sel'});
   			labelformat = (labelformat) ? labelformat : 1;
   		}
   		var zplfmt = record.load({type: 'customrecord_az_itemlabel_format',id: labelformat});
   		var zpltext =  zplfmt.getValue({fieldId : 'custrecord_az_itemlabel_fmt_zpl'});
   		var brandname = 	rec.getText({fieldId : 'custitem_azalea_item_vendor'});
        var style = 		rec.getValue({fieldId: 'custitem_psgss_style_number'});
   		var displayname = 	rec.getValue({fieldId: 'displayname'});
   		var upccode = 		rec.getValue({fieldId: 'upccode'});
   		var SKU  = 			rec.getValue({fieldId: 'itemid'});
   		var origprc = 		rec.getValue({fieldId: 'custitem_azalea_item_orig_price'});
   		var color = 		rec.getValue({fieldId: 'custitem_az_item_color_lookup'});
   		var price = 		rec.getSublistValue({sublistId : 'price1', fieldId : 'price_1_', line : 0});
   		zpltext = zpltext.replace('{custitem_azalea_item_vendor}',brandname); //old
        zpltext = zpltext.replace('{brand}',brandname);
      	zpltext = zpltext.replace('{style}',style);
   		zpltext = zpltext.replace('{displayname}',displayname);
   		zpltext = zpltext.replace('{origprc}',origprc);
   		zpltext = zpltext.replace('{price1}',price);
   		zpltext = zpltext.replace('{upccode}', upccode);
   		zpltext = zpltext.replace('{name}', SKU);
   		zpltext = zpltext.replace('{color}', color);
   		if (!(upccode.charAt(0) == '0')){   			 //if not a 6 digit upc starting with zero
			zpltext = zpltext.replace('^BCN,','^BC,') // print in code 128
		}
		zpltext = zpltext.slice(0, -3) + ('^PQ'+qty+'^XZ') ; // insert label qtybefore ^XZ
   		return zpltext;
   	}//function genItemZPL
//set value for single item 
/**
 * Function definition  setItemZpl({objItem: record})
 * *DOES*NOT*SAVE*
 * version 0.9.25
 */
	function setItemZpl(context){
		log.audit({title: 'zplfun.setItemZpl'});
   		var rec = context.objItem;
   		var itemZplText= genItemZPL(context);
		var itemZPL64 = encode64(itemZplText);
		var itemZplEncoded = encodeURIComponent(itemZplText);
		rec.setValue({fieldId: 'custitem_az_zpl_base64', value: itemZPL64}); //TODO use try 
		rec.setValue({fieldId: 'custitem_az_item_label_zpl_escaped', value: itemZplEncoded});
	}//setItemZpl

/**
	* Function definition generateZPL: given a record object get the zpl code as text string
	* 	labels for all lines in the item sublist
    * 
    * @param {Object} passed
    * @param {Record} passed.objRec  record either IF, IR, item, item batch
    * version 0.10.16
    */
	function generateZpl (passed){	    //  some record object is being passed - item, transaction or item batch
		log.audit({title: 'zplfun.generateZpl'});
		log.debug({title: 'generateZpl', details: passed.objRec.type + ', id:' + passed.objRec.id });
		var sublistid = 'item';
		var override;
		switch (passed.objRec.type) {
			case record.Type.INVENTORY_ITEM:
		      return genItemZPL({objItem: passed.objRec, numCopies:1});
		      break;
			case record.Type.ITEM_FULFILLMENT:    //TODO handle different document types
			case record.Type.ITEM_RECEIPT:
				log.debug({title: 'objrec is transaction'});
				sublistid = 'item';
				break;
			case 'customrecord_az_batch_item_label':
				log.debug({title: 'objrec is batch print'});
				sublistid = 'customsublist20'; //todo fix for production or rename?
				override = 2;
				break;
			default: 
				log.error({title: 'generateZpl passed obj type not handled'});
				return; 
		}//SWITCH
		var rec = passed.objRec;
		var labels =[]; //array of zpl TEXT
//TODO: check for item sublist if not found return zpl to print a barcode for thej document onyl
		for (var currentline = 0; currentline < rec.getLineCount({sublistId : sublistid}); currentline++){
			 var lineitemqty = 	  rec.getSublistValue({sublistId: sublistid, fieldId: 'quantity', line: currentline});
			 var lineitemid = rec.getSublistValue({sublistId: sublistid, fieldId: 'custcol_az_tx_item_id', line: currentline});
			 var lineitem = record.load({type: record.Type.INVENTORY_ITEM, id: lineitemid});
			 if (lineitemqty > 0) {
    			var p = labels.push(genItemZPL({objItem: lineitem, numCopies: lineitemqty, labelFormatId: override}));
			 } // add zpl for lineitem if qty is greater than zero
		}//for each line 
		return (labels.join(''));
	}//function generateZPL(record)
	function createSaveLabelFile(context) {  //returns URL to the file
		log.audit({title: 'zplfun.createSaveLabelFile'});
		var url= 'https://system.netsuite.com';
		require(['N/file'], function(file){
			var env = (runtime.accountId == '4897393_SB1') ? "SANDBOX" : "PRODUCTION";
			var labelcacheId = {SANDBOX: 1623, PRODUCTION: 1771};
			log.debug({title: 'zplfun, env: ' + env + ', labelcacheId: ' + labelcacheId[env]});
			var fileObj = file.create({ name: context.filename,
	        							fileType: file.Type.PLAINTEXT,
	        							contents: context.contents,
	        							folder: labelcacheId[env],
	        							isOnline: true});
	       try {
	   		   var id = fileObj.save();
	   		   log.audit({title: 'labelfile saved: '+ id });
	       } catch(e) {
	       	   log.error({title: 'error saving file', details: e.message});
	       }
	       fileObj = file.load({id: id}); // is this necessary?
	       log.debug({title: 'createsaveLabel ', details: fileObj.url});
	       url += fileObj.url;
		}); //require function
		return url;
		
    }//function createAndSaveFile
	/**
	* Function definition setTransZpl: given a transaction record object, 
	* SET the field values to print labels for all lines in the item sublist
	* DOES*NOT*SAVE*
	* return the File Cabinet URL for the label file
    * primary use case is call this from UE script on create or edit
    * note - calling script (UE) passes it scriptContext object     ***need to fix
    * call from item_update_zpl_cs.js from item batch print passes the record obj
    * @param {Object} scriptContext
    * @param {Record} scriptContext.newRecord - New record
    * @param {Record} scriptContext.oldRecord - Old record
    * @param {string} scriptContext.type - Trigger type
    * version 0.10.16
    */
	function setTransZpl(obj){
		log.audit({title: 'zplfun.setTransZpl'});
		var transid = 99999; // store an id for the file name
    	var filename = transid + '.zpl';
		var scriptContext = obj;
    	var rec = scriptContext.newRecord;
		switch (obj.type) {
		case obj.UserEventType.CREATE:   //is a scriptcontext object, so its a transaction 
	    	transid = scriptContext.newRecord.getValue({fieldId: 'createdfrom'}); //new trans, use PO id. 
			filename = transid + '.zpl';
	        var contents = generateZpl({objRec: scriptContext.newRecord});
	        var labelURL =  createSaveLabelFile({filename: filename,
				 contents: contents });
	    	rec.setValue({fieldId: 'custbody_az_trans_item_labels', value: labelURL});
	    	log.debug({title: 'setTransZpl ', details: ' createSaveLabel returned: '+ labelURL});
	        break;
		case obj.UserEventType.EDIT:
	    	transid = scriptContext.newRecord.getValue({fieldId: 'tranid'});
			filename = transid + '.zpl';
	        var contents = generateZpl({objRec: scriptContext.newRecord});
	        var labelURL =  createSaveLabelFile({filename: filename,
				 contents: contents });
	    	rec.setValue({fieldId: 'custbody_az_trans_item_labels', value: labelURL});
	    	log.debug({title: 'setTransZpl ', details: ' createSaveLabel returned: '+ labelURL});
			break;
		case 'customrecord_az_batch_item_label':  //is a batch print record object so need special handling
			transid = 19191;
			filename = 'md_batch'+ transid + '.zpl';
	        var contents = generateZpl({objRec: obj});
			var labelURL =  createSaveLabelFile({filename: filename,
				 contents: contents });			
			obj.setValue({fieldId: 'custrecord_az_md_label_batchlink', value: labelURL });
			break;
		}//switch	
    	
    	return labelURL;   
	}//function setTransZpl
	
	/**
	 * takes a string and returns the escaped string using js global function
	 * encodeURIComponent
	 */
	function urlEncode(s){
		
		return encodeURIComponent(s);
	}
	return{
		encode64 :   encode64,
		getItemZpl : genItemZPL,
		setItemZpl : setItemZpl,
		getObjZpl :  generateZpl,
		getZplFile:  createSaveLabelFile,
		setTransZpl: setTransZpl,
		urlEncode: urlEncode
		

		}//return
}//function()
);//define
/**
 * field type: Transaction Body Field
 * field Label: Print All document Labels
 * fieldId: custbody_az_txt_itemlabel_printurl
 * '<a download="label'||{tranid}||'.zpl" href="'||{custbody_az_trans_item_labels}||'">Print All Labels </a>'
 * https://system.netsuite.com/core/media/media.nl?id=8305&c=4897393_SB1&h=af6a43caae1b98905991&mv=jmqw4if4&_xt=.txt
 * 
 */
