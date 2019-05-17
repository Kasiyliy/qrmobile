import { Component, OnInit } from '@angular/core';
import {User} from '../../../shared/models/user';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.currentUser().subscribe(perf => {
      this.user = perf.data;
    });
  }

}
