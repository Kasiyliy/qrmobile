import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {UsersPage} from './users.page';
import {UsersRoutingModule} from './users-routing.module';
import {UsersDetailComponent} from './users-detail/users-detail.component';
import {UsersListComponent} from './users-list/users-list.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        UsersRoutingModule,
    ],
    declarations: [
        UsersPage,
        UsersDetailComponent,
        UsersListComponent
    ]
})
export class UsersPageModule {
}
