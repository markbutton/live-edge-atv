import { Component, OnInit } from '@angular/core';

import { WorkflowState, IdeViewState } from '../../../shared/state';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Workflow, WorkflowNode, WorkflowConnection } from '../../models/workflow-models';
import { IdeView } from '../../../shared/models/ide/ide-view.model';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { MessageModalComponent } from '../../../shared/components/message-modal/message-modal.component';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})

export class ToolsComponent implements OnInit {
  workflows: Observable<Array<Workflow>>;
  selectedWorkflow: Observable<Workflow>;
  selectedWorkflowNode: Observable<WorkflowNode>;
  selectedWorkflowConnection: Observable<WorkflowConnection>;
  ideView: Observable<IdeView>;

  selectForm: FormGroup;
  editConnectionForm: FormGroup;
  editNodeForm: FormGroup;
  addWorkflowForm: FormGroup;
  editWorkflowForm: FormGroup;
  addNodeForm: FormGroup;

  constructor(private workflowState: WorkflowState,
    private formBuilder: FormBuilder,
    private ideViewState: IdeViewState,
    private dialog: MatDialog) { }

  ngOnInit() {
    // Subscribe to state services
    this.workflows = this.workflowState.workflows;
    this.ideView = this.ideViewState.ideView;
    this.selectedWorkflow = this.workflowState.selectedWorkflow;
    this.selectedWorkflowNode = this.workflowState.selectedNode;
    this.selectedWorkflowConnection = this.workflowState.selectedConnection;

    // Select View Form
    this.selectForm = this.formBuilder.group({
      'workflow': []
    });
    this.selectForm.valueChanges.subscribe((changes) => {
      this.workflowState.setSelectedWorkflow(changes.workflow);
    });

    // Edit Connection Form
    this.editConnectionForm = this.formBuilder.group({
      'type': []
    });
    this.editConnectionForm.valueChanges.subscribe((changes) => {
      this.workflowState.changeConnectionType(changes.type);
    });

    // Edit Node Form
    this.editNodeForm = this.formBuilder.group({
      'id': [],
      'title': [],
      'type': [],
    });
    this.editNodeForm.valueChanges.subscribe((changes) => {
      this.workflowState.setSelectedWorkflowNode(changes);
    });

    // Add Workflow Form
    this.addWorkflowForm = this.formBuilder.group({
      'name': [],
    });

    // Edit Workflow Form
    this.editWorkflowForm = this.formBuilder.group({
      'name': [],
    });

    // Add Node Form
    this.addNodeForm = this.formBuilder.group({
      'title': [],
      'type': []
    });
  }

  onCancel() {
    this.ideViewState.changeView('select');
  }

  onNodeSave() {
    this.workflowState.saveWorkflowNode(this.openMessageModal('Information', 'Node saved!'));
  }

  addWorkflow() {
    this.ideViewState.changeView('addWorkflow');
    (<FormControl>this.addWorkflowForm.controls['name']).setValue('');
  }

  editWorkflow() {
    const wf = this.workflowState.getSelectedWorkflow();
    this.ideViewState.changeView('editWorkflow');
    (<FormControl>this.editWorkflowForm.controls['name']).setValue(wf.name);
  }

  addNode() {
    const wf = this.workflowState.getSelectedWorkflow();
    if (wf.name !== undefined) {
      if (wf.name !== '') {
        this.ideViewState.changeView('addNode');
      }
    }
  }

  onWorkflowAdd() {
    this.workflowState.createWorkflow(this.addWorkflowForm.value.name);
  }

  onWorkflowEdit() {
    this.workflowState.editWorkflow(this.editWorkflowForm.value.name, this.openMessageModal('Information', 'Workflow saved!'));
  }

  onWorkflowDelete() {
    this.workflowState.deleteWorkflow();
  }

  onNodeAdd() {
    this.workflowState.createNode(this.addNodeForm.value);
  }

  openDeleteModal() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        id: 1,
        title: 'Delete Workflow',
        content: 'Are you sure you want to delete this workflow?'
    };

    const dialogRef = this.dialog.open(ConfirmModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.onWorkflowDelete();
      }
    });
  }

  openMessageModal(title, message): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: title,
      content: message
    };
    const dialogRef = this.dialog.open(MessageModalComponent, dialogConfig);
  }

}
