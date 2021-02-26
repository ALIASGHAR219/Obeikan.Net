import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from '../models/department';
import { Driver } from '../models/driver';
import { Frequency } from '../models/frequency';
import { Group } from '../models/group';
import { DayOff } from '../models/dayOff';
import { Mastershift } from '../models/mastershift';
import { Kpi } from '../models/kpi';
import { Kpireason } from '../models/kpireason';
import { MasterFrequency } from '../models/MasterFrequency';
import { OneDriver } from '../models/oneDriver';
import { OneFrequency } from '../models/oneFrequency';
import { OnePillar } from '../models/onePillar';
import { OneTool } from '../models/oneTool';
import { OneTrend } from '../models/oneTrend';
import { OneUom } from '../models/oneUom';
import { Pillar } from '../models/pillar';
import { Plant } from '../models/plant';
import { Plantbygroup } from '../models/plantbygroup';
import { Reason } from '../models/reason';
import { Success } from '../models/success';
import { SuccessMessage } from '../models/successMessage';
import { Tool } from '../models/tool';
import { Trend } from '../models/trend';
import { Uom } from '../models/uom';
import { FourM } from '../models/fourM';
import { ProductLine } from '../models/ProductLine';
import { ProductUnit } from '../models/ProductUnit';
import { Assembly } from '../models/assembly';
import { SubAssembly } from '../models/subAssembly';
import { Components } from '../models/component';
import { UserPlant } from '../models/userPlant';


@Injectable({
  providedIn: 'root',
})
export class KpimasterService {
  baseUrl: string = environment.ApiUrl;

  dayOffList: number[] = [];

  constructor(private http: HttpClient) {}

  getGroups(): Observable<Group[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.get<Group[]>(this.baseUrl + 'groups', {headers: header});
  }

  getAllPlants(): Observable<Plant[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.get<Plant[]>(this.baseUrl + 'plants', {headers: header});
  }

  getPlants(groupId: any): Observable<Plantbygroup[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<Plantbygroup[]>(
      this.baseUrl + 'plantsbygroup',
      groupId,
      {headers: header}
    );
  }
  getmasterline(data: any): Observable<ProductLine[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<ProductLine[]>(this.baseUrl + 'masterline', data, {headers: header});
  }
  getProductUnit(data: any): Observable<ProductUnit[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<ProductUnit[]>(this.baseUrl + 'lineunit', data, {headers: header});
  }
  getAssembly(data: any): Observable<Assembly[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<Assembly[]>(this.baseUrl + 'assemblyunit', data, {headers: header});
  }
  getSubAssembly(data: any): Observable<SubAssembly[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<SubAssembly[]>(this.baseUrl + 'subassembly', data, {headers: header});
  }
  getComponent(data: any): Observable<Components[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<Components[]>(
      this.baseUrl + 'machinecomponent',
      data, {headers: header}
    );
  }
  getPillarMasterData(data: any): Observable<Pillar[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<Pillar[]>(this.baseUrl + 'masterpillars', data, {headers: header});
  }
  getPillars(): Observable<Pillar[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.get<Pillar[]>(this.baseUrl + 'pillars', {headers: header});
  }

