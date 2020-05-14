/**
 * itemlastsolddate.js
 * @NApiVersion 2.x
 * @NModuleScope Public
 * Module Description
 * Version    Date            Author           Remarks
 * 0.11.11    11 Nov 2019     azalea
 * 
 * 
 * item save 
 * item print /
 *
 */
	define(['N/record','N/log', 'N/Search'], function(record, log, s){

	
	/** function definition define last sold date search
	* @param {Object}  context
    * @param {Record}  context.objItem item record
	*   takes item 
	*   returns date 
	*   TODO parse result set can i
	*  pass a ref to item the search'
	*/
	function getItemLSD(context){
	    var rec = context.objItem;
	    var currentLSD = rec.getValue({fieldID: 'custitem_azalea_rpro_lastsoldd'});
	    //if currentLSD is today then return, no update required... this should be filtered out in MU criteria
	    
	    var lsdsearch = s.load({
             id: "customsearch_az_item_last_sold_date_2"  
        });
        s.createFilter({
                        name: "internalid",
                        operator: s.Operator.IS,
                        values: context.internalid  //not sure if this is right TODO
         })
        var resultSet = lsdsearch.run().getRange({start: 0, end: 1})[0];    //trick to retrieve the single result
        
        //Last Sold Date 
        // if resultset IS NULL return currentLSD //
        //else proccess result set as date and return it 
        return resultSet.getValue({name: "Last Sold Date", summary: s.Summary.MAXIMUM});  //newdate not defined 
	}//function getItemLSD

 
//set value for single item 
/**
 * Function definition  setItemLSD({objItem: record})
 * *DOES*NOT*SAVE*
 * version 0.11.11
 */
	function setItemLSD(context){
		log.audit({title: 'itemLSD.setItemLSD'});
   		var rec = context.objItem;
   		var newitemlsd = getItemLSD(rec);
		rec.setValue({fieldId: 'custitem_azalea_rpro_lastsoldd', value: newitemlsd}); 
	}//setItemLSD

	return{
		getItemLSD : getItemLSD,
		setItemLSD: setItemLSD
	}//return
}//function()
);//define


