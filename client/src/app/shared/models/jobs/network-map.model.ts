export class NetworkMap {
  _id: object;
  name: string;
  active: boolean;
  playTime: string;
  checked: Date;
  tmcJobID: string;
  scores: any;
  skipped: boolean;
  problem: string;

  constructor() {
    this._id = null;
    this.name = '';
    this.active = true;
    this.playTime = '';
    this.checked = null;
    this.tmcJobID = '';
    this.scores = null;
    this.skipped = false;
    this.problem = '';
  }
}
