import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Role} from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  fullUrl = environment.apiUrl + '/api/roles';

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(this.fullUrl);
  }

  public getById(id: number): Observable<Role> {
    return this.http.get<Role>(this.fullUrl + `/${id}`);
  }
}
