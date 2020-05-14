/**
 * item_update_zpl_cs.js
 * @NApiVersion 2.x
 * @NModuleScope SameAccount
 * @NScriptType ClientScript
 * version 0.10.16
 **/
define(['N/currentRecord','N/record', '/SuiteScripts/item_label_features/zplfun','N/ui/dialog'],
/**
 * @param {record} record
 * 
 * @param {dialog} dialog
 * @param {scriptContext} context
 * @param {scriptContext.currentRecord} object
 * @param {zplfun} zplfun
 *	getItemZpl : getZplText,
 *	getObjZpl : generateZpl,
 *	getZplFile: createSaveLabelFile
 *
 *called from item_OLaddbutton_UE.js
 *
 */
function (currentRecord, record, zplfun ,dialog){
		function updateZpl(){
			log.audit({title: 'item_updatezpl_cs.js'});
			var rec =  record.load({type: currentRecord.get().type, id: currentRecord.get().id, isDynamic: true});
			dialog.confirm({title: 'sublist properties', message: 'rec.id: ' + rec.id + ', isDynamic? ' + rec.isDynamic + ', numlines: ' + rec.getLineCount({sublistId: "systemnotes"}) }); 

			dialog.confirm({title: 'record loaded', message: 'id: ' + rec.id + ' type: ' + rec.type});
			switch (rec.type) {
				case record.Type.INVENTORY_ITEM:
					if (rec.getValue({fieldId: 'upccode'})) {
		   				 try {
		   	   				 zplfun.setItemZpl({objItem: rec});
		   					 var savedid = rec.save({enablesourcing: true});
		   					 log.debug({title: 'in try block', details: 'succesful update of item record: ' + savedid + ' reload record id ' + rec });
		   				 } catch (e) {
		   					 log.error({title: e.name, details: e.message});
		   				 }//catch
		   				 dialog.confirm({title: 'success', message: 'Page will reload  item record: ' + savedid });
		   				 location.reload();
		   			 } else {
		   				 dialog.confirm({title: 'Failure',
		   					 			message: 'ooops! you cant generate a label with a blank UPC field! please check the record is not a matrix parent, and generate a UPC first.'});
		   			 }
					break;
				case 'customrecord_az_batch_item_label':
					dialog.confirm({title: 'sublist properties', message: 'rec.id: ' + rec.id + ', isDynamic? ' + rec.isDynamic + ', numlines: ' + rec.getLineCount({sublistId: "systemnotes"}) }); 

					var batchsl = rec.getSublist({sublistId: 'customsublist20'});
					dialog.confirm({title: 'sublist properties', message: 'batchsl.id: ' + batchsl.id + ', type ' + batchsl.type + ', isDisplayed: ' + batchsl.isDisplay }); 
					dialog.confirm({title: 'sublist properties', message: 'rec.id: ' + rec.id + ', isDynamic? ' + rec.isDynamic + ', numlines: ' + rec.getLineCount({sublistId: "systemnotes"}) }); 
					dialog.confirm({title: 'sublist properties', message: 'rec.getSublistFields(customsublist20): ' + rec.getSublistFields({sublistId: 'customsublist21'}) }); 
					var labelurl = 'https://fooboaroo.com/index.html';
						try {
							var labelurl = zplfun.setTransZpl(rec);
							rec.setValue({fieldId: 'custrecord_az_md_label_batchlink', value: labelurl });
		  					var savedid = rec.save({enablesourcing: true});  

						}catch (e) {
		   					 log.error({title: e.name, details: e.message});
						}//catch
		//			dialog.confirm({title: 'Batch ZPL Generated id: '+ savedid, message: 'the Page will reload, click Print All Labels afterward' });
				location.reload();

					break;
				default: 
					log.error({title: 'error record.type not handled'});
			}//switch 
		}//functionupdateZpl
		/**
	     * Function to be executed after page is initialized.
	     *
	     * @param {Object} scriptContext
	     * @param {Record} scriptContext.currentRecord - Current form record
	     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
	     *
	     * @since 2015.2
	     */
		function onload(scriptContext){
			log.audit({title: 'item_updatezpl_cs.js pageint'});
			var rec = scriptContext.currentRecord;
		//	var batch =  record.load({type: currentRecord.get().type, id: currentRecord.get().id, isDynamic: true});
		//	dialog.confirm({title: 'record loaded', message: 'id: ' + rec.id + ' type: ' + rec.type});

			log.debug({title: 'item_update_zpl_cs.js', details: 'pageinit'});

			var rrrec = record.load({type: rec.type, id: rec.id, isDynamic: true});
			dialog.confirm({title: 'record.getsublists', message: rrrec.getSublists()}); //customsublist20, 21
			var markdownsl  = rrrec.getSublist({sublistId: 'customsublist20'});   // not gotne
			var allitems = rrrec.getSublist({sublistId: 'customsublist21'});     ///no loatded
			dialog.confirm({title: 'sublist linecount', message: rrrec.getLineCount({sublistId: 'customsublist21'})}); //customsublist20, 21
			dialog.confirm({title: 'sublist id', message: markdownsl.id + markdownsl.type}); //customsublist20, 21
			dialog.confirm({title: 'sublist ischagnged', message: markdownsl.isChanged}); //customsublist20, 21
			dialog.confirm({title: 'sublist .length', message: markdownsl.length}); //customsublist20, 21


		}
		
		return{ updateZpl: updateZpl,
				pageInit: onload //I'm just here so i dont get fined....
		}//return this function
});
/**
* https://netsuite.custhelp.com/app/answers/detail/a_id/35096/kw/trigger%20client%20script%20from%20button
* https://netsuite.custhelp.com/app/answers/detail/a_id/61236/kw/functionName
* https://stackoverflow.com/questions/37820253/suitescript-2-0-addbutton
* https://stackoverflow.com/questions/37820253/suitescript-2-0-addbutton
*/

