import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../shared/models/user';
import {CompanyService} from '../../../../shared/services/company.service';
import {ToastService} from '../../../../shared/services/toast.service';
import {UserService} from '../../../../shared/services/user.service';
import {OrderService} from '../../../../shared/services/order.service';
import {Order} from '../../../../shared/models/order';
import {OrderStatus} from '../../../../shared/models/order-status';
import {mergeMap} from 'rxjs/operators';
import {OrderStatusService} from '../../../../shared/services/order-status.service';
import {Company} from '../../../../shared/models/company';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-order-edit',
    templateUrl: './order-edit.component.html',
    styleUrls: ['./order-edit.component.scss'],
})
export class OrderEditComponent implements OnInit {

    editOrderForm: FormGroup;
    users: User[] = [];
    order: Order;
    orderId: number;
    drivers: User[] = [];
    loading = false;
    statuses: OrderStatus[] = [];
    companies: Company[] = [];

    constructor(private companyService: CompanyService,
                private toastService: ToastService,
                private userService: UserService,
                private orderService: OrderService,
                private orderStatusService: OrderStatusService,
                private builder: FormBuilder,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.fetchAll();
        this.editOrderForm = this.builder.group({
            toLocation: [null, Validators.required],
            fromLocation: [null, Validators.required],
            client: [null, Validators.required],
            driver: [null, Validators.required],
            company: [null, Validators.required],
            status: [null, Validators.required],
            description: [null, Validators.required],
            price: [null, [
                Validators.required,
                Validators.pattern('^[0-9]*$')]
            ]
        });

    }

    fetchAll = () => {
        this.userService.getAll().pipe(
            mergeMap(perf => {
                this.users = perf;
                return this.orderStatusService.getAll();
            }),
            mergeMap(perf => {
                this.statuses = perf;
                return this.companyService.getAll();
            }),
            mergeMap(perf => {
                this.companies = perf;
                return this.userService.getAllDriversByCompany(this.companies[0].id);
            }),
            mergeMap(perf => {
                this.drivers = perf;
                return this.route.params;
            }),
            mergeMap(perf => {
                this.orderId = perf['id'];
                return this.orderService.getById(this.orderId);
            }),
        ).subscribe(perf => {
            this.order = perf;
            this.loading = false;
        }, err => {
            this.toastService.presentDangerToast('Error occured!');
            this.loading = false;
        });
    }


    addOrder = () => {
        this.loading = true;

        this.order.client = this.editOrderForm.get('client').value;
        this.order.driver = this.editOrderForm.get('driver').value;
        this.order.status = this.editOrderForm.get('status').value;
        this.order.price = this.editOrderForm.get('price').value;
        this.order.description = this.editOrderForm.get('description').value;
        this.order.fromLocation = this.editOrderForm.get('fromLocation').value;
        this.order.toLocation = this.editOrderForm.get('toLocation').value;
        this.order.company = this.editOrderForm.get('company').value;


        this.orderService.update(this.order).subscribe(perf => {
            this.loading = false;
            this.toastService.presentInfoToast('Order updated');
            this.router.navigate(['/home/orders/']);
        }, err => {
            this.loading = false;
            this.toastService.presentDangerToast('Error occured!');
        });
    };

    compareFnStatus(e1: OrderStatus, e2: OrderStatus): boolean {
        return e1 && e2 ? e1.id === e2.id : e1 === e2;
    }
    compareFnCompany(e1: Company, e2: Company): boolean {
        return e1 && e2 ? e1.id === e2.id : e1 === e2;
    }

    compareFnUser(e1: User, e2: User): boolean {
        return e1 && e2 ? e1.id === e2.id : e1 === e2;
    }

}
