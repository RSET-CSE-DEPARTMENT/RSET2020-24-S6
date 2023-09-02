/// <reference types="node" />
export declare class Speech {
    private encoding;
    private sampleRateHertz;
    private ssmlGender;
    private tts;
    private stt;
    private ttsRequest;
    private sttRequest;
    constructor();
    setupSpeech(): void;
    speechToText(audio: Buffer, lang: string): Promise<{
        transcript: any;
        detectLang: string;
    }>;
    speechStreamToText(stream: any, lang: string, cb: Function): Promise<void>;
    textToSpeech(text: string, lang: string): Promise<any>;
    setSpeechTweaks(lang: string): void;
}
export declare let speech: Speech;
