import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {MyCarsPage} from './my-cars.page';
import {CarListComponent} from './car-list/car-list.component';

const routes: Routes = [
        {
            path: '',
            component: MyCarsPage,
            children: [
                {path: '', component: CarListComponent}
            ]
        }
    ]
;

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [MyCarsPage, CarListComponent]
})
export class MyCarsPageModule {
}
