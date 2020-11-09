import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../service/game.service';
import { ActivatedRoute } from '@angular/router';
import * as jwtDecode from '../../../../node_modules/jwt-decode';
// import * as jwEncode from '../../../../node_modules/jsonwebtoken/sign.js';


@Component({
  selector: 'app-reward-flip',
  templateUrl: './reward-flip.component.html',
  styleUrls: ['./reward-flip.component.scss']
})
export class RewardFlipComponent implements OnInit {

  termUrl = "myais://gamesterm?lang=th&url=http%3A%2F%2Fwww.ais.co.th%2Frewardflip";
  goTutorialPage: boolean = false;
  langauge: string;
  open: boolean = false;
  loadPage = false;
  openPage: string;
  @Output() changes = new EventEmitter();

  constructor(private gameService: GameService, private router: Router, private route: ActivatedRoute, private rout: Router) { }

  ngOnInit() {

    localStorage.setItem('countWin', "1");

    if (localStorage.getItem('language_Params') == 'th') {
      this.langauge = 'TH';
      //console.log(this.langauge);
    } else if (localStorage.getItem('language_Params') == 'en') {
      this.langauge = 'EN';
      //console.log(this.langauge);
    }


    this.route.queryParams.subscribe(params => {
      this.openPage = params.openPage;
    })


    this.open = false;
    localStorage.removeItem('sumcclick');
    if (localStorage.getItem('resumeGame')) {
      this.open = true;
    }
    this.goTutorialPage = false;
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
      localStorage.setItem('level', "1");
    } else if (level == 2) {
      localStorage.setItem('aispoint', "2");
      localStorage.setItem('rewardpoint', "50");
      localStorage.setItem('level', "2");
    } else {
      localStorage.setItem('aispoint', "3");
      localStorage.setItem('rewardpoint', "100");
      localStorage.setItem('level', "3");
    }
    this.open = true;
    this.changes.emit(this.open);
    localStorage.setItem('level', level);
  }

}