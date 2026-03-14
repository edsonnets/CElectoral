import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlcaldePage } from './alcalde.page';

describe('AlcaldePage', () => {
  let component: AlcaldePage;
  let fixture: ComponentFixture<AlcaldePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AlcaldePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
