import { NetworkMap } from './network-map.model';

export class NetworkList {
  _id: object;
  name: string;
  networks: Array<NetworkMap>;

  constructor() {
    this._id = null;
    this.name = '';
    this.networks = new Array();
  }
}
