import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {MyOrdersPage} from './my-orders.page';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {OrderListComponent} from './order-list/order-list.component';
import {TrackMeComponent} from './track-me/track-me.component';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {NativeGeocoder} from '@ionic-native/native-geocoder/ngx';
import {TrackYouComponent} from './track-you/track-you.component';

const routes: Routes = [
    {
        path: '',
        component: MyOrdersPage,
        children: [
            {path: '', component: OrderListComponent},
            {path: ':id', component: OrderDetailComponent},
            {path: ':id/track', component: TrackMeComponent},
            {path: ':id/track/driver', component: TrackYouComponent},
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
        TrackMeComponent,
        TrackYouComponent
    ],
    providers: [
        Geolocation,
        NativeGeocoder,
    ]
})
export class MyOrdersPageModule {
}