  addPillar(pillar: any): Observable<Success> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<Success>(this.baseUrl + 'pillar', pillar, {headers: header});
  }
  getOnePillar(data: any): Observable<OnePillar> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<OnePillar>(this.baseUrl + 'onepillar', data, {headers: header});
  }

  updatePillar(pillar: any): Observable<Success> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.put<Success>(this.baseUrl + 'pillar', pillar, {headers: header});
  }

  deletPillar(data: any): Observable<SuccessMessage> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<SuccessMessage>(this.baseUrl + 'deletepillar', data, {headers: header});
  }

  getMasterDrivers(data: any): Observable<Driver[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<Driver[]>(this.baseUrl + 'masterdrivers', data, {headers: header});
  }

  getDrivers(): Observable<Driver[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.get<Driver[]>(this.baseUrl + 'drivers', {headers: header});
  }

  getDepartments(): Observable<Department[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.get<Department[]>(this.baseUrl + 'departments', {headers: header});
  }

  getOneDriver(data: any): Observable<OneDriver> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<OneDriver>(this.baseUrl + 'onedriver', data, {headers: header});
  }

  addDriver(driver: any): Observable<Success> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<Success>(this.baseUrl + 'driver', driver, {headers: header});
  }

  updateDriver(driver: any): Observable<Success> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.put<Success>(this.baseUrl + 'driver', driver, {headers: header});
  }

  deletDriver(data: any): Observable<SuccessMessage> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<SuccessMessage>(this.baseUrl + 'deletedriver', data, {headers: header});
  }

  getMasterTools(data: any): Observable<Tool[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<Tool[]>(this.baseUrl + 'mastertools', data, {headers: header});
  }

  getTools(): Observable<Tool[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.get<Tool[]>(this.baseUrl + 'tools', {headers: header});
  }

  getOneTool(data: any): Observable<OneTool> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<OneTool>(this.baseUrl + 'tool', data, {headers: header});
  }

  addTool(tool: any): Observable<Success> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<Success>(this.baseUrl + 'addtool', tool, {headers: header});
  }

  updateTool(tool: any): Observable<Success> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.put<Success>(this.baseUrl + 'tool', tool, {headers: header});
  }

  deletTool(data: any): Observable<SuccessMessage> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<SuccessMessage>(this.baseUrl + 'deletetool', data, {headers: header});
  }

  getMasterTrends(data: any): Observable<Trend[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<Trend[]>(this.baseUrl + 'mastertrends', data, {headers: header});
  }

  getTrends(): Observable<Trend[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.get<Trend[]>(this.baseUrl + 'trends', {headers: header});
  }

  getOneTrend(data: any): Observable<OneTrend> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<OneTrend>(this.baseUrl + 'onetrend', data, {headers: header});
  }

  addTrend(trend: any): Observable<Success> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<Success>(this.baseUrl + 'trend', trend, {headers: header});
  }

  updateTrend(trend: any): Observable<Success> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.put<Success>(this.baseUrl + 'trend', trend, {headers: header});
  }

  deletTrend(data: any): Observable<SuccessMessage> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<SuccessMessage>(this.baseUrl + 'deletetrend', data, {headers: header});
  }

  getMasterFrequency(): Observable<MasterFrequency[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.get<MasterFrequency[]>(this.baseUrl + 'masterfrequency', {headers: header});
  }

  getOneLossAnalysis(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<any>(this.baseUrl + 'getlossanalysis', data, {headers: header});
  }

  getMasterFrequencies(data: any): Observable<Frequency[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<Frequency[]>(
      this.baseUrl + 'masterfrequencies',
      data, {headers: header}
    );
  }

  getFrequencies(): Observable<Frequency[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.get<Frequency[]>(this.baseUrl + 'frequencies', {headers: header});
  }

  getOneFrequency(data: any): Observable<OneFrequency> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<OneFrequency>(this.baseUrl + 'onefrequency', data, {headers: header});
  }

  addFrequency(frequency: any): Observable<Success> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<Success>(this.baseUrl + 'frequency', frequency, {headers: header});
  }

  updateFrequency(frequency: any): Observable<Success> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.put<Success>(this.baseUrl + 'frequency', frequency, {headers: header});
  }

  deletfrequency(data: any): Observable<SuccessMessage> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<SuccessMessage>(
      this.baseUrl + 'deletefrequency',
      data, {headers: header}
    );
  }

  getMasterUoms(data: any): Observable<Uom[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<Uom[]>(this.baseUrl + 'masterunitofmeasures', data, {headers: header});
  }
  getUoms(): Observable<Uom[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.get<Uom[]>(this.baseUrl + 'unitofmeasures', {headers: header});
  }

  getOneUom(data: any): Observable<OneUom> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<OneUom>(this.baseUrl + 'oneunitofmeasure', data, {headers: header});
  }

  addUom(uom: any): Observable<Success> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<Success>(this.baseUrl + 'unitofmeasure', uom, {headers: header});
  }

  updateUom(uom: any): Observable<Success> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.put<Success>(this.baseUrl + 'unitofmeasure', uom, {headers: header});
  }

  deletUom(data: any): Observable<SuccessMessage> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<SuccessMessage>(
      this.baseUrl + 'deleteunitofmeasure',
      data, {headers: header}
    );
  }

  getAllMasterData(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<any>(this.baseUrl + 'allmasterdata', data, {headers: header});
  }

  getMasterDepartments(data: any): Observable<Department[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<Department[]>(
      this.baseUrl + 'masterdepartments',
      data, {headers: header}
    );
  }
  addKpiReason(data: any): Observable<Success> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<Success>(this.baseUrl + 'addkpireason', data, {headers: header});
  }
  getKpi(data: any): Observable<Kpi[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<Kpi[]>(this.baseUrl + 'kpis', data, {headers: header});
  }
  getKpiFrequency(data: any): Observable<Kpi[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<Kpi[]>(this.baseUrl + 'kpifrequency', data, {headers: header});
  }
  getMasterKpiReason(data: any): Observable<Kpireason[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<Kpireason[]>(this.baseUrl + 'masterkpireason', data, {headers: header});
  }
  getKpiReason(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<any>(this.baseUrl + 'kpireason', data, {headers: header});
  }
  updateKpiReason(data: any): Observable<Success> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.put<Success>(this.baseUrl + 'kpireason', data, {headers: header});
  }

  getMasterReasons(data: any): Observable<Reason[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<Reason[]>(this.baseUrl + 'masterreason', data, {headers: header});
  }

  deleteKpiReason(data: any): Observable<SuccessMessage> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<SuccessMessage>(
      this.baseUrl + 'deletekpireason',
      data, {headers: header}
    );
  }
  getOneDepartment(data: any): Observable<Department> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<Department>(this.baseUrl + 'department', data, {headers: header});
  }

  addDepartment(data: any): Observable<Success> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<Success>(this.baseUrl + 'adddepartment', data, {headers: header});
  }

  updateDepartment(data: any): Observable<Success> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.put<Success>(this.baseUrl + 'department', data, {headers: header});
  }

  deletDepartment(data: any): Observable<SuccessMessage> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<SuccessMessage>(
      this.baseUrl + 'deletedepartment',
      data, {headers: header}
    );
  }

  getMasterKpis(data: any): Observable<Kpi[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<Kpi[]>(this.baseUrl + 'masterkpis', data, {headers: header});
  }

  addFourM(data: any): Observable<Success> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<Success>(this.baseUrl + 'addfourm', data, {headers: header});
  }

  updateFourM(data: any): Observable<Success> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.put<Success>(this.baseUrl + 'fourm', data, {headers: header});
  }

  getActionAnalysis(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<any>(this.baseUrl + 'actionanalysis', data, {headers: header});
  }

  deleteFourM(data: any): Observable<SuccessMessage> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<SuccessMessage>(this.baseUrl + 'deletefourm', data, {headers: header});
  }

  getOneFourM(data: any): Observable<FourM> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<FourM>(this.baseUrl + 'fourm', data, {headers: header});
  }

  getMasterFourM(data: any): Observable<FourM[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<FourM[]>(this.baseUrl + 'masterfourm', data, {headers: header});
  }

  setTargetDate(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<any>(this.baseUrl + 'targetdate', data, {headers: header});
  }

  setCompletionDate(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<any>(this.baseUrl + 'completiondate', data, {headers: header});
  }

  getAllFourM(): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.get<any>(this.baseUrl + 'fourm', {headers: header});
  }

  getRaciMatrix(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<any>(this.baseUrl + 'racimatrix', data, {headers: header});
  }

  addDayOff(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<any>(this.baseUrl + 'adddayoff', data, {headers: header});
  }

  getMasterDayOff(data: any): Observable<DayOff[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<DayOff[]>(this.baseUrl + 'masterdayoff', data, {headers: header});
  }
  getDayOfflist(data: any): any {
    this.dayOffList = [];
    data.forEach((days: any) => {
      if (days.dayOff === 'Monday') {
        this.dayOffList.push(1);
      } else if (days.dayOff === 'Tuesday') {
        this.dayOffList.push(2);
      } else if (days.dayOff === 'Wednesday') {
        this.dayOffList.push(3);
      } else if (days.dayOff === 'Thursday') {
        this.dayOffList.push(4);
      } else if (days.dayOff === 'Friday') {
        this.dayOffList.push(5);
      } else if (days.dayOff === 'Saturday') {
        this.dayOffList.push(6);
      } else if (days.dayOff === 'Sunday') {
        this.dayOffList.push(0);
      }
    });
    return this.dayOffList;
  }
  deleteDayOff(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<any>(this.baseUrl + 'deletedayoff', data, {headers: header});
  }

  updateDayOff(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.put<any>(this.baseUrl + 'dayoff', data, {headers: header});
  }
  getOneDayOff(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<any>(this.baseUrl + 'onedayoff', data, {headers: header});
  }

  addMasterShift(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<any>(this.baseUrl + 'addmastershift', data, {headers: header});
  }
  updatemastershift(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.put<any>(this.baseUrl + 'mastershift', data, {headers: header});
  }
  getMasterShifts(data: any): Observable<Mastershift[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<Mastershift[]>(this.baseUrl + 'mastershift', data, {headers: header});
  }

  getOneMasterShift(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<any>(this.baseUrl + 'onemastershift', data, {headers: header});
  }
  deleteMasterShift(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);

    return this.http.post<any>(this.baseUrl + 'deletemastershift', data, {headers: header});
  }
  getUserPants(data: any): Observable<UserPlant[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);
    return this.http.post<UserPlant[]>(this.baseUrl + 'userplant', data, {headers: header});
  }
  isMenuEnabled(flatArray: any, name: any): any {
    let isDisabled = true;
    const node = flatArray.find(
      (x: any) => x.data.MenuName === name
    );
    const checkIsLeafChildSelected = (children: any) => {
      const isAnyLeafSelected = children.find( (child: any) => (child.children.length === 0 && child.data.IsRead));

      if (isAnyLeafSelected) {
        isDisabled = false;
      }
      else {
        const childsContainingNodes = children.filter( (child: any) => child.children.length);
        if (childsContainingNodes.length) {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < childsContainingNodes.length; i++) {
            const childNodeChildrens = childsContainingNodes[i].children;
            checkIsLeafChildSelected(childNodeChildrens);
          }
        }
      }
    };
    if (node.children.length) {
      checkIsLeafChildSelected(node.children);
    }else{
      if (node.data.IsRead === true) {
        isDisabled = false;
      }
    }
    return isDisabled;
  }
}
