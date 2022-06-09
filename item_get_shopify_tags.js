/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */


/** 
* context .????
define(['N/record','N/https', 'N/search'],function(record,https,search){
  function get_product_tags(context){
    //  look at N/runtime.Script or script parameters  
    // shopify app config page https://gumps-official.myshopify.com/admin/apps/private/
    const user = '07dc4f4ce53608a7e7d086a94f8b8abc'  ; // this is not publicly visible in NS // dummy creds - live need to be stored in settings
    //const pass = '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';   //put into script params?
    //const host = 'gumps-official.myshopify.com';
  
  
    const apiURL=`https://${user}:${pass}@${host}/admin/api/unstable/orders/${shopifyOID}.json`;
    // get data to publish 
      
    var headerData = search.lookupFields({
      type : record.Type.,
      id : internalID,
      columns : [ 'trainid', 'createdDate','lastModifiedDate', 'shipStatus	','itemList']
    });
    var postData = {
      order: {
        note_attributes: {
          "name": "Fulfillment Status",
          "value": "these items have been fulfilled"
        }
      }
    };
      
      
      
      
        var headerObj = {
        name: 'Accept-Language',
        value: 'en-us'
    };
    var response = https.get({
        url: 'https://www.testwebsite.com',
        headers: headerObj
    });
     https.put.promise({
        url:apiURL,
        headers:headerObj,
        body:postData
    })
      .then(function(response){
          log.debug({
              title: 'Response',
              details: response
          });
      })
      .catch(function onRejected(reason) {
          log.debug({
              title: 'Invalid Request: ',
              details: reason
          });
      }) //catch
}//function get_product_tag

return{
    afterSubmit:notify_order
  };
});
