import { Component, OnInit} from '@angular/core';
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
  name = 'Angular';
  isMobile: boolean = false;
  width:number = window.innerWidth;
  height:number = window.innerHeight;
  mobileWidth:number  = 760;




  ngOnInit() {
    (function ($) {
      $(document).ready(function () {
        console.log("Hello from jQuery!");
      });
    })(jQuery);

    this.isMobile = this.width < this.mobileWidth;
  }
  onWindowResize(event) {
    this.width = event.target.innerWidth;
    this.height = event.target.innerHeight;
    this.isMobile = this.width < this.mobileWidth;
}

 

}
