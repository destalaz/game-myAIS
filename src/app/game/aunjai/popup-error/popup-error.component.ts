import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { Router } from '@angular/router';
import * as jwtDecode from '../../../../../node_modules/jwt-decode';
@Component({
  selector: 'popup-error',
  templateUrl: './popup-error.component.html',
  styleUrls: ['./popup-error.component.scss']
})
export class PopupErrorComponent implements OnInit {
  @Input() redeem_point: boolean;
  @Input() langauge: string;
  @Input() open: boolean;
  @Output() change = new EventEmitter();
  openPopupReady: boolean = false;
  langaugeNow: string;
  aispoint: any;
  statusLoad: boolean;
  insufficientPoint: boolean;




  constructor(private gameService: GameService, private router: Router) {
    this.insufficientPoint = false;
  }

  ngOnInit() {
    this.aispoint = localStorage.getItem('aispoint');
    this.statusLoad = false;
    this.langaugeNow = this.langauge;
  }

  close() {
    localStorage.removeItem('resumeGame');
    if (this.langaugeNow === 'TH') {
      this.langauge = 'TH';
      this.redeem_point = false;
      this.change.emit(this.redeem_point);
    } else {
      this.langauge = 'ENG';
      this.redeem_point = false;
      this.change.emit(this.redeem_point);
    }
  }


  ServedPlayGame() {
    this.statusLoad = true;
    localStorage.removeItem('resumeGame');
    const level = localStorage.getItem('level');

    if (!sessionStorage.getItem('mobileId') || !sessionStorage.getItem('token')) {
      this.router.navigateByUrl('/reload');
      return;
    }

    this.gameService.getPlayDetails(sessionStorage.getItem('mobileId'), Number(level), sessionStorage.getItem('token')).subscribe(res => {

      let dataDt = this.deCode(res["token"]);

      if (dataDt.data.playerComplete === true) {
        sessionStorage.setItem('playerComplete', "true");
        this.router.navigateByUrl('/popupContinue');
        return;
      }

      if (res["status"].toString() !== "true") {
        this.insufficientPoint = true;
        this.statusLoad = false;
        return
      }
      this.insufficientPoint = false;
      sessionStorage.setItem('playId', dataDt.data.playData.playId);
      localStorage.setItem('countWin', "1");
      localStorage.setItem('config', JSON.stringify(dataDt.data.playData.playerDetall));
      localStorage.setItem('totalRound', dataDt.data.playData.amountWin);
      this.openPopupReady = true;
      this.statusLoad = false;
    });

  }

  refresh(): void {
    window.location.reload();
  }

  deCode(_data) {
    var _resData;
    var decoded = jwtDecode(_data);
    _resData = decoded;
    return _resData;
  }

}
