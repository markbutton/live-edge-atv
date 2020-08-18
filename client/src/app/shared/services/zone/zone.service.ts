import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIService } from '../api.service';
import { Zone } from '../../models/jobs/zone.model';
import { LiveEdgeApiConstants } from 'src/app/libs/live-edge-api-constants';

@Injectable({
  providedIn: 'root'
})
export class ZoneService extends APIService {

  constructor(private http: HttpClient) {
    super(http);
  }

  createZone(zone: Zone): Observable<Zone> {
    return super.apiPost<Zone>('zones', zone);
  }

  getZone(): Observable<Array<Zone>> {
    return super.apiGet<Array<Zone>>('zones');
  }

  getZoneId(id: string): Observable<Zone> {
    return super.apiGet<Zone>('zones/' + id);
  }

  getZoneName(name: string): Observable<Zone> {
    return super.apiGet<Zone>('zones/name/' + name);
  }

  updateZone(zone: Zone): Observable<Zone> {
    return super.apiPut<Zone>('zones/' + zone._id, zone);
  }

  deleteZone(id: string): Observable<Zone> {
    return super.apiDelete<Zone>('zones/' + id);
  }

  appendUrl(path: string) {
    return `${LiveEdgeApiConstants.URL}${path}`;
  }

}
