import { ChannelMap } from './channel-map.model';

export class ChannelLineup {
  _id: object;
  name: string;
  channels: Array<ChannelMap>;
  lineupID: string;

  constructor() {
    this._id = null;
    this.name = '';
    this.channels = new Array();
    this.lineupID = '';
  }
}
