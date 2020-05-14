/**
 * @NApiVersion 2.x
 * @NScriptType MassUpdateScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/log'],
/**
 * @param {record} record
 */
function(record, log) {
    
    /**
     * Definition of Mass Update trigger point.
     *
     * @param {Object} params
     * @param {string} params.type - Record type of the record being processed by the mass update
     * @param {number} params.id - ID of the record being processed by the mass update
     *
     * @since 2016.1
     */
    function fixMatrixUpc(params) {
    	var item = record.load({type: params.type, id: params.id, isDynamic: true} );
    	var upccode =item.getValue({fieldId: 'upccode'});
    	var parent = item.getValue({fieldId: 'parent'});
    	log.debug({title: "recordId: " + params.id + 'oldupc: ' + upccode });
    	if (parent) return;
    	if (upccode) {
        	item.setValue({fieldId: 'upccode', value: null }); 
        	item.save();
    	}
    }

    return {
        each: fixMatrixUpc
    };
    
});
