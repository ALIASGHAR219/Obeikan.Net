import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DefectManagementElement } from '../models/defectManagementElement';
import { OrderProcessingElement } from '../models/O3AdministrationModels/orderProcessingElement';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {
// tslint:disable-next-line:typedef


constructor(private http: HttpClient) { }

getOrderProcessingElementData(): Observable<OrderProcessingElement[]> {
  return this.http.get<OrderProcessingElement[]>('/assets/data/data-source.json');
}

getDefectManagementElementData(): Observable<DefectManagementElement[]> {
  return this.http.get<DefectManagementElement[]>('/assets/data/data-source-defect-management.json');
}

}
