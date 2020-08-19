import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APIService } from '../api.service';
import { ZonePoly } from '../../models/equipment/zone-poly.model';
import { environment } from '../../../../environments/environment';
import { LiveEdgeApiConstants } from '../../../libs/live-edge-api-constants';

@Injectable({
  providedIn: 'root'
})
export class ZonePolyService extends APIService {

  constructor(private http: HttpClient) {
    super(http);
  }

  createZonePoly(zp: ZonePoly): Observable<ZonePoly> {
    return super.apiPost<ZonePoly>('zonePoly', zp);
  }

  getZonePoly(): Observable<Array<ZonePoly>> {
    return super.apiGet<Array<ZonePoly>>('zonePoly');
  }

  searchZonePoly(data: any): Observable<Array<ZonePoly>> {
    return super.apiPost<Array<ZonePoly>>('zonePoly/search', data);
  }

  getZonePolyId(id: string): Observable<ZonePoly> {
    return super.apiGet<ZonePoly>('zonePoly/' + id);
  }

  updateZonePoly(zp: ZonePoly): Observable<ZonePoly> {
    return super.apiPut<ZonePoly>('zonePoly/' + zp._id, zp);
  }

  deleteZonePoly(id: string): Observable<ZonePoly> {
    return super.apiDelete<ZonePoly>('zonePoly/' + id);
  }

  refreshZonePoly(): Observable<any> {
    const url = environment.polyUrl + 'zone-poly/refresh';
    return this.http.get<any>(url);
  }

  appendUrl(path: string) {
    return `${LiveEdgeApiConstants.URL}${path}`;
  }
}
