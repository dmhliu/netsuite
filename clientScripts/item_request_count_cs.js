/**
 * item_request_count_cs.js
 * @NApiVersion 2.x
 * @NModuleScope SameAccount
 * @NScriptType ClientScript
 * version 0.2.21.20
 **/
define(['N/currentRecord','N/record', 'N/ui/dialog'],
/**
 * @param {record} record
 * 
 * @param {dialog} dialog
 * @param {scriptContext} context
 * @param {scriptContext.currentRecord} object
 *
 * called from item_OLaddbutton_UE.js 
 *
 */
function (currentRecord, record ,dialog){
	function setCountRequested(){
		log.audit({title: 'item_request_count_cs.js'});
		var rec =  record.load({type: currentRecord.get().type, id: currentRecord.get().id, isDynamic: true});
		switch (rec.type) {
		case record.Type.INVENTORY_ITEM:
		 if (rec.getValue({fieldId: 'custitem_az_item_count_requested'})) {
	   		try {
	   			rec.setValue({fieldId: 'custitem_az_item_count_requested',
						value: 'F'});
				 var savedid = rec.save({enablesourcing: true});  
				 log.debug({title: 'in try block', details: 'succesful update of item record: ' + savedid + ' reload record'});
				dialog.confirm({title: 'REMOVED COUNT REQUEST', message: 'Page will reload now!'});
			 }//try
			 catch (e) {
				 log.error({title: e.name, details: e.message});
			 }//catch				
		} else {
			try {
	   	   		rec.setValue({fieldId: 'custitem_az_item_count_requested',value: 'T'});
	   			 var savedid = rec.save({enablesourcing: true});  
	   			 log.debug({title: 'in try block', details: 'succesful update of item record: ' + savedid + ' reload record'});			
				dialog.confirm({title: 'count requested', message: 'Page will reload now!'});
   			 }//try
			catch (e) {log.error({title: e.name, details: e.message});
			location.reload();
	   		break;
			default: 
				log.error({title: 'error record.type not handled'});
			}//switch 
		}//function setCountRequested
		
		function onload(scriptContext){
			log.audit({title: 'item_request_count_cs.js pageint'});

		
		}// onload 

		
		return{
			pageInit: onload, //I'm just here so i dont get fined....
			setCountRequested: setCountRequested
		};//return 
});
/**
* https://netsuite.custhelp.com/app/answers/detail/a_id/35096/kw/trigger%20client%20script%20from%20button
* https://netsuite.custhelp.com/app/answers/detail/a_id/61236/kw/functionName
* https://stackoverflow.com/questions/37820253/suitescript-2-0-addbutton
* https://stackoverflow.com/questions/37820253/suitescript-2-0-addbutton
*/

