import {Component, OnInit} from '@angular/core';
import {User} from '../../../../shared/models/user';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../../shared/services/user.service';
import {mergeMap} from 'rxjs/operators';
import {Location} from '@angular/common';

@Component({
    selector: 'app-users-detail',
    templateUrl: './users-detail.component.html',
    styleUrls: ['./users-detail.component.scss'],
})
export class UsersDetailComponent implements OnInit {

    userId: number;
    user: User;
    loading = false;
    constructor(private route: ActivatedRoute,
                private userService: UserService,
                private _location: Location) {
    }

    ngOnInit() {
        this.loading = true;
        this.fetchAll();
    }

    fetchAll = () => {
        this.route.params.pipe(
            mergeMap((res) => {
                this.userId = +res['id'];
                return this.userService.getById(this.userId);
            })
        ).subscribe(perf => {
            this.user = perf;
            this.loading = false;
        });

    }


    backClicked() {
        this._location.back();
    }
}
