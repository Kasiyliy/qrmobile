import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Company} from '../../../../shared/models/company';
import {UserService} from '../../../../shared/services/user.service';
import {CompanyService} from '../../../../shared/services/company.service';
import {mergeMap} from 'rxjs/operators';
import {User} from '../../../../shared/models/user';
import {ToastService} from '../../../../shared/services/toast.service';

@Component({
    selector: 'app-company-add',
    templateUrl: './company-add.component.html',
    styleUrls: ['./company-add.component.scss'],
})
export class CompanyAddComponent implements OnInit {

    addCompanyForm: FormGroup;
    loading = false;

    constructor(private builder: FormBuilder,
                private userService: UserService,
                private companyService: CompanyService,
                private toastService: ToastService) {
    }

    ngOnInit() {

        this.addCompanyForm = this.builder.group({
            name: [null, Validators.required],
            phoneNumber: [null, Validators.required],
            bin: [null, [
                Validators.required,
                Validators.minLength(12),
                Validators.maxLength(12),
                Validators.pattern('^[0-9]{12}$')]]
        });

    }


    addCompany = () => {
        this.loading = true;
        const company = new Company();
        company.name = this.addCompanyForm.get('name').value;
        company.bin = this.addCompanyForm.get('bin').value;
        company.phoneNumber = this.addCompanyForm.get('phoneNumber').value;
        let user: User = null;
        this.userService.currentUser().pipe(
            mergeMap(perf => {
                user = perf.data;
                company.user = user;
                return this.companyService.save(company);
            })
        ).subscribe(perf => {
            this.loading = false;
            this.addCompanyForm.reset();
            this.toastService.presentInfoToast('Company added');
        }, err => {
            this.loading = false;
            this.toastService.presentDangerToast('You already have company or this company already exists!');
        });

        console.log(company);
    };


}
