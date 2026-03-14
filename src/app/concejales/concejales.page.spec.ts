import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConcejalesPage } from './concejales.page';

describe('ConcejalesPage', () => {
  let component: ConcejalesPage;
  let fixture: ComponentFixture<ConcejalesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcejalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
