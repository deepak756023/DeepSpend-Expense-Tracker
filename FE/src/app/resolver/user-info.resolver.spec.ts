import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { userInfoResolver } from './user-info.resolver';

describe('userInfoResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => userInfoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
