import {Component, OnInit} from '@angular/core';
import {NavController, Platform} from '@ionic/angular';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {User} from '../shared/models/user';
import {UserService} from '../shared/services/user.service';
import {AuthService} from '../shared/services/auth.service';
import {Roles} from '../shared/models/roles';
import {Router, RouterEvent} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    currentUser: User;

    selectedPath = '';

    pages = [];


    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private userService: UserService,
        private authService: AuthService,
        private statusBar: StatusBar,
        private router: Router,
        public navCtrl: NavController
    ) {

        switch (authService.getRole()) {
            case Roles.ROLE_ADMIN: {
                this.pages = this.getAdminRoutes();
                break;
            }
            case Roles.ROLE_CLIENT: {
                this.pages = this.geClientRoutes();
                break;
            }
        }

        this.router.events.subscribe((event: RouterEvent) => {
            if (event && event.url) {
                this.selectedPath = event.url;
            }
        });



        this.initializeApp();
    }

    getAdminRoutes = () => {
        const pages = [
            {
                title: 'Main',
                url: '/home/main',
                icon: 'home'
            },
            {
                title: 'Users',
                url: '/home/users',
                icon: 'contacts'
            },
            {
                title: 'Companies',
                url: '/home/companies',
                icon: 'people'
            },
            {
                title: 'Items',
                url: '/home/items',
                icon: 'grid'
            },
            {
                title: 'Cars',
                url: '/home/cars',
                icon: 'car'
            },
            {
                title: 'Orders',
                url: '/home/orders',
                icon: 'cart'
            },
        ];
        return pages;
    }

    geClientRoutes = () => {

        const pages = [
            {
                title: 'Home',
                url: '/home/main',
                icon: 'home'
            },
            {
                title: 'Shops',
                url: '/home/shops',
                icon: 'pricetags'
            },
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
