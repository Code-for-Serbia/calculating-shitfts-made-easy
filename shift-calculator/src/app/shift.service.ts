import { Injectable } from '@angular/core';
import { Shift } from './shift';

@Injectable({
  providedIn: 'root'
})
export class ShiftsService {
  private shifts: Shift[] = [];

  constructor() { }

  addShift(shift: Shift) {
    this.shifts.push(shift);
  }

  getShifts(): Shift[] {
    return this.shifts;
  }
}
