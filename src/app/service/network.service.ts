import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  online: boolean;
  isNetworkStopped = false;

  constructor() {
    this.online = window.navigator.onLine;

    fromEvent(window, 'online').subscribe(e => {
      this.online = true;
      console.log("this online");
    });

    fromEvent(window, 'offline').subscribe(e => {
      this.online = false;
      console.log(" this false");
    });
  }
}
