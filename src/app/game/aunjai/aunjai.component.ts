import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
@Component({
  selector: 'game-aunjai',
  templateUrl: './aunjai.component.html',
  styleUrls: ['./aunjai.component.scss']
})
export class AunjaiComponent implements OnInit {
  name = 'Angular';

  ngOnInit() {
    (function ($) {
      $(document).ready(function () {
        console.log("Hello from jQuery!");
      });
    })(jQuery);
  }

}
