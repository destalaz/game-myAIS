import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkChkComponent } from './network-chk.component';

describe('NetworkChkComponent', () => {
  let component: NetworkChkComponent;
  let fixture: ComponentFixture<NetworkChkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkChkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkChkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
