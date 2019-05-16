import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Car} from '../models/car';

@Injectable({
    providedIn: 'root'
})
export class CarService {

    fullUrl = environment.apiUrl + '/api/cars';

    constructor(private http: HttpClient) {
    }

    public getAll(): Observable<Car[]> {
        return this.http.get<Car[]>(this.fullUrl);
    }

    public getAllMyCars(id: number): Observable<Car[]> {
        return this.http.get<Car[]>(this.fullUrl + '/drivers/' + id);
    }

    public getById(id: number): Observable<Car> {
        return this.http.get<Car>(this.fullUrl + `/${id}`);
    }

    public save(car: Car) {
        return this.http.post<Car>(this.fullUrl, car);
    }

    public delete(car: Car) {
        return this.http.delete(this.fullUrl + `/${car.id}`);
    }

    public update(car: Car) {
        return this.http.put(this.fullUrl + `/${car.id}`, car);
    }
}
