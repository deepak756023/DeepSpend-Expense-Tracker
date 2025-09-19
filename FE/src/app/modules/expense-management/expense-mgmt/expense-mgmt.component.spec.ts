import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseMgmtComponent } from './expense-mgmt.component';

describe('ExpenseMgmtComponent', () => {
  let component: ExpenseMgmtComponent;
  let fixture: ComponentFixture<ExpenseMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseMgmtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
