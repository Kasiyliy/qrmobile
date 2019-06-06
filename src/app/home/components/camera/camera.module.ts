import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {CameraPage} from './camera.page';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {UniqueDeviceID} from '@ionic-native/unique-device-id/ngx';
import {FingerprintAIO} from '@ionic-native/fingerprint-aio/ngx';

const routes: Routes = [
    {
        path: '',
        component: CameraPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
    ],
    declarations: [CameraPage],
    providers: [
        Geolocation,
        UniqueDeviceID,
        FingerprintAIO,
    ]
})
export class CameraPageModule {
}
