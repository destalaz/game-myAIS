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
    console.log(this.langauge)
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
    if (localStorage.getItem('resumeGame')) {
      localStorage.removeItem('resumeGame');
    }
    const level = localStorage.getItem('level');
    if(level == '1'){
      localStorage.setItem('totalRound', '3');
    }else if(level == '2'){
      localStorage.setItem('totalRound', '4');
    }else if(level == '3'){
      localStorage.setItem('totalRound', '4');
    }
    this.statusLoad = true;
    setTimeout(() => {
      this.insufficientPoint = false;
          localStorage.setItem('countWin', "1");
          
          this.openPopupReady = true;
          this.statusLoad = false;
    }, 1000);
  }
}
