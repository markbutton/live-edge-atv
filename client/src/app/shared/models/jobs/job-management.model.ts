import { ChannelLineup } from './channel-lineup.model';
import { NetworkList } from './network-list.model';

export class JobManagement {
  _id: object;
  zoneID: string;
  tmcID: string;
  jobID: string;
  tmcJobID: string;
  slotID: string;
  currentStatus: string;
  runStatus: string;
  active: boolean;
  channelLineup: ChannelLineup;
  networkList: NetworkList;
  automate: boolean;
  isCorrectZone: string;

  constructor() {
    this._id = null;
    this.zoneID = '';
    this.tmcID = '';
    this.jobID = '';
    this.tmcJobID = '';
    this.slotID = '';
    this.currentStatus = '';
    this.runStatus = '';
    this.active = false;
    this.channelLineup = new ChannelLineup();
    this.networkList = new NetworkList();
    this.automate = false;
    this.isCorrectZone = 'uncheck';
  }
}
