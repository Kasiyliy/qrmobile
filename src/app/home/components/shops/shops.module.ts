import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ShopsPage} from './shops.page';
import {ShopListComponent} from './components/shop-list/shop-list.component';

const routes: Routes = [
    {
        path: '', component: ShopsPage,
        children: [
            {path: '', component: ShopListComponent}
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
    declarations: [ShopsPage, ShopListComponent]
})
export class ShopsPageModule {
}
