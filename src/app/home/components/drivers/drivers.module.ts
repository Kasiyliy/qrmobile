import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {DriversPage} from './drivers.page';
import {DriverListComponent} from './driver-list/driver-list.component';

const routes: Routes = [
    {
        path: '',
        component: DriversPage,
        children: [
            {path: '', component: DriverListComponent}
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [DriversPage, DriverListComponent]
})
export class DriversPageModule {
}
