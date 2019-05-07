import { Component, OnInit } from '@angular/core';
import {Car} from '../../../../shared/models/car';
import {CarService} from '../../../../shared/services/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit {

  loading = false;
  cars: Car[] = [];

  ngOnInit() {
    this.loading = true;
    this.fetchAll();
  }

  constructor(private carService: CarService) {
  }

  fetchAll = () => {
    this.carService.getAll().subscribe(perf => {
      this.cars = perf;
      this.loading = false;
    });
  }

  delete = (car: Car) => {
    this.loading = true;
    this.carService.delete(car).subscribe(perf => {
      this.cars = this.cars.filter(c => c.id !== car.id);
      this.loading = false;
    });
  }

}
