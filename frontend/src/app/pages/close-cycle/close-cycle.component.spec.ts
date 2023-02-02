import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseCycleComponent } from './close-cycle.component';

describe('CloseCycleComponent', () => {
  let component: CloseCycleComponent;
  let fixture: ComponentFixture<CloseCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseCycleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
