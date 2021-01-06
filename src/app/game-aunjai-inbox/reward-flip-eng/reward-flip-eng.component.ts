import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GoogleAnalyticsService } from '../../service/google-analytics.service';
@Component({
  selector: 'app-reward-flip-eng',
  templateUrl: './reward-flip-eng.component.html',
  styleUrls: ['./reward-flip-eng.component.scss']
})
export class RewardFlipEngComponent implements OnInit {

  open_redeem_point: boolean = false;
  termUrl = "myais://gamesterm?lang=en&url=http%3A%2F%2Fwww.ais.co.th%2Frewardflip%2Fen";
  @Input() goTutorialPage: boolean = false;
  language = 'en';
  loadPage = false;
  openPage: string;
  server: string = '';
  profile: any;
  aispoint: string = '';
  _tokenParams:string='';
  constructor(private gameService: GameService, private router: Router, private route: ActivatedRoute, private rout: Router,private _ga: GoogleAnalyticsService) {
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
        this.router.navigate(["popupContinue"], { queryParams: { language: this.language,playcomplete:'true',first_login:'true' } });
      }


      if (this.profile.firstPlay == true) {
        this.goTutorialPage = true;
      }
    })
  }


  goTutorial() {
    this.goTutorialPage = true;
  }

  termCondition() {
    window.location.href = this.termUrl;
  }

  change_language() {
    this.profile.firstPlay = 'true';
    this._ga.eventEmitter("main_page", "chk_played", "playCompleted", localStorage.getItem('o_decode'));
    this.router.navigate(["reward_flip"], { queryParams: { language: "th"}});
  }

  setLevel(level) {
    this.aispoint = level;
    this.open_redeem_point = true;
  }

  close_popup_reedeem($event) {
    this.open_redeem_point = false;
  }
  close_popup_tutorial($event) {
    this.goTutorialPage = false;
  }
}