import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupReadyComponent } from './popup-ready.component';

describe('PopupReadyComponent', () => {
  let component: PopupReadyComponent;
  let fixture: ComponentFixture<PopupReadyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupReadyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupReadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
