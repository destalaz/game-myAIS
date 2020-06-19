import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsConfigComponent } from './cms-config.component';

describe('CmsConfigComponent', () => {
  let component: CmsConfigComponent;
  let fixture: ComponentFixture<CmsConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
