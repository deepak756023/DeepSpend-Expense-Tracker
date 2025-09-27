import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { roleBasedAuthGuard } from './role-based-auth.guard';

describe('roleBasedGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => roleBasedAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
