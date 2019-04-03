import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastService} from '../../services/toast.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    constructor(
        private  authService: AuthService, private builder: FormBuilder,
        private toastService: ToastService, private router: Router
    ) {


    }

    loginForm: FormGroup;

    ngOnInit() {

        this.loginForm = this.builder.group({
            username: [null, Validators.required],
            password: [null, Validators.required]
        });

    }

    login() {
        const username = this.loginForm.get('username').value;
        const password = this.loginForm.get('password').value;
        this.authService.login(username, password);
    }
}
