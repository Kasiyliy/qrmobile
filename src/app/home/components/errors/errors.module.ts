import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ErrorsPage} from './errors.page';
import {ErrorsRoutingModule} from './errors-routing.module';
import {ServerErrorComponent} from './server-error/server-error.component';
import {AuthErrorComponent} from './auth-error/auth-error.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ErrorsRoutingModule
    ],
    declarations: [ErrorsPage, ServerErrorComponent, AuthErrorComponent]
})
export class ErrorsPageModule {
}
