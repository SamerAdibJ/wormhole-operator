import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  loginForm = new FormGroup({
    'username': new FormControl('', Validators.required),
    'password': new FormControl('', [
      Validators.required,
      Validators.minLength(6),
       //Minimum six characters, at least one uppercase letter, one lowercase letter and one number
      Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{6,}')])
  })

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(loginFrom: FormGroup) {
    console.log(loginFrom);
  }

}
