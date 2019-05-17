import { Component, OnInit } from '@angular/core';
import {Car} from '../../../../shared/models/car';
import {CarService} from '../../../../shared/services/car.service';
import {Roles} from '../../../../shared/models/roles';
import {AuthService} from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit {

  loading = false;
  cars: Car[] = [];
  isAdmin = true;
  ngOnInit() {
    this.loading = true;
    this.fetchAll();
  }

  constructor(private carService: CarService,
              private authService: AuthService) {
    if (authService.getRole() === Roles.ROLE_ADMIN) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
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
