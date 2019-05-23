import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {mergeMap} from 'rxjs/operators';
import {User} from '../../../../shared/models/user';
import {Order} from '../../../../shared/models/order';
import {AuthService} from '../../../../shared/services/auth.service';
import {OrderService} from '../../../../shared/services/order.service';
import * as mapboxgl from 'mapbox-gl';

@Component({
    selector: 'app-track-me',
    templateUrl: './track-me.component.html',
    styleUrls: ['./track-me.component.scss'],
})
export class TrackMeComponent implements OnInit {

    orderId: number;
    user: User;
    order: Order;
    loading = false;

    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private authService: AuthService,
        private orderService: OrderService
    ) {
        this.fetchAll();


    }

    fetchAll() {
        this.loading = true;
        this.route.params.pipe(
            mergeMap(res => {
                this.orderId = +res['id'];
                return this.orderService.getById(this.orderId);
            }),
            mergeMap(res => {
                this.order = res;
                console.log(this.order);
                return this.authService.current();
            })
        ).subscribe(perf => {
            this.user = perf.data;
            this.loading = false;
        }, err => {
            this.loading = false;
        });
    }

    ngOnInit() {
    }


    backClicked() {
        this.location.back();
    }

}
