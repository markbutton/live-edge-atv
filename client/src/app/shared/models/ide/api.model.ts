export class Api {
  name: string;
  host: string;
  path: string;
  apiKey: string;
  apiSecret: string;

  constructor() {
    this.name = 'API';
    this.host = '';
    this.path = '';
    this.apiKey = '';
    this.apiSecret = '';
  }
}
