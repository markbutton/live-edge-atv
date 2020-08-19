export class Order {
  id: string;
  date: string;
  type: string;
  desc: string;
  status: string;

  constructor() {
    this.id = '';
    this.date = '';
    this.type = '';
    this.desc = '';
    this.status = '';
  }
}
