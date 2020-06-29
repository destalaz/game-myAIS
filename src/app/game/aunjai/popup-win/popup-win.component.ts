import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'popup-win',
  templateUrl: './popup-win.component.html',
  styleUrls: ['./popup-win.component.scss']
})
export class PopupWinComponent implements OnInit {
  reward: any;
  constructor() { }


  ngOnInit() {
    this.reward = localStorage.getItem('rewardpoint');
    console.log(this.reward);
  }

}
