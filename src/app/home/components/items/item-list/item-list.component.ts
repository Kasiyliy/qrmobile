import {Component, OnInit} from '@angular/core';
import {Item} from '../../../../shared/models/item';
import {ItemService} from '../../../../shared/services/item.service';
import {environment} from '../../../../../environments/environment';

@Component({
    selector: 'app-item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
    imageUrl = environment.apiUrl + '/api/images/';
    loading = false;
    items: Item[] = [];

    ngOnInit() {
        this.loading = true;
        this.fetchAll();
    }

    constructor(private itemService: ItemService) {
    }

    fetchAll = () => {
        this.itemService.getAll().subscribe(perf => {
            this.items = perf;
            this.loading = false;
        }, err => {
            this.loading = false;
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
