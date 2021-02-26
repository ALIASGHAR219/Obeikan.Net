import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Action } from '../models/action';
import { Kpireason } from '../models/kpireason';
import { LossAnalysis } from '../models/LossAnalysis';

// const token = localStorage.getItem('token');
// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: `Bearer ${token}`,
//   }),
// };
@Injectable({
  providedIn: 'root',
})
export class ScorecardService {
  baseUrl: string = environment.ApiUrl;

  constructor(private http: HttpClient) {}

  getScorecard(data: any): any {

    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);
    return this.http.post<any>(this.baseUrl + 'getScorecard', data, {headers: header});
  }
  lossanalysisdatewise(data: any): any {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);
    return this.http.post<any>(this.baseUrl + 'lossanalysisdate', data, {headers: header});
  }
  lossanalysisdata(data: any): any {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);
    return this.http.post<any>(this.baseUrl + 'lossanalysisdata', data, {headers: header});
  }

  getYearlyScoreCard(data: any): any {

    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<any>(
      this.baseUrl + 'yearlyscorecard',
      data,
       {headers: header}
    );
  }
}
