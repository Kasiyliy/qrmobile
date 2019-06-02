import {Component, OnInit} from '@angular/core';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner/ngx';
import {User} from '../../../shared/models/user';
import {NavController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {UserService} from '../../../shared/services/user.service';
import {AuthService} from '../../../shared/services/auth.service';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';
import {ToastService} from '../../../shared/services/toast.service';
import {Roles} from '../../../shared/models/roles';
import {Session} from '../../../shared/models/session';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {SessionService} from '../../../shared/services/session.service';
import {Qr} from '../../../shared/models/qr';
import {UniqueDeviceID} from '@ionic-native/unique-device-id/ngx';
import {Attendance} from '../../../shared/models/attendance';
import {AttendanceService} from '../../../shared/services/attendance.service';

@Component({
    selector: 'app-camera',
    templateUrl: './camera.page.html',
    styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {
    loading = false;
    currentUser: User;
    pages = [];
    currentRole = '';

    isOn = true;

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
        private uniqueDeviceID: UniqueDeviceID,
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

    logout() {
        this.navCtrl.navigateRoot('/');
    }

    ngOnInit(): void {
        this.userService.currentUser().subscribe(perf => {
            this.currentUser = perf.data;
        });
    }

    closeQr() {
        this.qrScanner.destroy();
    }

    startScanner() {
        this.qrScanner.prepare()
            .then((status: QRScannerStatus) => {
                if (status.authorized) {

                    this.isOn = true;
                    this.toastService.presentDarkToast('Started to scan!');
                    const scanSub = this.qrScanner.scan().subscribe((text: string) => {
                        this.geolocation.getCurrentPosition().then((resp) => {
                            const qrId = parseFloat(text);
                            const latitude = resp.coords.latitude;
                            const longitude = resp.coords.longitude;
                            const altitude = resp.coords.altitude;
                            this.toastService.presentDarkToast(qrId + '');
                            this.isOn = false;
                            this.qrScanner.hide(); // hide camera preview
                            scanSub.unsubscribe(); // stop scanning
                            const qr = new Qr();
                            qr.id = qrId;
                            if (this.currentRole === Roles.ROLE_TEACHER) {
                                const session = new Session();
                                session.user = this.currentUser;
                                session.latitude = latitude;
                                session.altitude = altitude;
                                session.longitude = longitude;
                                session.qr = qr;
                                this.loading = true;
                                this.sessionService.save(session).subscribe(perf => {
                                    this.toastService.presentDarkToast('Session created!');
                                    this.loading = false;
                                }, err => {
                                    this.toastService.presentDangerToast(err);
                                    this.loading = false;
                                });
                            } else if (this.currentRole === Roles.ROLE_STUDENT) {
                                this.uniqueDeviceID.get()
                                    .then((uuid: any) => {
                                        this.toastService
                                            .presentDangerToast(qr.id + '');
                                        this.sessionService.getByQrId(qr.id).subscribe(perf => {
                                            const attendance = new Attendance();
                                            attendance.deviceId = uuid;
                                            attendance.session = perf;
                                            attendance.latitude = latitude;
                                            attendance.longitude = longitude;
                                            attendance.altitude = altitude;
                                            attendance.user = this.currentUser;
                                            this.attendanceService.save(attendance).subscribe(result => {
                                                this.toastService.presentDarkToast('Assigned to Lesson!');
                                            }, error1 => {
                                                this.toastService
                                                    .presentSuccessToast('Not assigned! Maybe you already ' +
                                                        'assigned or using same device for assignment! ' + error1.toString());
                                            });
                                        }, err => {
                                            this.toastService.presentDangerToast('Error, qr not found! ' + err.toString());
                                        });
                                    })
                                    .catch((error: any) => {
                                        this.toastService.presentDangerToast('Error, unique id not found!');
                                    });
                            } else {
                                this.toastService.presentDangerToast('Error! Role do not exists!');
                            }
                        }).catch((error) => {
                            this.toastService.presentDangerToast('Error! Geolocation not work!');
                        });

                    });

                    this.qrScanner.show().then();


                } else if (status.denied) {
                    // camera permission was permanently denied
                    // you must use QRScanner.openSettings() method to guide the user to the settings page
                    // then they can grant the permission from there
                    this.qrScanner.openSettings();
                } else {
                    // permission was denied, but not permanently. You can ask for permission again at a later time.
                }
            })
            .catch((e: any) => console.log('Error is', e));
    }

}
