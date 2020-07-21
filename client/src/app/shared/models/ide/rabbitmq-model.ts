export class Rabbitmq {
  name: string;
  qname: string;
  channel: string;
  messageKey: string;
  payload: string;

  constructor() {
    this.name = 'RabbitMQ';
    this.qname = '';
    this.channel = '';
    this.messageKey = '';
    this.payload = '';
  }
}
