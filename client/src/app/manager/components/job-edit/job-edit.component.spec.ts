import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobEditComponent } from './job-edit.component';
import { NavViewState } from 'src/app/shared/state';

describe('JobEditComponent', () => {
  let component: JobEditComponent;
  let fixture: ComponentFixture<JobEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JobEditComponent],
      providers: [NavViewState],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
