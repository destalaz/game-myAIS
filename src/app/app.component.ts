import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})




export class AppComponent {

  constructor(private router: Router) {

  }
  ngOnInit() {
    window.addEventListener("storage", function (e) {
      localStorage.clear();
      if(e.storageArea===sessionStorage){
        sessionStorage.clear();
      } 

    }, true);

  }
  fnRedirect() {
    this.router.navigateByUrl('/loadgame');
  }

}

