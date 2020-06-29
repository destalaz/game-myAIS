import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupContinueComponent } from './popup-continue.component';

describe('PopupContinueComponent', () => {
  let component: PopupContinueComponent;
  let fixture: ComponentFixture<PopupContinueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupContinueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupContinueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
