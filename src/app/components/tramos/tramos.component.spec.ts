import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramosComponent } from './tramos.component';

describe('TramosComponent', () => {
  let component: TramosComponent;
  let fixture: ComponentFixture<TramosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TramosComponent]
    });
    fixture = TestBed.createComponent(TramosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
