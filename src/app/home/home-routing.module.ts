import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomePage} from './home.page';

const routes: Routes = [
    {
        path: '', component: HomePage,
        children: [
            {path: 'main', loadChildren: './components/main/main.module#MainPageModule'},
            {path: 'camera', loadChildren: './components/camera/camera.module#CameraPageModule'},
            {path: '', redirectTo: 'main', pathMatch: 'full'},
        ]
    },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule {
}