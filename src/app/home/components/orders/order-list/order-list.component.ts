import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../../../shared/services/order.service';
import {Order} from '../../../../shared/models/order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {

  loading = false;
  orders: Order[] = [];

  ngOnInit() {
    this.loading = true;
    this.fetchAll();
  }

  constructor(private orderService: OrderService) {
  }

  fetchAll = () => {
    this.orderService.getAll().subscribe(perf => {
      this.orders = perf;
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  delete = (order: Order) => {
    this.loading = true;
    this.orderService.delete(order).subscribe(perf => {
      this.orders = this.orders.filter(c => c.id !== order.id);
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

}
