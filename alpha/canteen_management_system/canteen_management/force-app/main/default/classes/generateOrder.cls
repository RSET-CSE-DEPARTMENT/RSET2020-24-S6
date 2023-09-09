@RestResource (urlmapping = '/newOrder/*')
global class generateOrder{
    @HttpPost
    global static void processOrders() {
        system.debug('Request body1'+RestContext.request.requestBody);
        system.debug('Request body2'+RestContext.request.requestBody.toString());
        //Map<String, Object> requestBody = (Map<String, Object>) JSON.deserializeUntyped(RestContext.request.requestBody.toString());
        //do something with the resulting map - this is the body of the POST request
        OrderDetail ordDeets = (OrderDetail)System.JSON.deserialize(RestContext.request.requestBody.toString(), OrderDetail.class);
        system.debug('studentName'+ordDeets.studentName);
        system.debug('studentEmail'+ordDeets.studentEmail);
        if(String.isNotBlank(ordDeets.studentName)){
            List<String> splitNames = ordDeets.studentName.split(' ');
            system.debug('First Name'+splitNames[0]);
            system.debug('Last Name'+splitNames[1]);
            ordDeets.studentFirstName = splitNames[0];
            ordDeets.studentLastName = splitNames[1];
        }
        system.debug('oder items'+ordDeets.orderItems);
        Map<String, PricebookEntry > pricebookEntryMap = new Map<String, PricebookEntry >();
        for(pricebookEntry p : [Select Product2Id,Product2.Name,Id,Pricebook2Id,UnitPrice from PricebookEntry Where Pricebook2.Name = 'Standard Price Book']){
            pricebookEntryMap .put(p.Product2.Name, p);        
        }
        if(!ordDeets.orderItems.isEmpty()){
           for(OrderItems oi : ordDeets.orderItems){
              if(pricebookEntryMap .containsKey(oi.productName)){
                 oi.sfProductId = pricebookEntryMap.get(oi.productName).Product2Id;
                 oi.sfPricebookEntryId = pricebookEntryMap.get(oi.productName).Id;
                 oi.sfUnitPrice = pricebookEntryMap.get(oi.productName).UnitPrice;
                 ordDeets.pricebookId = pricebookEntryMap.get(oi.productName).Pricebook2Id ;
              }    
           
           
           }
        
        }
        
       Map < String , Object > flowParams = new Map < String , Object >();
       flowParams.put('incomingOrder', ordDeets  );
       Flow.Interview.generate_Quote_from_orders myFlow = new Flow.Interview.generate_Quote_from_orders( flowParams );
       myFlow.start();
    }
    
    /*public class OrderDetail {
        public String orderNumber;
        public String studentName;
        public String studentEmail;
        public List<OrderItems> orderItems;
    }

    public class OrderItems {
        public String productName;
        public Integer price;
        public Integer quantity;
    }*/

}