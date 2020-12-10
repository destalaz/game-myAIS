import { Component, OnInit, Input } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { ConnectionService } from 'ng-connection-service';
@Component({
  selector: 'game-aunjai',
  templateUrl: './aunjai.component.html',
  styleUrls: ['./aunjai.component.scss']
})
export class AunjaiComponent implements OnInit {
  url: string = '';
  private subscriptions = new Subscription();
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

  constructor(private activatedRoute: ActivatedRoute, private gameService: GameService, private route: Router, private connectionService: ConnectionService) {
    this.server = this.gameService.server;
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
          } else if (data["statusCode"] == 'F:25001') {
            this.load = false;
            this.route.navigate(["popupContinue"], { queryParams: { language: this.language, playcomplete: 'true' } });
          }
        },
        error => {
          console.log(error)
        });
    } else if (localStorage.getItem('gameOver') === "true") {
      this.game_status = 'lose';
      this.gameService.playResult(this.addChar(this.ansVal), "resultGame=" + this.game_status + "|" + "time=" + localStorage.getItem('timeTotal') + "|" + "pause=" + localStorage.getItem('countPause')).subscribe(
        data => {
          if (data["statusCode"] == 20000) {
            this.load = false;
            this.loseShow = true;
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



