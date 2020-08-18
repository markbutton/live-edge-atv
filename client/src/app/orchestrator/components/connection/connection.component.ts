import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Workflow, WorkflowNode, WorkflowConnection } from '../../models/workflow-models';
import { TrigFunctions } from './trig.functions';
import { WorkflowState } from '../../../shared/state';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';



@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent extends TrigFunctions implements OnInit {

  @Input() container: HTMLElement;
  @Input() workflow: Workflow;
  @Input() color: string;
  @Input() width = 2;
  @ViewChild('div', { static: true }) div;

  constructor(private workflowState: WorkflowState, private dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    if (this.connection.to == null) {
      // Create a destination node with mouse pointer
      this.connection.to = new WorkflowNode(null, null, null, this.connection.from.x, this.connection.from.y);
      this.div.nativeElement.addEventListener('mousemove', (ev => {
        ev = ev || window.event;
        this.connection.to.x = ev.clientX - this.container.offsetLeft;
        this.connection.to.y = ev.clientY - this.container.offsetTop;
      }), false);
    }
  }

  deleteConnection(connection: WorkflowConnection) {
    this.workflow.deleteConnection(connection);
  }

  editConnection(connection: WorkflowConnection) {
    this.workflowState.editWorkflowConnection(connection);
  }

  openDeleteModal(connection: WorkflowConnection) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        id: 1,
        title: 'Delete Connection',
        content: 'Are you sure you want to delete this connection?'
    };

    const dialogRef = this.dialog.open(ConfirmModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteConnection(connection);
      }
    });
  }

}
