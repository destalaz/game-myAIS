import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'popup-error',
  templateUrl: './popup-error.component.html',
  styleUrls: ['./popup-error.component.scss']
})
export class PopupErrorComponent implements OnInit {
  @Input() redeem_point: boolean;
  @Input() langauge:string;
  @Output() change = new EventEmitter();
  openPopupReady: boolean = false;
  langaugeNow: string;
  aispoint: any;
  statusLoad: boolean;
  insufficientPoint: boolean

  constructor(private gameService: GameService, private router: Router) {
    this.insufficientPoint = false;
  }

  ngOnInit() {
    this.aispoint = localStorage.getItem('aispoint');
    this.statusLoad = false;
    console.log('langauge => ', this.langauge);

    this.langaugeNow = this.langauge;
    console.log('langaugeNow => ', this.langaugeNow);
    console.log(this.redeem_point);
  }

  close() {
    if (this.langaugeNow === 'TH') {
      this.langauge = 'TH';
      console.log('langauge NOW => ', this.langauge);
      this.redeem_point = false;
      //console.log("close");
      this.change.emit(this.redeem_point);
      console.log(this.redeem_point);
    } else {
      this.langauge = 'ENG';
      console.log('langauge NOW => ', this.langauge);
      this.redeem_point = false;
      //console.log("close");
      this.change.emit(this.redeem_point);
      console.log(this.redeem_point);
    }
  }


  ServedPlayGame() {
    this.statusLoad = true;
    localStorage.removeItem('resumeGame');
    const level = localStorage.getItem("level");
    if (!level) { return }

    this.gameService.getPlayDetails(sessionStorage.getItem('mobileId'), Number(level)).subscribe(res => {
      if (res["status"].toString() !== "true") {
        this.insufficientPoint = true;
        this.statusLoad = false;
        return
      }
      this.insufficientPoint = false;
      sessionStorage.setItem('playId', res["playData"].playId);
      localStorage.setItem('countWin', "1");
      localStorage.setItem('config', JSON.stringify(res["playData"].playerDetall));
      localStorage.setItem('totalRound', JSON.parse(localStorage.getItem('config')).length);
      this.openPopupReady = true;
      this.statusLoad = false;
    });

    // localStorage.removeItem("level")
  }

  refresh(): void {
    window.location.reload();
  }

}
