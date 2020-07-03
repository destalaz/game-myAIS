import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../service/game.service';

@Component({
  selector: 'app-reward-flip',
  templateUrl: './reward-flip.component.html',
  styleUrls: ['./reward-flip.component.scss']
})
export class RewardFlipComponent implements OnInit {

  termUrl = "myais://gamesterm?lang=th&url=https%3A%2F%2Faisgame.wisdomcloud.net%2Fterm.html";
  goTutorialPage: boolean = false;
  langauge: string = 'TH';
  open: boolean = false;
  
  @Output() changes = new EventEmitter();

  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit() {
    this.langauge = 'TH';
    this.goTutorialPage = false;
    localStorage.clear();
    localStorage.setItem('countWin', "1");
    this.open = false;
    console.log('langauge => ', this.langauge);
  }

  // chcekLangauge() {
  //   if (this.langauge === 'TH') {
  //     this.langauge = 'ENG';
  //     console.log(this.langauge);
  //   }
  // }

  goTutorial() {
    this.goTutorialPage = true;
    console.log(this.goTutorialPage);
  }

  termCondition() {
    window.location.href = this.termUrl;
  }

  setLevel(level) {
    if (level == 1) {
      localStorage.setItem('aispoint', "1");
      localStorage.setItem('rewardpoint', "20");
    } else if (level == 2) {
      localStorage.setItem('aispoint', "2");
      localStorage.setItem('rewardpoint', "50");
    } else {
      localStorage.setItem('aispoint', "3");
      localStorage.setItem('rewardpoint', "100");
    }
    this.open = true;
    this.changes.emit(this.open);
    localStorage.setItem('level', level);
  }

}


