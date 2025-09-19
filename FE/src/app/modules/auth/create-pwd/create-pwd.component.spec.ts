import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePwdComponent } from './create-pwd.component';

describe('CreatePwdComponent', () => {
  let component: CreatePwdComponent;
  let fixture: ComponentFixture<CreatePwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePwdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
