/**
 * @NApiVersion 2.x
 * @NScriptType MassUpdateScript
 * @NModuleScope SameAccount
 * author: david liu
 * version 0.9.6 2018
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
    function each(params) {    //assumes filter correctly- no matrix parents
    	var item = record.load({type: params.type, id: params.id, isDynamic: true} );
    	if (item.getValue({fieldId: 'parent'}) == null) {
    		log.execution({title: 'non-matrix item or parent, : ' + params.id + ', '});
    		// TODO- add feature for non-matrix items? 
    		return;
    	}
    	var itemAttrFldId =item.getValue({fieldId: 'custitem_az_item_matrix_attr_field'});
    	var colortext = item.getText({fieldId: itemAttrFldId});
    //	log.debug({title: "recordSKU: " + item.getText({fieldId: 'itemid'}), details: 'itemAttrFldId: ' + itemAttrFldId +'  /   colortext : '+ colortext });
      	var id = record.submitFields({type: params.type, id:  params.id, values: {'custitem_az_item_color_lookup': colortext} });
    }
    return {
        each: each
    };
    
});
