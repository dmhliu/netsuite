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
			log.debug({title:'BL getsublists', details: trans.getSublists()});
			log.debug({title:'BL carrierform', details: trans.getValue({fieldId: 'carrierform'}) });
			log.debug({title:'BL shipmethod',  details: trans.getValue({fieldId: 'shipmethod'}) });	
			log.debug({title:'BL createdfrom', details: trans.getValue({fieldId: 'createdfrom'}) });
			log.debug({title:'BL integratedlabel', details: trans.getValue({fieldId: 'generateintegratedshipperlabel'}) });
			log.debug({title:'BL carrierform', details: trans.getFields()});
			var salesorder = record.load({type: record.Type.SALES_ORDER, id: trans.getValue({fieldId: 'createdfrom'}) });
			log.debug({title: 'SO status: ', details: salesorder.getValue({fieldId: 'status'}) });
			var soStatus = salesorder.getValue({fieldId: 'status'});
			if ((soStatus = 'Partially Fulfilled') || (soStatus ='Pending Billing/Partially Fulfilled')) {
				log.debug({title:'so is partially fulfilled'});
			}//if
			//will try to set carrierform 
			//trans.setValue({fieldId: 'generatereturnlabel', value: false}); //started causing error
				
    			return;
    		}
    	}

    	return true;
    }
    return {beforeLoad: beforeLoad};
});

