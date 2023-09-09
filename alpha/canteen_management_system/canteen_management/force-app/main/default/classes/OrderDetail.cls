public class OrderDetail {
        @AuraEnabled
        public String orderNumber;
        @AuraEnabled
        public String studentName;
        @AuraEnabled
        public String studentEmail;
        @AuraEnabled
        public String pricebookId ;
        @AuraEnabled
        public List<OrderItems> orderItems;
        @AuraEnabled
        public String studentFirstName;
        @AuraEnabled
        public String studentLastName;        
    
    
    }