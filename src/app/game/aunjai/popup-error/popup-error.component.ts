import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'popup-error',
  templateUrl: './popup-error.component.html',
  styleUrls: ['./popup-error.component.scss']
})
export class PopupErrorComponent implements OnInit {

  aispoint: any;
  constructor() { }

  ngOnInit() {
    this.aispoint = localStorage.getItem('aispoint');
  }

}
