import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.token;
  const mustChangePassword = authService.user?.mustChangePassword;

  if (!token) {
    authService.logout();
  }
  
  if (mustChangePassword && state.url !== '/change-password') {
    return router.navigate(['change-password']);
  }

  return true;
};
