import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as _ from 'lodash';

import { JobsStatus } from '../../models/jobs/jobs-status.model';
import { JobManagement } from '../../models/jobs/job-management.model';
import { JobsService } from '../../services/jobs/jobs.service';
import { JobManagementService } from '../../services/jobmanagement/jobmanagement.service';

@Injectable()
export class JobsState {
  // State Model
  private _jobsStatus: BehaviorSubject<JobsStatus> = new BehaviorSubject(Object());
  public jobsStatus: Observable<JobsStatus> = this._jobsStatus.asObservable();

  private _jobsManagementStatus: BehaviorSubject<Array<JobManagement>> = new BehaviorSubject(Array());
  public jobsManagementStatus: Observable<Array<JobManagement>> = this._jobsManagementStatus.asObservable();

  private _createdRowID: BehaviorSubject<string> = new BehaviorSubject(String());
  public createdRowID: Observable<string> = this._createdRowID.asObservable();

  constructor(
    @Inject('SESSIONSTORAGE') private sessionStorage: any,
    private jobsService: JobsService,
    private jobManagementService: JobManagementService) {
    this.loadInitialData();
  }

  // State Controller
  public loadInitialData(): void {
    const sessionJobsStatus = this.sessionStorage.getItem('jobsStatus');
    if (sessionJobsStatus) {
      this.getJobsStatusSession();
    } else {
      this.getJobsStatusService();
    }

    this.getJobsManagementService();
  }

  getJobsStatusService(): void {
    this.jobsService.getMockJobsStatus().subscribe(
      res => {
        const response = res;
        this._jobsStatus.next(response);
      },
      err => console.error('Error retrieving Jobs Status')
    );
  }

  getJobsManagementService(newJm: JobManagement = null): void {
    this.jobManagementService.getJobManagement().subscribe(
      res => {
        const response = res;
        this._jobsManagementStatus.next(response);
        if (newJm) {
          this.setCreatedRowID(`${newJm.zoneID}_${newJm.tmcID}`);
        }
      },
      err => console.error('Error retrieving Job Managment')
    );
  }

  getJobsStatusSession(): void {
    const sessionJobsStatus = sessionStorage.getItem('jobsStatus');
    this._jobsStatus.next(JSON.parse(sessionJobsStatus));
  }

  // Getters
  getJobManagement(): any {
    const jm = this._jobsManagementStatus.getValue();
    return jm;
  }

  setCreatedRowID(rowID: string): void {
    this._createdRowID.next(rowID);
  }
}
