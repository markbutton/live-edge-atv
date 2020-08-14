import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';

import { Workflow } from '../../models/workflow-models';
import { WorkflowState } from '../../../shared/state';


@Component({
  selector: 'app-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.scss']
})
export class IdeComponent implements OnInit {
  selectedWorkflow: Observable<Workflow>;

  constructor(private workflowState: WorkflowState) { }

  ngOnInit() {
    this.selectedWorkflow = this.workflowState.selectedWorkflow;
  }

}
