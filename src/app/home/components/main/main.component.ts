import {Component, OnInit} from '@angular/core';
import {MenuController} from '@ionic/angular';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

    constructor(private menuCtrl: MenuController) {
    }

    ngOnInit() {
    }

    open() {
        this.menuCtrl.toggle();
    }

}
