import { TestBed } from '@angular/core/testing';

import { ExpenseMgmtService } from './expense-mgmt.service';

describe('ExpenseMgmtService', () => {
  let service: ExpenseMgmtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpenseMgmtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
