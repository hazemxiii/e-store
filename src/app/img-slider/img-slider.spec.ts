import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgSlider } from './img-slider';

describe('ImgSlider', () => {
  let component: ImgSlider;
  let fixture: ComponentFixture<ImgSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgSlider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgSlider);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
