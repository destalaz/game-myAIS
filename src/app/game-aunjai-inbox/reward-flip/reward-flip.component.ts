import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../service/game.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AnyTxtRecord } from 'dns';
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
  @Output() changes = new EventEmitter();

  constructor(private gameService: GameService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    ////next popup fix success close and open
    this.open = false;
    if (!this.langauge) {
      this.langauge = 'TH';
    }
    if (localStorage.getItem('resumeGame')) {
      this.open = true;
    }
    ////next popup fix success close and open


    this.goTutorialPage = false;
    localStorage.setItem('countWin', "1");

    console.log('langauge => ', this.langauge);

    if(this.route.queryParams['langauge']){
      console.log("hahah",this.route.queryParams['langauge']);
      this.langauge = this.dataParams.langauge;
      this.open = this.dataParams.openPage;
    }



  }


  goTutorial() {
    this.goTutorialPage = true;
    console.log(this.goTutorialPage);
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

}


