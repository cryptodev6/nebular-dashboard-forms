import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardssComponent } from './dashboardss.component';

describe('DashboardssComponent', () => {
  let component: DashboardssComponent;
  let fixture: ComponentFixture<DashboardssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardssComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
