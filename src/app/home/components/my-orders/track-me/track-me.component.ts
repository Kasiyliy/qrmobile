/// <reference types="@types/googlemaps" />
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {mergeMap} from 'rxjs/operators';
import {User} from '../../../../shared/models/user';
import {Order} from '../../../../shared/models/order';
import {AuthService} from '../../../../shared/services/auth.service';
import {OrderService} from '../../../../shared/services/order.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Platform} from '@ionic/angular';
import {OrderLogService} from '../../../../shared/services/order-log.service';
import {OrderLog} from '../../../../shared/models/order-log';
import {ToastService} from '../../../../shared/services/toast.service';

@Component({
    selector: 'app-track-me',
    templateUrl: './track-me.component.html',
    styleUrls: ['./track-me.component.scss'],
})
export class TrackMeComponent implements OnInit, OnDestroy {

    @ViewChild('map') mapElement;
    map: any;

    orderId: number;
    user: User;
    order: Order;
    loading = false;
    currentLat = 0;
    currentLng = 0;
    marker: google.maps.Marker;
    intervalTime;
    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private authService: AuthService,
        private gelocation: Geolocation,
        private platform: Platform,
        private toastService: ToastService,
        private orderLogService: OrderLogService,
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
        this.initMap();
    }

    initMap() {

        this.platform.ready().then(ready => {
            this.gelocation.getCurrentPosition().then(position => {
                this.currentLat = position.coords.latitude;
                this.currentLng = position.coords.longitude;
                let coords = new google.maps.LatLng(this.currentLat, this.currentLng);
                const mapOptions: google.maps.MapOptions = {
                    center: coords,
                    zoom: 11,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

                this.marker = new google.maps.Marker({
                    map: this.map,
                    position: coords
                });

                this.intervalTime = setInterval(() => {
                    this.gelocation.getCurrentPosition().then(pos => {
                        if (this.currentLat !== pos.coords.latitude && this.currentLng !== pos.coords.longitude) {
                            this.currentLat = pos.coords.latitude;
                            this.currentLng = pos.coords.longitude;
                            const orderLog = new OrderLog();
                            orderLog.latitude = this.currentLat + '';
                            orderLog.longitude = this.currentLng + '';
                            orderLog.order = this.order;
                            this.orderLogService.save(orderLog).subscribe(perf => {
                                this.toastService.presentInfoToast(perf.id + ' ' + perf.longitude + ' ' + perf.latitude);
                                console.log(perf);
                                coords = new google.maps.LatLng(parseFloat(perf.latitude) , parseFloat(perf.longitude) );
                                this.marker.setPosition(coords);
                            });
                        }
                    });
                }, 3000);
            });

        });

    }

    ngOnDestroy(): void {
        clearInterval(this.intervalTime);
    }




    backClicked() {
        this.location.back();
    }

}
