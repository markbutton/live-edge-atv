import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

import { EquipmentState } from '../../../shared/state';

import { TmcEditComponent } from './tmc-edit.component';
import { ConnectFormDirective } from '../../../shared/directives/connect-form.directive';

describe('TmcEditComponent', () => {
  let component: TmcEditComponent;
  let fixture: ComponentFixture<TmcEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TmcEditComponent,
        ConnectFormDirective
      ],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      providers: [
        EquipmentState
      ]
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
