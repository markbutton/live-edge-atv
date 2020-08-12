export class TestJobStatus {
  id: string;
  name: string;
  status: string;
  createdAt: Date;
  startedAt: Date;
  finishedAt: Date;
  user: string;

  constructor() {
    this.id = '';
    this.name = '';
    this.status = '';
    this.createdAt = new Date();
    this.startedAt = new Date();
    this.finishedAt = new Date();
    this.user = '';
  }
}
