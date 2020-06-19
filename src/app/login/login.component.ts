import { Component, OnInit } from '@angular/core';
import { User } from '../models/users';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  id: User;

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;


  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      pwd: ['', [Validators.required]],
    });
  }

  get f() { return this.loginForm.controls; }

  login() {

    this.submitted = true;
    if (this.loginForm.invalid) { return; }

    if (this.loginForm.value.username !== "admin" && this.loginForm.value.pwd !== "root") {
      alert("The username or password is incorrect.");
      return;
    }

    let bodyOauth = new URLSearchParams();
    bodyOauth.set('client_secret', "7612efd12f7952634b7a28cf9aff3449");
    bodyOauth.set('grant_type', "client_credentials");
    bodyOauth.set('nonce', "MyAIS2020060000000");
    bodyOauth.set('client_id', "JjIVkneVcJuNz6tFQ4Ki5E4QBx6SBcIC37zyEnVK0HQ");
    this.getOauth(bodyOauth);

    this.loading = true;
  }

  getOauth(body) {
    this.apiService.oauth(body).subscribe((res: any) => {
      console.log("res => ", res);
    });
  }

}


