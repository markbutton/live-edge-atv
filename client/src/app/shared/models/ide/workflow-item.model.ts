import { WorkflowNode, WorkflowConnection } from '../../../orchestrator/models/workflow-models';

export class WorkflowItem {
  _id: string;
  name: string;
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];

  constructor() {
    this._id = '';
    this.name = '';
    this.nodes = [];
    this.connections = [];
    }
}
