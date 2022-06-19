import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  operatorUrl = 'https://62ab3161bd0e5d29af0a4f59.mockapi.io/api/v1/operator';
  subscription: Subscription;

  constructor(private http: HttpClient) { }

  proceedLogin(userCred: any) {
    this.subscription = this.http.get(this.operatorUrl).subscribe(
      responseData => {
        console.log(responseData);
        const cred = responseData[0];
        if(cred.username === userCred.username &&
           cred.password === userCred.password) {

          // this.router.navigate(['main-page']);

        } else {
          alert('wrong credentials');
        }
    });
    this.subscription.unsubscribe();
  }
}
