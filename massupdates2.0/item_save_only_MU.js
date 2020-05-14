/**
 * item_saveonly_MU.js
 * @NApiVersion 2.x
 * @NScriptType MassUpdateScript
 * @NModuleScope SameAccount
 * version 0.01.12
 */
define(['N/record'],
/**
 * @param {record} record
 */
function(record) {
    
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
    function itemSaveOnly(params) {  
	var item = record.load({type: params.type, id: params.id, isDynamic: false});
	log.audit({title: 'itemrecordsaveonly'});
  	  var savedid = item.save({enablesourcing: true});
	return true;
    }
    return {
        each: itemSaveOnly
    };
    
});
