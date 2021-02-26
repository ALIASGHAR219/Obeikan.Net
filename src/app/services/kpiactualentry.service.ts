import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class KpiactualentryService {
  baseUrl: string = environment.ApiUrl;

  constructor(private http: HttpClient) { }

  addActualEntry(data: any): any {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);
    return this.http.post<any>(this.baseUrl + 'actuallentry', data, {headers: header});
  }
  deleteActualEntry(data: any): any {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);
    return this.http.post<any>(this.baseUrl + 'deleteActualEntry', data, {headers: header});
  }
  getActualEntry(data: any): any {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);
    return this.http.post<any>(this.baseUrl + 'kpiTargetActualEntry', data, {headers: header});
  }

}
