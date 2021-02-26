import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Register } from '../models/register';
import { Role } from '../models/role';
import { RolePermission } from '../models/rolePermission';
import { Success } from '../models/success';
import { SuccessMessage } from '../models/successMessage';
import { User } from '../models/user';
import { Userlist } from '../models/userlist';
import { UserPermission } from '../models/userPermission';
import { UserPlant } from '../models/userPlant';
import { ProductLine } from 'src/app/models/ProductLine';
import { ProductUnit } from 'src/app/models/ProductUnit';
import { Assembly } from 'src/app/models/assembly';
import { SubAssembly } from 'src/app/models/subAssembly';
import { Components } from 'src/app/models/component';
import { UserMachine } from '../models/userMachine';


@Injectable({
  providedIn: 'root',
})
export class UsermanagementService {
  baseUrl: string = environment.ApiUrl;
  constructor(private http: HttpClient) { }
  getRoles(data: any): Observable<Role[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Role[]>(this.baseUrl + 'roles', data, { headers: header });
  }
  addRole(role: any): any {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseUrl + 'addrole', role, { headers: header });
  }
  getOneRole(role: any): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.baseUrl + 'role', role, { headers: header });
  }
  updateRole(role: any): any {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(this.baseUrl + 'role', role, { headers: header });
  }
  masterroles(data: any): any {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseUrl + 'masterroles', data, { headers: header });
  }
  deleteRole(role: any): Observable<SuccessMessage> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<SuccessMessage>(this.baseUrl + 'deleterole', role, { headers: header });
  }
  rolePermissions(search: any): Observable<RolePermission[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<RolePermission[]>(
      this.baseUrl + 'rolepermissions',
      search, { headers: header }
    );
  }
  updateRolePermissions(data: any): Observable<SuccessMessage> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<SuccessMessage>(
      this.baseUrl + 'rolepermissions',
      data, { headers: header }
    );
  }
  registerUser(register: any): any {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseUrl + 'register', register, { headers: header });
  }
  updateUser(register: any): any {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(this.baseUrl + 'user', register, { headers: header });
  }
  deleteUser(register: any): any {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseUrl + 'deleteuser', register, { headers: header });
  }
  getOneMachine(data: any): Observable<UserMachine> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<UserMachine>(this.baseUrl + 'onemachine', data, { headers: header });
  }
  saveMachineAccess(data: any): any {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseUrl + 'addmachineaccess', data, { headers: header });
  }
  getUsers(data: any): Observable<Userlist[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Userlist[]>(this.baseUrl + 'users', data, { headers: header });
  }
  getOneUser(data: any): Observable<Register> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Register>(this.baseUrl + 'user', data, { headers: header });
  }
  userPermissions(data: any): Observable<UserPermission[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<UserPermission[]>(
      this.baseUrl + 'userpermissions',
      data, { headers: header }
    );
  }
  updateUserPermissions(data: any): Observable<SuccessMessage> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<SuccessMessage>(
      this.baseUrl + 'userpermissions',
      data, { headers: header }
    );
  }
  getUserPants(data: any): Observable<UserPlant[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<UserPlant[]>(this.baseUrl + 'userplant', data, { headers: header });
  }
  forgotPassword(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.baseUrl + 'forgotpassword', data, { headers: header });
  }
  verifyOtp(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.baseUrl + 'verifyotp', data);
  }
  updatePassword(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.baseUrl + 'updatepassword', data, { headers: header });
  }
  getAllComponents(): Observable<Components[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Components[]>(this.baseUrl + 'components', { headers: header });
  }
  getAllUnits(): Observable<ProductUnit[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ProductUnit[]>(this.baseUrl + 'units', { headers: header });
  }
  getAllAssemblies(): Observable<Assembly[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Assembly[]>(this.baseUrl + 'assemblies', { headers: header });
  }
  getAllSubAssemblies(): Observable<SubAssembly[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<SubAssembly[]>(this.baseUrl + 'subassemblies', { headers: header });
  }
  getAllLines(): Observable<ProductLine[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ProductLine[]>(this.baseUrl + 'lines', { headers: header });
  }
  getMachineAccess(data: any): Observable<any[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any[]>(this.baseUrl + 'machineaccess', data, { headers: header });
  }
  getSelectedNodesFlatArray(treeNode: any): any {
    const flatArray: any = [];
    const treeToFlat = (node: any): any => {
      if (node.data.IsSelect) {
        flatArray.push(node);
      }

      if (node.children.length) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < node.children.length; i++) {
          treeToFlat(node.children[i]);
        }
      }
    };

    treeToFlat(treeNode);

    return flatArray;
  }

  addMenuData(data: any): Observable<any[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any[]>( this.baseUrl + 'menu', data,{headers: header});
  }

  getMenuData(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>( this.baseUrl + 'menu',{headers: header});
  }

  updateMenuData(data: any): Observable<any[]> {
    const token = localStorage.getItem('token');
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any[]>( this.baseUrl + 'menu', data,{headers: header});
  }
  getSelectedNodesMachineFlatArray(treeNode: any): any {
    const flatArray: any = [];
    const treeToFlat = (node: any): any => {
      if (node.partialSelected) {
        flatArray.push(node);
      }

      if (node.children.length) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < node.children.length; i++) {
          treeToFlat(node.children[i]);
        }
      }
    };

    treeToFlat(treeNode);

    return flatArray;
  }

}
