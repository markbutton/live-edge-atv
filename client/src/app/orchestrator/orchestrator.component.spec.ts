import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { OrchestratorComponent } from './orchestrator.component';

describe('OrchestratorComponent', () => {
  let component: OrchestratorComponent;
  let fixture: ComponentFixture<OrchestratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OrchestratorComponent
      ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
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
