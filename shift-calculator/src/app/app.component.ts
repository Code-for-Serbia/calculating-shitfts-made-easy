import { Component, OnInit } from '@angular/core';
import { Shift } from './shift';
import { ShiftsService } from './shift.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  shiftForm!: FormGroup;
  shifts: Shift[] = [];
  currentYear: number = new Date().getFullYear();

  constructor(
    private formBuilder: FormBuilder,
    private shiftsService: ShiftsService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.loadShifts();
  }

  buildForm() {
    this.shiftForm = this.formBuilder.group({
      name: ['', Validators.required],
      year: [this.currentYear, Validators.required],
      startHour: ['', Validators.required],
      endHour: ['', Validators.required],
      hourlyRate: ['', Validators.required]
    }, { validator: this.validateHours });
  }

  validateHours(formGroup: FormGroup) {
    const startHour = formGroup.get('startHour')?.value;
    const endHour = formGroup.get('endHour')?.value;

    if (startHour && endHour) {
      const startTime = new Date(`01/01/2000 ${startHour}`);
      const endTime = new Date(`01/01/2000 ${endHour}`);

      if (endTime < startTime) {
        formGroup.get('endHour')?.setErrors({ beforeStartHour: true });
      } else {
        formGroup.get('endHour')?.setErrors(null);
      }
    }
  }

  calculateShift() {
    if (this.shiftForm.invalid) {
      return;
    }

    const shift: Shift = {
      name: this.shiftForm.value.name,
      year: this.shiftForm.value.year,
      startHour: this.shiftForm.value.startHour,
      endHour: this.shiftForm.value.endHour,
      hourlyRate: this.shiftForm.value.hourlyRate,
      duration: 0,
      salaryByDay: 0
    };

    // Perform shift calculation based on input values
    shift.duration = this.calculateDuration(shift.startHour, shift.endHour);
    shift.salaryByDay = this.calculateSalaryByDay(shift.duration, shift.hourlyRate);

    // Add shift to shifts array
    this.shiftsService.addShift(shift);

    // Reset the form
    this.shiftForm.reset();
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


}

