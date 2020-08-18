import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  createOrder(order: Order): Observable<Order> {
    const url = environment.busUrl + 'order';
    return this.http.post<Order>(url, order);
  }

  getOrder(): Observable<Array<Order>> {
    const url = environment.busUrl + 'order';
    return this.http.get<Array<Order>>(url);
  }

  getOrderId(id: string): Observable<Order> {
    const url = environment.busUrl + 'order/' + id;
    return this.http.get<Order>(url);
  }

  updateOrder(order: Order): Observable<Order> {
    const url = environment.busUrl + 'order/' + order.id;
    return this.http.put<Order>(url, order);
  }

  deleteOrder(id: string): Observable<Order> {
    const url = environment.busUrl + 'order/' + id;
    return this.http.delete<Order>(url);
  }

}
