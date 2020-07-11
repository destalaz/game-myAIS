import { Component, OnInit, Input } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { Router } from '@angular/router';
import * as jwtDecode from '../../../../../node_modules/jwt-decode';
@Component({
  selector: 'popup-win',
  templateUrl: './popup-win.component.html',
  styleUrls: ['./popup-win.component.scss']
})
export class PopupWinComponent implements OnInit {
  open: boolean = false;
  reward: any;
  @Input() langauge: any;
  statusLoad: boolean;
  constructor(private gameService: GameService, private router: Router) {
    this.reward = localStorage.getItem('rewardpoint');
  }



  ngOnInit() {
    this.reward = localStorage.getItem('rewardpoint');
  }
  openPage() {
    this.open = true;
  }

  // this.playerComplete = Boolean(sessionStorage.getItem('playerComplete'));

  servedPlayReward() {
    this.gameService.getReward(sessionStorage.getItem('playId'), sessionStorage.getItem('token')).subscribe(res => {
      this.statusLoad = true;
      let data = this.deCode(res["token"]);
      if (res["msg"] === "Success" && res["resultCode"] === "20000") {
        sessionStorage.removeItem("playId");
        sessionStorage.setItem('playerComplete', data.data.playerComplete)
        if (data.data.playerComplete === true) {
          localStorage.removeItem('resumeGame');
          localStorage.removeItem('rewardpoint');
        }
        else {
          sessionStorage.setItem('playerComplete', 'false');
        }
        this.statusLoad = false;
        this.router.navigate(["popupContinue"], { queryParams: { langauge: this.langauge } });
      }
    });
  }

  deCode(_data) {
    let _resData;
    let decoded = jwtDecode(_data, "123");
    _resData = decoded;
    return _resData;
  }

}
