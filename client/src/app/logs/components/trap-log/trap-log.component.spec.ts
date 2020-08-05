import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrapLogComponent } from './trap-log.component';
import { NavViewState } from 'src/app/shared/state';

describe('TrapLogComponent', () => {
  let component: TrapLogComponent;
  let fixture: ComponentFixture<TrapLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrapLogComponent],
      providers: [NavViewState],
    }).compileComponents();
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
