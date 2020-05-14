
/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
// 7.6.18 add search color
define(['N/record', 'N/ui/dialog'],

function (record,dialog ) {
	
    function saveRecord(context){     
   	var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};
	var rec = context.currentRecord;
	var labelformat = rec.getValue({fieldId :'custitem_az_itemlabel_format_sel'});
	if (!labelformat) labelformat = 1;
	var zplfmt = record.load({type: 'customrecord_az_itemlabel_format',id: labelformat});
	var zpltext =  zplfmt.getValue({fieldId: 'custrecord_az_itemlabel_fmt_zpl'});
	var brandname = rec.getText({fieldId : 'custitem_azalea_item_vendor'});
	var displayname = 	rec.getValue({fieldId: 'displayname'});
	var upccode = 		rec.getValue({fieldId: 'upccode'});
	var barcodecaption =rec.getValue({fieldId: 'itemid'});
	var origprc = 	rec.getValue({fieldId: 'custitem_azalea_item_orig_price'});
	var color = 	rec.getValue({fieldId: 'custitem_az_item_color_lookup'});
	var price = rec.getSublistValue({sublistId: 'price1', fieldId: 'price_1_', line: 0});
	zpltext = zpltext.replace('{custitem_azalea_item_vendor}',brandname);
	zpltext = zpltext.replace('{displayname}',displayname);
	zpltext = zpltext.replace('{price1}',price).replace('{upccode}', upccode);
	zpltext = zpltext.replace('{name}', barcodecaption);
	zpltext = zpltext.replace('{color}', color);
	if (!upccode.startsWith('0')){   			 //if not a 6 digit upc starting with zero
			zpltext = zpltext.replace('^BCN,','^BC,') // print in code 128
		}   	
	var zpl64 = Base64.encode(zpltext);
	rec.setValue({fieldId: 'custitem_az_zpl_base64', value: zpl64});
	return true;
     }//saverecord
    return { saveRecord: saveRecord};
	}//callback
); 
//TODO: implement error handling, ensure items have default item label format (item createbrl),hide   zpl64 on view/edit check markdown logic to insert item label change/script to prod mode.//
//remove workflow actions linked to allfields / a

/**  '<a download="label'||{upccode}||'.zpl" href="data:application/octet-stream;charset=utf-16le;base64,'||{custitem_az_zpl_base64}||'">Print Default Label </a>'
 *   THE DEFAULT VALUE (FORMULA) FOR THE PRINT URL ITEM FIELD IS SET AS ABOVE 
 */