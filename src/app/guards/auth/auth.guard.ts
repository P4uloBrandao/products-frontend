import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";
import {inject} from "@angular/core";
import {catchError, map, Observable, of} from "rxjs";

export const authGuard: CanActivateFn = (route, state): Observable<boolean> | boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  return authService.validateToken().pipe(
    map(user => {
      if (user) {
        return true;
      } else {
        authService.logoutUser();
        router.navigate(['/login']);
        return false;
      }
    }),
    catchError(() => {
      authService.logoutUser();
      router.navigate(['/login']);
      return of(false);
    })
  );
};
