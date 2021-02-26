import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  PlantModelElement,
  PlantGroupElement,
} from '../models/O3AdministrationModels/plant-model';

@Injectable({
  providedIn: 'root',
})
export class EnterPriseGroupService {
  baseUrl: string = environment.O3ApiUrl;
  constructor(private http: HttpClient) {}

  getGroupList(data: any): Observable<PlantModelElement[]> {
    const token = localStorage.getItem('o3token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);
    return this.http.post<PlantModelElement[]>(
      this.baseUrl + 'PlantModal/GetGroupList',
      data,
      {headers: header}
    );
  }
  submitGroup(data: any): Observable<PlantModelElement[]> {
    const token = localStorage.getItem('o3token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);
    return this.http.post<PlantModelElement[]>(
      this.baseUrl + 'PlantModal/SumbitGroup',
      data,
      {headers: header}
    );
  }
  getTreeModal(data: any): Observable<PlantGroupElement[]> {
    const token = localStorage.getItem('o3token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);
    return this.http.post<PlantGroupElement[]>(
      this.baseUrl + 'Common/GetTreeModal',
      data,
      {headers: header}
    );
  }

  addPlantModalTree(data: any): Observable<any> {
    const token = localStorage.getItem('o3token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);
    return this.http.post<any>(this.baseUrl + 'PlantModal/SumbitChildModel',
    data,
    {headers: header}
    );
  }
  getPlantModalById(data: any): Observable<any> {
    const token = localStorage.getItem('o3token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);
    return this.http.post<any>(this.baseUrl + 'PlantModal/GetChildModel', data,   {headers: header});
  }
}
