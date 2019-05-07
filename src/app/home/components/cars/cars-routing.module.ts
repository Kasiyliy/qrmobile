import {NgModule, OnInit} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CarAddComponent} from './car-add/car-add.component';
import {CarsPage} from './cars.page';
import {CarListComponent} from './car-list/car-list.component';

const routes: Routes = [
        {
            path: '', component: CarsPage,
            children: [
                {
                    path: '', component: CarListComponent
                },
                {
                    path: 'new', component: CarAddComponent
                },
            ]
        },

    ]
;

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CarsRoutingModule implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
