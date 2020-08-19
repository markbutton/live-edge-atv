import { Component, Input, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Api } from '../../../shared/models/ide/api.model';
import { IdeViewState, WorkflowState } from '../../../shared/state';
import { MessageModalComponent } from '../../../shared/components/message-modal/message-modal.component';

@Component({
  selector: 'app-api-config',
  templateUrl: './api-config.component.html',
  styleUrls: ['./api-config.component.scss']
})
export class ApiConfigComponent {

  @Input() config: Api;
  apiForm: FormGroup;

  constructor(private ideViewState: IdeViewState,
    private workflowState: WorkflowState,
    private dialog: MatDialog, private element: ElementRef) { }

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
