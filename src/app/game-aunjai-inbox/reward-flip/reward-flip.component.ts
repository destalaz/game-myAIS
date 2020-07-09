import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../service/game.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as jwtDecode from '../../../../node_modules/jwt-decode';
// import * as jwEncode from '../../../../node_modules/jsonwebtoken/sign.js';


@Component({
  selector: 'app-reward-flip',
  templateUrl: './reward-flip.component.html',
  styleUrls: ['./reward-flip.component.scss']
})
export class RewardFlipComponent implements OnInit {
  private subscriptions = new Subscription();
  termUrl = "myais://gamesterm?lang=th&url=http%3A%2F%2Fwww.ais.co.th%2Frewardflip";
  goTutorialPage: boolean = false;
  langauge: string;
  open: boolean = false;

  dataParams: any;
  optionGame: any;
  openPageRoute: any;
  loadPage = false;
  testenCode = "mmeanhahahohok123";
  testToekn: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiUklUNkZZNVFDcEVYdWxvWUVCWm9HeFlDTXo0NGJYN2Y4dDNjUkczSUplbT0iLCJpYXQiOjE1OTQxODI2NjAsImV4cCI6MTU5NDE4NjI2MH0.ifw1rfeAf1_w-rw35pNCfEIvL8V4FhXfsFpo4pc5DkQ";
  @Output() changes = new EventEmitter();

  constructor(private gameService: GameService, private router: Router, private route: ActivatedRoute, private rout: Router) { }

  ngOnInit() {
    if (!this.langauge) {
      this.langauge = 'TH';
    }
    this.open = false;
    localStorage.removeItem('sumcclick');


    ////next popup fix success close and open



    if (localStorage.getItem('resumeGame')) {
      this.open = true;
    }
    ////next popup fix success close and open




    this.goTutorialPage = false;

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
      localStorage.setItem('level', "1");
    } else if (level == 2) {
      localStorage.setItem('aispoint', "2");
      localStorage.setItem('rewardpoint', "50");
      localStorage.setItem('level', "2");
    } else {
      localStorage.setItem('aispoint', "3");
      localStorage.setItem('rewardpoint', "100");
      localStorage.setItem('level', "3");
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



