import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { GoogleAnalyticsService } from 'src/app/service/google-analytics.service';
import { Router } from '@angular/router';
@Component({
  selector: 'popup-error',
  templateUrl: './popup-error.component.html',
  styleUrls: ['./popup-error.component.scss']
})
export class PopupErrorComponent implements OnInit {
  @Input() open_redeem_point: boolean;
  @Input() language: string;
  @Output() close_redeem_point = new EventEmitter();
  openPopupReady: boolean = false;
  @Input() aispoint: string = '';
  @Input() profile: any;
  @Input() _tokenParams: string = '';
  error_code: string = '';
  dataGame: any;
  statusLoad: boolean;
  insufficientPoint: boolean = false;





  constructor(private _api: GameService, private router: Router, private _ga: GoogleAnalyticsService) {
  }

  ngOnInit() {
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


    // this.error_code = 'E:16310';
    // this.statusLoad = false;
    // this.insufficientPoint = true;
    // this.statusLoad = false;
    // this.error_code = 'E:16311';
    // this.insufficientPoint = true;
    // this.statusLoad = false;
  }

  close_popup() {
    localStorage.removeItem('resumeGame');
    this.close_redeem_point.emit(this.open_redeem_point);
  }

  redeem_point() {
    this.statusLoad = true;
    this._api.reedeemPoint().subscribe(
      data => {
        if (data["statusCode"] == 20000) {
          this._ga.eventEmitter("reedeem_page", "success", data["statusCode"], localStorage.getItem('o_decode'));
          this.dataGame = data["data"];
          localStorage.setItem('playId', this.dataGame.o);
          localStorage.setItem('totalRound', '4');
          localStorage.setItem('gameSetting', this._api.storageEncrypt(JSON.stringify(this.dataGame.token)));
          localStorage.setItem('config', JSON.stringify(this._api.decrypt(this.dataGame.token)));
          if (localStorage.getItem('countWin') === null) {
            localStorage.setItem('countWin', '1');
          }
          setTimeout(() => {
            this.statusLoad = false;
            this.openPopupReady = true;
          }, 1000);
        } else if (data["statusCode"] == 'E:16310') {
          this.statusLoad = false;
          this.insufficientPoint = true;
          this.error_code = data["statusCode"];
          this._ga.eventEmitter("reedeem_page", "failed", data["statusCode"], localStorage.getItem('o_decode'));
        } else if (data["statusCode"] == 'F:25001') {
          this.statusLoad = false;
          this.error_code = data["statusCode"];
          this._ga.eventEmitter("reedeem_page", "failed", data["statusCode"], localStorage.getItem('o_decode'));
          this.router.navigate(["popupContinue"], { queryParams: { language: this.language, playcomplete: 'true' } });
        } else if (data["statusCode"] == 'E:16348') {
          this.statusLoad = false;
          this.insufficientPoint = true;
          this.error_code = data["statusCode"];
          this._ga.eventEmitter("reedeem_page", "failed", data["statusCode"], localStorage.getItem('o_decode'));
   
        } else if (data["statusCode"] == 'G:20001') {
          this.statusLoad = false;
          this.insufficientPoint = true;
          this.error_code = 'G:20001';
          this._ga.eventEmitter("reedeem_page", "failed", data["statusCode"], localStorage.getItem('o_decode'));
        } else if (data["statusCode"] == 'E:16311' || data["statusCode"] == 'E:02325') {
          this.statusLoad = false;
          this.insufficientPoint = true;
          this.error_code = data["statusCode"];
          this._ga.eventEmitter("reedeem_page", "failed", data["statusCode"], localStorage.getItem('o_decode'));
        } else {
          this.statusLoad = false;
          this.insufficientPoint = true;
          this.error_code = "other";
          this._ga.eventEmitter("reedeem_page", "failed", data["statusCode"], localStorage.getItem('o_decode'));
        }
        //  else {
        //   this.statusLoad = false;
        // }
      },
      error => {
        this.statusLoad = false;
        this._ga.eventEmitter("reedeem_page", "failed", error, localStorage.getItem('o_decode'));
        console.log(error);
      });
  }



}
