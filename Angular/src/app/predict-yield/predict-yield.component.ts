import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PredictionOutputService } from '../services/prediction-output.service';

@Component({
  selector: 'app-predict-yield',
  templateUrl: './predict-yield.component.html',
  styleUrls: ['./predict-yield.component.css'],
})
export class PredictYieldComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private PredictServ: PredictionOutputService
  ) {}

  nitrogen: string = '';
  phosphorus: string = '';
  pottasium: string = '';
  ph: string = '';
  temperature: string = '';
  humidity: string = '';
  rainfall: string = '';
  submitted = false;

  ngOnInit(): void {}

  Predict() {

    if (
      (this.nitrogen === '' && !/^[0-9]+$/.test(this.nitrogen)) ||
      (this.phosphorus === '' && !/^[0-9]+$/.test(this.phosphorus)) ||
      (this.pottasium === '' && !/^[0-9]+$/.test(this.pottasium)) ||
      (this.ph === '' && !/^[0-9]+$/.test(this.ph)) ||
      (this.temperature === '' && !/^[0-9]+$/.test(this.temperature)) ||
      (this.humidity === '' && !/^[0-9]+$/.test(this.humidity)) ||
      (this.rainfall === '' && !/^[0-9]+$/.test(this.rainfall))
    ) {
      this.submitted = true;
    } else {
      const headers = new HttpHeaders({
        'Access-Control-Allow-Origin': 'http://localhost:4200/signup',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'application/json',
        'Content-Type': 'application/json',
      });

      this.http
        .post(
          'http://127.0.0.1:5000/api/predict/yield',
          {
            Nitrogen: this.nitrogen,
            Phosphorus: this.phosphorus,
            Pottasium: this.pottasium,
            pH: this.ph,
            Temperature: this.temperature,
            Humidity: this.humidity,
            Rainfall: this.rainfall,
          },
          { headers: headers }
        )
        .subscribe(
          (res: any) => {
            console.log(res['yield_result']);
            this.PredictServ.YieldOutput(res['yield_result']);
            this.router.navigate(['yield/output']);
          },
          (error: any) => {
            console.log(error);
          }
        );
    }
  }
}
