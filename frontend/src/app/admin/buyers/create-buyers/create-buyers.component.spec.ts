import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBuyersComponent } from '../../../pages/buyers/create-buyers/create-buyers.component';

describe('CreatesBuyersComponent', () => {
  let component: CreateBuyersComponent;
  let fixture: ComponentFixture<CreateBuyersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBuyersComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBuyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should creates', () => {
    expect(component).toBeTruthy();
  });
});
