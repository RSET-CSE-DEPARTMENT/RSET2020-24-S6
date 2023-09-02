import  {io}  from 'socket.io-client';

declare const ss: any;
 
export class IoService {
    public socket: any;
    public lang: string;
 
    constructor() {
      const self = this;
      console.log("constructor enetered")
      this.socket = io('http://localhost:8080');
      this.socket.on('connect', function() {
        console.log('connected');
        self.socket.on('server_setup', (data: string) => {
          console.log('Server setup:', data);
          // Additional handling of the 'server_setup' event here
        });
      });

      this.socket.binaryType = 'arraybuffer';
      this.lang = 'en-US';
    }

    setDefaultLanguage(lang: string) {
        this.lang = lang;
    }

    sendBinaryStream(blob: any) {
        const me = this;
        const stream = ss.createStream();
        console.log("send binaryenetered")
        ss(me.socket).emit('stream-speech', stream, {
            name: '_temp/stream.wav',
            size: me.socket.size,
           // language: me.lang
        });
        ss.createBlobReadStream(blob).pipe(stream);
        console.log("send binarystream end has reached")
    }

    sendMessage(eventName: string, obj: any) {
        obj.audio.language = this.lang;
        this.socket.emit(eventName, obj);
    }

    receiveStream(eventName: string, callback: (data: any) => void) {
      this.socket.on(eventName, function(data: any) {
        callback(data);
      });
    }
}
