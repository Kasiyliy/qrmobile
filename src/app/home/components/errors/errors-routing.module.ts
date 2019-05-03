import {NgModule, OnInit} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ErrorsPage} from './errors.page';
import {ServerErrorComponent} from './server-error/server-error.component';
import {AuthErrorComponent} from './auth-error/auth-error.component';

const routes: Routes = [
    {
        path: '', component: ErrorsPage,
        children: [
            {path: '500', component: ServerErrorComponent},
            {path: '403', component: AuthErrorComponent},
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ErrorsRoutingModule implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
