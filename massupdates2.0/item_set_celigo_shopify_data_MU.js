/**
 * item_set_celigo_shopify_data_MU.js
 * @NApiVersion 2.x
 * @NScriptType MassUpdateScript
 * @NModuleScope SameAccount
 * version 1.10.3
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
     * @since 2016.1
     */
    function setCeligoData(params) {
    	var item = record.load({type: params.type, id: params.id, isDynamic: true} );
    	item.setValue({fieldId: 'custitem_celigo_etail_channel',
    					 value: 4}); 							//etail channel set to 'Shopify'
    	item.setValue({fieldId: 'custitem_celigo_shpf_prod_visiblity_id',
    					 value: 1}); 							//Shopify Product Visibility set to 'Online Store'
    	item.setValue({fieldId: 'custitem_celigo_shopify_stores',
    				  	 value: 1});   							//Shopify Stores set to 'Azalea SF'
    	item.save();	
    }

    return {
        each: setCeligoData
    };
});
