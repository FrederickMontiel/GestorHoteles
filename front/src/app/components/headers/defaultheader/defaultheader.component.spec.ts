import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultheaderComponent } from './defaultheader.component';

describe('DefaultheaderComponent', () => {
  let component: DefaultheaderComponent;
  let fixture: ComponentFixture<DefaultheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
