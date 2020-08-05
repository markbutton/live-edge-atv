import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NavView } from '../../models/nav/nav-view.model';


@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor(private http: HttpClient) { }

  async setNav(url: any): Promise<NavView> {
    const nv = await this.http.get(url).toPromise() as NavView;
    return nv;
  }
}
