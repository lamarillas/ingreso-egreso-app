import { CanActivateFn, Route, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.isAuth()
    .pipe(
      tap( state => {
        if(!state)
          router.navigate(['/login']);
      } )
    );
};
