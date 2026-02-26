import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductCard } from './add-product-card';

describe('AddProductCard', () => {
  let component: AddProductCard;
  let fixture: ComponentFixture<AddProductCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProductCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
