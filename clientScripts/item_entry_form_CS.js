
 /**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 */
define([], function() {

	/*
	
		This is just an experiment with form validation, conditionally
		hiding fields, etc.	To test it, deploy it against the Item 
		record type.
	
	*/
	
	
    return {
        fieldChanged: fieldChanged,
        pageInit: pageInit,
        saveRecord: saveRecord
    };	
    function fieldChanged( context ) {}

    function pageInit(context) {
    
    	// Shows an alert when the page loads.
        alert( 'Welcome to the form. Loading data from shopify . if you see this alert please contact david@azaleasf.com' );  
    }

    function saveRecord(context) {
        	// Executed after the submit button is pressed, but before the form is submitted.

			alert ('here is were we hook into the Save action to check if changes have made a redirect necessary');
        return true;
    } 
});
