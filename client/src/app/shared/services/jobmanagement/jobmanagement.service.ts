import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JobManagement } from '../../models/jobs/job-management.model';
import { APIService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class JobManagementService extends APIService {

  constructor(private http: HttpClient) {
    super(http);
  }

  createJobManagement(jobmanagemet: JobManagement): Observable<JobManagement> {
    return super.apiPost<JobManagement>('job-management-ui', jobmanagemet);
  }

  getJobManagement(): Observable<Array<JobManagement>> {
    return super.apiGet<Array<JobManagement>>('job-management');
  }

  getJobManagementId(id: string): Observable<JobManagement> {
    return super.apiGet<JobManagement>('job-management/' + id);
  }

  getJobManagementZone(zoneID: string): Observable<Array<JobManagement>> {
    return super.apiGet<Array<JobManagement>>('job-management/zone/' + zoneID);
  }

  updateJobManagement(jobmanagemet: JobManagement): Observable<JobManagement> {
    return super.apiPut<JobManagement>('job-management-ui/' + jobmanagemet._id, jobmanagemet);
  }

  updateJobManagementAutomate(id: string, automate: boolean): Observable<JobManagement> {
    return super.apiPut<JobManagement>('job-management-ui/' + id, { automate: automate });
  }

  updateJobManagementActive(id: string, active: boolean): Observable<JobManagement> {
    return super.apiPut<JobManagement>('job-management-ui/' + id, { active: active });
  }

  updateIsCorrectZone(zoneID: string, tmcID: string, data): Observable<JobManagement> {
    return super.apiPut<JobManagement>('job-management/is-correct-zone/' + zoneID + '/' + tmcID, data);
  }

  deleteJobManagement(id: string): Observable<JobManagement> {
    return super.apiDelete<JobManagement>('job-management-ui/' + id);
  }

}
