/**
 * IF_set_shipcarrier_WAS.js
 * 10 FEB 2020
 * @NApiVersion 2.x
 * @NScriptType WorkflowActionScript
 */
define([ 'N/record'],function(record){
    function onAction(scriptContext) {
       log.debug({title: 'onAction IF_set_shipcarrier_WAS', details: scriptContext.type});
       var rec =scriptContext.currentRecord;
//TODO use try catch
//TODO https://netsuite.custhelp.com/app/answers/detail/a_id/51496#subsect_156700223453

	cf =rec.getValue({fieldId: 'carrierform'});
	log.audit({title: cf});
	rec.setValue({fieldId: "memo", value: "INSTRUCTION: CHECK SHIPPING TAB, CLEAR VALUES" });
	rec.setValue({fieldId: "shipcarrier", value: null });
	rec.setValue({fieldId: "shipmethod",  value: null });
	rec.setValue({fieldId: "generateintegratedshipperlabel", value: "F"});
	


	/** example SS 1.0
	* https://stackoverflow.com/questions/55361487/changing-ship-method-on-fulfillment-in-suitescript
	* nlapiSubmitField("itemfulfillment", fulfillmentId,
	*    ["carrierform", "shipcarrier", "shipmethod"],
	*   ["ns", "nonups", shipMethod]);
	*/
     }//onACtion
     return {onAction: onAction}
 }//function(s)
 );//define

