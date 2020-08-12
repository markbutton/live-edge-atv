import { TestJobStatus } from './test-job-status.model';

export class JobsStatus {
  status: number;
  statusDetail: string;
  statusMessage: string;
  testJobsStatus: Array<TestJobStatus>;

  constructor() {
    this.status = 0;
    this.statusDetail = '';
    this.statusMessage = '';
    this.testJobsStatus = new Array<TestJobStatus>();
  }
}
