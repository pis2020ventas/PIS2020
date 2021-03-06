import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()

export class AuthGuard implements CanActivate {
  constructor
  (
    private auth:AuthService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.user$.pipe(
      take(1),
      map((user)=> {
        console.log('User->',user);
        if(user) {
          console.log('yes');
          return true;
        } else {
          console.log('no');
          this.router.navigate(['']); //login
          return false;
        }
      })
    );
  }
  
}
