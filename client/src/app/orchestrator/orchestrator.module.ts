import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardMdImage, MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { AngularDraggableDirective } from './directive/angular-draggable.directive';
import { StopPropagationDirective } from './directive/stop-propagation.directive';
import { HtmlPipe } from './pipes/HtmlPipe';
import { OrchestratorRouter } from './orchestrator.router';
import { DirectiveModule } from '../shared/directives/directive.module';

import { OrchestratorComponent } from './orchestrator.component';
import { WorkflowComponent } from './components/workflow/workflow.component';
import { NodeComponent } from './components/node/node.component';
import { ConnectionComponent } from './components/connection/connection.component';
import { LineComponent } from './components/line/line.component';
import { TestComponent } from './components/test/test.component';
import { IdeComponent } from './components/ide/ide.component';
import { ToolsComponent } from './components/tools/tools.component';
import { RabbitmqConfigComponent } from './components/rabbitmq-config/rabbitmq-config.component';
import { MongodbConfigComponent } from './components/mongodb-config/mongodb-config.component';
import { SplunkConfigComponent } from './components/splunk-config/splunk-config.component';
import { ApiConfigComponent } from './components/api-config/api-config.component';
import { SnmpConfigComponent } from './components/snmp-config/snmp-config.component';
import { WorkflowState } from '../shared/state/ide/workflow.state';
import { IdeViewState } from '../shared/state/ide/ide-view.state';

@NgModule({
  declarations: [
    OrchestratorComponent,
    ConnectionComponent,
    NodeComponent,
    WorkflowComponent,
    HtmlPipe,
    LineComponent,
    AngularDraggableDirective,
    StopPropagationDirective,
    TestComponent,
    IdeComponent,
    ToolsComponent,
    RabbitmqConfigComponent,
    MongodbConfigComponent,
    SplunkConfigComponent,
    ApiConfigComponent,
    SnmpConfigComponent
  ],
  imports: [
    CommonModule,
    DirectiveModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    OrchestratorRouter,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    OrchestratorComponent
  ],
  providers: [
    WorkflowState,
    IdeViewState
  ]
})
export class OrchestratorModule { }
