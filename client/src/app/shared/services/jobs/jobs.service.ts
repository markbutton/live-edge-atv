import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { JobsStatus } from '../../models/jobs/jobs-status.model';
import { JobsStatusData } from '../data/jobs-status.data';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor() { }

  getMockJobsStatus(): Observable<JobsStatus> {
    let data: JobsStatus;
    data = JobsStatusData;
    return of(data);
  }
}
