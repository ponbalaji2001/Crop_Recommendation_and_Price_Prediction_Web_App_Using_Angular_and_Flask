import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private userServ: UserService) {}

  Name: string = '';
  Namesub!: Subscription;

  ngOnInit(): void {
    this.Namesub = this.userServ.user_name.subscribe((Name) => {
      this.Name = Name;
    });
  }

  PredictYieldBtn() {
    if (this.Name === '') {
      alert('Please Login!');
    } else {
      this.router.navigate(['predict/yield']);
    }
  }

  PredictPriceBtn() {
    if (this.Name === '') {
      alert('Please Login!');
    } else {
      this.router.navigate(['predict/price']);
    }
  }
}
