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
        if (sessionStorage.getItem('firstPlay') !== "true") {
          this.router.navigateByUrl('/reward_flip');
        } else {
          this.router.navigateByUrl('/tutorial');
        }
      }, 2000);
    }, 2000);

  }

}
