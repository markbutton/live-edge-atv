import { ChannelMap } from './channel-map.model';

export class Zone {
  _id: object;
  zoneName: string;
  syscode: string;
  zoneType: string;
  networks: Array<string>;
  zips: Array<string>;

  constructor() {
    this._id = null;
    this.zoneName = '';
    this.syscode = '';
    this.zoneType = '';
    this.networks = new Array();
    this.zips = new Array();
  }
}
