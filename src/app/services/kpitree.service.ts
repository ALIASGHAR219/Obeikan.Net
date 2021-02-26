import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StrategicKpi } from '../models/treeModels/strategicKpi';
import { Vision } from '../models/treeModels/vision';
import { VisionKpi } from '../models/treeModels/visionKpi';
import { CalculationType } from '../models/calculationType';


@Injectable({
  providedIn: 'root',
})
export class KpitreeService {
  baseUrl: string = environment.ApiUrl;
  constructor(private http: HttpClient) { }

  date!: any;
  operator!: any;
  operand!: any;
  dateList(): any {
    return (this.date = [
      {
        name: 'MTD',
        dateId: 1,
      },
      {
        name: 'YTD',
        dateId: 2,
      },
      {
        name: 'WTD',
        dateId: 3,
      },
    ]);
  }
  operatorList(): any {
    return (this.operator = [
      {
        name: '>',
        operatorId: 1,
      },
      {
        name: '<',
        operatorId: 2,
      },
      {
        name: '<=',
        operatorId: 3,
      },
      {
        name: '>=',
        operatorId: 4,
      },
      {
        name: '==',
        operatorId: 5,
      },
      {
        name: '=',
        operatorId: 6,
      },
      {
        name: 'is',
        operatorId: 7,
      },
      {
        name: '(',
        operatorId: 8,
      },
      {
        name: ')',
        operatorId: 9,
      },
      {
        name: '+',
        operatorId: 9,
      },
      {
        name: '-',
        operatorId: 10,
      },
      {
        name: '*',
        operatorId: 11,
      },
      {
        name: '/',
        operatorId: 12,
      },
    ]);
  }
  operandlist(): any {
    return (this.operand = [
      {
        name: 'SQWPL',
        operandId: 1,
      },
      {
        name: 'FFBL',
        operandId: 2,
      },
      {
        name: 'PCL',
        operandId: 3,
      },
      {
        name: 'FFC',
        operandId: 4,
      },
    ]);
  }

  addKpi(data: any): any {
    const token = localStorage.getItem('token');
    const current = new Date();
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Cache-Control', 'no-cache, no-store, must-revalidate')
      .set('Pragma', 'no-cache')
      .set('Expires', current.getTime().toString())
      .set('If-Modified-Since', '0');

    return this.http.post<any>(this.baseUrl + 'kpi', data, { headers: header });
  }
  updateKpi(data: any): any {
    const token = localStorage.getItem('token');
    const current = new Date();
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Cache-Control', 'no-cache, no-store, must-revalidate')
      .set('Pragma', 'no-cache')
      .set('Expires', current.getTime().toString())
      .set('If-Modified-Since', '0');

    return this.http.put<any>(this.baseUrl + 'kpitree', data, { headers: header });
  }
  deleteKpi(data: any): any {
    const token = localStorage.getItem('token');
    const current = new Date();
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Cache-Control', 'no-cache, no-store, must-revalidate')
      .set('Pragma', 'no-cache')
      .set('Expires', current.getTime().toString())
      .set('If-Modified-Since', '0');

    return this.http.post<any>(
      this.baseUrl + 'deletekpitree',
      data,
      { headers: header }
    );
  }

  addVision(data: any): any {
    const token = localStorage.getItem('token');
    const current = new Date();
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Cache-Control', 'no-cache, no-store, must-revalidate')
      .set('Pragma', 'no-cache')
      .set('Expires', current.getTime().toString())
      .set('If-Modified-Since', '0');

    return this.http.post<any>(this.baseUrl + 'vision', data, { headers: header });
  }

  getVisions(): Observable<Vision[]> {
    const token = localStorage.getItem('token');
    const current = new Date();
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Cache-Control', 'no-cache, no-store, must-revalidate')
      .set('Pragma', 'no-cache')
      .set('Expires', current.getTime().toString())
      .set('If-Modified-Since', '0');

    return this.http.get<Vision[]>(this.baseUrl + 'visions', { headers: header });
  }

  getOneVision(data: any): Observable<VisionKpi> {
    const token = localStorage.getItem('token');
    const current = new Date();
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Cache-Control', 'no-cache, no-store, must-revalidate')
      .set('Pragma', 'no-cache')
      .set('Expires', current.getTime().toString())
      .set('If-Modified-Since', '0');

    return this.http.post<VisionKpi>(
      this.baseUrl + 'visionOne',
      data,
      { headers: header }
    );
  }

  updateVision(data: any): any {
    const token = localStorage.getItem('token');
    const current = new Date();
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Cache-Control', 'no-cache, no-store, must-revalidate')
      .set('Pragma', 'no-cache')
      .set('Expires', current.getTime().toString())
      .set('If-Modified-Since', '0');

    return this.http.put<any>(this.baseUrl + 'vision', data, { headers: header });
  }

