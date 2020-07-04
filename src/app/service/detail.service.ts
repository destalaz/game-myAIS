import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetailService {
public language:string;

  constructor() { }

  fnGetlanguge(){
    console.log("this->language Service",this.language);
  }
}
