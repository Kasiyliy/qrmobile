import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {DriversPage} from './drivers.page';
import {DriverListComponent} from './driver-list/driver-list.component';
import {AddDriverComponent} from './add-driver/add-driver.component';

const routes: Routes = [
    {
        path: '',
        component: DriversPage,
        children: [
            {path: '', component: DriverListComponent},
            {path: 'add', component: AddDriverComponent}
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [DriversPage, DriverListComponent, AddDriverComponent]
})
export class DriversPageModule {
}
