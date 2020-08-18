import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';

import { Equipment } from '../../models/equipment/equipment.model';
import { APIService } from '../api.service';
import { LiveEdgeApiConstants } from '../../../libs/live-edge-api-constants';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService extends APIService {

  constructor(private http: HttpClient) {
    super(http);
  }

  createEquipment(tmc: Equipment): Observable<Equipment> {
    return super.apiPost<Equipment>('equipment', tmc);
  }

  getEquipment(): Observable<Array<Equipment>> {
    return super.apiGet<Array<Equipment>>('equipment');
  }

  searchEquipment(data: any): Observable<Array<Equipment>> {
    return super.apiPost<Array<Equipment>>('equipment/search', data);
  }

  getEquipmentId(id: string): Observable<Equipment> {
    return super.apiGet<Equipment>('equipment/' + id);
  }

  updateEquipment(tmc: Equipment): Observable<Equipment> {
    return super.apiPut<Equipment>('equipment/' + tmc._id, tmc);
  }

  deleteEquipment(id: string): Observable<Equipment> {
    return super.apiDelete<Equipment>('equipment/' + id);
  }

  appendUrl(path: string) {
    return `${LiveEdgeApiConstants.URL}${path}`;
  }

}
