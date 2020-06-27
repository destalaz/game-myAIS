import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reward-flip',
  templateUrl: './reward-flip.component.html',
  styleUrls: ['./reward-flip.component.scss']
})
export class RewardFlipComponent implements OnInit {

  constructor(private router: Router) {}


  ngOnInit() {
  }
  goPlaces() {
    this.router.navigateByUrl('/aunjai');
  }

}
