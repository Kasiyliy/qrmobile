import {Component, OnInit} from '@angular/core';
import {Company} from '../../../../shared/models/company';
import {CompanyService} from '../../../../shared/services/company.service';

@Component({
    selector: 'app-company-list',
    templateUrl: './company-list.component.html',
    styleUrls: ['./company-list.component.scss'],
})
export class CompanyListComponent implements OnInit {

    loading = false;
    companies: Company[] = [];

    ngOnInit() {
        this.loading = true;
        this.fetchAll();
    }

    constructor(private companyService: CompanyService) {
    }

    fetchAll = () => {
        this.companyService.getAll().subscribe(perf => {
            this.companies = perf;
            this.loading = false;
        }, err => {
            this.loading = false;
        });
    }

    delete = (company: Company) => {
        this.loading = true;
        this.companyService.delete(company).subscribe(perf => {
            this.companies = this.companies.filter(c => c.id !== company.id);
            this.loading = false;
        }, err => {
            this.loading = false;
        });
    }

}
