import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OttoSpinnerComponent } from './otto-spinner.component';

describe('OttoSpinnerComponent', () => {
  let component: OttoSpinnerComponent;
  let fixture: ComponentFixture<OttoSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OttoSpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OttoSpinnerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
