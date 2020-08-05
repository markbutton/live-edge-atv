import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiDocsComponent } from './ui-docs.component';
import { NavViewState } from 'src/app/shared/state/nav/nav-view.state';

describe('UiDocsComponent', () => {
  let component: UiDocsComponent;
  let fixture: ComponentFixture<UiDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiDocsComponent],
      providers: [NavViewState],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
