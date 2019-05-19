import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from '../models/order';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    fullUrl = environment.apiUrl + '/api/orders';

    constructor(private http: HttpClient) {
    }

    public getAll(): Observable<Order[]> {
        return this.http.get<Order[]>(this.fullUrl);
    }

    public getAllByCompanyId(id: number): Observable<Order[]> {
        return this.http.get<Order[]>(this.fullUrl + '/' + id + '/company');
    }

    public getAllByDriverId(id: number): Observable<Order[]> {
        return this.http.get<Order[]>(this.fullUrl + '/' + id + '/driver');
    }

    public getAllByClientId(id: number): Observable<Order[]> {
        return this.http.get<Order[]>(this.fullUrl + '/' + id + '/client');
    }


    public getAllByCompanyIdHistory(id: number): Observable<Order[]> {
        return this.http.get<Order[]>(this.fullUrl + '/' + id + '/history/company');
    }

    public getAllByDriverIdHistory(id: number): Observable<Order[]> {
        return this.http.get<Order[]>(this.fullUrl + '/' + id + '/history/driver');
    }

    public getAllByClientIdHistory(id: number): Observable<Order[]> {
        return this.http.get<Order[]>(this.fullUrl + '/' + id + '/history/client');
    }

    public getById(id: number): Observable<Order> {
        return this.http.get<Order>(this.fullUrl + `/${id}`);
    }

    public save(order: Order) {
        return this.http.post<Order>(this.fullUrl, order);
    }

    public delete(order: Order) {
        return this.http.delete(this.fullUrl + `/${order.id}`);
    }

    public update(order: Order): Observable<any> {
        return this.http.put<any>(this.fullUrl + '/' + order.id, order);
    }
}
