import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmcFilterComponent } from './tmc-filter.component';

describe('TmcFilterComponent', () => {
  let component: TmcFilterComponent;
  let fixture: ComponentFixture<TmcFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmcFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmcFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
