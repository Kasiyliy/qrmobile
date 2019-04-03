import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  public isCompany = false;

  constructor() { }

  ngOnInit() {}

  segmentChange() {
    this.isCompany = !this.isCompany;
  }

}
