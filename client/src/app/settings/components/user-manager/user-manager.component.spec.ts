import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagerComponent } from './user-manager.component';
import { NavViewState } from 'src/app/shared/state';

describe('UserManagerComponent', () => {
  let component: UserManagerComponent;
  let fixture: ComponentFixture<UserManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserManagerComponent],
      providers: [NavViewState],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
