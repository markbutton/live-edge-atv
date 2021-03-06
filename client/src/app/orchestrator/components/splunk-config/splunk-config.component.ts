import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IdeViewState, WorkflowState } from '../../../shared/state';
import { Splunk } from '../../../shared/models/ide/splunk.model';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { MessageModalComponent } from '../../../shared/components/message-modal/message-modal.component';

@Component({
  selector: 'app-splunk-config',
  templateUrl: './splunk-config.component.html',
  styleUrls: ['./splunk-config.component.scss']
})
export class SplunkConfigComponent {

  @Input() config: Splunk;
  splunkForm: FormGroup;

  constructor(private ideViewState: IdeViewState,
    private workflowState: WorkflowState,
    private dialog: MatDialog) { }

  onCancel() {
    this.ideViewState.changeView('select');
  }

  onSave() {
    this.workflowState.saveConfig(this.config, this.openMessageModal('Information', 'Connection saved!'));
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
