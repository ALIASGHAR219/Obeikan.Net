import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface Mastershift {
  shiftId: number;
  shiftPattern: number;
  plant: number;
  endTime: string;
  startTime: string;
}
