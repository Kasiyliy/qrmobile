import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Qr} from '../models/qr';

@Injectable({
    providedIn: 'root'
})
export class QrService {

    fullUrl = environment.apiUrl + '/api/qrs';

    constructor(private http: HttpClient) {
    }

    public getAll(): Observable<Qr[]> {
        return this.http.get<Qr[]>(this.fullUrl);
    }

    public getById(id: number): Observable<Qr> {
        return this.http.get<Qr>(this.fullUrl + `/${id}`);
    }

    public save(qr: Qr) {
        return this.http.post<Qr>(this.fullUrl, qr);
    }

    public delete(qr: Qr) {
        return this.http.delete(this.fullUrl + `/${qr.id}`);
    }

    public update(qr: Qr) {
        return this.http.put(this.fullUrl + `/${qr.id}`, qr);
    }
}
