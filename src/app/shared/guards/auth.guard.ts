import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '../../core/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.token;
  const mustChangePassword = authService.user?.mustChangePassword;

  if (!token) {
    return router.navigate(['login']);
  }
  
  if (state.url === 'inserimento-resoconto' && mustChangePassword) {
    return router.navigate(['change-password']);
  }

  // if (state.url === 'change-password' && !mustChangePassword) {
  //   return router.navigate(['inserimento-resoconto']);
  // }

  return true;
};
