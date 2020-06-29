import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'popup-continue',
  templateUrl: './popup-continue.component.html',
  styleUrls: ['./popup-continue.component.scss']
})
export class PopupContinueComponent implements OnInit {
  open: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  openPage() {
    this.open = true;
  }

}
