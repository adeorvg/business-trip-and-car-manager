import { Component, OnInit } from '@angular/core';
import { CarAvailabilityService } from 'src/app/service/carAvailabilityService';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Car } from 'src/app/model/car';

@Component({
  selector: 'car-availabilty-form',
  templateUrl: './car-availabilty-form.component.html',
  styleUrls: ['./car-availabilty-form.component.css']
})
export class CarAvailabiltyFormComponent implements OnInit {

  dateTo: Date;
  dateFrom: Date;
  form: FormGroup;
  availableCars : Car[];

  constructor(private carAvailabilityService: CarAvailabilityService, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      dateFrom: [null],
      dateTo: [null],
    }, { validator: this.dateLessThan('dateFrom', 'dateTo') })
  }

  submit() {
    this.dateFrom = new Date(this.form.get('dateFrom').value);
    this.dateTo = new Date(this.form.get('dateTo').value);
    
    this.dateFrom.setTime(this.dateFrom.getTime() - this.dateFrom.getTimezoneOffset()*60*1000);
    this.dateTo.setTime(this.dateTo.getTime() - this.dateTo.getTimezoneOffset()*60*1000);

    this.carAvailabilityService.getCarAvailability(this.dateFrom, this.dateTo)
      .subscribe((cars: Car[])  => {
          this.availableCars = cars;
      });
  }

  dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = group.controls[from];
      let t = group.controls[to];
      if (f.value > t.value) {
        return {
          dates: "Date from should be less than Date to"
        };
      }
      return {};
    }
  }

}
