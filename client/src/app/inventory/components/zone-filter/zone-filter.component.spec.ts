import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneFilterComponent } from './zone-filter.component';

describe('ZoneFilterComponent', () => {
  let component: ZoneFilterComponent;
  let fixture: ComponentFixture<ZoneFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
