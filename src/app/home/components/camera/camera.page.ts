import {Component, OnInit} from '@angular/core';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner/ngx';
import {User} from '../../../shared/models/user';
import {NavController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {UserService} from '../../../shared/services/user.service';
import {AuthService} from '../../../shared/services/auth.service';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {ToastService} from '../../../shared/services/toast.service';
import {Roles} from '../../../shared/models/roles';
import {Session} from '../../../shared/models/session';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {SessionService} from '../../../shared/services/session.service';
import {Qr} from '../../../shared/models/qr';
import {UniqueDeviceID} from '@ionic-native/unique-device-id/ngx';
import {Attendance} from '../../../shared/models/attendance';
import {AttendanceService} from '../../../shared/services/attendance.service';
import {FingerprintAIO} from '@ionic-native/fingerprint-aio/ngx';

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
        private faio: FingerprintAIO,
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

    getDistanceBetweenCoordinates(lat1, lon1, lat2, lon2, unit): number {
        if ((lat1 === lat2) && (lon1 === lon2)) {
            return 0;
        } else {
            const radlat1 = Math.PI * lat1 / 180;
            const radlat2 = Math.PI * lat2 / 180;
            const theta = lon1 - lon2;
            const radtheta = Math.PI * theta / 180;
            let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit === 'K') {
                dist = dist * 1.609344;
            }
            if (unit === 'N') {
                dist = dist * 0.8684;
            }
            return dist;
        }
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

                            const qr = new Qr();
                            qr.id = qrId;
                            console.log(qr);
                            if (this.currentRole === Roles.ROLE_TEACHER) {

                                console.log(this.currentUser);
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
                                console.log(this.currentUser);
                                this.faio.isAvailable()
                                    .then(result => {
                                        console.log('FAIO:' + result);
                                        if (result === 'finger' || result === 'face') {
                                            this.faio.show({
                                                clientId: 'kasya',
                                                clientSecret: 'kasya',
                                                disableBackup: true,
                                                localizedFallbackTitle: 'Use Pin',
                                                localizedReason: 'Please Authenticate'
                                            })
                                                .then((res: any) => {
                                                    if (result === 'Success') {
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
                                                                    if (this.getDistanceBetweenCoordinates(
                                                                        attendance.latitude,
                                                                        attendance.longitude,
                                                                        perf.latitude,
                                                                        perf.longitude,
                                                                        'K'
                                                                    ) <= 0.01) {
                                                                        this.attendanceService.save(attendance)
                                                                            .subscribe(respAttendance => {
                                                                                this.toastService
                                                                                    .presentInfoToast('Assigned to Lesson!');
                                                                            }, error1 => {
                                                                                this.toastService
                                                                                    .presentWarningToast(
                                                                                        'Not assigned! Maybe you already assigned or ' +
                                                                                        'using same device for assignment! '
                                                                                        + error1.toString());
                                                                            });
                                                                    } else {
                                                                        this.toastService
                                                                            .presentWarningToast('Your location is invalid!');
                                                                    }
                                                                }, err => {
                                                                    this.toastService
                                                                        .presentDangerToast('Error, qr not found! ' + err.toString());
                                                                });
                                                            })
                                                            .catch((error: any) => {
                                                                this.toastService.presentDangerToast('Error, unique id not found!');
                                                            });
                                                    } else {

                                                        this.toastService.presentInfoToast(res);
                                                    }
                                                })
                                                .catch((error: any) => {

                                                    this.toastService.presentDangerToast(error);
                                                });
                                        } else {
                                            this.toastService
                                                .presentDangerToast('Fingerprint/Face Auth is not available   on this device!');
                                        }
                                    });


                            } else {
                                this.toastService.presentDangerToast('Error! Role do not exists!');
                            }

                            this.qrScanner.hide(); // hide camera preview
                            scanSub.unsubscribe(); // stop scanning


                        }).catch((error) => {
                            this.toastService.presentDangerToast('Error! Geolocation not work!');
                        });

                    });

                    this.qrScanner.show().then();


                } else if (status.denied) {
                    this.qrScanner.openSettings();
                } else {
                    // permission was denied, but not permanently. You can ask for permission again at a later time.
                }
            })
            .catch((e: any) => console.log('Error is', e));
    }

}
