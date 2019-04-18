import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomePage} from './home.page';
import {MainComponent} from './components/main/main.component';

const routes: Routes = [
    {path: '', component: MainComponent},


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule {
}
