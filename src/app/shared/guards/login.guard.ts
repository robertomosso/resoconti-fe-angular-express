import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of, take } from 'rxjs';

import { UserService } from '../services/user.service';


export const loginGuard: CanActivateFn = (route, state) => {
  const usersService = inject(UserService);
  const router = inject(Router);

  return usersService.hasUser().pipe(
    take(1),
    map(res => {
      if (res.hasUser) {
        usersService.databaseHasUser.set(true); 
        return true;
      }
      
      usersService.databaseHasUser.set(false); 
      router.navigate(['register']);
      return false;
    }),
    catchError(err => {
      console.error('Errore chiamata backend', err);
      router.navigate(['login']);
      return of(false);
    })
  )
};
