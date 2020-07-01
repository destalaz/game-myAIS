import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/service/game.service';

@Component({
  selector: 'popup-lose',
  templateUrl: './popup-lose.component.html',
  styleUrls: ['./popup-lose.component.scss']
})
export class PopupLoseComponent implements OnInit {
  open: boolean = false;
  reward: any;
  load: boolean;
  constructor() { 
  }

  ngOnInit() {
    this.reward = localStorage.getItem('rewardpoint');
    
  }
}
