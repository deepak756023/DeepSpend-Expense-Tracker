import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutTeamsComponent } from './our-teams.component';

describe('OutTeamsComponent', () => {
  let component: OutTeamsComponent;
  let fixture: ComponentFixture<OutTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutTeamsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OutTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
