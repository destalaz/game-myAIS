import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardFlipEngComponent } from './reward-flip-eng.component';

describe('RewardFlipEngComponent', () => {
  let component: RewardFlipEngComponent;
  let fixture: ComponentFixture<RewardFlipEngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardFlipEngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardFlipEngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
