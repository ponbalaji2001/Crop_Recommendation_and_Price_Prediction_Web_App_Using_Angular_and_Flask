import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private userServ: UserService
  ) {}
  
  email = '';
  password = '';
  showpassword = false;
  submitted=false;

  ngOnInit(): void {}

  checkUser() {

    if(this.email=== '' || this.password ==='')
    {
      this.submitted=true;
    }
    else{
  
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:4200/login',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'application/json',
      'Content-Type': 'application/json',
    });

    this.http
      .post(
        'http://127.0.0.1:5000/api/check/account',
        {
          Email_ID: this.email,
          Password: this.password,
        },
        { headers: headers }
      )
      .subscribe(
        (res: any) => {
          console.log(res['Name']);

          if (res.status.statusMessage === 'Invalid User') {
            alert('Invalid User!');
          } else if (res.status.statusMessage === 'Invalid Password') {
            alert('Invalid Password!');
          } else {
            console.log(res['_id']);
            this.userServ.getUserName('Hi, ' + res['Name']);
            this.userServ.loggedIn(true);
            alert('Login successfully');
            this.router.navigate(['home']);
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }

  passwordShow() {
    this.showpassword = !this.showpassword;
  }
}
