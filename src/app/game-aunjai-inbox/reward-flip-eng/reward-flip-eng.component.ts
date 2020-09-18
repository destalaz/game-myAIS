import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import * as jwtDecode from '../../../../node_modules/jwt-decode';
@Component({
  selector: 'app-reward-flip-eng',
  templateUrl: './reward-flip-eng.component.html',
  styleUrls: ['./reward-flip-eng.component.scss']
})
export class RewardFlipEngComponent implements OnInit {

  @Output() changes = new EventEmitter();

  open: boolean = false;
  termUrl = "myais://gamesterm?lang=en&url=http%3A%2F%2Fwww.ais.co.th%2Frewardflip%2Fen";
  goTutorialPage: boolean = false;
  langauge: string;
  loadPage = false;
  openPage: string;
  constructor(private gameService: GameService, private router: Router, private route: ActivatedRoute, private rout: Router) { }

  ngOnInit() {
    this.goTutorialPage = false;
    this.open = false;
    localStorage.removeItem('sumcclick');
    localStorage.setItem('countWin', "1");
    localStorage.setItem('language', "ENG");

    this.langauge = 'ENG';

    this.gameService.getMobileId(sessionStorage.getItem('token')).subscribe((res) => {
      if (res['o'] === true) {
        sessionStorage.setItem('playerComplete', "true");
        this.router.navigateByUrl('/popupContinue', { queryParams: { langauge: "ENG" } });
      }
    })

    this.route.queryParams.subscribe(params => {
      this.openPage = params.openPage;
      console.log('openPage => ', this.openPage)
    })
    // if (!this.langauge) {
    //   this.langauge = 'ENG';
    // }

    if (localStorage.getItem('resumeGame')) {
      this.open = true;
    }

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

  deCode(_data) {
    var _resData;
    var decoded = jwtDecode(_data);
    _resData = decoded;
    return _resData;
  }
}