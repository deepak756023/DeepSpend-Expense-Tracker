import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { UserMngmntService } from '../modules/user-management/service/user-mngmnt.service';
import { UserInfo } from '../modules/landing-page/Layout/layout/layout.component';

export const userInfoResolver: ResolveFn<UserInfo> = (route, state) => {
  const userService = inject(UserMngmntService);
  const userId = Number(localStorage.getItem('user_id'));

  if (!userId || userId === 0 || isNaN(userId)) {
    return of({} as UserInfo); // returns empty object instead of calling API
  }

  return userService.userInfo(userId);
};
