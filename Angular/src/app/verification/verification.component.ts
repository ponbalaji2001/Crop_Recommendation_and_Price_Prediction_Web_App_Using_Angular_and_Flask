import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css'],
})
export class VerificationComponent {
  constructor(private http: HttpClient) {}

  otp: any;
  submitted = false;
  isTimeout = false;
  remainingTime = 60; 
  interval: any

  ngOnInit() {
    this.startTimeout();
  }

  startTimeout(): void {
    this.interval = setInterval(() => {
      this.remainingTime--;
      
      if (this.remainingTime <= 0) {
        this.isTimeout = true;
        this.submitted = false;
        clearInterval(this.interval);
      }
    }, 1000); 
  }

  AccountVerification() {
    if (this.otp.length !== 4 || !/^[0-9]+$/.test(this.otp)) {
      this.submitted = true;
    } else {
      clearInterval(this.interval);
      const headers = new HttpHeaders({
        'Access-Control-Allow-Origin': 'http://localhost:4200/verification',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'application/json',
        'Content-Type': 'application/json',
      });

      this.http
        .post(
          'http://127.0.0.1:5000/api/verify/account',
          {
            OTP: this.otp,
          },
          { headers: headers }
        )
        .subscribe(
          (res: any) => {
            console.log(res);
          },
          (error: any) => {
            console.log(error);
          }
        );
    }
  }

  resendOTP(){
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:4200/verification',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'application/json',
      'Content-Type': 'application/json',
    });

    this.http
      .post(
        'http://127.0.0.1:5000/api/resend/otp',
        {},
        { headers: headers }
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          this.isTimeout = false;
          this.remainingTime = 60
          this.startTimeout(); 
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

}
