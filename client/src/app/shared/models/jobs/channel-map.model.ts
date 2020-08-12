export class ChannelMap {
  _id: object;
  hdName: string;
  channelName: string;
  channelNumber: string;
  conflictChannel: string;

  constructor() {
    this._id = null;
    this.hdName = '';
    this.channelName = '';
    this.channelNumber = '';
    this.conflictChannel = '';
  }
}
