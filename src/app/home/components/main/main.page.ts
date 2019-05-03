import { Component, OnInit } from '@angular/core';
import {User} from '../../../shared/models/user';
import {AuthService} from '../../../shared/services/auth.service';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.currentUser().subscribe(perf => {
      this.user = perf.data;
    });
  }

}
