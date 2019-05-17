import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CompanyUser} from '../models/company-user';

@Injectable({
  providedIn: 'root'
})
export class CompanyUserService {

  fullUrl = environment.apiUrl + '/api/companies/users';

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<CompanyUser[]> {
    return this.http.get<CompanyUser[]>(this.fullUrl);
  }

  public getById(id: number): Observable<CompanyUser> {
    return this.http.get<CompanyUser>(this.fullUrl + `/${id}`);
  }

  public save(companyUser: CompanyUser) {
    return this.http.post<CompanyUser>(this.fullUrl, companyUser);
  }

  public delete(companyUser: CompanyUser) {
    return this.http.delete(this.fullUrl + `/${companyUser.id}`);
  }

  public update(companyUser: CompanyUser) {
    return this.http.put(this.fullUrl + `/${companyUser.id}`, companyUser);
  }
}
