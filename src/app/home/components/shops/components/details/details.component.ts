import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {mergeMap} from 'rxjs/operators';
import {Company} from '../../../../../shared/models/company';
import {CompanyService} from '../../../../../shared/services/company.service';
import {Item} from '../../../../../shared/models/item';
import {ItemService} from '../../../../../shared/services/item.service';
import {environment} from '../../../../../../environments/environment';
import {ToastService} from '../../../../../shared/services/toast.service';
import {ItemOrderService} from '../../../../../shared/services/item-order.service';
import {OrderService} from '../../../../../shared/services/order.service';
import {UserService} from '../../../../../shared/services/user.service';
import {User} from '../../../../../shared/models/user';
import {Order} from '../../../../../shared/models/order';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ItemOrder} from '../../../../../shared/models/item-order';
import {OrderStatus} from '../../../../../shared/models/order-status';
import {Orders} from '../../../../../shared/models/orders';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
    imageUrl = environment.apiUrl + '/api/images/';
    companyId: number;
    company: Company;
    items: Item[] = [];
    currentUser: User;
    loading = false;
    isOrder = true;
    cartItems: Item[] = [];
    makeOrderForm: FormGroup;

    constructor(private route: ActivatedRoute,
                private companyService: CompanyService,
                private itemOrderService: ItemOrderService,
                private orderService: OrderService,
                private userService: UserService,
                private builder: FormBuilder,
                private toastrService: ToastService,
                private itemService: ItemService,
                private _location: Location) {
        this.makeOrderForm = this.builder.group({
            description: [null, Validators.required],
            toLocation: [null, Validators.required],
            fromLocation: [null, Validators.required],
        });
    }

    ngOnInit() {
        this.loading = true;
        this.fetchAll();
        console.log(this.currentUser);
    }

    changeIsOrder($event) {
        if ($event.target.value === 'order') {
            this.isOrder = true;
        } else {
            this.isOrder = false;
        }
    }

    addToCart(item: Item) {
        this.toastrService.presentInfoToast('Added to cart');
        this.cartItems.push(item);
    }

    removeFromCart(id: number) {
        this.toastrService.presentInfoToast('Removed from cart');
        this.cartItems.splice(id, 1);
    }

    fetchAll = () => {
        this.route.params.pipe(
            mergeMap((res) => {
                this.companyId = +res['id'];
                return this.companyService.getById(this.companyId);
            }),
            mergeMap((resp) => {
                this.company = resp;
                return this.itemService.getAllByCompanyId(this.companyId);
            }),
            mergeMap(perf => {
                this.items = perf;
                return this.userService.currentUser();
            })
        )
            .subscribe(perf => {
                this.currentUser = perf.data;
                this.loading = false;
            });

    };

    makeOrder() {
        const order = new Order();
        order.client = this.currentUser;
        order.fromLocation = this.makeOrderForm.get('fromLocation').value;
        order.toLocation = this.makeOrderForm.get('toLocation').value;
        order.description = this.makeOrderForm.get('description').value;
        order.company = this.company;
        const status = new OrderStatus();
        status.id = Orders.UNDER_CONSIDERATION_ID;
        order.status = status;
        order.price = this.cartItems
            .map((i) => i.price)
            .reduce((pv , cv) => pv + cv, 0);
        this.orderService.save(order).pipe(
            mergeMap(orderRes => {
                const itemOrders: ItemOrder[] = this.cartItems.map(ci => {
                    const itemOrder = new ItemOrder();
                    itemOrder.item = ci;
                    itemOrder.order = orderRes;
                    return itemOrder;
                });
                return this.itemOrderService.saveAll(itemOrders);
            })
        ).subscribe(res => {
            this.toastrService.presentInfoToast('Order made! Waint until manager calls you!');
            this.makeOrderForm.reset();
            this.cartItems = [];
        }, errorRes => {
            this.toastrService.presentInfoToast('Error occured! Inform administrator!');
        });
    }

    backClicked() {
        this._location.back();
    }

}
