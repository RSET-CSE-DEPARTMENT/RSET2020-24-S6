public class OrderItems {
        @AuraEnabled
        public String productName;
        @AuraEnabled
        public Integer price;
        @AuraEnabled
        public Decimal quantity;
        @AuraEnabled
        public String sfProductId;
        @AuraEnabled
        public String sfPricebookEntryId;
        @AuraEnabled
        public Decimal sfUnitPrice;
    }