export declare class Dialogflow {
    private projectId;
    private languageCode;
    private request;
    private sessionClient;
    private sessionPath;
    private sessionId;
    constructor();
    setupDialogflow(): void;
    detectIntent(text: string): Promise<any>;
    getHandleResponses(result: any): any;
}
export declare const dialogflow: Dialogflow;
