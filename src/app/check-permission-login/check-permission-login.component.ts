import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../service/game.service';
import * as jwtDecode from '../../../node_modules/jwt-decode';
import {Location} from '@angular/common';
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
    private gameService: GameService,
    private _location: Location
  ) { }

  ngOnInit() {
    // this._location.back();
    this.loadPage = true;
    sessionStorage.clear();
    localStorage.clear();
    this.activatedRoute.queryParams.subscribe(async (params) => {
      let token = params.token;
      if (params.language == 'th') {
        this.language_params = "TH";
      } else if (params.language == 'en') {
        this.language_params = "ENG";
      }
      console.log(this.language_params)
      localStorage.setItem('language_Params', params.language)
      console.log(this.language_params);
      if (!token) { return }
      await this.gameService.getMobileId(token).subscribe((res) => {
        if (res) {
          // console.log(res);
          // console.log(res["o"]);
          sessionStorage.setItem('token', token);
          let data = jwtDecode(res["token"], "123");
          sessionStorage.setItem('playerComplete', res["o"]);
          // console.log(sessionStorage.getItem('playerComplete'));
          setTimeout(() => {
            if (sessionStorage.getItem('playerComplete') === "true") {
              this.router.navigate(["/popupContinue"], { queryParams: { langauge: this.language_params, openPage: true } });
              return;
            }

            if (res["resultCode"] === "20000" || res["status"] === true) {
              sessionStorage.setItem('mobileId', data.data.mobileId);
              sessionStorage.setItem('firstPlay', data.data.firstPlay);
              this.router.navigateByUrl('/loadgame');
              this.loadPage = true;
            }
          }, 1500);
        }
      })
    });
  }

  deCode(_data) {
    let _resData;
    let decoded = jwtDecode(_data);
    _resData = decoded;
    return _resData;
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }

}
