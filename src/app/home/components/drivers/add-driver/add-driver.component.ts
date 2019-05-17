import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../shared/services/auth.service';
import {ToastService} from '../../../../shared/services/toast.service';
import {Router} from '@angular/router';
import {User} from '../../../../shared/models/user';
import {UserService} from '../../../../shared/services/user.service';
import {Company} from '../../../../shared/models/company';
import {CompanyUser} from '../../../../shared/models/company-user';
import {CompanyUserService} from '../../../../shared/services/company-user.service';
import {CompanyService} from '../../../../shared/services/company.service';


export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({mustMatch: true});
        } else {
            matchingControl.setErrors(null);
        }
    };
}

@Component({
    selector: 'app-add-driver',
    templateUrl: './add-driver.component.html',
    styleUrls: ['./add-driver.component.scss'],
})
export class AddDriverComponent implements OnInit, OnDestroy {

    constructor(private builder: FormBuilder,
                private authService: AuthService,
                private userService: UserService,
                private toastService: ToastService,
                private companyUserService: CompanyUserService,
                private companyService: CompanyService,
                private router: Router) {
    }


    registerForm: FormGroup;
    companies: Company[] = [];

    ngOnInit() {

        this.companyService.getAll().subscribe(perf => {
            this.companies = perf;
        });

        this.registerForm = this.builder.group({
            login: [null, Validators.required],
            firstName: [null, Validators.required],
            company: [null, Validators.required],
            lastName: [null, Validators.required],
            phoneNumber: [null, Validators.required],
            password: [null, Validators.required],
            repassword: [null, Validators.required]
        }, {
            validator: MustMatch('password', 'repassword')
        });
    }

    register() {
        const user = new User();
        user.firstName = this.registerForm.get('firstName').value;
        user.lastName = this.registerForm.get('lastName').value;
        user.phoneNumber = this.registerForm.get('phoneNumber').value;
        user.password = this.registerForm.get('password').value;
        user.login = this.registerForm.get('login').value;

        const companyUser = new CompanyUser();
        companyUser.company = this.registerForm.get('company').value;

        this.authService.validateLogin(user.login).subscribe(perf => {
            this.userService.addDriver(user).subscribe(resp => {
                companyUser.user = resp;
                this.companyUserService.save(companyUser).subscribe(rsp => {
                    this.toastService.presentInfoToast('Registered!');
                    this.registerForm.reset();
                });
            }, err => {
                console.log(err);
                this.toastService.presentInfoToast('Error occured!');
            });
        }, err => {
            this.toastService.presentDangerToast('Username already exists!');
        });


    }

    ngOnDestroy(): void {
        this.registerForm.reset();
    }

}
