import {Component, OnInit} from '@angular/core';
import {Router, RouterEvent} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';
import {MenuController} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

    pages = [
        {
            title: 'Main',
            url: '/home'
        },
    ];
    selectedPath = '';

    constructor(private authService: AuthService,
                private router: Router,
                private menu: MenuController) {
        this.router.events.subscribe((event: RouterEvent) => {
            this.selectedPath = event.url;
        });
    }

    ngOnInit(): void {
    }



}
