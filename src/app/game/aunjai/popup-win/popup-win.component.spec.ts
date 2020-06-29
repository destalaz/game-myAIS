import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupWinComponent } from './popup-win.component';

describe('PopupWinComponent', () => {
  let component: PopupWinComponent;
  let fixture: ComponentFixture<PopupWinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupWinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupWinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
