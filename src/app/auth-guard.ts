import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  auth: any = getAuth();
  constructor(private router: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    return this.auth.onAuthStateChanged(user => {
      if (user) return true;
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    })
  }


}
