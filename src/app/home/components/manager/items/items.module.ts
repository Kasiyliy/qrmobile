import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ItemsPage} from './items.page';
import {ItemListComponent} from './item-list/item-list.component';
import {ItemAddComponent} from './item-add/item-add.component';

const routes: Routes = [
    {
        path: '',
        component: ItemsPage,
        children: [
            {path: '', component: ItemListComponent},
            {path: 'add', component: ItemAddComponent},
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
        ItemsPage,
        ItemListComponent,
        ItemAddComponent
    ]
})
export class ItemsPageModule {
}
