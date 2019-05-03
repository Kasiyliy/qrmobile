import { Component, OnInit } from '@angular/core';
import {User} from '../../../../shared/models/user';
import {UserService} from '../../../../shared/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {

  users: User[] = [];
  loading = false;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.loading = true;
    this.fetchAll();
  }

  fetchAll = () => {
    this.userService.getAll().subscribe(perf => {
      this.users = perf;
      this.loading = false;
    });
  }
}
