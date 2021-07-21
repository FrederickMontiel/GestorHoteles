import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoteladdComponent } from './hoteladd.component';

describe('HoteladdComponent', () => {
  let component: HoteladdComponent;
  let fixture: ComponentFixture<HoteladdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoteladdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoteladdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
