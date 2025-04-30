import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../services/auth/auth.service";
import {UserRole} from "../../models/user.models";

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated() && authService.getAuth().roleUser === UserRole.ADMIN) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
