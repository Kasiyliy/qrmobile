import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

    loading = false;

    constructor(
        private  authService: AuthService,
        private router: Router,
        private builder: FormBuilder) {}

    loginForm: FormGroup;

    ngOnInit() {
        this.authService.removeAll();
        this.loginForm = this.builder.group({
            login: [null, Validators.required],
            password: [null, Validators.required]
        });


        this.router.events.subscribe(perf => {
            this.loginForm.reset();
        });
    }

    login() {
        const login = this.loginForm.get('login').value;
        const password = this.loginForm.get('password').value;
        this.loading = true;
        this.authService.login(login, password).subscribe(perf => {
            this.loading = false;
            this.loginForm.reset();
            this.authService.authorize(perf);
        }, err => {
            this.authService.authFail();
            this.loading = false;
        });
    }

    ngOnDestroy(): void {
    }

}
