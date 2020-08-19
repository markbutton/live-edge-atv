import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Workflow } from '../../../orchestrator/models/workflow-models';
// import { Socket } from 'ngx-socket-io';
// import { SocketAPI } from '../../modules/socket.module';
import { APIService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService extends APIService {

  constructor(private http: HttpClient,
    // private socketAPI: SocketAPI
  ) {
    super(http);
  }

  createWorkflow(wf: Workflow): Observable<Workflow> {
    return super.apiPost<Workflow>('workflow', wf);
  }

  getWorkflow(): Observable<Array<Workflow>> {
    return super.apiGet<Array<Workflow>>('workflow');
  }

  getWorkflowId(id: string): Observable<Workflow> {
    return super.apiGet<Workflow>('workflow/' + id);
  }

  updateWorkflow(id: string, wf: Workflow): Observable<Workflow> {
    return super.apiPut<Workflow>('workflow/' + id, wf);
  }

  deleteWorkflow(id: string): Observable<Workflow> {
    return super.apiDelete<Workflow>('workflow/' + id);
  }

  notifyWorkflowsChanged(): void {
    // this.socketAPI.emit('workflowsUpdated');
  }

  notifyWorkflowChanged(wf: Workflow): void {
    // this.socketAPI.emit('workflowUpdated', wf);
  }

  getNotify(): any {
    // return this.socketAPI.fromEvent('notify');
  }

}
