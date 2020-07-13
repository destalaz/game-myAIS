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
    this.loadPage = true;
    sessionStorage.clear();
    localStorage.clear();
    this.activatedRoute.queryParams.subscribe(async (params) => {
      let token = params.token;
      if (!token) { return }
      this.gameService.getMobileId(token).subscribe(async (res) => {
        console.log(res);
        if (res) {
          sessionStorage.setItem('token', token);

          let data = await this.deCode(res["token"]);
          console.log(data.data.playerComplete);
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

  async deCode(_data) {
    let _resData;
    let decoded = jwtDecode(_data, "123");
    _resData = decoded;
    return _resData;
  }

}
