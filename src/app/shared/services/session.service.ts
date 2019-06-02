import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Session} from '../models/session';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    fullUrl = environment.apiUrl + '/api/sessions';

    constructor(private http: HttpClient) {
    }

    public getAll(): Observable<Session[]> {
        return this.http.get<Session[]>(this.fullUrl);
    }

    public getById(id: number): Observable<Session> {
        return this.http.get<Session>(this.fullUrl + `/${id}`);
    }

    public getByQrId(id: number): Observable<Session> {
        return this.http.get<Session>(this.fullUrl + `/qr/${id}`);
    }


    public save(session: Session) {
        return this.http.post<Session>(this.fullUrl, session);
    }

    public delete(session: Session) {
        return this.http.delete(this.fullUrl + `/${session.id}`);
    }

    public update(session: Session) {
        return this.http.put(this.fullUrl + `/${session.id}`, session);
    }
}
