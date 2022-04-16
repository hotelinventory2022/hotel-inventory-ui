import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Constants } from '../models/constants';
import { NotificationService } from '../services/notification/notification.service';
@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}
  canActivate(): boolean {
    const jwtHelper = new JwtHelperService();
    const loggedInUserDetails = this.authService.getLoggedInUser();
    if (loggedInUserDetails) {
      if (jwtHelper.isTokenExpired(loggedInUserDetails.jwtToken)) {
        this.notificationService.showSuccess(
          Constants.sessionExpiredMessage,
          'Login',
          5000
        );
        this.router.navigateByUrl('/login');
        return false;
      } else {
        return true;
      }
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
