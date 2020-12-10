import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../service/game.service';
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
    private _api: GameService
  ) { }

  ngOnInit() {
    sessionStorage.clear();
    localStorage.clear();

    setTimeout(() => {
      this.activatedRoute.queryParams.subscribe(params => {
        this.paramToken = params.token;

        if (params.language == 'th') {
          this.paramTlanguage = 'th';
          // this.router.navigate(["loadgame"], { queryParams: { language: 'th', token: params.token } });
        } else if(params.language == 'en') {
          this.paramTlanguage = 'en';
        }else{
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
        if(data["statusCode"] == 20000){
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
          }
        }, 3000);
      });
  }
}
