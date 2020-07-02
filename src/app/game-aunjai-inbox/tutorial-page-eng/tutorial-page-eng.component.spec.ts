import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialPageEngComponent } from './tutorial-page-eng.component';

describe('TutorialPageEngComponent', () => {
  let component: TutorialPageEngComponent;
  let fixture: ComponentFixture<TutorialPageEngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialPageEngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialPageEngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
