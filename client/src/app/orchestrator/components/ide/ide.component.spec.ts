import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ApiConfigComponent } from '../api-config/api-config.component';
import { IdeComponent } from './ide.component';
import { ToolsComponent } from '../tools/tools.component';
import { WorkflowComponent } from '../workflow/workflow.component';
import { RabbitmqConfigComponent } from '../rabbitmq-config/rabbitmq-config.component';
import { MongodbConfigComponent } from '../mongodb-config/mongodb-config.component';
import { SplunkConfigComponent } from '../splunk-config/splunk-config.component';
import { NodeComponent } from '../node/node.component';
import { ConnectionComponent } from '../connection/connection.component';
import { LineComponent } from '../line/line.component';
import { SnmpConfigComponent } from '../snmp-config/snmp-config.component';

import { HtmlPipe } from '../../pipes/HtmlPipe';
import { ConnectFormDirective } from '../../../shared/directives/connect-form.directive';
import { AngularDraggableDirective } from '../../directive/angular-draggable.directive';

import * as state from '../../../shared/state';
import { SocketAPI } from 'src/app/shared/modules/socket.module';

describe('IdeComponent', () => {
  let component: IdeComponent;
  let fixture: ComponentFixture<IdeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        IdeComponent,
        ToolsComponent,
        WorkflowComponent,
        ConnectFormDirective,
        RabbitmqConfigComponent,
        MongodbConfigComponent,
        SplunkConfigComponent,
        ApiConfigComponent,
        NodeComponent,
        ConnectionComponent,
        AngularDraggableDirective,
        LineComponent,
        SnmpConfigComponent,
        HtmlPipe
      ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        MatDialogModule
      ],
      providers: [
        SocketAPI,
        state.WorkflowState,
        state.IdeViewState,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
