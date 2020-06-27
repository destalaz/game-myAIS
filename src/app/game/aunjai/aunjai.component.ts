import { Component, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'game-aunjai',
  templateUrl: './aunjai.component.html',
  styleUrls: ['./aunjai.component.scss'],
  host: {
    "(window:resize)": "onWindowResize($event)"
  }
})
export class AunjaiComponent implements OnInit {
  isTablet: boolean = false;
  width: number = window.innerWidth;
  height: number = window.innerHeight;
  mobileWidth: number = 720;
  mobileHeight: number = 1280;

  ngOnInit() {
    (function ($) {
      $(document).ready(function () {
        console.log("Hello Script!");
        if (window.localStorage) {
          if (!localStorage.getItem('firstLoad')) {
            localStorage['firstLoad'] = true;
            window.location.reload();
          }
          else
            localStorage.removeItem('firstLoad');
        }
      });
    })(jQuery);
    localStorage.setItem('Mobile', this.mobileWidth.toString());

  }
  //Check Resolution Width720 Height1280 Fix BG
  onWindowResize(event) {
    this.width = event.target.innerWidth;
    this.height = event.target.innerHeight;
    if (this.width >= this.mobileWidth && this.height >= this.mobileHeight) {
      this.isTablet = true;
    } else {
      this.isTablet = false;
    }
    console.log(this.isTablet)

  }

  ngOnDestroy() {
    localStorage.removeItem('firstLoad');
    console.log('Service destroy')
  }
}
