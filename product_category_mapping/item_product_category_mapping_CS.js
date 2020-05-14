/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 * version 0.9.25 2018
 */
define(['N/record', 'N/ui/dialog', 'N/log'],
/**
 * @param {record} record
 * @param {dialog} dialog
 */
function(record, dialog, log) {
    
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
    function pageInit(scriptContext) {	
    	if (scriptContext.mode == 'create') {
         log.debug({title: "pageInit: mode = Create ", details: "foobar"});
    	//set bogus manufactuer for INTL shipping
    	scriptContext.currentRecord.setValue({fieldId: 'manufacturer', 		value: 'Azalea' });
    	scriptContext.currentRecord.setValue({fieldId: 'manufactureraddr1', value: '425 Hayes St' });  //text
    	scriptContext.currentRecord.setValue({fieldId: 'manufacturercity', 	value: 'San Francisco' });
    	scriptContext.currentRecord.setValue({fieldId: 'countryofmanufacture', 	value: 'US' });  //select
    //set reorderpoint to zero for location 1190
    	var lsl1190 = scriptContext.currentRecord.findSublistLineWithValue({sublistId: 'locations', fieldId: 'location', value: '6'});
    	if (lsl1190 != null) {
			log.debug({title: "line number for 1190 is " + lsl1190, detail: "foobar"}); 
			scriptContext.currentRecord.selectLine({sublistId: 'locations', line: lsl1190});  //select the line for 1190
			 log.debug({title: "selectline ", details: "complete"});
           scriptContext.currentRecord.setCurrentSublistValue({sublistId: 'locations', fieldId: 'reorderpoint', value: '0'});
		log.debug({title: "set line value::" , details: "complete"});
			scriptContext.currentRecord.commitLine({sublistId: 'locations'});
          		log.debug({title: "committed aline" , details: "complete"});

    	}
        } else 
        { log.debug({title: "null line nu mber for 1190 ", detail: "foobar"}); 
          return;}
    }//pageinit

    /**
     * Function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @since 2015.2
     */
    function fieldChanged(scriptContext) {
    	if (scriptContext.fieldId == 'countryofmanufacture') {
    	  dialog.alert({title: 'Manufacturer Set', 
    		  			message: 'For the purposes of shipping, this products manufacturer country is set to: ' + scriptContext.currentRecord.getValue({fieldId: 'countryofmanufacture'}) });  //select
    	}
    	if (scriptContext.fieldId == 'custitem_az_item_classmap'){
    		var icm = scriptContext.currentRecord.getValue({fieldId: 'custitem_az_item_classmap'});
			var classmap = record.load({type: "customrecord_az_item_class_mapping", id: icm});
    		var itemopts = scriptContext.currentRecord.getText({fieldId: 'itemoptions'});
        	log.debug({title: "record is dynamic or not?" + scriptContext.currentRecord.isDynamic + '/  icm is: ' + icm, detail: icm });
    		if  (true) { //set values based on classmap
    			var mhflt 	 = 	classmap.getValue({fieldId: 'custrecord_az_classmap_flt_class' });
    			var mdivflt  = 	classmap.getValue({fieldId: 'custrecord_az_classmap_flt_mdiv'});
    			var mdeptflt = 	classmap.getValue({fieldId: 'custrecord_az_classmap_flt_mercdept'});
    			var setAttrId = classmap.getValue({fieldId: 'custrecord_az_classmap_set_attr_field_id'});
    			var setSizeId = classmap.getValue({fieldId: 'custrecord_az_classmap_set_size'}); 
    			var setEcommVar= classmap.getValue({fieldId: 'custrecord_az_set_celigo_shopify_var_th'});
    			var setMtxItemTemplate = classmap.getValue({fieldId: 'custrecord_az_classmap_set_mtx_name_tplt'});
    			var setTxItemOptions=   [classmap.getValue({fieldId: 'custrecord_az_classmap_set_tx_item_opt1' }), 		classmap.getValue({fieldId: 'custrecord_az_classmap_set_tx_item_opt2'})];
    			
    			scriptContext.currentRecord.setValue({fieldId: 'custrecord_az_classmap_flt_class', 	value: mhflt });
    			scriptContext.currentRecord.setValue({fieldId: 'custitem_psgss_merc_division',  		value: mdivflt});
    			scriptContext.currentRecord.setValue({fieldId: 'custitem_psgss_merc_dept',			  	value: mdeptflt});
    			scriptContext.currentRecord.setValue({fieldId: 'custitem_az_item_matrix_attr_field', 	value: setAttrId});
    			scriptContext.currentRecord.setValue({fieldId: 'custitem_az_item_matrix_size_fieldid',  value: setSizeId}); 
    			scriptContext.currentRecord.setValue({fieldId: 'matrixitemnametemplate', 				value: setMtxItemTemplate});
    			scriptContext.currentRecord.setValue({fieldId: 'custitem_celigo_shopify_var_theme', 	value: setEcommVar});
    			scriptContext.currentRecord.setText( {fieldId: 'itemoptions', 							text: setTxItemOptions});
    			
    			dialog.alert({title: 'Product Category Mapping', message: 'Setting itemoptions: '+ setTxItemOptions + 
    																		' mtx template: '	+  setMtxItemTemplate + 
    																		' ecom opts: ' 		+  setEcommVar });
    		}//set item values
    	}//if product category mapping was changed.
    	else if (scriptContext.fieldId == 'custitem_azalea_item_vendor'){  //after test move this to onsave UE script
    			var itemVendor = 	scriptContext.currentRecord.getValue({fieldId: 'custitem_azalea_item_vendor'});
    			var vendor = record.load({type: 'vendor', id: itemVendor});
    			var itemVendorCode =  vendor.getValue({fieldId: 'custentity_azalea_vendor_code' });
    			scriptContext.currentRecord.selectLine({sublistId: 'itemvendor', line: 0})
    			scriptContext.currentRecord.setCurrentSublistValue({sublistId: 'itemvendor',
    			    fieldId: 'vendor',
    			    ignoreFieldChange: true,
    			    value: itemVendor});
    			scriptContext.currentRecord.setCurrentSublistValue({sublistId: 'itemvendor',
    			    fieldId: 'preferredvendor',
    			    ignoreFieldChange: true,
    			    value: true});
    			scriptContext.currentRecord.setCurrentSublistValue({sublistId: 'itemvendor',
    			    fieldId: 'vendorcode',
    			    ignoreFieldChange: true,
    			    value: itemVendorCode});
    			scriptContext.currentRecord.setValue({fieldId: 'custitem_az_item_vendor_private_label', 
    													value: vendor.getValue({fieldId: 'custentity_az_vend_private_label'}) });
    			scriptContext.currentRecord.commitLine({sublistId: 'itemvendor'});
    	}// VENDOR
    	else if (scriptContext.fieldId == 'displayname'){  //validate displayname. length <-=45
    		if (scriptContext.currentRecord.getValue({fieldId: 'displayname' }).length > 45) {
    			dialog.alert({title: 'Warning!', message: 'the Display Name must be less than or equal to 45 characters in length to fit on the product label. Please click ok and edit the value, just proceed if you dont care in this case, the record will still save. '});
    		}
    	}// displayname
    }//fieldChanged

    /**
     * Validation function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @returns {boolean} Return true if field is valid
     *
     * @since 2015.2
     */
    function validateField(scriptContext) {    //client side validation
    //	scriptContext.currentRecord.selectLine({sublistId: 'itemvendor', line: 0});

    }

    /**
     * Validation function to be executed when record is saved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @returns {boolean} Return true if record is valid
     *
     * @since 2015.2
     */
    function saveRecord(scriptContext) {
    	
    	return true;
    }

    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged,
      //  validateField: validateField,
      saveRecord: saveRecord
    };
    
});
