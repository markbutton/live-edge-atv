import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrapLogComponent } from './trap-log.component';

describe('TrapLogComponent', () => {
  let component: TrapLogComponent;
  let fixture: ComponentFixture<TrapLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrapLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrapLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
