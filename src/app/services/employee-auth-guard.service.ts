import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeAuthGuardService implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isEmployeeRole()) {
      // User is logged in
       return true;
    } else {
      // User is not logged in
      this.router.navigate(['/access-denied']); // Redirect to the "no-access" page
      return false;
    }
  }

}

