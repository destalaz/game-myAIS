import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardFlipComponent } from './reward-flip.component';

describe('RewardFlipComponent', () => {
  let component: RewardFlipComponent;
  let fixture: ComponentFixture<RewardFlipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardFlipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardFlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
