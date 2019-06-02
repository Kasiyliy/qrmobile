import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Attendance} from '../models/attendance';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  fullUrl = environment.apiUrl + '/api/attendances';

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(this.fullUrl);
  }


  public getBySessionId(id: number): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(this.fullUrl + `/session/${id}`);
  }

  public getById(id: number): Observable<Attendance> {
    return this.http.get<Attendance>(this.fullUrl + `/${id}`);
  }

  public save(attendance: Attendance) {
    return this.http.post<Attendance>(this.fullUrl, attendance);
  }

  public delete(attendance: Attendance) {
    return this.http.delete(this.fullUrl + `/${attendance.id}`);
  }

  public update(attendance: Attendance) {
    return this.http.put(this.fullUrl + `/${attendance.id}`, attendance);
  }
}
