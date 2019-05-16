import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {Item} from '../../../../../shared/models/item';
import {ItemService} from '../../../../../shared/services/item.service';
import {CompanyService} from '../../../../../shared/services/company.service';
import {Company} from '../../../../../shared/models/company';

@Component({
    selector: 'app-item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {

    imageUrl = environment.apiUrl + '/api/images/';
    loading = false;
    items: Item[] = [];
    companies: Company[];

    ngOnInit() {
        this.fetchAll();
    }

    constructor(private itemService: ItemService,
                private companyService: CompanyService) {
    }

    fetchAll = () => {
        this.loading = true;
        this.companyService.getAll().subscribe(perf => {
            this.companies = perf;
            this.itemService.getAllByIds(this.companies.map(c => c.id)).subscribe(pe => {
                this.items = pe;
                this.loading = false;
            }, err => {
                this.loading = false;
            });
        });


    };

    delete = (item: Item) => {
        this.loading = true;
        this.itemService.delete(item).subscribe(perf => {
            this.items = this.items.filter(c => c.id !== item.id);
            this.loading = false;
        }, err => {
            this.loading = false;
        });
    };


}
