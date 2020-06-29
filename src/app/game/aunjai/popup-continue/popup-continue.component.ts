import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'popup-continue',
  templateUrl: './popup-continue.component.html',
  styleUrls: ['./popup-continue.component.scss']
})
export class PopupContinueComponent implements OnInit {
  open: boolean = false;
  reward: any;
  constructor() { }


  ngOnInit() {
    this.reward = localStorage.getItem('rewardpoint');
    console.log(this.reward);
  }
  openPage() {
    this.open = true;
  }

}
