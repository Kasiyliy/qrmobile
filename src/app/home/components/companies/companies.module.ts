import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CompaniesPage} from './companies.page';
import {CompanyListComponent} from './company-list/company-list.component';
import {CompanyAddComponent} from './company-add/company-add.component';
import {CompaniesRoutingModule} from './companies-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        CompaniesRoutingModule
    ],
    declarations: [
        CompaniesPage,
        CompanyListComponent,
        CompanyAddComponent
    ]
})
export class CompaniesPageModule {
}
