import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrchestratorComponent } from './orchestrator.component';
import { NavViewState } from '../shared/state';

describe('OrchestratorComponent', () => {
  let component: OrchestratorComponent;
  let fixture: ComponentFixture<OrchestratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrchestratorComponent],
      providers: [NavViewState],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrchestratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
