import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmcEditComponent } from './tmc-edit.component';

describe('TmcEditComponent', () => {
  let component: TmcEditComponent;
  let fixture: ComponentFixture<TmcEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmcEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmcEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
