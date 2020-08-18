import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { ToolsComponent } from './tools.component';
import { WorkflowState, IdeViewState } from '../../../shared/state';
import { getSessionStorage } from '../../../app.module';
import { SocketAPI } from '../../../shared/modules/socket.module';

import { ConnectFormDirective } from '../../../shared/directives/connect-form.directive';

describe('ToolsComponent', () => {
  let component: ToolsComponent;
  let fixture: ComponentFixture<ToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToolsComponent,
        ConnectFormDirective
      ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatDialogModule
      ],
      providers: [
        SocketAPI,
        WorkflowState, IdeViewState,
        { provide: 'SESSIONSTORAGE', useFactory: getSessionStorage },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a title Manage Workflow', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.query(By.css('label[id="workflow-label"]')).nativeElement;
    expect(compiled.textContent).toEqual('Manage Workflow');
  });

  it('should show workflow dropdown', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('select').value).toEqual('');
  });

  it('should render an add node button', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.query(By.css('a[id="add-node"]')).nativeElement;
    expect(compiled.textContent).toEqual('');
  });

  it('should render an add workflow button', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.query(By.css('a[id="add-workflow"]')).nativeElement;
    expect(compiled.textContent).toEqual('');
  });

});
