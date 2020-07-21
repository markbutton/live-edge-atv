import { Connection } from './connection.model';
import { Node } from './node.model';

export class Workflow {
  nodes: Array<Node>;
  connections: Array<Connection>;

  constructor() {
    this.nodes = [new Node()];
    this.connections = [new Connection()];
    }
}
