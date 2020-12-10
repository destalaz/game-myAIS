import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from 'src/app/service/game.service';
@Component({
  selector: 'loading-game',
  templateUrl: './loading-game.component.html',
  styleUrls: ['./loading-game.component.scss'],
})
export class LoadingGameComponent implements OnInit {
  loading: boolean;
  server: string = '';
  constructor(private router: Router, private gameService: GameService,
    private activatedRoute: ActivatedRoute) {
    this.loading = false;
    this.server = this.gameService.server;
  }
  ngOnInit() {
    setTimeout(() => {
      this.loading = true;
      setTimeout(() => {
        this.activatedRoute.queryParams.subscribe(params => {
          if (params.language == 'th') {
            this.router.navigate(["reward_flip"], { queryParams: { language: "th"} });
          } else if (params.language === 'en') {
            this.router.navigate(["reward_flip_eng"], { queryParams: { language: 'en' } });
          }
        });
      }, 1000);
    }, 1000);

  }

}
