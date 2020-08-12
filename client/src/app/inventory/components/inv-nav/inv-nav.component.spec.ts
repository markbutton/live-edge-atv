import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvNavComponent } from './inv-nav.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('InvNavComponent', () => {
  let component: InvNavComponent;
  let fixture: ComponentFixture<InvNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InvNavComponent
      ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
