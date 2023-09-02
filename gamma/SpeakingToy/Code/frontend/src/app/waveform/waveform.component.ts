import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { FulfillmentService } from '../services/fulfillment.service';
import { Fulfillment } from '../models/fulfillment.model';

@Component({
  selector: 'app-waveform',
  templateUrl: './waveform.component.html',
  styleUrls: ['./waveform.component.scss']
})

export class WaveformComponent implements OnInit {
    @ViewChild('visualizer', { static: false }) canvas: ElementRef;
    public canvasCtx: CanvasRenderingContext2D | null;
    public fulfillment: Fulfillment;
    public source: MediaStreamAudioSourceNode;
    public audioCtx: AudioContext;
    public analyser: AnalyserNode;
    public myReq: number;

    constructor(public fulfillmentService: FulfillmentService) {
        this.fulfillment = this.fulfillmentService.getFulfillment();
    }

    ngOnInit() {}

    public start(stream: MediaStream) {
        this.audioCtx = new AudioContext();
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.smoothingTimeConstant = 0;
        this.analyser.fftSize = 2048;
        this.canvasCtx = (<HTMLCanvasElement> this.canvas.nativeElement).getContext('2d');
        this.source = this.audioCtx.createMediaStreamSource(stream);
        this.source.connect(this.analyser);
    }

    public stop() {
        let me = this;
        let width = (<HTMLCanvasElement> me.canvas.nativeElement).width;
        let height = (<HTMLCanvasElement> me.canvas.nativeElement).height;
        if (me.audioCtx.state === 'running') {
            me.audioCtx.suspend();
            me.source.disconnect(this.analyser);
            cancelAnimationFrame(this.myReq);
            if (this.canvasCtx !== null) {
                me.canvasCtx!.fillStyle = '#1a1a1a';
                me.canvasCtx!.fillRect(0, 0, width, height);
                me.canvasCtx!.lineWidth = 4;
                me.canvasCtx!.strokeStyle = 'rgb(256, 256, 256)';
                me.canvasCtx!.beginPath();
                me.canvasCtx!.lineTo(width, height / 2);
                me.canvasCtx!.stroke();
            }
        }
    }

    visualize() {
        let me = this;
        let width = (<HTMLCanvasElement> me.canvas.nativeElement).width;
        let height = (<HTMLCanvasElement> me.canvas.nativeElement).height;
        let bufferLength = me.analyser.frequencyBinCount;
        let dataArray = new Uint8Array(bufferLength);
        me.canvasCtx!.clearRect(0, 0, width, height);

        function draw() {
            me.myReq = requestAnimationFrame(draw);
            me.analyser.getByteTimeDomainData(dataArray);
            me.canvasCtx!.fillStyle = '#1a1a1a';
            me.canvasCtx!.fillRect(0, 0, width, height);
            me.canvasCtx!.lineWidth = 4;
            me.canvasCtx!.strokeStyle = 'rgb(256, 256, 256)';
            me.canvasCtx!.beginPath();
            let sliceWidth = width * 1.0 / bufferLength;
            let x = 0;
            for (let i = 0; i < bufferLength; i++) {
                let v = dataArray[i] / 128.0;
                let y = v * height / 2;

                if (i === 0) {
                    me.canvasCtx!.moveTo(x, y);
                } else {
                    me.canvasCtx!.lineTo(x, y);
                }

                x += sliceWidth;
            }
            me.canvasCtx!.lineTo(width, height / 2);
            me.canvasCtx!.stroke();
        }
        draw();
    }
}