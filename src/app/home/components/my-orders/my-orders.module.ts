import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {MyOrdersPage} from './my-orders.page';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {OrderListComponent} from './order-list/order-list.component';
import {TrackMeComponent} from './track-me/track-me.component';

const routes: Routes = [
    {
        path: '',
        component: MyOrdersPage,
        children: [
            {path: '', component: OrderListComponent},
            {path: ':id', component: OrderDetailComponent},
            {path: ':id/track', component: TrackMeComponent},
        ]
    }
];

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        MyOrdersPage,
        OrderDetailComponent,
        OrderListComponent,
        TrackMeComponent
    ]
})
export class MyOrdersPageModule {
}
