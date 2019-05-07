import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ItemsPage} from './items.page';
import {ItemsRoutingModule} from './items-routing.module';
import {ItemAddComponent} from './item-add/item-add.component';
import {ItemListComponent} from './item-list/item-list.component';

@NgModule({
    imports: [
        ReactiveFormsModule,
        ItemsRoutingModule,
        CommonModule,
        FormsModule,
        IonicModule
    ],
    declarations: [
        ItemListComponent,
        ItemAddComponent,
        ItemsPage
    ]
})
export class ItemsPageModule {
}
