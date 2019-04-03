import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs';
import {ToastService} from './toast.service';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnInit {

    public static authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient, private toastService: ToastService, private router: Router) {

    }

    ngOnInit(): void {
    }

    login(username, password) {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('username', username);
        httpParams = httpParams.append('password', password);
        AuthService.authenticated.next(true);
        this.router.navigateByUrl('/home');
        return;
        this.http.post(environment.apiUrl + '/authentication/login', {}, {params: httpParams, responseType: 'text'}).subscribe(perf => {
            if (perf === 'Incorrect username or password') {
                this.toastService.presentWarningToast('Invalid username or password!');
                AuthService.authenticated.next(false);
            } else {
                this.toastService.presentInfoToast('Authentication Successful !');
                localStorage.setItem('token', perf);
                AuthService.authenticated.next(true);
                this.router.navigateByUrl('/home');
            }

        }, err => {
            AuthService.authenticated.next(false);
            this.toastService.presentDangerToast('Error occured! Report to system administrator!');
            console.log(err);
        });
    }

    logout() {
        localStorage.clear();
        AuthService.authenticated.next(false);
        this.toastService.presentInfoToast('Logged out!');
        this.router.navigateByUrl('/login');
    }

}
