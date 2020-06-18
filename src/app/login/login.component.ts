import { Component, OnInit } from '@angular/core';
import { User } from '../models/users';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  id: User;
  username: User;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;


  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
    });
  }

  get f() { return this.loginForm.controls; }

  login() {

    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
  }
}
