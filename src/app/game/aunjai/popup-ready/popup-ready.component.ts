import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import{ DetailService} from '../../../service/detail.service';

@Component({
  selector: 'popup-ready',
  templateUrl: './popup-ready.component.html',
  styleUrls: ['./popup-ready.component.scss']
})
export class PopupReadyComponent implements OnInit {
  @Input() langauge;
  totalRound: number;
  constructor(private router: Router,private detailService:DetailService) { }
  openGame:boolean=false;
  
  ngOnInit() {
    console.log("log ready",this.langauge);
    this.totalRound = parseInt(localStorage.getItem('totalRound'));
    setTimeout(() => {
      this.detailService.language = this.langauge;
      // this.detailService.fnGetlanguge(this.langauge);
      this.openGame = true;
    }, 2000);
  }

}
