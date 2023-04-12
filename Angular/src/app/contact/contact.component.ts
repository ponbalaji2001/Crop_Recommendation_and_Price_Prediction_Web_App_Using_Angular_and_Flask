import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  name: string = '';
  email: string = '';
  subject: string = '';
  message: string = '';
  submitted = false;

  ngOnInit(): void {}

  Predict() {

    if (
      this.name === '' ||
      this.email === '' ||
      this.subject === '' ||
      this.message === ''
    ) {
      this.submitted = true;
    } else {
      const headers = new HttpHeaders({
        'Access-Control-Allow-Origin': 'http://localhost:4200/contact',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'application/json',
        'Content-Type': 'application/json',
      });

      this.http
        .post(
          'http://127.0.0.1:5000/api/sentEmail',
          {
            Name: this.name,
            Email: this.email,
            Subject: this.subject,
            Message: this.message
          },
          { headers: headers }
        )
        .subscribe(
          (res: any) => {
            console.log(res);
            alert("Email Sent Successfully")
            this.router.navigate(['home']);
          },
          (error: any) => {
            console.log(error);
          }
        );
    }
  }
}


