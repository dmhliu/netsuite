/**
 * @NApiVersion 2.x
 * @NScriptType MassUpdateScript
 * @NModuleScope SameAccount 
 * author : david.liu@gumps.com
 */

/**
 * @param {record} record
 */
 require(['N/record'], function(record) {
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
    // Create an object to hold name data for the contact
    function itemUnpublish(params) {  
        log.debug({ title: 'debug:invoked itemunpublish', details: params});
        var item = record.load({type: params.type, id: params.id, isDynamic: false});
        log.audit({title: 'itemUnpublish'});
        itemRecord.setValue({
            fieldId: 'custitem_celigo_shpf_prod_visiblity_id',
            value: [2]   // internalid for 'point of sale'  customlist_celigo_shpf_prod_visibility
        });
        var savedid = item.save({enablesourcing: true});
        
        return true;
        }
        return {
            each: itemUnpublish
        };