import { Node } from './node.model';

export class Connection {
  title: string;
  fromSide: string;
  toSide: string;
  color: string;
  to: Node;
  from: Node;

  constructor() {
    this.title = '';
    this.fromSide  = '';
    this.toSide = '';
    this.color = '';
    this.to = new Node();
    this.from = new Node();
  }
}
