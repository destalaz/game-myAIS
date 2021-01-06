import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
declare let gtag: Function;
@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor() { }
  public eventEmitter(
    eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel: string = null,
    eventValue: number = null) {
    gtag('event', eventName, {
      eventCategory: eventCategory,
      eventLabel: eventLabel,
      eventAction: eventAction,
      eventValue: eventValue
    })
  }
}
