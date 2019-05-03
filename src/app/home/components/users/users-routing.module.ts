import {NgModule, OnInit} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersDetailComponent} from './users-detail/users-detail.component';
import {UsersListComponent} from './users-list/users-list.component';
import {UsersPage} from './users.page';

const routes: Routes = [
  {
    path: '', component: UsersPage,
    children: [
      {
        path: '', component: UsersListComponent
      },
      {
        path: ':id', component: UsersDetailComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
