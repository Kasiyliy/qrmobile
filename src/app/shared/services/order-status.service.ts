import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Role} from '../models/role';
import {OrderStatus} from '../models/order-status';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {

  fullUrl = environment.apiUrl + '/api/order/statuses';

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<OrderStatus[]> {
    return this.http.get<OrderStatus[]>(this.fullUrl);
  }

  public getById(id: number): Observable<OrderStatus> {
    return this.http.get<OrderStatus>(this.fullUrl + `/${id}`);
  }
}
