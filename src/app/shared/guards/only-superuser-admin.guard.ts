import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { Role } from '../interfaces/role.enum';

export const onlySuperuserAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  if (authService.user?.role && [Role.Superuser, Role.Admin].includes(authService.user.role)) {
    return true;
  }

  return false;
};
