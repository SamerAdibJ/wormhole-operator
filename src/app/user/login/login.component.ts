import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidePass = true;
  isLoginPage = true;
  responseData: any;
  loginForm = new FormGroup({
    'username': new FormControl('', Validators.required),
    'password': new FormControl('', [
      Validators.required,
      Validators.minLength(6),
       //Minimum six characters, at least one uppercase letter, one lowercase letter and one number
      Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{6,}')])
  })

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(loginFrom: FormGroup) {
    console.log(loginFrom);
    if(this.isLoginPage) {
      this.signIn()
    } else {
      this.signUp();
    }
  }

  signIn() {
    this.auth.proceedLogin(this.loginForm.value);
  }

  signUp() {
    console.log('sign up');
  }

  switch() {
    this.isLoginPage = !this.isLoginPage;
    this.loginForm.reset();
  }

}
