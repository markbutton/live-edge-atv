import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { IdeViewState, WorkflowState } from '../../../shared/state';
import { Mongodb } from '../../../shared/models/ide/mongodb.model';
import { MessageModalComponent } from '../../../shared/components/message-modal/message-modal.component';

@Component({
  selector: 'app-mongodb-config',
  templateUrl: './mongodb-config.component.html',
  styleUrls: ['./mongodb-config.component.scss']
})
export class MongodbConfigComponent {

  @Input() config: Mongodb;
  mongoForm: FormGroup;

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
