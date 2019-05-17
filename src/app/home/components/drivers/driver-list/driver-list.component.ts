import {Component, OnInit} from '@angular/core';
import {Car} from '../../../../shared/models/car';
import {ToastService} from '../../../../shared/services/toast.service';
import {UserService} from '../../../../shared/services/user.service';
import {CarService} from '../../../../shared/services/car.service';
import {CompanyService} from '../../../../shared/services/company.service';
import {Company} from '../../../../shared/models/company';
import {User} from '../../../../shared/models/user';
import {AuthService} from '../../../../shared/services/auth.service';
import {Roles} from '../../../../shared/models/roles';

@Component({
    selector: 'app-driver-list',
    templateUrl: './driver-list.component.html',
    styleUrls: ['./driver-list.component.scss'],
})
export class DriverListComponent implements OnInit {

    loading = false;
    users: User[] = [];
    company: Company;
    isDriver = false;

    ngOnInit() {
        this.loading = true;
        this.fetchAll();
    }

    constructor(
        private companyService: CompanyService,
        private toastService: ToastService,
        private userService: UserService,
        private authService: AuthService,
        private carService: CarService,
    ) {

        if (authService.getRole() === Roles.ROLE_ADMIN) {
            this.isDriver = false;
        } else {
            this.isDriver = true;
        }

    }

    fetchAll = () => {
        if (this.authService.getRole() === Roles.ROLE_ADMIN) {
            this.userService.getAllDrivers().subscribe(pe => {
                this.users = pe;
                this.loading = false;
            }, err => {
                this.loading = false;
            });
        } else {
            this.companyService.getAll().subscribe(perf => {
                this.company = perf[0];
                this.userService.getAllDriversByCompany(this.company.id).subscribe(pe => {
                    this.users = pe;
                    this.loading = false;
                }, err => {
                    this.loading = false;
                });
            });
        }
    };

}
