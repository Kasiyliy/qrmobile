import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {ToastService} from '../../shared/services/toast.service';
import {User} from '../../shared/models/user';
import {Router} from '@angular/router';


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
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {

    constructor(private builder: FormBuilder,
                private authService: AuthService,
                private toastService: ToastService,
                private router: Router) {
    }


    registerForm: FormGroup;

    ngOnInit() {
        this.authService.removeAll();
        this.registerForm = this.builder.group({
            login: [null, Validators.required],
            firstName: [null, Validators.required],
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

        this.authService.validateLogin(user.login).subscribe(perf => {
            this.authService.register(user).subscribe(success => {
                this.toastService.presentInfoToast('Зарегистрированы!');
                this.registerForm.reset();
                this.router.navigate(['/login']);
            }, err => {
                console.log(err);
                this.toastService.presentInfoToast('Произошла ошибка!');
            });
        }, err => {
            this.toastService.presentDangerToast('Такой логин уже существует!');
        });


    }

    ngOnDestroy(): void {
        this.registerForm.reset();
    }



}
