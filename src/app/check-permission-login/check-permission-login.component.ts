import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../service/game.service';
import { GoogleAnalyticsService } from '../service/google-analytics.service';
import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-check-permission-login',
  templateUrl: './check-permission-login.component.html',
  styleUrls: ['./check-permission-login.component.scss']
})
export class CheckPermissionLoginComponent implements OnInit {
  paramToken: string;
  paramTlanguage: string;
  retryAuthen: number = 1;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _api: GameService,
    private _ga: GoogleAnalyticsService
  ) { }

  ngOnInit() {
    sessionStorage.clear();
    localStorage.clear();

    setTimeout(() => {
      this.activatedRoute.queryParams.subscribe(async (params) => {
        this.paramToken = params.token;
        let decoded = await jwt_decode(this.paramToken);
        localStorage.setItem('o_decode', decoded.mobileNo);
        if (params.language == 'th') {
          this.paramTlanguage = 'th';
          // this.router.navigate(["loadgame"], { queryParams: { language: 'th', token: params.token } });
        } else if (params.language == 'en') {
          this.paramTlanguage = 'en';
        } else {
          this.paramTlanguage = 'th';
        }
        this.call_Authen(this.paramToken, this.paramTlanguage);
      });
    }, 700);
  }

  call_Authen(paramsToken: string, language: string) {
    let profile;
    this._api.getAuthen(paramsToken).subscribe(
      data => {
        if (data["statusCode"] == 20000) {
          profile = Object.assign(data.data, { "transactionID": data.transactionID }, { paramToken: this.paramToken });
          localStorage.setItem('profile', this._api.storageEncrypt(JSON.stringify(profile)));
          this.router.navigate(["loadgame"], { queryParams: { language: language } });
        }
      },
      error => {
        console.log(error);
        setTimeout(() => {
          if (this.retryAuthen <= 3) {
            this.call_Authen(this.paramToken, this.paramTlanguage);
            console.log(this.retryAuthen);

            this.retryAuthen++;
            this._ga.eventEmitter("root_page", "authen_chk", "retry<3", localStorage.getItem('o_decode'));
          } else {
            this._ga.eventEmitter("root_page", "authen_chk", "failed",localStorage.getItem('o_decode'));
          }
        }, 3000);
      });
  }
}
