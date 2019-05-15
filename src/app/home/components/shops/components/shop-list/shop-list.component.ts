import {Component, OnInit} from '@angular/core';
import {Company} from '../../../../../shared/models/company';
import {CompanyService} from '../../../../../shared/services/company.service';

@Component({
    selector: 'app-shop-list',
    templateUrl: './shop-list.component.html',
    styleUrls: ['./shop-list.component.scss'],
})
export class ShopListComponent implements OnInit {


    loading = false;
    companies: Company[] = [];

    ngOnInit() {
        this.loading = true;
        this.fetchAll();
    }

    constructor(private companyService: CompanyService) {
        this.fetchAll();
    }

    fetchAll() {
        this.companyService.getAll().subscribe(perf => {
            this.companies = perf;
            this.loading = false;
        }, err => {
            this.loading = false;
        });
    }

}
