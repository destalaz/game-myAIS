import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../service/game.service';
import { Session, logging } from 'protractor';
@Component({
  selector: 'app-check-permission-login',
  templateUrl: './check-permission-login.component.html',
  styleUrls: ['./check-permission-login.component.scss']
})
export class CheckPermissionLoginComponent implements OnInit {

  loadPage = false;
  msg = "Loading...";


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private gameService: GameService
  ) { }

  ngOnInit() {

    sessionStorage.clear();
    this.activatedRoute.queryParams.subscribe((params) => {
      let token = params.token
      if (!token) { return }
      this.gameService.getMobileId(token).subscribe(res => {
        console.log(res)
        if (res) {

          sessionStorage.setItem('playerComplete', res["playerComplete"]);
          if (res["playerComplete"] === true) { 
            this.router.navigateByUrl('/popupContinue');
            return;
          }

          if (res["resultCode"] === "20000" || res["status"] === true) {
            sessionStorage.setItem('mobileId', res["mobileId"]);
            sessionStorage.setItem('firstPlay', res["firstPlay"])
            this.router.navigateByUrl('/loadgame');
            this.loadPage = true;
          }
        }
      })
    });

  }




}
