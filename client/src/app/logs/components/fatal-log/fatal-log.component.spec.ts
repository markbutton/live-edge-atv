import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FatalLogComponent } from './fatal-log.component';
import { NavViewState } from 'src/app/shared/state';

describe('FatalLogComponent', () => {
  let component: FatalLogComponent;
  let fixture: ComponentFixture<FatalLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FatalLogComponent],
      providers: [NavViewState],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FatalLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
