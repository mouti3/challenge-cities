import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OttoDataViewComponent } from './otto-data-view.component';

describe('OttoDataViewComponent', () => {
  let component: OttoDataViewComponent;
  let fixture: ComponentFixture<OttoDataViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OttoDataViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OttoDataViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
