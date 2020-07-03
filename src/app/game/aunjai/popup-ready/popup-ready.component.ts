import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'popup-ready',
  templateUrl: './popup-ready.component.html',
  styleUrls: ['./popup-ready.component.scss']
})
export class PopupReadyComponent implements OnInit {

  totalRound: number;
  constructor(private router: Router) { }

  ngOnInit() {
    this.totalRound = parseInt(localStorage.getItem('totalRound'));
    setTimeout(() => {
      this.router.navigateByUrl('/aunjai1');
    }, 2000);
  }

}
