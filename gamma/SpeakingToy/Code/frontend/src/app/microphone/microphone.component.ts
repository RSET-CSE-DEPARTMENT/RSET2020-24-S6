import { Component,Input } from '@angular/core';
import { IoService } from '../services/io.service';
import { WaveformComponent } from '../waveform/waveform.component';
import { EventService } from '../services/event.service';
import { FulfillmentService } from '../services/fulfillment.service';
import ss from 'socket.io-stream';
declare const RecordRTC: any;
declare const StereoAudioRecorder: any;

@Component({
  selector: 'app-microphone',
  templateUrl: './microphone.component.html',
  styleUrls: ['./microphone.component.scss']
})

export class MicrophoneComponent { 
   @Input() waveform: WaveformComponent;
    public utterance: any;
    public recordAudio: any;
    public startDisabled: boolean;
    public stopDisabled: boolean;
    public socket: any;

    constructor(public fulfillmentService: FulfillmentService, public ioService: IoService, public eventService: EventService) {
      this.startDisabled = false;        //at start setting the disable function to be false
      this.stopDisabled = false;         //at start setting the disable function to be false
      this.eventService.audioPlaying.subscribe(() => {
        this.onStop();
      });
      this.eventService.resetInterface.subscribe(() => {
        this.onStop(); // stop recording & waveform
        this.eventService.audioStopping.emit(); // stop playing audio
        this.reset(); // reset the interface
      });
    }

    onStart() { 

      let me = this;
      me.startDisabled = true;
      
      // make use of HTML 5/WebRTC, JavaScript getUserMedia()
      // to capture the browser microphone stream
      navigator.mediaDevices.getUserMedia({
          audio: true
      }).then(function(stream: MediaStream) {
          me.recordAudio = RecordRTC(stream, {
            mimeType: 'audio/webm; codecs=opus',
            //fileExtension: 'wav',
            numberOfAudioChannels: 1,
            bufferSize: 16384,
            checkForInactiveTracks: true,
            recorderType: StereoAudioRecorder,
            desiredSampRate: 22050, // this sampleRate should be the same in your server code

              // MediaStreamRecorder, StereoAudioRecorder, WebAssemblyRecorder
              // CanvasRecorder, GifRecorder, WhammyRecorder
              //**recorderType: StereoAudioRecorder,

              // Dialogflow / STT requires mono audio
              //**numberOfAudioChannels: 1,

              // get intervals based blobs
              // value in milliseconds
              // as you might not want to make detect calls every seconds
              timeSlice: 7000,

              // only for audio track
              // audioBitsPerSecond: 128000,

              // used by StereoAudioRecorder
              // the range 22050 to 96000.
              // let us force 16khz recording:
              //*desiredSampRate: 16000,

              // as soon as the stream is available
              ondataavailable(blob: Blob) {
                 console.log('playing')
                if(!me.eventService.getIsPlaying()) {
                  console.log('playing next') 
                  me.ioService.sendBinaryStream(blob);
                  console.log('sendBinaryStream')
                  me.waveform?.visualize();
                  console.log('vISUALIZE')
                }
              }
          });
          me.recordAudio.startRecording();
          // recording started
          console.log('STARTED RECORDING')
          me.waveform?.start(stream);
         console.log('WAVEFORM START')
      }).catch(function(error) {
        //console.log('ERROR RECORDING')
          console.error(JSON.stringify(error));
      });
    }

    onStop() {
      console.log('recording stopped')
      this.startDisabled = false;
      
      // stop audio recorder
      this.recordAudio.stopRecording();//(()=>{
  //       const blob =this.recordAudio.getBlob();
  //       console.log(blob);
  //       const stream = ss.createStream();
  //       const audioStream=ss.createStream();
  //       ss(me.socket).emit('stream_audio', audioStream, {
  //         name: '_temp/stream.wav', 
  //         size: blob.size,
  //         language: 'en-US',
  //     });
  //     ss.createBlobReadStream(blob).pipe(audioStream);
  // });
     // });
      this.waveform?.stop();
    }

    reset() {
      //++this.startDisabled = false;
     //++ this.stopDisabled = false;
      this.fulfillmentService.clearAll();
    } 
}