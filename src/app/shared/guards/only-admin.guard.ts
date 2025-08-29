import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { Role } from '../enums/role.enum';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

export const onlyAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const usersService = inject(UserService);
  const router = inject(Router);

  if (usersService.databaseHasUser() === false || (authService.user?.role && authService.user.role === Role.Admin)) {
    return true;
  }

  console.error('Permessi non presenti');
  router.navigate(['login']);
  return false;
};
