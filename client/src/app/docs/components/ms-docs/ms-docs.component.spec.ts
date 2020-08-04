import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsDocsComponent } from './ms-docs.component';

describe('MsDocsComponent', () => {
  let component: MsDocsComponent;
  let fixture: ComponentFixture<MsDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
