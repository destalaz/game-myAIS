import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../service/game.service';
import { ActivatedRoute } from '@angular/router';
import { GoogleAnalyticsService } from '../../service/google-analytics.service';
// import * as jwEncode from '../../../../node_modules/jsonwebtoken/sign.js';


@Component({
  selector: 'app-reward-flip',
  templateUrl: './reward-flip.component.html',
  styleUrls: ['./reward-flip.component.scss']
})
export class RewardFlipComponent implements OnInit {

  termUrl = "myais://gamesterm?lang=th&url=http%3A%2F%2Fwww.ais.co.th%2Frewardflip";
  @Input() goTutorialPage: boolean = false;
  open_redeem_point: boolean = false;
  loadPage = false;
  openPage: string;
  server: string = '';
  language = 'th';
  profile: any;
  aispoint: string = '';
  _tokenParams: string = '';
  constructor(private gameService: GameService, private router: Router, private route: ActivatedRoute, private rout: Router, private _ga: GoogleAnalyticsService) {
    this.server = this.gameService.server;

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.language = params.language;
      if (params.play_again == 'true') {
        this.setLevel(3);
      }
      this.profile = this.gameService.storageDecrypt(localStorage.getItem('profile'));
      if (this.profile.playcomplete == true) {
        this._ga.eventEmitter("main_page", "chk_played", "playCompleted", localStorage.getItem('o_decode'));
        this.router.navigate(["popupContinue"], { queryParams: { language: this.language, playcomplete: 'true', first_login: 'true' } });
      }

      if (this.profile.firstPlay == true) {
        this.goTutorialPage = true;
      }


    })
  }




  termCondition() {
    window.location.href = this.termUrl;
  }

  setLevel(level) {
    this.aispoint = level;
    this.open_redeem_point = true;
  }

  change_language() {
    this.profile.firstPlay = 'true';
    localStorage.setItem('profile', this.gameService.storageEncrypt(JSON.stringify(this.profile)));
    this.router.navigate(["reward_flip_eng"], { queryParams: { language: "en" } });
  }

  goTutorial() {
    this.goTutorialPage = true;
  }

  close_popup_reedeem($event) {
    this.open_redeem_point = false;
  }

  close_popup_tutorial($event) {
    this.goTutorialPage = false;
  }

}