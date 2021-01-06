import { Component, OnInit, Input } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { ConnectionService } from 'ng-connection-service';
import { GoogleAnalyticsService } from 'src/app/service/google-analytics.service';

@Component({
  selector: 'game-aunjai',
  templateUrl: './aunjai.component.html',
  styleUrls: ['./aunjai.component.scss']
})
export class AunjaiComponent implements OnInit {
  url: string = '';
  height;
  dataParams: any;
  language: string;
  ansVal: any;
  load: boolean = false;
  isConnected: boolean = true;
  winShow: boolean = false;
  loseShow: boolean = false;
  statusApi: boolean = false;
  playId: string = '';
  server: string = '';
  secret: string = '';
  i: number;
  game_status: string = '';
  roundCurrent: number;
  profile:any;
  cclick = localStorage.getItem('sumcclick');
  dataTest = { "status": true, "statusCode": 20000, "data": { "token": "U2FsdGVkX1+6y/orL5i7FVJ0Q65hNFWcyR1i5m/UnltGwGpUzh/KlDrrybIWyU6iqRKCveF5A8yshZX0hnD03G8TCI9uRLkWohut3FeRuCZEGPATN1JYGbUi09AWfIyZJtFzgNYSk88X6jd2JXo5GIE6kCk+FVBE6nbKdH65m5a3gctFMKsRPSVKmsU7GFq18OS00V4O/iW759Pio4ifDInz/JjcRuJqAjOAHoFY8wEEIboPVzvZyAXNXFora+iYJBx4jjjCr31pgOAW9EohbQ==", "o": "5fd096d3fc9ae32b7e60d74d45665bhz" } }

  ngOnInit() {
    this.profile = this.gameService.storageDecrypt(localStorage.getItem('profile'));
    this.activatedRoute.queryParams.subscribe(async (params) => {
      this.language = params.language;
    })
  }

  addChar(val) {
    val = val.toString().substring(0, 10) + 'EUIRUTOOPD';
    return val.toString().substring(0, 10);
  };

  constructor(private activatedRoute: ActivatedRoute, private gameService: GameService, private route: Router, private connectionService: ConnectionService,private _ga: GoogleAnalyticsService) {
    this.server = this.gameService.server;
    this.height = window.screen.availHeight;
    this.secret = 'nnvdJ#3x,!DUKrP">I^s#.62MoZk*,znCiwsAYr4RWNQ2lkDEFdzTqCF10uod2';
    if (this.server) {
      this.url = '../../../../rewardflip/assets/aunjaiAssets/js/script.js';
    } else {
      this.url = '../../../assets/aunjaiAssets/js/script.js';
    }
    localStorage.setItem("gameOver", "false");

    this.loadScript();
  }



  servedPlayResult() {
    this.profile.firstPlay = 'true';
    localStorage.setItem('profile',this.gameService.storageEncrypt(JSON.stringify(this.profile)));
    if (parseInt(localStorage.getItem('countWin')) > parseInt(localStorage.getItem('totalRound'))) {
      this.addChar(this.ansVal);
      this.game_status = 'win';
      this.gameService.playResult(this.addChar(this.ansVal), "resultGame=" + this.game_status + "|" + "time=" + localStorage.getItem('timeTotal') + "|" + "pause=" + localStorage.getItem('countPause')).subscribe(
        data => {
          if (data["statusCode"] == 20000) {
            this.load = false;
            this.winShow = true;
            this._ga.eventEmitter("gameResult", "win", data["statusCode"], localStorage.getItem('o_decode'));
          } else if (data["statusCode"] == 'F:25001') {
            this.load = false;
            this._ga.eventEmitter("gameResult", "win", data["statusCode"], localStorage.getItem('o_decode'));
            this.route.navigate(["popupContinue"], { queryParams: { language: this.language, playcomplete: 'true' } });
          }
        },
        error => {
          this._ga.eventEmitter("gameResult", "win", error, localStorage.getItem('o_decode'));
          console.log(error)
        });
    } else if (localStorage.getItem('gameOver') === "true") {
      this.game_status = 'lose';
      this.gameService.playResult(this.addChar(this.ansVal), "resultGame=" + this.game_status + "|" + "time=" + localStorage.getItem('timeTotal') + "|" + "pause=" + localStorage.getItem('countPause')).subscribe(
        data => {
          if (data["statusCode"] == 20000) {
            this.load = false;
            this.loseShow = true;
            let countwin =  parseInt(localStorage.getItem('countWin')) -1;
            this._ga.eventEmitter("gameResult", "lose", "winAmt"+countwin.toString(), localStorage.getItem('o_decode'));
            localStorage.removeItem('totalRound');
            localStorage.removeItem('countPause');
            localStorage.removeItem('gameOver');
            localStorage.removeItem('playId');
            localStorage.removeItem('config');
            localStorage.removeItem('sumcclick');
            localStorage.removeItem('countWin');
            localStorage.removeItem('timeTotal');
            localStorage.removeItem('gameSetting');
            localStorage.removeItem('cclick');
          }
        },
        error => {
          console.log(error)
        });
    }
  }



  resultGame() {
    this.load = true;
    setTimeout(() => {
      this.ansVal = localStorage.getItem('sumcclick');
      this.servedPlayResult();
    }, 1000);
  }





  public loadScript() {
    let node = document.createElement('script');
    node.src = this.url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }




  encrypt(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.secret,
      {
        keySize: 128 / 8,
        iv: this.secret,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }).toString();
  }



}



