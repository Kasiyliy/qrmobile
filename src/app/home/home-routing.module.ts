import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomePage} from './home.page';

const routes: Routes = [
    {
        path: '', component: HomePage,
        children: [
            {path: '', redirectTo: 'main', pathMatch: 'full'},
            {path: 'main', loadChildren: './components/main/main.module#MainPageModule'},
            {path: 'users', loadChildren: './components/users/users.module#UsersPageModule'},
            {path: 'companies', loadChildren: './components/companies/companies.module#CompaniesPageModule'},
            {path: 'errors', loadChildren: './components/errors/errors.module#ErrorsPageModule'},
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule {
}
