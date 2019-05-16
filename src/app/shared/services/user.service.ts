import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    fullUrl = environment.apiUrl + '/api/users';

    constructor(private http: HttpClient) {
    }

    public getAll(): Observable<User[]> {
        return this.http.get<User[]>(this.fullUrl);
    }

    public getAllDrivers(cId: number): Observable<User[]> {
        return this.http.get<User[]>(this.fullUrl + '/drivers/' + cId);
    }

    public currentUser(): Observable<any> {
        return this.http.post<any>(this.fullUrl + '/current', {});
    }

    public getById(id: number): Observable<User> {
        return this.http.get<User>(this.fullUrl + `/${id}`);
    }

    public save(user: User) {
        return this.http.post<User>(this.fullUrl, user);
    }

    public delete(user: User) {
        return this.http.delete(this.fullUrl + `/${user.id}`);
    }

    public update(user: User) {
        return this.http.put(this.fullUrl + `/${user.id}`, user);
    }
}
