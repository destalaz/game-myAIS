import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})




export class AppComponent {

  constructor(private router: Router) {}
  ngOnInit() {
    console.log("ondinit");
    sessionStorage.clear();
    localStorage.clear();
  }
  ngOnDestroy(): void {
    console.log("ondestroy");
      sessionStorage.clear();
      localStorage.clear();
  }

}

