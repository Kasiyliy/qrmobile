import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {OrdersPage} from './orders.page';
import {OrderAddComponent} from './order-add/order-add.component';
import {OrderListComponent} from './order-list/order-list.component';
import {OrdersRoutingModule} from './orders-routing.module';
import {OrderEditComponent} from './order-edit/order-edit.component';

@NgModule({
    imports: [
        ReactiveFormsModule,
        OrdersRoutingModule,
        CommonModule,
        FormsModule,
        IonicModule,
    ],
    declarations: [
        OrdersPage,
        OrderAddComponent,
        OrderListComponent,
        OrderEditComponent
    ]
})
export class OrdersPageModule {
}
