
/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */

/**  '<a download="label'||{upccode}||'.zpl" href="data:application/octet-stream;charset=utf-16le;base64,'||{custitem_az_zpl_base64}||'">Print Default Label </a>'
 *   THE DEFAULT VALUE (FORMULA) FOR THE PRINT URL ITEM FIELD IS SET AS ABOVE 
 * 	clientscript to update base64 zpl field beforesubmit.
 */ 
define(['N/record'],

function (record) { 
    function saveRecord(context){     
	var item = context.currentRecord;
	var zpl64 = Base64.encode(getZplText(item, 1));
	item.setValue({fieldId: 'custitem_az_zpl_base64', value: zpl64});
	return true;
     }//saverecord
    return { saveRecord: saveRecord};
	}//callback
); 
