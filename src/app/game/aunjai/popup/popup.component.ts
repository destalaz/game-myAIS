import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'popup-game',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Input() language:string;
 
  constructor(private router: Router) { }

  ngOnInit() {
  }

  resume() {
    
    this.router.navigate(["aunjai"+localStorage.getItem('countWin')], { queryParams: { language:  this.language}});
  }


}
