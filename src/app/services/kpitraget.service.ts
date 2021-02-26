import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StrategicKpi } from '../models/treeModels/strategicKpi';
import { Vision } from '../models/treeModels/vision';
import { VisionKpi } from '../models/treeModels/visionKpi';


@Injectable({
  providedIn: 'root',
})
export class KpitargetService {
  baseUrl: string = environment.ApiUrl;
  constructor(private http: HttpClient) { }

  addTarget(data: any): any {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(this.baseUrl + 'kpitarget', data, { headers: header });
  }
  updateKpi(data: any): any {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<any>(this.baseUrl + 'kpitree', data, { headers: header });
  }
  deleteKpi(id: any): any {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<any>(this.baseUrl + 'kpitree/' + id, { headers: header });
  }

  getTarget(data: any): any {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(this.baseUrl + 'kpiyeartarget', data, { headers: header });
  }

  getVisions(): Observable<Vision[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Vision[]>(this.baseUrl + 'visions', { headers: header });
  }

  getOneVision(id: any): Observable<VisionKpi> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<VisionKpi>(this.baseUrl + 'vision/' + id, { headers: header });
  }

  updateVision(id: number, data: any): any {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<any>(this.baseUrl + 'vision/' + id, data, { headers: header });
  }

  getZeroValueTarget(data: any): any {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(this.baseUrl + 'zerotarget', data, { headers: header });
  }

  deleteTarget(data: any): any {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(this.baseUrl + 'deleteTarget', data, { headers: header });
  }
  deleteKpiTarget(data: any): any {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(this.baseUrl + 'deletekpis', data, { headers: header });
  }
  refreshKpiTarget(data: any): any {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(this.baseUrl + 'refreshkpis', data, { headers: header });
  }

  addStrategicKpi(data: any): any {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(this.baseUrl + 'strategickpi', data, { headers: header });
  }
  getOneStrategicKpi(id: any): Observable<StrategicKpi> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<StrategicKpi>(this.baseUrl + 'strategickpi/' + id, { headers: header });
  }

  updateStrategicKpi(data: any): any {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<any>(this.baseUrl + 'strategickpi', data, { headers: header });
  }
  deleteStrategicKpi(id: any): any {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<any>(this.baseUrl + 'strategickpi/' + id, { headers: header });
  }

  getTreeData(data: any): Observable<TreeNode[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<TreeNode[]>(this.baseUrl + 'kpitrees' + data, { headers: header });
  }
  getKpiByID(id: any): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(this.baseUrl + 'kpitree/' + id, { headers: header });
  }
}
