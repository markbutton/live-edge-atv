import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiDocsComponent } from './api-docs.component';
import { NavViewState } from 'src/app/shared/state/nav/nav-view.state';

describe('ApiDocsComponent', () => {
  let component: ApiDocsComponent;
  let fixture: ComponentFixture<ApiDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApiDocsComponent],
      providers: [NavViewState],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
