/**
 * item_OLaddbutton_UE.js
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 * ver. 0.2020.02.12
 * calls to client script item_update_zpl_cs.js
 */
define(['N/record',  'N/ui/serverWidget', 'N/runtime'],
/**
 * @param {record} record
 * @param {serverWidget} serverWidget
 */
function(record, serverWidget, runtime) {
	var env = (runtime.accountId == '4897393_SB1') ? "SANDBOX" : "PRODUCTION";
	var addbuttonScriptId = {SANDBOX: 7793, PRODUCTION: 9618};
	/**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {string} scriptContext.type - Trigger type
     * @param {Form} scriptContext.form - Current form
     */
    function beforeLoad(scriptContext) {
   	    log.debug({title: 'item_OL_addbutton_UE.js'});
    	if (scriptContext.type == 'view') {
    		scriptContext.form.removeButton('printlabel'); 		
    		scriptContext.form.clientScriptFileId= addbuttonScriptId[env]; // select environment
    		switch (scriptContext.newRecord.type) {
	    		case record.Type.INVENTORY_ITEM:   	 //item
	    			scriptContext.form.addButton({id: 'custpage_updatezpl',     label: 'Update Zpl' , functionName: 'updateZpl'});  //item_update_zpl_cs.js
                	scriptContext.form.addButton({id: 'custpage_count_request', label: 'COUNT' ,      functionName: 'setCountRequested'});
	    			break;
	    		case 'customrecord_az_batch_item_label':  //batch
	    			log.debug({title: 'item batch print'});
	    			scriptContext.form.addButton({id: 'custpage_updatezpl', label: 'Print All Labels' , functionName: 'updateZpl'});
	    			break;
	    		default: 
	    			log.debug({title: 'record type undefined or not handled'});
    		}//switch
    	}//if
    }//beforeload
    return {
        beforeLoad: beforeLoad
    };
    
});
