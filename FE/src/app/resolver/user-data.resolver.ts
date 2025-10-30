// resolvers/user-data.resolver.ts
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserMngmntService } from '../modules/user-management/service/user-mngmnt.service';
import { User } from '../modules/user-management/user-management/user-management.component';

export const userDataResolver: ResolveFn<Observable<User[]>> = () => {
  const userService = inject(UserMngmntService);
  return userService.getUsers();
};
