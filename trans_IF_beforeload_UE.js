/**
 * trans_IF_beforeload_UE.js
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 * 4.10.20  add debug 
 */
define(['N/file', 'N/record'],
/**
 * @param {file} file
 * @param {record} record
 * @param {Object} scriptContext
 * @param {Record} scriptContext.newRecord - New record
 * @param {Record} scriptContext.oldRecord - Old record
 * @param {string} scriptContext.type - Trigger type
 */
function(file, record) {
    function beforeLoad(scriptContext) {
    	var trans = scriptContext.newRecord;
    	var form = trans.getText({fieldId: 'customform'});
    	log.audit({title: 'trans_IF_beforeload_UE.js'});
    	log.debug({title: 'beforeLoad trigger on: '+ scriptContext.type , 
    			 details: 'record type: ' + trans.type + ', id:' + trans.id + ' trigger type in UE: '+scriptContext.type});
    	if (scriptContext.type == scriptContext.UserEventType.XEDIT) {
    		log.debug ({title: 'will exit XEDIT'});
    		return;
    	}
    	if (trans.type == record.Type.ITEM_FULFILLMENT) {
        	log.audit({title: 'Trans Type is item fulfillment'});
    		if (form == 'Azalea Ecomm Item Fulfillment Form') {
			log.debug({title:'shipcarrier/method sublist', details: trans.getSublists()});	
    			return;
    		}
    	}

    	return true;
    }
    return {beforeLoad: beforeLoad};
});

