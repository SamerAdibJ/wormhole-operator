import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
  CanLoad
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';


@Injectable({ providedIn: 'root' })
export class AutoLoginGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.authService.userToken.pipe(
      map(user => {
        console.log(user);

        const isAuth = !!user;
        if (!isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/']);
      })
    );
  }
}
