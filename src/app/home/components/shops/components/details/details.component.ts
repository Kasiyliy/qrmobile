import {Component, OnInit} from '@angular/core';
import {User} from '../../../../../shared/models/user';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../../../shared/services/user.service';
import {Location} from '@angular/common';
import {mergeMap} from 'rxjs/operators';
import {Company} from '../../../../../shared/models/company';
import {CompanyService} from '../../../../../shared/services/company.service';
import {Item} from '../../../../../shared/models/item';
import {ItemService} from '../../../../../shared/services/item.service';
import {environment} from '../../../../../../environments/environment';

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
    loading = false;

    isOrder = true;

    constructor(private route: ActivatedRoute,
                private companyService: CompanyService,
                private itemService: ItemService,
                private _location: Location) {
    }

    ngOnInit() {
        this.loading = true;
        this.fetchAll();
    }

    changeIsOrder($event) {
        if ($event.target.value === 'order') {
            this.isOrder = true;
        } else {
            this.isOrder = false;
        }
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
            })
        )
            .subscribe(perf => {
                this.items = perf;
                this.loading = false;
            });

    };


    backClicked() {
        this._location.back();
    }

}
