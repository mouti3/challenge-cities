import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotImplementedComponent } from './not-implemented.component';

describe('NotImplementedComponent', () => {
  let component: NotImplementedComponent;
  let fixture: ComponentFixture<NotImplementedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotImplementedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotImplementedComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
