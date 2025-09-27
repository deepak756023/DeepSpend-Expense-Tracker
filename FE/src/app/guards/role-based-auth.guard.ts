import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleBasedAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const userRole = localStorage.getItem('user_role');
  const exp = localStorage.getItem('exp');
  const currentTime = Math.floor(Date.now() / 1000);

  if (currentTime >= Number(exp)) {
    localStorage.clear();
    router.navigate(['/session-expired']);
    return false;
  }

  const expectedRole = route.data?.['role'] as string;

  if (expectedRole === userRole || userRole === 'ADMIN') {
    return true;
  }

  router.navigate(['/unauthorized']);
  return false;


};
