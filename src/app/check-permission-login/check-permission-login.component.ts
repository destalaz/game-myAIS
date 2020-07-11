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
    this.resetData();
    // console.log(this.deCode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im1vYmlsZUlkIjoiUklUNkZZNVFDcEVYdWxvWUVCWm9HeFlDTXo0NGJYN2Y4dDNjUkczSUplbT0iLCJmaXJzdFBsYXkiOmZhbHNlLCJwbGF5ZXJDb21wbGV0ZSI6ZmFsc2V9LCJpYXQiOjE1OTQ0Mzc5MzUsImV4cCI6MTU5NDQ0MTUzNX0.ihivA1CizOTymP5k_KenwFUcJcZuY3l2GLRBeGU4Vwg"));
    // let token = params.token;


    this.activatedRoute.queryParams.subscribe((params) => {
      let token = params.token;
      if (!token) { return }
      this.gameService.getMobileId(token).subscribe((res) => {

        if (res) {

          sessionStorage.setItem('token', token);

          let data = this.deCode(res["token"]);
          console.log(data);
          sessionStorage.setItem('playerComplete', data.data.playerComplete);
          console.log(sessionStorage.getItem('playerComplete'))
          if (data.data.playerComplete === true) {
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


  public async resetData() {
    sessionStorage.clear();
    localStorage.clear();
  }



  deCode(_data) {
    let _resData;
    let decoded = jwtDecode(_data, "123");
    _resData = decoded;
    return _resData;
  }

}
