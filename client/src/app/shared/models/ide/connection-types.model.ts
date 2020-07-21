import { Rabbitmq } from './rabbitmq-model';
import { Mongodb } from './mongodb.model';
import { Splunk } from './splunk.model';

export class ConnectionTypes {
  types: Array<any>;

  constructor() {
    this.types = [
      new Rabbitmq(),
      new Mongodb(),
      new Splunk()
    ];
  }
}
