import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'popup-continue',
  templateUrl: './popup-continue.component.html',
  styleUrls: ['./popup-continue.component.scss']
})
export class PopupContinueComponent implements OnInit {
  open: boolean = false;
  playerComplete: string;
  language: string;
  playComplete: string='';
  constructor(private activatedRoute: ActivatedRoute, private route: Router) {

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



    this.activatedRoute.queryParams.subscribe(params => {
      this.language = params.language;
      this.playComplete = params.playcomplete;

      console.log(this.playComplete);
      console.log(this.language);
    });
  }


  openPage() {
    if (this.language === 'th') {
      this.route.navigate(["reward_flip"], { queryParams: { language: "th", play_again: true } });
    } else {
      this.route.navigate(["reward_flip_eng"], { queryParams: { language: "en", play_again: true } });
    }
  }



}