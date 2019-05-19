import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Item} from '../models/item';
import {ItemOrder} from '../models/item-order';

@Injectable({
    providedIn: 'root'
})
export class ItemOrderService {

    fullUrl = environment.apiUrl + '/api/items/orders';

    constructor(private http: HttpClient) {
    }

    public getAll(): Observable<ItemOrder[]> {
        return this.http.get<ItemOrder[]>(this.fullUrl);
    }

    public getById(id: number): Observable<ItemOrder> {
        return this.http.get<ItemOrder>(this.fullUrl + `/${id}`);
    }

    public save(itemOrder: ItemOrder) {
        return this.http.post<ItemOrder>(this.fullUrl, itemOrder);
    }

    public saveAll(itemOrders: ItemOrder[]) {
        return this.http.post<ItemOrder>(this.fullUrl + '/all', itemOrders);
    }

    public delete(itemOrder: ItemOrder) {
        return this.http.delete(this.fullUrl + `/${itemOrder.id}`);
    }

    public update(itemOrder: ItemOrder) {
        return this.http.put(this.fullUrl + `/${itemOrder.id}`, itemOrder);
    }
}