  deleteVision(data: any): any {
    const token = localStorage.getItem('token');
    const current = new Date();
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Cache-Control', 'no-cache, no-store, must-revalidate')
      .set('Pragma', 'no-cache')
      .set('Expires', current.getTime().toString())
      .set('If-Modified-Since', '0');

    return this.http.post<any>(
      this.baseUrl + 'deletevision',
      data,
      { headers: header }
    );
  }

  addStrategicKpi(data: any): any {
    const token = localStorage.getItem('token');
    const current = new Date();
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Cache-Control', 'no-cache, no-store, must-revalidate')
      .set('Pragma', 'no-cache')
      .set('Expires', current.getTime().toString())
      .set('If-Modified-Since', '0');

    return this.http.post<any>(
      this.baseUrl + 'strategickpi',
      data,
      { headers: header }
    );
  }
  getOneStrategicKpi(data: any): Observable<StrategicKpi> {
    const token = localStorage.getItem('token');
    const current = new Date();
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Cache-Control', 'no-cache, no-store, must-revalidate')
      .set('Pragma', 'no-cache')
      .set('Expires', current.getTime().toString())
      .set('If-Modified-Since', '0');

    return this.http.post<StrategicKpi>(
      this.baseUrl + 'strategickpiOne',
      data,
      { headers: header }
    );
  }

  updateStrategicKpi(data: any): any {
    const token = localStorage.getItem('token');
    const current = new Date();
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Cache-Control', 'no-cache, no-store, must-revalidate')
      .set('Pragma', 'no-cache')
      .set('Expires', current.getTime().toString())
      .set('If-Modified-Since', '0');

    return this.http.put<any>(this.baseUrl + 'strategickpi', data, { headers: header });
  }
  deleteStrategicKpi(data: any): any {
    const token = localStorage.getItem('token');
    const current = new Date();
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Cache-Control', 'no-cache, no-store, must-revalidate')
      .set('Pragma', 'no-cache')
      .set('Expires', current.getTime().toString())
      .set('If-Modified-Since', '0');

    return this.http.post<any>(
      this.baseUrl + 'strategickpiDelete',
      data,
      { headers: header }
    );
  }

  getTreeData(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const current = new Date();
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Cache-Control', 'no-cache, no-store, must-revalidate')
      .set('Pragma', 'no-cache')
      .set('Expires', current.getTime().toString())
      .set('If-Modified-Since', '0');

    return this.http.post<any>(this.baseUrl + 'kpitrees', data, { headers: header });
  }
  getLossAnalysisTreeData(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const current = new Date();
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Cache-Control', 'no-cache, no-store, must-revalidate')
      .set('Pragma', 'no-cache')
      .set('Expires', current.getTime().toString())
      .set('If-Modified-Since', '0');

    return this.http.post<any>(
      this.baseUrl + 'kpitreelossanalysis',
      data,
      { headers: header }
    );
  }
  getKpiByID(data: any): Observable<any> {
    const current = new Date();
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Cache-Control', 'no-cache, no-store, must-revalidate')
      .set('Pragma', 'no-cache')
      .set('Expires', current.getTime().toString())
      .set('If-Modified-Since', '0');

    return this.http.post<any>(this.baseUrl + 'kpitreeOne', data, { headers: header });
  }
  getActualEntries(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const current = new Date();
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Cache-Control', 'no-cache, no-store, must-revalidate')
      .set('Pragma', 'no-cache')
      .set('Expires', current.getTime().toString())
      .set('If-Modified-Since', '0');

    return this.http.post<any>(
      this.baseUrl + 'actuallentries',
      data,
      { headers: header }
    );
  }
  getCalculationType(): Observable<CalculationType[]> {
    const token = localStorage.getItem('token');
    const current = new Date();
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Cache-Control', 'no-cache, no-store, must-revalidate')
      .set('Pragma', 'no-cache')
      .set('Expires', current.getTime().toString())
      .set('If-Modified-Since', '0');


    return this.http.get<CalculationType[]>(
      this.baseUrl + 'calculationtypes',
      { headers: header }
    );
  }
  getStratgicKpi(data: any): Observable<StrategicKpi[]> {
    const token = localStorage.getItem('token');
    const current = new Date();
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Cache-Control', 'no-cache, no-store, must-revalidate')
      .set('Pragma', 'no-cache')
      .set('Expires', current.getTime().toString())
      .set('If-Modified-Since', '0');

    return this.http.post<StrategicKpi[]>(
      this.baseUrl + 'masterstrategickpi',
      data,
      { headers: header }
    );
  }
  getAllMachines(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const current = new Date();
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Cache-Control', 'no-cache, no-store, must-revalidate')
      .set('Pragma', 'no-cache')
      .set('Expires', current.getTime().toString())
      .set('If-Modified-Since', '0');

    return this.http.post<any>(this.baseUrl + 'machine', data, { headers: header });
  }
}
