import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Action } from '../models/action';
import { Kpireason } from '../models/kpireason';
import { LossAnalysis } from '../models/LossAnalysis';


@Injectable({
  providedIn: 'root'
})
export class LossanalysisService {

  baseUrl: string = environment.ApiUrl;

  constructor(private http: HttpClient) {}

  addLossAnalysis(data: any): any {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.baseUrl + 'lossanalysis', data, { headers: header });
  }

  updateLossAnalysis(data: any): any {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(this.baseUrl + 'lossanalysis', data, { headers: header });
  }

  deleteLossAnalysis(data: any): Observable<LossAnalysis> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<LossAnalysis>(
      this.baseUrl + 'deletelossanalysis',
      data, { headers: header }
    );
  }

  getMasterReason(data: any): Observable<Kpireason[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Kpireason[]>(this.baseUrl + 'kpireasonlossanalysis', data, { headers: header });
  }
  getLossAnalysisActions(data: any): Observable<Action> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Action>(this.baseUrl + 'lossanalysisaction', data, { headers: header });
  }

}
