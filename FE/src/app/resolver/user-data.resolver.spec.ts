import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { userDataResolver } from './user-data.resolver';

describe('userDataResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => userDataResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
