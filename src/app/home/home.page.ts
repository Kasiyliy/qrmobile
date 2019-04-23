import {Component, OnInit} from '@angular/core';
import {NavController, Platform} from '@ionic/angular';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {Pages} from '../shared/models/pages';
import {User} from '../shared/models/user';
import {UserService} from '../shared/services/user.service';
import {AuthService} from '../shared/services/auth.service';
import {Roles} from '../shared/models/roles';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    public appPages: Array<Pages> = [];
    currentUser: User;


    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private userService: UserService,
        private authService: AuthService,
        private statusBar: StatusBar,
        public navCtrl: NavController
    ) {

        switch (authService.getRole()) {
            case Roles.ROLE_ADMIN: {
                this.appPages = this.getAdminRoutes();
                break;
            }
            case Roles.ROLE_CLIENT: {
                this.appPages = this.geClientRoutes();
                break;
            }
        }

        this.initializeApp();
    }


    getAdminRoutes = () => {
        const pages = [
            {
                title: 'Home',
                url: '/home',
                icon: 'home'
            },
            {
                title: 'Users',
                url: '/users',
                icon: 'people'
            },

            // {
            //     title: 'App Settings',
            //     url: '/settings',
            //     direct: 'forward',
            //     icon: 'cog'
            // },

            {
                title: 'Logout',
                url: '/login',
                icon: 'key'
            }
        ];
        return pages;
    }

    geClientRoutes = () => {

        const pages = [
            {
                title: 'Home',
                url: '/home',
                icon: 'home'
            },

            {
                title: 'Logout',
                url: '/login',
                icon: 'key'
            }
        ];
        return pages;
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    logout() {
        this.navCtrl.navigateRoot('/');
    }

    ngOnInit(): void {
        this.userService.currentUser().subscribe(perf => {
            this.currentUser = perf.data;
        });
    }


}
