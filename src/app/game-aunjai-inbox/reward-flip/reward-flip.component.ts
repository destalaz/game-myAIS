import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../service/game.service';

@Component({
  selector: 'app-reward-flip',
  templateUrl: './reward-flip.component.html',
  styleUrls: ['./reward-flip.component.scss']
})
export class RewardFlipComponent implements OnInit {
  constructor(private gameService: GameService, private router: Router) { }
  open: boolean = false;
  ngOnInit() {
    localStorage.setItem('countWin', "1");
    this.open = false;
  }
  termUrl = "https://aisgame.wisdomcloud.net/term.html";

  termCondition() {
    window.location.href = this.termUrl;
  }

  setLevel(level) {
    this.open = true;
    localStorage.setItem('level', level);
  }

}


