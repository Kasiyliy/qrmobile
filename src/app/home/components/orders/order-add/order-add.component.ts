import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Company} from '../../../../shared/models/company';
import {CompanyService} from '../../../../shared/services/company.service';
import {ToastService} from '../../../../shared/services/toast.service';
import {UserService} from '../../../../shared/services/user.service';
import {OrderService} from '../../../../shared/services/order.service';
import {Order} from '../../../../shared/models/order';
import {User} from '../../../../shared/models/user';
import {OrderStatus} from '../../../../shared/models/order-status';
import {Orders} from '../../../../shared/models/orders';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.scss'],
})
export class OrderAddComponent implements OnInit {

  addOrderForm: FormGroup;
  users: User[] = [];
  loading = false;

  constructor(private companyService: CompanyService,
              private toastService: ToastService,
              private userService: UserService,
              private orderService: OrderService,
              private builder: FormBuilder) {
  }

  ngOnInit() {
    this.fetchAll();
    this.addOrderForm = this.builder.group({
      client: [null, Validators.required],
      description: [null, Validators.required],
      fromLocation: [null, Validators.required],
      toLocation: [null, Validators.required],
      price: [null, [
        Validators.required,
        Validators.pattern('^[0-9]*$')]
      ]
    });

  }

  fetchAll = () => {
    this.userService.getAll().subscribe(perf => {
      this.users = perf;
      this.loading = false;
    });
  }


  addOrder = () => {
    this.loading = true;
    const order = new Order();
    order.client = this.addOrderForm.get('client').value;
    order.price = this.addOrderForm.get('price').value;
    order.description = this.addOrderForm.get('description').value;
    order.fromLocation = this.addOrderForm.get('fromLocation').value;
    order.toLocation = this.addOrderForm.get('toLocation').value;
    const status = new OrderStatus();
    status.id = Orders.UNDER_CONSIDERATION_ID;
    status.name = Orders.UNDER_CONSIDERATION;
    order.status = status;

    this.orderService.save(order).subscribe(perf => {
      this.loading = false;
      this.addOrderForm.reset();
      this.toastService.presentInfoToast('Order added');
    }, err => {
      this.loading = false;
      this.toastService.presentDangerToast('Error occured!');
    });

    console.log(order);
  }

}
