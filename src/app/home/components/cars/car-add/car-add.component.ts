import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../shared/services/user.service';
import {CarService} from '../../../../shared/services/car.service';
import {ToastService} from '../../../../shared/services/toast.service';
import {Car} from '../../../../shared/models/car';
import {User} from '../../../../shared/models/user';
import {mergeMap} from 'rxjs/operators';
import {CarType} from '../../../../shared/models/car-type';
import {CarTypeService} from '../../../../shared/services/car-type.service';
import {CompanyService} from '../../../../shared/services/company.service';
import {Company} from '../../../../shared/models/company';

@Component({
    selector: 'app-car-add',
    templateUrl: './car-add.component.html',
    styleUrls: ['./car-add.component.scss'],
})
export class CarAddComponent implements OnInit {

    addCarForm: FormGroup;
    loading = false;
    companies: Company[] = [];
    users: User[] = [];
    carTypes: CarType[] = [];

    constructor(private carTypeService: CarTypeService,
                private companyService: CompanyService,
                private toastService: ToastService,
                private userService: UserService,
                private carService: CarService,
                private builder: FormBuilder) {
    }

    ngOnInit() {
        this.fetchAll();
        this.addCarForm = this.builder.group({
            name: [null, Validators.required],
            company: [null, Validators.required],
            plateNumber: [null, Validators.required],
            carType: [null, Validators.required],
            user: [null, Validators.required]
        });

    }

    fetchAll = () => {
        this.companyService.getAll().pipe(
            mergeMap(perf => {
                this.companies = perf;
                return this.userService.getAll();
            })
        ).pipe(
            mergeMap(perf => {
                this.users = perf;
                return this.carTypeService.getAll();
            })
        ).subscribe(perf => {
            this.carTypes = perf;
            this.loading = false;
        });
    }

    addCar = () => {
        this.loading = true;
        const car = new Car();
        car.name = this.addCarForm.get('name').value;
        car.company = this.addCarForm.get('company').value;
        car.plateNumber = this.addCarForm.get('plateNumber').value;
        car.carType = this.addCarForm.get('carType').value;
        car.user = this.addCarForm.get('user').value;
        this.carService.save(car).subscribe(perf => {
            this.loading = false;
            this.addCarForm.reset();
            this.toastService.presentInfoToast('Car added');
        }, err => {
            this.toastService.presentDangerToast('Error occured!');
        });
        console.log(car);
    };

}
