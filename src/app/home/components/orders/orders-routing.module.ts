import {NgModule, OnInit} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderAddComponent} from './order-add/order-add.component';
import {OrdersPage} from './orders.page';
import {OrderListComponent} from './order-list/order-list.component';
import {OrderEditComponent} from './order-edit/order-edit.component';

const routes: Routes = [
        {
            path: '', component: OrdersPage,
            children: [
                {
                    path: '', component: OrderListComponent
                },
                {
                    path: ':id', component: OrderEditComponent
                },
                {
                    path: 'new', component: OrderAddComponent
                },
            ]
        },

    ]
;

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OrdersRoutingModule implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
