import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {ToastService} from './toast.service';
import {User} from '../models/user';
import {UserService} from './user.service';
import * as jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public authorized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient,
                private router: Router,
                private toastService: ToastService,
                private userService: UserService) {
    }


    authorize = (perf) => {
        this.authorized.next(true);
        const token = perf;
        const payload = jwt_decode(token);
        localStorage.setItem(environment.apiToken, token);
        localStorage.setItem(environment.roleName, payload.scopes.authority);
        this.toastService.presentInfoToast('Authorized!');
        this.router.navigate(['home']);
    }

    authFail = () => {
        this.toastService.presentDangerToast('Invalid login or password');
    }

    login(login: string, password: string) {
        return this.http.post(environment.apiUrl + '/login', {login, password}, {responseType: 'text'});
    }

    public validateLogin(login: string): Observable<User> {
        return this.http.post<any>(environment.apiUrl + '/api/users/validate', {}, {params: {login}});
    }

    register(user: User) {
        return this.userService.save(user);
    }

    checkThenRedirect() {
        if (!this.validateToken() || !localStorage.getItem(environment.apiToken)) {
            this.toastService.presentDangerToast('Authorization required!');
            this.router.navigate(['/login']);
        }
    }

    isAuthorized() {
        if (!localStorage.getItem(environment.apiToken)) {
            return false;
        } else {
            return true;
        }
    }


    checkAvailability(): boolean {
        const auth = localStorage.getItem(environment.apiToken);
        return !!auth;
    }

    removeToken() {
        localStorage.removeItem(environment.apiToken);
    }

    removeAll() {
        this.removeRole();
        this.removeToken();
    }

    removeRole() {
        localStorage.removeItem(environment.roleName);
    }

    getToken() {
        return localStorage.getItem(environment.apiToken);
    }

    getRole() {
        return localStorage.getItem(environment.roleName);
    }

    validateToken() {
        if (localStorage.getItem(environment.apiToken)) {

            let httpParams = new HttpParams();
            httpParams = httpParams.append('token', localStorage.getItem(environment.apiToken));
            this.http.get(environment.apiUrl + '/authentication/validate', {
                params: httpParams,
                responseType: 'text'
            }).toPromise().then(resp => {
                if (resp !== 'OK') {
                    localStorage.clear();
                    this.authorized.next(false);
                }
            }, err => {
                localStorage.clear();
                this.authorized.next(false);
            });
            this.authorized.next(true);
        } else {
            this.authorized.next(false);
        }
        return this.authorized;
    }


    public logout() {
        this.authorized.next(false);
        localStorage.clear();
        this.toastService.presentInfoToast('You logged out!');
        this.router.navigate(['/login']);
    }

    getMyRole() {

        if (!this.getMyApi()) {
            return null;
        }
        const base64Url = this.getMyApi().split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return (JSON.parse(window.atob(base64))).role;
    }

    getMyUsername() {

        if (!this.getMyApi()) {
            return null;
        }

        const base64Url = this.getMyApi().split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return (JSON.parse(window.atob(base64))).sub;
    }

    getMyApi() {
        return localStorage.getItem(environment.apiToken);
    }
}
