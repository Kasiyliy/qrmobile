import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Item} from '../models/item';
@Injectable({
  providedIn: 'root'
})
export class ItemService {

  fullUrl = environment.apiUrl + '/api/items';

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(this.fullUrl);
  }

  public getById(id: number): Observable<Item> {
    return this.http.get<Item>(this.fullUrl + `/${id}`);
  }

  public save(item: Item) {
    return this.http.post<Item>(this.fullUrl, item);
  }

  public delete(item: Item) {
    return this.http.delete(this.fullUrl + `/${item.id}`);
  }

  public update(item: Item) {
    return this.http.put(this.fullUrl + `/${item.id}`, item);
  }
}
