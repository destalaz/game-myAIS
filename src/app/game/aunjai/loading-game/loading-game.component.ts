import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'loading-game',
  templateUrl: './loading-game.component.html',
  styleUrls: ['./loading-game.component.scss'],
})
export class LoadingGameComponent implements OnInit {
  loading: boolean;

  constructor(private router: Router,) {
    this.loading = false;
  }

  ngOnInit() {

    if (!sessionStorage.getItem('mobileId')) {
      this.router.navigateByUrl('/');
      // this.router.navigateByUrl('/popupError');
      return
    }
    setTimeout(() => {
      this.loading = true;
      setTimeout(() => {

        if (localStorage.getItem('language_Params') == 'th') {
          if (sessionStorage.getItem('firstPlay') !== "true") {
            this.router.navigate(["reward_flip"], { queryParams: { openPage: "TH" } });
          } else {
            this.router.navigate(["tutorial"], { queryParams: { langauge: "TH", firstplay: true } });
          }
        } else if (localStorage.getItem('language_Params') == 'en') {
          if (sessionStorage.getItem('firstPlay') !== "true") {
            this.router.navigate(["reward_flip_eng"], { queryParams: { openPage: "ENG" } });
          } else {
            this.router.navigate(["tutorial_eng"], { queryParams: { langauge: "EN", firstplay: true } });
          }
        }
      }, 2000);
    }, 2000);

  }

}
