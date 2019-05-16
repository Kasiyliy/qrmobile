import {Component, OnInit} from '@angular/core';
import {Car} from '../../../../shared/models/car';
import {ToastService} from '../../../../shared/services/toast.service';
import {UserService} from '../../../../shared/services/user.service';
import {CarService} from '../../../../shared/services/car.service';
import {CompanyService} from '../../../../shared/services/company.service';
import {Company} from '../../../../shared/models/company';
import {User} from '../../../../shared/models/user';

@Component({
    selector: 'app-driver-list',
    templateUrl: './driver-list.component.html',
    styleUrls: ['./driver-list.component.scss'],
})
export class DriverListComponent implements OnInit {

    loading = false;
    users: User[] = [];
    company: Company;

    ngOnInit() {
        this.loading = true;
        this.fetchAll();
    }

    constructor(
        private companyService: CompanyService,
        private toastService: ToastService,
        private userService: UserService,
        private carService: CarService,
    ) {
    }

    fetchAll = () => {
        this.companyService.getAll().subscribe(perf => {
            this.company = perf[0];
            this.userService.getAllDrivers(this.company.id).subscribe(pe => {
                this.users = pe;
                this.loading = false;
            }, err => {
                this.loading = false;
            });
        });
    };

}
