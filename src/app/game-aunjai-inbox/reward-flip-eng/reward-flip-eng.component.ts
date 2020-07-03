import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reward-flip-eng',
  templateUrl: './reward-flip-eng.component.html',
  styleUrls: ['./reward-flip-eng.component.scss']
})
export class RewardFlipEngComponent implements OnInit {

  @Output() changes = new EventEmitter();

  open: boolean = false;
  termUrl = "myais://gamesterm?lang=th&url=https%3A%2F%2Faisgame.wisdomcloud.net%2Fterm.html";
  goTutorialPage: boolean = false;
  langauge: string = 'ENG';

  constructor(
    private gameService: GameService, 
    private router: Router
    ) { }

  ngOnInit() {
    this.langauge = 'ENG';
    this.goTutorialPage = false;
    localStorage.clear();
    localStorage.setItem('countWin', "1");
    this.open = false;
    localStorage.setItem('language', "ENG");
    console.log('langauge => ', this.langauge);
  }

  // chcekLangauge() {
  //   if (this.langauge === 'ENG') {
  //     this.langauge = 'TH';
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
