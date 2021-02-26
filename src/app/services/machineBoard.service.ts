import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MachineBoard } from '../models/machineBoard';

@Injectable({
  providedIn: 'root'
})
export class MachineBoardService {
baseUrl!: '';
constructor(private http: HttpClient) { }
    getAll(): any {
      return this.http.get<MachineBoard[]>(this.baseUrl);
    }
}
