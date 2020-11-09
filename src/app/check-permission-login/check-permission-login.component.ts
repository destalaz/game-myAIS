import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../service/game.service';
@Component({
  selector: 'app-check-permission-login',
  templateUrl: './check-permission-login.component.html',
  styleUrls: ['./check-permission-login.component.scss']
})
export class CheckPermissionLoginComponent implements OnInit {

  loadPage = false;
  msg = "Loading...";

  language_params: string = '';
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.loadPage = true;
    sessionStorage.clear();
    localStorage.clear();
    this.activatedRoute.queryParams.subscribe(async (params) => {
      if (params.language == 'th') {
        this.language_params = "th";
      } else if (params.language == 'en') {
        this.language_params = "en";
      }else{
        this.language_params = "th";
      }
      localStorage.setItem('language_Params', this.language_params)
      sessionStorage.setItem('firstPlay', 'true');
      this.router.navigateByUrl('/loadgame');
      this.loadPage = true;
    });
  }


  ngOnDestroy(): void {
  }

}
