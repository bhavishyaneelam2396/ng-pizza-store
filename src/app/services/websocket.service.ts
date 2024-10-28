import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private subject!: WebSocketSubject<any>;
  private isBrowser: boolean;


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.connect();
  }

  private createURL(url: string): WebSocketSubject<MessageEvent> {
    return webSocket(url);
  }

  // public connect(url:string): WebSocketSubject<MessageEvent> {
  //   if (!this.subject) {
  //     this.subject = this.createURL(url);
  //     console.log("Successfully connected: " + url);
  //   }
  //   return this.subject;
  // }
  public connect() {
    if (this.isBrowser) {
      this.subject = webSocket({
        url: "ws://localhost:8080",
        openObserver: {
          next: () => {
            console.log('connection ok');
          }
        },
        closeObserver: {
          next: () => {
            console.log('disconnect ok');
          }
        }
      });

      this.subject.subscribe({
        next: msg => console.log('message received: ' + msg), // Called whenever there is a message from the server.
        error: err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
        complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
      });
    }
  }

  public send(msg: string) {
    console.log('sent a message', msg)
    this.subject.next(msg);
  }

  public disconnect() {
    this.subject.complete();
  }
}
