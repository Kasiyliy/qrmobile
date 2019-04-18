import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanDeactivate} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private authService: AuthService) {
    }

    canActivate = () => {
        if (localStorage.getItem(environment.apiToken)) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    };


}
