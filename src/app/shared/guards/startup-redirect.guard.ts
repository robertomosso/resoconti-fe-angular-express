import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';

import { UserService } from '../services/user.service';

export const startupRedirectGuard: CanActivateFn = (route, state) => {

  const usersService = inject(UserService);
  const router = inject(Router);

  return usersService.hasUser().pipe(
    take(1),
    map(res => {
    if (res.hasUser) {
      router.navigate(['/login']);
    } else {
      router.navigate(['/register-superuser']);
    }
    return false;
  }))
};
