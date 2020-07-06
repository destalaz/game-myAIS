import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { ActivatedRoute } from '@angular/router';
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
  langauge: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    localStorage.removeItem('sumcclick');
    this.goTutorialPage = false;
    this.open = false;

    if (!this.langauge) {
      this.langauge = 'ENG';
    }
    if (localStorage.getItem('resumeGame')) {
      this.open = true;
    }
    ////next popup fix success close and open

    localStorage.setItem('countWin', "1");
    localStorage.setItem('language', "ENG");


  }


  goTutorial() {
    this.goTutorialPage = true;
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
