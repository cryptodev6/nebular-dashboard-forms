import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBuyersComponent } from './create-buyers.component';

describe('CreateBuyersComponent', () => {
  let component: CreateBuyersComponent;
  let fixture: ComponentFixture<CreateBuyersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBuyersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBuyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
