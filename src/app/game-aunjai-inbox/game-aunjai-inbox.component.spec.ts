import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAunjaiInboxComponent } from './game-aunjai-inbox.component';

describe('GameAunjaiInboxComponent', () => {
  let component: GameAunjaiInboxComponent;
  let fixture: ComponentFixture<GameAunjaiInboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameAunjaiInboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameAunjaiInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
