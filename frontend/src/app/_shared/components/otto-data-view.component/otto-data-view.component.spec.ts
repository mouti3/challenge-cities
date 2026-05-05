import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { vi } from 'vitest';
import { OttoDataViewComponent } from './otto-data-view.component';

describe('OttoDataViewComponent', () => {
  let component: OttoDataViewComponent<Record<string, unknown>>;
  let componentRef: ComponentRef<OttoDataViewComponent<Record<string, unknown>>>;
  let fixture: ComponentFixture<OttoDataViewComponent<Record<string, unknown>>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OttoDataViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent<OttoDataViewComponent<Record<string, unknown>>>(OttoDataViewComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    await fixture.whenStable();
  });


  it('emits paginationChange', () => {
    const spy = vi.fn();
    component.paginationChange.subscribe(spy);

    componentRef.setInput('pagination', { pageNumber: 0, pageSize: 4, total: 20 });
    component.onPage({ first: 4, rows: 4 });

    expect(spy).toHaveBeenCalledWith({ pageNumber: 4, pageSize: 4, total: 20 });
  });
});
