import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSection } from './app-section';

describe('AppSection', () => {
  let component: AppSection;
  let fixture: ComponentFixture<AppSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
