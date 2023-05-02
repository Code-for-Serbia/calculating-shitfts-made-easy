import { Component, OnInit } from '@angular/core';
import { Shift } from './shift';
import { ShiftsService } from './shift.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  shifts: Shift[] = [];
  newShift: Shift = new Shift();
  currentYear: number = new Date().getFullYear();
  currentDate: Date = new Date();

  constructor(private shiftsService: ShiftsService) {
  }

  ngOnInit() {
    this.loadShifts();
    this.currentYear =  new Date().getFullYear();
  }

  calculateShift() {
    // Perform shift calculation based on input values
    // Update newShift object with calculated results
    this.newShift.duration = this.calculateDuration(this.newShift.startHour, this.newShift.endHour);
    this.newShift.salaryByDay = this.calculateSalaryByDay(this.newShift.duration, this.newShift.hourlyRate);

    // Add newShift to shifts array
    this.shiftsService.addShift(this.newShift);
    this.newShift = new Shift();
  }

  calculateDuration(startHour: string, endHour: string): number {
    // Calculate duration based on startHour and endHour
    // Return duration in hours
    const start = new Date();
    const end = new Date();
    const [startHourValue, startMinute] = startHour.split(':');
    const [endHourValue, endMinute] = endHour.split(':');
    start.setHours(Number(startHourValue), Number(startMinute));
    end.setHours(Number(endHourValue), Number(endMinute));

    const durationMillis = end.getTime() - start.getTime();
    const durationHours = durationMillis / (1000 * 60 * 60);
    return durationHours;
  }

  calculateSalaryByDay(duration: number, hourlyRate: number): number {
    // Calculate salary by day based on duration and hourlyRate
    return duration * hourlyRate;
  }

  loadShifts() {
    this.shifts = this.shiftsService.getShifts();
  }

  calculateTotalSalaryByDay(): number {
    // Calculate the total salary by summing up the salary by day for all shifts
    return this.shifts.reduce((total, shift) => total + shift.salaryByDay, 0);
  }

  calculateTotalSalaryByMonth(): number {
    // Calculate the total salary by multiplying the total salary by day by the number of days in a month (considering 30 days in a month)
    const totalSalaryByDay = this.calculateTotalSalaryByDay();
    return totalSalaryByDay * 30;
  }

}

