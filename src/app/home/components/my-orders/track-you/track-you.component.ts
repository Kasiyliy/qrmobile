import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../../shared/models/user';
import {Order} from '../../../../shared/models/order';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../../shared/services/auth.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Platform} from '@ionic/angular';
import {ToastService} from '../../../../shared/services/toast.service';
import {OrderLogService} from '../../../../shared/services/order-log.service';
import {OrderService} from '../../../../shared/services/order.service';
import {mergeMap} from 'rxjs/operators';
import {OrderLog} from '../../../../shared/models/order-log';

@Component({
  selector: 'app-track-you',
  templateUrl: './track-you.component.html',
  styleUrls: ['./track-you.component.scss'],
})
export class TrackYouComponent implements OnInit, OnDestroy {

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

    this.orderLogService.getLastByOrderId(this.orderId).subscribe(position => {
      this.currentLat = parseFloat(position.latitude);
      this.currentLng = parseFloat(position.longitude);
      console.log(this.currentLng);
      console.log(this.currentLat);
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
        this.orderLogService.getLastByOrderId(this.orderId).subscribe(pos => {
          const lat = parseFloat(pos.latitude);
          const lng = parseFloat(pos.longitude);

          if (this.currentLat !== lat && this.currentLng !== lng) {
            this.currentLat = lat;
            this.currentLng = lng;
            coords = new google.maps.LatLng(this.currentLat, this.currentLng);
            this.marker.setPosition(coords);
          }
        });
      }, 5000);
    }, err => {
      this.mapElement.innerHTML = 'Tracking still not started! Enter later!';
    });

  }

  ngOnDestroy(): void {
    clearInterval(this.intervalTime);
  }




  backClicked() {
    this.location.back();
  }

}
