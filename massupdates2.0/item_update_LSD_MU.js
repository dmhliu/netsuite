/**
 * item_update_LSD_MU.js
 * @NApiVersion 2.x
 * @NScriptType MassUpdateScript
 * @NModuleScope SameAccount
 * version 0.11.11
 */
define(['N/record', '/SuiteScripts/lastSoldDate/itemlastsolddate'],
/**
 * @param {record} record
 */
function(record,itemlastsolddate) {
    
    /**
     * Definition of Mass Update trigger point.
     *
     * @param {Object} params
     * @param {string} params.type - Record type of the record being processed by the mass update
     * @param {number} params.id - ID of the record being processed by the mass update
     *
     * filter out matrix parents please
     * NOTE: ASSUMES NON ELIBLE ITEMS ARE FILTERED IN MU
     * @since 2019.2
     */
    function updateLSD(params) {  
	var item = record.load({type: params.type, id: params.id, isDynamic: false});
      itemlastsolddate.setItemLSD({objItem: item});
  	  var savedid = item.save({enablesourcing: true});
	return true;
    }
    return {
        each: updateLSD
    };
});

