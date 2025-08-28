import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map, take } from 'rxjs';

import { UserService } from '../services/user.service';

export const registerSuperuserGuard: CanActivateFn = (route, state) => {
  const usersService = inject(UserService);

  return usersService.hasUser().pipe(
    take(1),
    map(res => {
      if (!res.hasUser) {
        return true;
      }
      return false;
    }))
};
