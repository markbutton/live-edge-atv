import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugLogComponent } from './debug-log.component';
import { NavViewState } from 'src/app/shared/state';

describe('DebugLogComponent', () => {
  let component: DebugLogComponent;
  let fixture: ComponentFixture<DebugLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DebugLogComponent],
      providers: [NavViewState],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebugLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
