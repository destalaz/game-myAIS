import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupLoseComponent } from './popup-lose.component';

describe('PopupLoseComponent', () => {
  let component: PopupLoseComponent;
  let fixture: ComponentFixture<PopupLoseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupLoseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupLoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
