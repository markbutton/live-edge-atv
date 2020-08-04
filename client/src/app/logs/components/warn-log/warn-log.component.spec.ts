import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarnLogComponent } from './warn-log.component';

describe('WarnLogComponent', () => {
  let component: WarnLogComponent;
  let fixture: ComponentFixture<WarnLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarnLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarnLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
