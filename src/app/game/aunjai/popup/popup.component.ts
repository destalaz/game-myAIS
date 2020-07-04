import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'popup-game',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Input() langauge:any;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  resume1() {
    this.router.navigate(["aunjai1"], { queryParams: { langauge:  this.langauge }});
    console.log("resume1");
  }
  resume2() {
    this.router.navigate(["aunjai2"], { queryParams: { langauge:  this.langauge }});
    console.log("resume2");
  }
  resume3() {
    this.router.navigate(["aunjai3"], { queryParams: { langauge:  this.langauge }});
    console.log("resume3");
  }
  resume4() {
    this.router.navigate(["aunjai4"], { queryParams: { langauge:  this.langauge }});
    console.log("resume4");
  }
  resume5() {
    this.router.navigate(["aunjai5"], { queryParams: { langauge:  this.langauge }});
    console.log("resume5");
  }


}
