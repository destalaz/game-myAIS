import { Component, OnInit, Input } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { Router } from '@angular/router';
import * as jwtDecode from '../../../../../node_modules/jwt-decode';
import 'rxjs';
import { ConnectionService } from 'ng-connection-service';
@Component({
  selector: 'popup-win',
  templateUrl: './popup-win.component.html',
  styleUrls: ['./popup-win.component.scss']
})
export class PopupWinComponent implements OnInit {
  reward: any;
  btnClick: boolean = false;
  @Input() langauge: any;
  @Input() winShow: boolean;
  statusLoad: boolean = false;
  isConnected: boolean = true;
  constructor(private gameService: GameService, private router: Router, private connectionService: ConnectionService) {
    this.reward = localStorage.getItem('rewardpoint');


    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
    })
  }

  ngOnInit() {
    this.reward = localStorage.getItem('rewardpoint');
  }

  servedPlayReward() {
    this.statusLoad = true;
    setTimeout(() => {
      try {
        if (this.isConnected) {
          this.gameService.getReward(sessionStorage.getItem('playId'), sessionStorage.getItem('token')).then(res => {
            let data = this.deCode(res["token"]);
            if (res["resultCode"] === "20000") {
              sessionStorage.removeItem("playId");
              sessionStorage.setItem('playerComplete', data.data.playerComplete);
              if (data.data.playerComplete === true) {
                localStorage.removeItem('resumeGame');
                localStorage.removeItem('rewardpoint');
              }
              else if (data.data.playerComplete !== true) {
                sessionStorage.setItem('playerComplete', 'false');
              }
              this.statusLoad = false;
              this.router.navigate(["popupContinue"], { queryParams: { langauge: this.langauge } });
            } else if (res["resultCode"] === "S.20001") {
              this.statusLoad = false;
              this.router.navigate(["popupContinue"], { queryParams: { langauge: this.langauge } });
            } else {
              this.statusLoad = false;
              // this.router.navigateByUrl('/error-page');
            }
          }).catch(() => {
            this.statusLoad = true;
            setTimeout(() => {
              this.servedPlayReward();
            }, 10000);
          });
        }
      } catch{

      }
    }, 2000);


  }

  deCode(_data) {
    let _resData;
    let decoded = jwtDecode(_data);
    _resData = decoded;
    return _resData;
  }

}
