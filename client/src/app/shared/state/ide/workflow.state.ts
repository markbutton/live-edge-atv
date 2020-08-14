import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Guid } from 'guid-typescript';

import { WorkflowService } from '../../services/workflow/workflow.service';
import { Workflow, WorkflowNode, WorkflowConnection } from '../../../orchestrator/models/workflow-models';
import { IdeViewState } from './ide-view.state';

@Injectable()
export class WorkflowState {
  // State Model
  private _workflows: BehaviorSubject<Array<Workflow>> = new BehaviorSubject(Array());
  public workflows: Observable<Array<Workflow>> = this._workflows.asObservable();
  private _selectedWorkflow: BehaviorSubject<Workflow> = new BehaviorSubject(Object());
  public selectedWorkflow: Observable<Workflow> = this._selectedWorkflow.asObservable();
  private _selectedNode: BehaviorSubject<WorkflowNode> = new BehaviorSubject(Object());
  public selectedNode: Observable<WorkflowNode> = this._selectedNode.asObservable();
  private _selectedConnection: BehaviorSubject<WorkflowConnection> = new BehaviorSubject(Object());
  public selectedConnection: Observable<WorkflowConnection> = this._selectedConnection.asObservable();

  constructor(private workflowService: WorkflowService, private ideViewState: IdeViewState) {
    this.loadInitialData();
  }

  // State Controller
  public loadInitialData(): void {
    this.getWorkflowsService();
    this.ideViewState.loadInitialData();
    // this.getNotify().subscribe(data => {
    //   if (data) {
    //     this.getWorkflowsService();
    //   }
    // });
  }

  getWorkflowsService(id?: string): void {
    this.workflowService.getWorkflow().subscribe(
      res => {
        const response: Array<Workflow> = res;
        const arr = new Array();
        response.forEach(element => {
          const workflowNodes: WorkflowNode[] = [];
          const workflowConnections: WorkflowConnection[] = [];

          // Create Workflow
          const workflow = new Workflow();
          workflow._id = element._id;
          workflow.name = element.name;

          // Create WorkflowNodes
          element.nodes.forEach(node => {
            const crNode: WorkflowNode = new WorkflowNode(node.id, node.title, node.type, node.x, node.y);
            workflowNodes.push(crNode);
          });
          workflow.nodes = workflowNodes;

          // Create WorkflowConnections
          element.connections.forEach(conn => {
            const crConnection: WorkflowConnection = new WorkflowConnection();
            crConnection.fromSide = conn.fromSide;
            crConnection.toSide = conn.toSide;
            crConnection.to = conn.to;
            crConnection.title = conn.title;
            crConnection.type = conn.type;
            crConnection.config = conn.config;
            workflow.nodes.forEach(node => {
              if (node.title === conn.from.title) {
                crConnection.from = node;
              }
              if (node.title === conn.to.title) {
                crConnection.to = node;
              }
            });
            workflowConnections.push(crConnection);
          });
          workflow.connections = workflowConnections;
          arr.push(workflow);
        });
        this._workflows.next(arr);
        if (id) {
          this.setSelectedWorkflow(id);
        }
      },
      err => {
        console.error('Error retrieving workflows', err);
      }
    );
  }

  getWorkflows(): any {
    const wfs = this._workflows.getValue();
    return wfs;
  }

  getSelectedWorkflow(): any {
    const wf = this._selectedWorkflow.getValue();
    return wf;
  }

  getSelectedNode(): any {
    const node = this._selectedNode.getValue();
    return node;
  }

  getSelectedConnection(): any {
    const conn = this._selectedConnection.getValue();
    return conn;
  }

  getFirstWorkflow(excludedId?: string): any {
    const workflows = this._workflows.getValue();
    if (workflows) {
      for (let i = 0; i < workflows.length; i++) {
        if (workflows[i]._id !== excludedId) {
          return workflows[i];
        }
      }
    }
    return null;
  }

  setSelectedWorkflow(id: string): void {
    const wfs = this.getWorkflows();
    const wf = wfs.find(x => x._id === id);
    this._selectedWorkflow.next(wf);
  }

  setSelectedWorkflowNode(node: WorkflowNode): void {
    this._selectedNode.next(node);
  }

  setSelectedWorkflowConnection(connection: WorkflowConnection): void {
    this._selectedConnection.next(connection);
  }

