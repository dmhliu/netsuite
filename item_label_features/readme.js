/**
 * readme.js
 * @NApiVersion 2.x
 * @NModuleScope SameAccount
 * 
 * version 0.11.01
 */
 
/**  README item_label features version NOTES
 *
 * 11.01 make lprint script find printer name 
 * 10.31 add preview image to item label format page
 * 10.16 handle item label batch objects, add label format override to genitemzpl
 * 10.15 add batch print via changes to button add, clientscript, zplfun
 * 10.5 added debuging to transactionBeforeSave.js to resolve issue with celigo doign exit on the IF
 * 10.1 refactor zplfun to move n/file into require in functions so it stops throwing error when module is loaded by a client script
 * 
 * 9.24  fix lprint to handle filenames with spaces.
 * 9.21 add itemGenZPLBeforeSubmit_UE.js to project, was in prod but never deployed. refactor to use zplfun.	
 *	initially do not update deployments for this script. 
 *
/**  README item_label features version files list 
*	filename: itemGenZPLBeforeSubmit_UE.js  
* 	type: userEvent  
* 	deployed against: IR, IF. 
* 	function: generate and set document field holding zpl forall items on doc
*

*	filename: zplfun.js
*	type: custom Module
*	deployed against: general library, can be used for client/server
*	use cases: generate zpl for items and transactions, update records with zpl
*	dependencies: n/record, n/file, n/currentrecord, n/log 
*******
*	filename:TransactionAfterSave.js
*	type: UserEventScript
*	deployed against: item receipt item fulfillment (non ecomm), print item label batch
*	use cases: generate and save ZPL on the transaction record before save
*	dependencies: ['N/file', 'N/record', '/SuiteScripts/item_label_features/zplfun']
********
*	filename: print_one_label.js
*   scriptid: customscript_az_item_view_btn_action_cs
*   scriptname: Item View:  Update Item ZPL CS
*	type: clientScript
*	called by: item_OLaddbutton_UE.js
*	deployed against: item - view
*	use cases: on click update zpl for item from view.
*	dependencies:
********
*	filename: item_update_zpl_MU.js
*	type: MassUpdateScript
*	deployed against: item
*	use cases: use with mass update to set zpl code on an item
*	dependencies: n/record, zplfun
********
*	filename: item_OLaddbutton_UE.js
*	type: userEventScript
*	deployed against: item - view
*	use cases: add a button to the item view that allows user to regenerate zpl 
*	dependencies:
********
*	filename: 	itemGenZPLBeforeSubmit_UE.js
*	type: UserEventScript
*	deployed against: item
*	use cases: on edit matrix subitem or non-matrix item update zpl on save
*	dependencies: zplfun
********	
*   filename: item_update_zpl_cs.js
*	type: clientscript
*	deployed against:
*	use cases: 
*	dependencies:
********
*	filename:
*	type: 
*	deployed against:
*	use cases: 
*	dependencies:
*******
*
* **** TODO ****
* add filename to all files comment block 
*
*/
