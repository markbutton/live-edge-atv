import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmcComponent } from './tmc.component';
import { NavViewState } from 'src/app/shared/state';

describe('TmcComponent', () => {
  let component: TmcComponent;
  let fixture: ComponentFixture<TmcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TmcComponent],
      providers: [NavViewState],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
