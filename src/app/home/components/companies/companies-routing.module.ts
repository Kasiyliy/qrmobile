import {NgModule, OnInit} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompaniesPage} from './companies.page';
import {CompanyListComponent} from './company-list/company-list.component';
import {CompanyAddComponent} from './company-add/company-add.component';

const routes: Routes = [
  {
    path: '', component: CompaniesPage,
    children: [
      {
        path: 'new', component: CompanyAddComponent, pathMatch: 'full'
      },
      {
        path: '', component: CompanyListComponent
      },
      // {
      //   path: ':id', component: UsersDetailComponent
      // }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompaniesRoutingModule implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
