import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../shared/services/user.service';
import {ItemService} from '../../../../shared/services/item.service';
import {ToastService} from '../../../../shared/services/toast.service';
import {Item} from '../../../../shared/models/item';
import {User} from '../../../../shared/models/user';
import {mergeMap} from 'rxjs/operators';
import {Company} from '../../../../shared/models/company';
import {CompanyService} from '../../../../shared/services/company.service';

@Component({
    selector: 'app-item-add',
    templateUrl: './item-add.component.html',
    styleUrls: ['./item-add.component.scss'],
})
export class ItemAddComponent implements OnInit {

    addItemForm: FormGroup;
    companies: Company[] = [];
    loading = false;

    constructor(private companyService: CompanyService,
                private toastService: ToastService,
                private userService: UserService,
                private itemService: ItemService,
                private builder: FormBuilder) {
    }

    ngOnInit() {
        this.fetchAll();
        this.addItemForm = this.builder.group({
            name: [null, Validators.required],
            company: [null, Validators.required],
            price: [null, [
                Validators.required,
                Validators.pattern('^[0-9]*$')]
            ]
        });

    }

    fetchAll = () => {
        this.companyService.getAll().subscribe(perf => {
            this.companies = perf;
            this.loading = false;
        });
    }


    addItem = () => {
        this.loading = true;
        const item = new Item();
        item.company = this.addItemForm.get('company').value;
        item.price = this.addItemForm.get('price').value;
        item.name = this.addItemForm.get('name').value;

        this.itemService.save(item).subscribe(perf => {
            this.loading = false;
            this.addItemForm.reset();
            this.toastService.presentInfoToast('Item added');
        }, err => {
            this.loading = false;
            this.toastService.presentDangerToast('Error occured!');
        });

        console.log(item);
    }

}
