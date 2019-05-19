import {Component, OnInit} from '@angular/core';
import {User} from '../../../../shared/models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../shared/services/user.service';
import {mergeMap} from 'rxjs/operators';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../shared/services/auth.service';
import {ToastService} from '../../../../shared/services/toast.service';
import {RoleService} from '../../../../shared/services/role.service';
import {Role} from '../../../../shared/models/role';
import {Roles} from '../../../../shared/models/roles';

@Component({
    selector: 'app-users-detail',
    templateUrl: './users-detail.component.html',
    styleUrls: ['./users-detail.component.scss'],
})
export class UsersDetailComponent implements OnInit {

    userId: number;
    user: User;
    loading = false;
    roles: Role[] = [];
    isAdmin = false;

    constructor(private builder: FormBuilder,
                private toastService: ToastService,
                private roleService: RoleService,
                private authService: AuthService,
                private userService: UserService,
                private route: ActivatedRoute,
                private router: Router,
                private _location: Location) {
    }


    editForm: FormGroup;

    ngOnInit() {
        if (this.authService.getRole() === Roles.ROLE_ADMIN) {
            this.isAdmin = true;
        } else {
            this.isAdmin = false;
        }
        this.fetchAll();
        this.editForm = this.builder.group({
            login: [null, Validators.required],
            firstName: [null, Validators.required],
            lastName: [null, Validators.required],
            phoneNumber: [null, Validators.required],
            role: [null, Validators.required],
        });
    }

    edit() {
        this.user.firstName = this.editForm.get('firstName').value;
        this.user.lastName = this.editForm.get('lastName').value;
        this.user.phoneNumber = this.editForm.get('phoneNumber').value;
        this.user.login = this.editForm.get('login').value;
        this.user.role = this.editForm.get('role').value;

        this.userService.update(this.user).subscribe(success => {
            this.toastService.presentInfoToast('Edited!');
            this.backClicked();
        }, err => {
            console.log(err);
            this.toastService.presentInfoToast('Error occured!');
        });

    }

    fetchAll() {
        this.loading = true;
        this.route.params.pipe(
            mergeMap((res) => {
                this.userId = +res['id'];
                return this.userService.getById(this.userId);
            }),
            mergeMap((res) => {
                this.user = res;
                return this.roleService.getAll();
            })
        ).subscribe(perf => {
            this.roles = perf;
            this.loading = false;
        });

    }


    compareFn(e1: Role, e2: Role): boolean {
        return e1 && e2 ? e1.id === e2.id : e1 === e2;
    }


    backClicked() {
        this._location.back();
    }
}
