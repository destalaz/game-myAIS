import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

//  import { ApiService } from '../service/api.service';
import { CmsService } from "../service/cms.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'Game-myAIS';
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  msgAlert = "";


  constructor(
    private formBuilder: FormBuilder,
    private cmsService: CmsService,
    private router: Router,
  ) { }

  ngOnInit() {
    
    if ( sessionStorage.getItem('username') ) {
      sessionStorage.clear();
      this.router.navigate(['/config']);
    } else {
      this.router.navigate(['/login']);
    }

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      pwd: ['', [Validators.required]],
    });
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) { return; }
    this.cmsService.login(this.loginForm.value.username, this.loginForm.value.pwd).subscribe((res: any) => {
      // console.log(res)
      if (res.loginStatus === true) {
        sessionStorage.setItem('username', res.data.username)
        this.loading = false;
        this.router.navigate(['/config']);
      } else {
        this.msgAlert = "The username or password is incorrect.";
        this.loading = false;
      }
    });

  }


}


