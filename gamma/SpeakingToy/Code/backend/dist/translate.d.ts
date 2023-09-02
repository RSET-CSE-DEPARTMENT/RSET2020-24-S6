interface LooseObject {
    [key: string]: any;
}
export declare class Translate {
    request: LooseObject;
    translationClient: any;
    projectId: string;
    constructor();
    setupTranslate(): void;
    translate(text: string, targetLang: string): Promise<{
        languageCode: any;
        translatedText: any;
    }>;
}
export declare let translate: Translate;
export {};
