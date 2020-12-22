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
  playComplete: string = '';
  finished_complete: boolean = false;
  first_page: string = '';
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
      this.first_page = params.first_login;
      if (this.first_page == 'true') {
        this.finished_complete = true;
      }
    });
  }


  openPage() {
    if (this.language === 'th') {
      if (this.playComplete == 'true') {
        this.finished_complete = true;
  
      } else {
        this.route.navigate(["reward_flip"], { queryParams: { language: "th", play_again: true } });
      }

    } else {
      if (this.playComplete == 'true') {
        this.finished_complete = true;
      } else {
        this.route.navigate(["reward_flip_eng"], { queryParams: { language: "en", play_again: true } });
      }

    }
  }



}