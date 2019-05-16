import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Company} from '../models/company';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    fullUrl = environment.apiUrl + '/api/companies';

    constructor(private http: HttpClient) {
    }

    public getAll(): Observable<Company[]> {
        return this.http.get<Company[]>(this.fullUrl);
    }

    public getOverall(): Observable<Company[]> {
        return this.http.get<Company[]>(this.fullUrl + '/all');
    }

    public getById(id: number): Observable<Company> {
        return this.http.get<Company>(this.fullUrl + `/${id}`);
    }

    public save(company: Company) {
        return this.http.post<Company>(this.fullUrl, company);
    }

    public delete(company: Company) {
        return this.http.delete(this.fullUrl + `/${company.id}`);
    }

    public update(company: Company) {
        return this.http.put(this.fullUrl + `/${company.id}`, company);
    }
}
