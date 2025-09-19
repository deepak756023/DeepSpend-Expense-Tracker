import { TestBed } from '@angular/core/testing';

import { UserMngmntService } from './user-mngmnt.service';

describe('UserMngmntService', () => {
  let service: UserMngmntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserMngmntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
