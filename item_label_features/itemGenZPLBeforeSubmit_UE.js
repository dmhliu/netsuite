/**
 * itemGenZPLBeforeSubmit_UE.js
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 * 
 * bundle: 250464
 *  version 0.10.2
 *  

 */

/**  '<a download="label'||{upccode}||'.zpl" href="data:application/octet-stream;charset=utf-16le;base64,'||{custitem_az_zpl_base64}||'">Print Default Label </a>'
 *   THE DEFAULT VALUE (FORMULA) FOR THE PRINT URL ITEM FIELD IS SET AS ABOVE 
 * 	clientscript to update base64 zpl field beforesubmit.
 */ 
define(['N/record', '/SuiteScripts/item_label_features/zplfun'],

function (record, zplfun) {
    function beforeSubmit(context){
			log.debug({title:'carrierform', details: context.newRecord.getValue({fieldId: 'carrierform'}) });
			log.debug({title:'shipcarrier', details: context.newRecord.getValue({fieldId: 'shipmethod'}) });    	
      log.audit({title: 'itemGenZPLBeforeSubmit_UE.js'});
    	if (context.type == context.UserEventType.EDIT){
	zplfun.setItemZpl({objItem: context.newRecord});
    }
	return true;
     }
    return {beforeSubmit: beforeSubmit};
	}//callback
); 
