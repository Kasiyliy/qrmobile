import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    constructor(
        private  authService: AuthService,
        private builder: FormBuilder) {}

    loginForm: FormGroup;

    ngOnInit() {
        this.authService.removeAll();
        this.loginForm = this.builder.group({
            login: [null, Validators.required],
            password: [null, Validators.required]
        });

    }

    login() {
        const login = this.loginForm.get('login').value;
        const password = this.loginForm.get('password').value;
        this.authService.login(login, password);
    }
}
