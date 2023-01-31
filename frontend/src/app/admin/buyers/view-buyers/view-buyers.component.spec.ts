import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBuyersComponent } from '../../../pages/buyers/view-buyers/view-buyers.component';

describe('ViewBuyersComponent', () => {
  let component: ViewBuyersComponent;
  let fixture: ComponentFixture<ViewBuyersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBuyersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBuyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
