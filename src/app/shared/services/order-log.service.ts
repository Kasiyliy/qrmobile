import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {OrderLog} from '../models/order-log';

@Injectable({
  providedIn: 'root'
})
export class OrderLogService {

  fullUrl = environment.apiUrl + '/api/order/logs';

  constructor(private http: HttpClient) {
  }

  public getById(id: number): Observable<OrderLog> {
    return this.http.get<OrderLog>(this.fullUrl + `/${id}`);
  }

  public getLastByOrderId(id: number): Observable<OrderLog> {
    return this.http.get<OrderLog>(this.fullUrl + `/orders/${id}`);
  }

  public save(orderLog: OrderLog) {
    return this.http.post<OrderLog>(this.fullUrl, orderLog);
  }
}
