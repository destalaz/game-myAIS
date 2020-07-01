import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../service/game.service';

@Component({
  selector: 'app-reward-flip',
  templateUrl: './reward-flip.component.html',
  styleUrls: ['./reward-flip.component.scss']
})
export class RewardFlipComponent implements OnInit {
  constructor(private gameService: GameService, private router: Router) { }
  @Input() open: boolean = false;
  @Output() changes = new EventEmitter();
  ngOnInit() {
    localStorage.clear();
    localStorage.setItem('countWin', "1");
    this.open = false;
  }
  termUrl = "myais://gamesterm?lang=th&url=https%3A%2F%2Faisgame.wisdomcloud.net%2Fterm.html";

  termCondition() {
    window.location.href = this.termUrl;
  }

  setLevel(level) {
    if (level == 1) {
      localStorage.setItem('aispoint', "1");
    } else if (level == 2) {
      localStorage.setItem('aispoint', "2");
    } else {
      localStorage.setItem('aispoint', "3");
    }
    this.open = true;
    this.changes.emit(this.open);
    localStorage.setItem('level', level);
  }

}


