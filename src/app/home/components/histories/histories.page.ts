import { Component, OnInit } from '@angular/core';
import {Order} from '../../../shared/models/order';
import {OrderService} from '../../../shared/services/order.service';
import {CompanyService} from '../../../shared/services/company.service';
import {UserService} from '../../../shared/services/user.service';
import {AuthService} from '../../../shared/services/auth.service';
import {Roles} from '../../../shared/models/roles';
import {Company} from '../../../shared/models/company';
import {mergeMap} from 'rxjs/operators';
import {User} from '../../../shared/models/user';

@Component({
  selector: 'app-histories',
  templateUrl: './histories.page.html',
  styleUrls: ['./histories.page.scss'],
})
export class HistoriesPage implements OnInit {

  loading = false;
  orders: Order[] = [];
  currentRole;
  ngOnInit() {
    this.fetchAll();
  }

  constructor(private orderService: OrderService,
              private companyService: CompanyService,
              private userService: UserService,
              private authService: AuthService) {
  }

  fetchAll = () => {
    this.loading = true;
    this.currentRole = this.authService.getRole();
    if (this.currentRole === Roles.ROLE_ADMIN) {
      this.orderService.getAll().subscribe(perf => {
        this.orders = perf;
        this.loading = false;
      }, err => {
        this.loading = false;
      });
    } else if (this.currentRole === Roles.ROLE_MANAGER) {
      let company: Company = null;
      this.companyService.getAll().pipe(
          mergeMap(perf => {
            company = perf[0];
            return this.orderService.getAllByCompanyIdHistory(company.id);
          })
      ).subscribe(perf => {
        this.orders = perf;
        this.loading = false;
      }, err => {
        this.loading = false;
      });
    } else if (this.currentRole === Roles.ROLE_DRIVER) {
      let user: User = null;
      this.userService.currentUser().pipe(
          mergeMap(perf => {
            user = perf.data;
            return this.orderService.getAllByDriverIdHistory(user.id);
          })
      ).subscribe(perf => {
        this.orders = perf;
        this.loading = false;
      }, err => {
        this.loading = false;
      });
    } else if (this.currentRole === Roles.ROLE_CLIENT) {
      let user: User = null;
      this.userService.currentUser().pipe(
          mergeMap(perf => {
            user = perf.data;
            return this.orderService.getAllByClientIdHistory(user.id);
          })
      ).subscribe(perf => {
        this.orders = perf;
        this.loading = false;
      }, err => {
        this.loading = false;
      });
    }

  };

  delete = (order: Order) => {
    this.loading = true;
    this.orderService.delete(order).subscribe(perf => {
      this.orders = this.orders.filter(c => c.id !== order.id);
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  };

  doneByClient(order: Order) {
    order.completedByClient = true;
    this.orderService.update(order).subscribe(perf => {
      const updatedOrder: Order = perf.data;
      for (let i = 0; i < this.orders.length; i++) {
        if (this.orders[i].id === perf.id) {
          this.orders[i] = updatedOrder;
        }
      }
    });
  }

  doneByDriver(order: Order) {
    order.completedByDriver = true;
    this.orderService.update(order).subscribe(perf => {
      const updatedOrder: Order = perf.data;
      for (let i = 0; i < this.orders.length; i++) {
        if (this.orders[i].id === perf.id) {
          this.orders[i] = updatedOrder;
        }
      }
    });
  }

  isClient(): boolean {
    return this.currentRole === Roles.ROLE_CLIENT;
  }

}
