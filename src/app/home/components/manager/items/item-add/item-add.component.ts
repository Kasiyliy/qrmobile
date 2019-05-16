import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Company} from '../../../../../shared/models/company';
import {CompanyService} from '../../../../../shared/services/company.service';
import {ToastService} from '../../../../../shared/services/toast.service';
import {ImageService} from '../../../../../shared/services/image.service';
import {UserService} from '../../../../../shared/services/user.service';
import {ItemService} from '../../../../../shared/services/item.service';
import {Item} from '../../../../../shared/models/item';

@Component({
    selector: 'app-item-add',
    templateUrl: './item-add.component.html',
    styleUrls: ['./item-add.component.scss'],
})
export class ItemAddComponent implements OnInit {

    @ViewChild('fileInput') fileInput;
    addItemForm: FormGroup;
    companies: Company[] = [];
    loading = false;
    files;

    constructor(private companyService: CompanyService,
                private toastService: ToastService,
                private imageService: ImageService,
                private userService: UserService,
                private itemService: ItemService,
                private builder: FormBuilder) {
    }

    ngOnInit() {
        this.fetchAll();
        this.addItemForm = this.builder.group({
            name: [null, Validators.required],
            company: [null, Validators.required],
            file: [null],
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
    };

    uploadFile($event) {
        if ($event.target.files.length > 0) {
            this.files = $event.target.files[0];
        }
    }

    addItem = () => {
        this.loading = true;
        const item = new Item();
        item.company = this.addItemForm.get('company').value;
        item.price = this.addItemForm.get('price').value;
        item.name = this.addItemForm.get('name').value;

        this.itemService.save(item).subscribe(perf => {
            item.id = perf.id;
            if (this.addItemForm.get('file').value) {

                if (this.files) {
                    const formData = new FormData();
                    formData.append('file', this.files);
                    formData.append('itemId', item.id + '');
                    this.imageService.save(formData, item.id).subscribe(per => {
                        console.log(per);
                        this.addItemForm.reset();
                    });

                }

            } else {
                this.addItemForm.reset();
            }
            this.loading = false;

            this.toastService.presentInfoToast('Item added');
        }, err => {
            this.loading = false;
            this.toastService.presentDangerToast('Error occured!');
        });

        console.log(item);
    };
}
