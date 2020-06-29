import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Game-myAIS';
  loginSS = false ;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    if ( sessionStorage.getItem('username')  ) {  this.loginSS = true; }

  }
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
