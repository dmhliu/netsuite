/**
 * TransactionBeforeSave.js
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 * 4.10.20  add more debugging for shippcarier
 */
define(['N/file', 'N/record', '/SuiteScripts/item_label_features/zplfun'],
/**
 * @param {file} file
 * @param {record} record
 * @param {Object} scriptContext
 * @param {Record} scriptContext.newRecord - New record
 * @param {Record} scriptContext.oldRecord - Old record
 * @param {string} scriptContext.type - Trigger type
 */
function(file, record, zplfun) {
    function beforeSubmit(scriptContext) {
    	var trans = scriptContext.newRecord;
    	var form = trans.getText({fieldId: 'customform'});
        	log.debug({title:'carrierform', details: trans.getValue({fieldId: 'carrierform'}) });
			log.debug({title:'shipcarrier', details: trans.getValue({fieldId: 'shipmethod'}) });
			log.debug({title: 'packageups sublist', details: trans.getSublistFields({sublistId: 'packageups'})});
			log.debug({title: 'packagefedex sublist', details: trans.getSublistFields({sublistId: 'packagefedex'})});
    	log.audit({title: 'TransactionBeforeSave_UE.js'});
    	log.debug({title: 'beforeSubmit invoked on: '+ scriptContext.type , 
    			 details: 'record type: ' + trans.type + ', id:' + trans.id + ' trigger type in UE: '+scriptContext.type});
    	if (scriptContext.type == scriptContext.UserEventType.XEDIT) {
    		log.debug ({title: 'will exit (XEDIT'});
    		return;
    	}
    	if (trans.type == record.Type.ITEM_FULFILLMENT) {
        	log.audit({title: '..formtype is item fulfillment'});
    		if (form == 'Azalea Ecomm Item Fulfillment Form') {
            	log.audit({title: '.Ecomm item fulfillment, exiting'});
    			return;
    		}
    	}
    	var labelURL = zplfun.setTransZpl(scriptContext);
    	return true;
    }
    return {beforeSubmit: beforeSubmit};
});

