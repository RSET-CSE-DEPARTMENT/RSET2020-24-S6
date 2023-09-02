import { Component } from '@angular/core';
import { EventService } from './services/event.service';
import { IoService } from './services/io.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Speakingtoy';
  private lang = 'en-US';
  public isInActive: boolean;

  constructor(public eventService: EventService, public ioService: IoService) {
    this.isInActive = true;
    this.browserCheck();
  }

  onReset() {
    this.lang = 'en-US';
    this.eventService.resetInterface.emit();
    this.ioService.setDefaultLanguage(this.lang);
    // this.languageSwitch('en-US', null);
  }

  // languageSwitch(lang: string, e: Event | null) {
  //   let flags = document.getElementsByClassName('flag');
  //   for (let i = 0; i < flags.length; i++) {
  //     flags[i].className = 'flag inactive';
  //   }
  //   if (e === null || e === undefined)
  //   {
  //     flags[0].className = 'flag active';
  //   } else {
  //     let element = e.target as HTMLElement;
  //     element.className = 'flag active';
  //   }
  //   this.ioService.setDefaultLanguage(lang);
  // }

  /**
   * Chrome on iOS (iPhone & iPad) can't make use of WebRTC & getUserMedia()
   * https://support.google.com/chrome/forum/AAAAP1KN0B0NrNQ8brcVvM/?hl=nl
   */
  browserCheck() {
    let nav = window.navigator;
    let ua = nav.userAgent;
    // iPhone or iPad is in the UA string (could be Opera)
    // There's Mac in the UA string (not Opera)
    // and it's not Safari (because on Safari it works fine)
    if ((ua.indexOf('iPhone') !== -1 || ua.indexOf('iPad') !== -1)
    && ua.indexOf('Mac OS') !== -1
    && ua.indexOf('Safari') !== 1) {
      alert('Unfortunately, this application won\'t work in Chrome for iOS. Please open mobile Safari.');
    }
  }
}
