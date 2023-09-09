Public Without Sharing class generateQuotePdfDocument{
    
    @InvocableMethod   
    public static void CreateQuote(List<Id> quoteIds)  
    { 
        createQuoteFutureMethod(quoteIds);
    }
    
    @future(callout=true)
    public static void createQuoteFutureMethod (List<Id> quoteIds) {
    
        //get quote 
        List<Quote> quotesList = new List<Quote>([Select Id, Name, Contact.Name, Contact.Email, Email from Quote where Id IN :quoteIds]); 
        //Initialize the quote url
        
        System.debug('Entered here'+quoteIds);
        String quoteUrl = '/quote/quoteTemplateDataViewer.apexp?';
        
        //Get the Quote Template Id from Custom Settings
        String quoteTemplateId = Label.QuoteTemplateId;
        
        //List variable to get all the Quote Documents
        List<QuoteDocument> lstQuoteDoc = new List<QuoteDocument>();
        //get the quotePdf
        Blob quoteBlob;        
        if(!quoteIds.isEmpty() && quoteIds.size() > 0) {
            
            for(Id quoteId :quoteIds) {
                //Construct the quote URL to generate PDF
                quoteUrl += 'id=' + quoteId;
                quoteUrl += '&headerHeight=197&footerHeight=10';
                quoteUrl += '&summlid=' + quoteTemplateId;
                
                //call the quote url
                PageReference pageRef = new PageReference(quoteUrl);
                
                
                if(Test.isRunningTest()) {
                    quoteBlob = Blob.valueOf('Generate Pdf');
                } else {
                    quoteBlob = pageRef.getContentAsPDF();
                }
                
                //initialze the QuoteDocument to hold the quote pdf for insertion
                QuoteDocument quoteDoc = new QuoteDocument();
                quoteDoc.Document = quoteBlob;
                quoteDoc.QuoteId = quoteId;
                lstQuoteDoc.add(quoteDoc);
            }
        }
        
        /*if(!lstQuoteDoc.isEmpty() && lstQuoteDoc.size() > 0) {
            Database.insert(lstQuoteDoc);
        }*/
        
        //sending email with attachment
        Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
        // Set the recipient address
        message.setToAddresses(new String[] {quotesList[0].Contact.Email });

        /*List<EmailTemplate> templates = [SELECT Id, Subject, HtmlValue FROM EmailTemplate WHERE DeveloperName = 'Draft_quote_email_1689615378012'];
        if (!templates.isEmpty()) {
              message.setTemplateId(templates[0].Id);
              message.setSubject(templates[0].Subject);
              message.setHtmlBody(templates[0].HtmlValue);
        }*/
        OrgWideEmailAddress[] owea = [select Id from OrgWideEmailAddress where Address = 'abujose888@gmail.com'];
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        if ( owea.size() > 0 ) {
            message.setOrgWideEmailAddressId(owea.get(0).Id);
        }        
        String body = 'Your order has been received. Please come by to the canteen and let us know';
        message.setPlainTextBody( body );
        message.setSubject('Order Received - See Attached Receipt');
        message.setTargetObjectId(quotesList[0].ContactId);
        message.setSaveAsActivity(true);                
        //generate attachment
        List<Messaging.EmailFileAttachment> attachments = new List<Messaging.EmailFileAttachment>();
        Messaging.EmailFileAttachment efa = new Messaging.EmailFileAttachment();
        efa.setFileName(quotesList[0].Name);
        system.debug('quote doc blob:'+quoteBlob);
        efa.setBody(quoteBlob);
        efa.setContentType('application/pdf');
        attachments.add(efa);
        message.setFileAttachments(attachments);
        // Send the message
        try {
          Messaging.sendEmail(new Messaging.SingleEmailMessage[] { message });
        } catch (Exception e) {
          throw e;
        }                
        
    }
}