import {NgModule, OnInit} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ItemAddComponent} from './item-add/item-add.component';
import {ItemsPage} from './items.page';
import {ItemListComponent} from './item-list/item-list.component';

const routes: Routes = [
        {
            path: '', component: ItemsPage,
            children: [
                {
                    path: '', component: ItemListComponent
                },
                {
                    path: 'new', component: ItemAddComponent
                },
            ]
        },

    ]
;

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ItemsRoutingModule implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
