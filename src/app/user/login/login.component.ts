import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { UserToken } from '../user-token.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidePass = true;
  isLoginPage = true;
  isError = false;
  inProgress = false;
  returnUrl: string;
  message: string;

  loginForm = new FormGroup({

    'email': new FormControl('', [
      Validators.email,
      Validators.required]),

    'password': new FormControl('', [
      Validators.required,
      Validators.minLength(6),
       //Minimum six characters, at least one uppercase letter, one lowercase letter and one number
      Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{6,}')])
  })

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(loginForm: FormGroup) {
    if (!loginForm.valid) {
      //adding extra validation to the form
      return;
    }

    const email =  loginForm.value.email;
    const password = loginForm.value.password;

    this.inProgress = true;

    if(this.isLoginPage) {

      this.auth.signIn(email, password).subscribe({
        next: authResponse => {
          this.inProgress = false;
          this.auth.initializeToken(authResponse['idToken'], +authResponse['expiresIn'])
          this.router.navigate(['']);
        },
        error: e => {
          this.message = e.error.error.message;
          this.isError = true;
          this.inProgress = false;
        }
      });

    } else {

      this.auth.signUp(email, password).subscribe({
        next: () => {
          this.message = 'Account Created!';
          this.inProgress = false;
          this.isError = false;
        },
        error: e => {
          this.message = e.error.error.message;
          this.inProgress = false;
          this.isError = true;
        }
      })
    }
  }

  switch() { //switch between sign in and sign up
    this.isLoginPage = !this.isLoginPage;
    if(!this.message) {
      this.loginForm.reset();
    }
  }
}
