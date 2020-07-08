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
  constructor(private gameService: GameService, private router: Router, private route: ActivatedRoute, private rout: Router) { }

  ngOnInit() {
    this.goTutorialPage = false;
    if (!this.langauge) {
      this.langauge = 'ENG';
    }

    this.open = false;
    localStorage.removeItem('sumcclick');
    if (this.route.snapshot.queryParams.token) {
      console.log("check token");
      localStorage.removeItem('resumeGame');
      this.gameService.getMobileId(this.route.snapshot.queryParams.token).subscribe(res => {
        let data = this.deCode(res["token"]);
        if (res) {
          sessionStorage.setItem('playerComplete', data.data.playerComplete);
          if (data.data.playerComplete === true) {
            this.rout.navigate(["popupContinue"], { queryParams: { langauge: "ENG", playerComplete: true } });
            return;
          }

          if (res["resultCode"] === "20000" || res["status"] === true) {
            sessionStorage.setItem('mobileId', data.data.mobileId);
            sessionStorage.setItem('firstPlay', data.data.firstPlay);
            this.loadPage = true;
          }
        }
      })
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

  deCode(_data) {
    var _resData;
    var decoded = jwtDecode(_data);
    _resData = decoded;
    return _resData;
  }

}
