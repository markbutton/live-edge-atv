export class IdeView {
  view: string;
  connectionTypes: Array<any>;
  nodeTypes: Array<any>;

  constructor() {
    this.view = 'select';
    this.connectionTypes = ['RabbitMQ', 'MongoDB', 'Splunk', 'API', 'SNMP'];
    this.nodeTypes = ['', 'Microservice', 'MongoDB', 'Splunk', 'API', 'Edge'];
  }
}
