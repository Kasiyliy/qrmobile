import {Component, OnInit} from '@angular/core';
import {User} from '../../../shared/models/user';
import {AuthService} from '../../../shared/services/auth.service';
import {UserService} from '../../../shared/services/user.service';
import {Roles} from '../../../shared/models/roles';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner/ngx';
import {Qr} from '../../../shared/models/qr';
import {NavController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SessionService} from '../../../shared/services/session.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {ToastService} from '../../../shared/services/toast.service';
import {AttendanceService} from '../../../shared/services/attendance.service';
import {mergeMap} from 'rxjs/operators';

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
    currentUser: User;
    user: User;
    role = '';
    isQr = false;
    isOn = true;
    isStudent = false;
    currentRole = '';
    users: User[] = [];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private userService: UserService,
        private authService: AuthService,
        private statusBar: StatusBar,
        private qrScanner: QRScanner,
        private sessionService: SessionService,
        private attendanceService: AttendanceService,
        private geolocation: Geolocation,
        private toastService: ToastService,
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

    ngOnInit() {
        this.userService.currentUser().subscribe(perf => {
            this.user = perf.data;
            if (this.user.role.name === Roles.ROLE_STUDENT) {
                this.role = 'STUDENT';
                this.isStudent = true;
            } else if (this.user.role.name === Roles.ROLE_TEACHER) {
                this.role = 'TEACHER';
            }
        });
    }

    checkQr() {
        this.isQr = true;
        this.startScanner();
    }

    isTeacher() {
        return this.user.role.name === Roles.ROLE_TEACHER;
    }

    closeQr() {
        this.isQr = false;
        this.qrScanner.destroy();
    }

    startScanner() {
        this.qrScanner.prepare()
            .then((status: QRScannerStatus) => {
                if (status.authorized) {
                    this.isOn = true;
                    this.toastService.presentDarkToast('Started to scan!');
                    const scanSub = this.qrScanner.scan().subscribe((text: string) => {
                        const qrId = parseFloat(text);
                        this.toastService.presentDarkToast(qrId + '');
                        this.isOn = false;
                        this.qrScanner.hide();
                        scanSub.unsubscribe();
                        const qr = new Qr();
                        qr.id = qrId;
                        this.sessionService.getByQrId(qrId).pipe(
                            mergeMap(res => {
                                return this.attendanceService.getBySessionId(res.id);
                            }),
                        )
                            .subscribe(res => {
                                this.users = res.map(attendance => attendance.user);
                                this.closeQr();
                            });
                    });

                    this.qrScanner.show().then();
                } else if (status.denied) {
                    this.qrScanner.openSettings();
                }
            }, err => {
                this.isQr = false;
            })
            .catch((e: any) => {
                    this.toastService.presentDarkToast('Error is' + e);
                    this.isQr = false;
                }
            )
        ;
    }
}
