import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'popup-game',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  language:any;
  constructor() { }

  ngOnInit() {
    this.language = localStorage.getItem('language');
  }
  resume1() {
    console.log("resume1");
  }
  resume2() {
    console.log("resume2");
  }
  resume3() {
    console.log("resume3");
  }
  resume4() {
    console.log("resume4");
  }
  resume5() {
    console.log("resume5");
  }


}
