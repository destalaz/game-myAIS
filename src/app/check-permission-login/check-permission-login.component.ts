import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../service/game.service';
import * as jwtDecode from '../../../node_modules/jwt-decode';

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
    localStorage.clear();
    this.activatedRoute.queryParams.subscribe((params) => {
      let token = params.token;
      if (!token) { return }
      this.gameService.getMobileId(token).subscribe((res) => {

        if (res) {
          sessionStorage.setItem('token', token);

          let data = this.deCode(res["token"]);
          sessionStorage.setItem('playerComplete', data.data.playerComplete);
          if (sessionStorage.getItem('playerComplete') === "true") {
            this.router.navigateByUrl('/popupContinue');
            return;
          }

          if (res["resultCode"] === "20000" || res["status"] === true) {
            sessionStorage.setItem('mobileId', data.data.mobileId);
            sessionStorage.setItem('firstPlay', data.data.firstPlay);
            this.router.navigateByUrl('/loadgame');
            this.loadPage = true;
          }
        }
      })
    });
  }
  deCode(_data) {
    let _resData;
    let decoded = jwtDecode(_data, "123");
    _resData = decoded;
    return _resData;
  }

}
