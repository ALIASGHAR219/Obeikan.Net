import { Action } from './action';

export interface LossAnalysisUpdate {
  remarks: string;
  actions: Action[];
  date: Date;
  reason: number;
  tool: number;
}
