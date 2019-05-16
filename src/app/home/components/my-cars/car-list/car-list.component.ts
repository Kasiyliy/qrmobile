import {Component, OnInit} from '@angular/core';
import {Car} from '../../../../shared/models/car';
import {CarService} from '../../../../shared/services/car.service';
import {UserService} from '../../../../shared/services/user.service';
import {ToastService} from '../../../../shared/services/toast.service';

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

    constructor(
                private toastService: ToastService,
                private userService: UserService,
                private carService: CarService,
                ) {
    }

    fetchAll = () => {
        this.userService.currentUser().subscribe(perf => {
            this.carService.getAllMyCars(perf.data.id).subscribe(p => {
                this.cars = p;
                this.loading = false;
            }, err => {
                this.toastService.presentDangerToast('Error!');
                this.loading = false;
            });
        }, err => {
            this.toastService.presentDangerToast('Error!');
            this.loading = false;
        });
    };

}
