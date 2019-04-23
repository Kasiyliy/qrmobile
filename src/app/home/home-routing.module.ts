import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomePage} from './home.page';

const routes: Routes = [
    {
        path: '', component: HomePage,
        children: [
            { path: '', loadChildren: './components/main/main.module#MainPageModule' },
            { path: 'users', loadChildren: './components/users/users.module#UsersPageModule' },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule {
}
