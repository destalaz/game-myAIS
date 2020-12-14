import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'popup-lose',
  templateUrl: './popup-lose.component.html',
  styleUrls: ['./popup-lose.component.scss']
})
export class PopupLoseComponent implements OnInit {
  open: boolean = false;
  reward: any;
  @Input() language: any;
  @Input() loseShow: boolean;

  
  constructor(private router: Router) { }

  ngOnInit() {

  }

  endGame() {
      if (this.language == 'th') {
        this.router.navigate(["reward_flip"], { queryParams: { language: "th",play_again: true } });
      } else if (this.language  === 'en') {
        this.router.navigate(["reward_flip_eng"], { queryParams: { language: 'en',play_again: true  } });
      }
  }
}
