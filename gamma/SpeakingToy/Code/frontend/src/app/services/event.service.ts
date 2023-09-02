import { Output, EventEmitter } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  template: ''
})

export class EventService {
    public IS_PLAYING_TTS: boolean;
    @Output() public audioPlaying: EventEmitter<any> = new EventEmitter();
    @Output() public audioStopping: EventEmitter<any> = new EventEmitter();
    @Output() public resetInterface: EventEmitter<any> = new EventEmitter();

    constructor() {
        this.IS_PLAYING_TTS = false;
    }

    setIsPlaying(isPlaying: boolean) {
        this.IS_PLAYING_TTS = isPlaying;
    }

    getIsPlaying() {
        return this.IS_PLAYING_TTS;
    }
}