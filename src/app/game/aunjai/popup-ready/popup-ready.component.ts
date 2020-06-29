import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'popup-ready',
  templateUrl: './popup-ready.component.html',
  styleUrls: ['./popup-ready.component.scss']
})
export class PopupReadyComponent implements OnInit {

  totalRound: number;
  constructor() { }

  ngOnInit() {
    this.totalRound = parseInt(localStorage.getItem('totalRound'));
  }

}
