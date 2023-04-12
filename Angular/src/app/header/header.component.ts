import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  show: any;
  Name: string = '';
  Namesub!: Subscription;
  Showsub!: Subscription;
  constructor(private userServ: UserService, private router: Router) {}
  ngOnInit(): void {
    this.Namesub = this.userServ.user_name.subscribe((Name) => {
      this.Name = Name;
    });

    this.Showsub = this.userServ.show.subscribe((show) => {
      this.show = show;
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
