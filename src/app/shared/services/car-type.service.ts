import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Role} from '../models/role';
import {CarType} from '../models/car-type';

@Injectable({
  providedIn: 'root'
})
export class CarTypeService {

  fullUrl = environment.apiUrl + '/api/car/types';

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<CarType[]> {
    return this.http.get<CarType[]>(this.fullUrl);
  }

  public getById(id: number): Observable<CarType> {
    return this.http.get<CarType>(this.fullUrl + `/${id}`);
  }
}