  saveWorkflow(afterSaveHandler?: void): void {
    const wf = this.getSelectedWorkflow();
    this.workflowService.updateWorkflow(wf._id, wf).subscribe(
      res => {
        this._selectedWorkflow.next(wf);
        // tslint:disable-next-line:no-unused-expression
        afterSaveHandler;
        this.workflowService.notifyWorkflowsChanged();
      },
      err => {
        console.error('Error updating equipment', err);
      }
    );
  }

  deleteWorkflow(): void {
    const wf = this.getSelectedWorkflow();
    this.workflowService.deleteWorkflow(wf._id).subscribe(
      res => {
        const firstWf = this.getFirstWorkflow(wf._id);
        this.getWorkflowsService(firstWf._id);
        this.ideViewState.changeView('select');
        this.workflowService.notifyWorkflowsChanged();
      },
      err => {
        console.error('Error deleting workflow', err);
      }
    );
  }

  saveWorkflowNode(afterSaveHandler?: void): void {
    const wf = this.getSelectedWorkflow();
    const wfn = this.getSelectedNode();
    const wfnode = wf.nodes.find(x => x.id === wfn.id);
    const nodeIndex = wf.nodes.indexOf(wfnode);

    const connectionBefore = [];
    const connectionAfter = [];

    wf.connections.forEach(con => {
      if (con.from.title === wf.nodes[nodeIndex].title) {
        connectionAfter.push(con);
      }
      if (con.to.title === wf.nodes[nodeIndex].title) {
        connectionBefore.push(con);
      }
    });

    const connectionBeforeIndex = [];
    const connectionAfterIndex = [];

    connectionBefore.forEach(x => {
      connectionBeforeIndex.push(wf.connections.indexOf(x));
    });
    connectionAfter.forEach(x => {
      connectionAfterIndex.push(wf.connections.indexOf(x));
    });

    connectionBeforeIndex.forEach(index => {
      wf.connections[index].to.title = wfn.title;
      wf.connections[index].title = wf.connections[index].from.title + ' to ' + wfn.title;
    });

    connectionAfterIndex.forEach(index => {
      wf.connections[index].from.title = wfn.title;
      wf.connections[index].title = wfn.title + ' to ' + wf.connections[index].to.title;
    });

    wf.nodes[nodeIndex].type = wfn.type;
    wf.nodes[nodeIndex].title = wfn.title;
    this._selectedWorkflow.next(wf);
    this.saveWorkflow(afterSaveHandler);
    this.ideViewState.changeView('select');
  }

  editWorkflowConnection(connection: WorkflowConnection): void {
    this.setSelectedWorkflowConnection(connection);
    this.ideViewState.changeView('editConnection');
  }

  editWorkflowNode(node: WorkflowNode): void {
    this.setSelectedWorkflowNode(node);
    this.ideViewState.changeView('editNode');
  }

  changeConnectionType(type: string): void {
    const swfc = this.getSelectedConnection();
    swfc.type = type;
  }

  saveConfig(config: object, afterSaveHandler?: void): void {
    const swfc = this.getSelectedConnection();
    swfc.config = config;
    this._selectedConnection.next(swfc);
    this.saveWorkflow(afterSaveHandler);
    this.ideViewState.changeView('select');
  }

  createWorkflow(name: string): void {
    const wf = new Workflow();
    wf.nodes = [] as any;
    wf.connections = new Array();
    wf.name = name;
    this.workflowService.createWorkflow(wf).subscribe(
      res => {
        this.getWorkflowsService(res._id);
        this.ideViewState.changeView('select');
        this.workflowService.notifyWorkflowsChanged();
      },
      err => {
        console.error('Error inserting workflow', err);
      }
    );
  }

  editWorkflow(name: string, afterSaveHandler?: void): void {
    const wf = this.getSelectedWorkflow();
    wf.name = name;
    this.saveWorkflow(afterSaveHandler);
    this.ideViewState.changeView('select');
  }

  createNode(node: WorkflowNode): void {
    const swf = this.getSelectedWorkflow();
    const guid = Guid.create();
    const nn = new WorkflowNode(guid.toString(), node.title, node.type, 0, 0);
    swf.nodes.push(nn);
    this._selectedWorkflow.next(swf);
    this.ideViewState.changeView('select');
  }

  getNotify(): any {
    return this.workflowService.getNotify();
  }

}
