import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'popup-lose',
  templateUrl: './popup-lose.component.html',
  styleUrls: ['./popup-lose.component.scss']
})
export class PopupLoseComponent implements OnInit {
  open: boolean = false;
  reward: any;
  
  constructor() { }

  ngOnInit() {
    this.reward = localStorage.getItem('rewardpoint');
  }

}
