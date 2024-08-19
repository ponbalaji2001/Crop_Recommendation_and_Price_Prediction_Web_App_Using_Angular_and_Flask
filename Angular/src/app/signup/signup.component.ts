import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}

  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  showpassword = false;
  showConfirmPassword = false;
  submitted = false;
  valid=false;

  ngOnInit(): void {
  }

  AddUser() {
    if (
      this.email === '' ||
      this.password === '' ||
      this.name === '' ||
      this.confirmPassword === ''
    ) {
      this.submitted = true;
    } else {
      this.valid=true;
      const headers = new HttpHeaders({
        'Access-Control-Allow-Origin': 'http://localhost:4200/signup',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'application/json',
        'Content-Type': 'application/json',
      });
      this.http
        .post(
          'http://127.0.0.1:5000/api/create/account',
          {
            Name: this.name,
            Email: this.email,
            Password: this.password,
          },
          { headers: headers }
        )
        .subscribe(
          (res: any) => {
            console.log(res.status.statusMessage);
            if (res.status.statusMessage === 'Email already exists') {
              this.valid = false;
              alert('Email already exists');
              this.router.navigate(['signup']);
            } else if (res.status.statusMessage === 'new Email') {
              this.router.navigate(['verification']);
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

  confirmPasswordShow() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
