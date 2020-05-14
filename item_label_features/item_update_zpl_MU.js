/**
 * item_update_zpl_MU.js
 * @NApiVersion 2.x
 * @NScriptType MassUpdateScript
 * @NModuleScope SameAccount
 * version 0.10.23
 */
define(['N/record', '/SuiteScripts/item_label_features/zplfun'],
/**
 * @param {record} record
 */
function(record,zplfun) {
    
    /**
     * Definition of Mass Update trigger point.
     *
     * @param {Object} params
     * @param {string} params.type - Record type of the record being processed by the mass update
     * @param {number} params.id - ID of the record being processed by the mass update
     *
     *filter out matrix parents please
     * @since 2016.1
     */
    function generateLabel(params) {  
	var item = record.load({type: params.type, id: params.id, isDynamic: false});
      zplfun.setItemZpl({objItem: item});
  	  var savedid = item.save({enablesourcing: true});
	return true;
    }
    return {
        each: generateLabel
    };
    
});
