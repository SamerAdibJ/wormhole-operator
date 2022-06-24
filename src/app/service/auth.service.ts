import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';

import { UserToken } from '../user/user-token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private key = 'AIzaSyCO2x_f2auX8U5hjfgSUf1fgwIPGzrDXzk';
  private signUpEndpoint= 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
  private signInEndpoint= 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';

  private tokenTimer: any;
  userToken = new BehaviorSubject<UserToken>(null);

  constructor(private http: HttpClient, private router: Router) { }

  signIn(email: string, password: string) {
    return this.http.post(
      this.signInEndpoint,
        {
          email: email,
          password: password,
          returnSecureToken: true
        },
        {
          params: new HttpParams().set('key', this.key)
        }
      )
  }

  signUp(email: string, password: string) {
    return this.http.post(
      this.signUpEndpoint,
      {
        email: email,
        password: password,
        returnSecureToken: true
      },
      {
        params: new HttpParams().set('key', this.key)
      }
    )
  }

  logout() {
    this.userToken.next(null);
    this.router.navigate(['/operator']);
    localStorage.removeItem('userToken');
    if (this.tokenTimer) {
      clearTimeout(this.tokenTimer);
    }
    this.tokenTimer = null;
  }

  initializeToken(token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const newUserToken = new UserToken(token, expirationDate);
    this.userToken.next(newUserToken);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userToken', JSON.stringify(newUserToken));
  }

  autoLogin() {
    const userToken: { token: string, tokenExpirationDate: string} = JSON.parse(localStorage.getItem('userToken'));
    console.log('userToken');
    console.log(userToken);
    if (!userToken) {
      return;
    }

    const loadedUserToken = new UserToken(userToken.token, new Date(userToken.tokenExpirationDate));


    if (loadedUserToken.userToken) {
      this.userToken.next(loadedUserToken);

      //calculating the expiration date manually
      const expirationDuration = new Date(userToken.tokenExpirationDate).getTime() - new Date().getTime();

      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
