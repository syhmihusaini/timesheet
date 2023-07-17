import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimesheetService {
  constructor(private _http: HttpClient) {}

  addTimesheet(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/employees', data);
  }

  updateTimesheet(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/employees/${id}`, data);
  }

  getTimesheetList(): Observable<any> {
    return this._http.get('http://localhost:3000/employees');
  }

  deleteTimesheet(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/employees/${id}`);
  }
}
