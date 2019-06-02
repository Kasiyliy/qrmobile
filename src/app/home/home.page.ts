import {Component, OnInit} from '@angular/core';
import {NavController, Platform} from '@ionic/angular';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {User} from '../shared/models/user';
import {UserService} from '../shared/services/user.service';
import {AuthService} from '../shared/services/auth.service';
import {Roles} from '../shared/models/roles';
import {Router, RouterEvent} from '@angular/router';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner/ngx';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    currentUser: User;
    pages = [];
    currentRole = '';

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private userService: UserService,
        private authService: AuthService,
        private statusBar: StatusBar,
        public navCtrl: NavController
    ) {
        this.currentRole = authService.getRole();
        this.initializeApp();
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
