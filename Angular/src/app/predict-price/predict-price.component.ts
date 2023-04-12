import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PredictionOutputService } from '../services/prediction-output.service';

@Component({
  selector: 'app-predict-price',
  templateUrl: './predict-price.component.html',
  styleUrls: ['./predict-price.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PredictPriceComponent implements OnInit {
  selectedVegetable: any;
  selectedSeason: any;
  selectedMonth: any;
  selectedCondition: any;
  givenTemp: any;
  haveDisaster: any;

  vegetables = [
    'bitter gourd',
    'radish',
    'brinjal',
    'cabage',
    'califlower',
    'chilly',
    'cucumber',
    'garlic',
    'ginger',
    "Lady's finger",
    'onion',
    'peas',
    'pointed grourd',
    'potato',
    'pumkin',
    'tomato',
  ];
  seasons = ['autumn', 'monsoon', 'spring', 'summer', 'winter'];
  months = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ];

  month_values = [0, 0, 6, 1, 7, 5, 4, 2, 9, 8, 0, 3];
  conditions = ['avarage', 'fresh', 'scarp'];
  disasters = ['yes', 'no'];
  disaster_values = [1, 0];

  submitted = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private PredictServ: PredictionOutputService
  ) {}

  myform = new FormGroup({
    vegetable: new FormControl('', Validators.required),
    season: new FormControl('', Validators.required),
    month: new FormControl('', Validators.required),
    condition: new FormControl('', Validators.required),
    disaster: new FormControl('', Validators.required),
    temperature: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]+'),
    ]),
  });

  ngOnInit(): void {}

  onsubmit() {
    if (
      this.myform.controls['vegetable'].value === '' ||
      this.myform.controls['season'].value === '' ||
      this.myform.controls['month'].value === '' ||
      this.myform.controls['condition'].value === '' ||
      this.myform.controls['disaster'].value === '' ||
      this.myform.controls['temperature'].value === ''
    ) {
      this.submitted = true;
    } else {
      this.selectedVegetable = this.myform.controls['vegetable'].value;
      this.PredictServ.PriceVegName(this.selectedVegetable);
      this.selectedSeason = this.myform.controls['season'].value;
      this.selectedMonth = this.myform.controls['month'].value;
      this.selectedCondition = this.myform.controls['condition'].value;
      this.haveDisaster = this.myform.controls['disaster'].value;
      this.givenTemp = this.myform.controls['temperature'].value;
      console.log(this.selectedVegetable);
      console.log(this.haveDisaster);
      console.log(this.givenTemp);

      const headers = new HttpHeaders({
        'Access-Control-Allow-Origin': 'http://localhost:4200/predict/price',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'application/json',
        'Content-Type': 'application/json',
      });

      this.http
        .post(
          'http://127.0.0.1:5000/api/predict/price',
          {
            Vegetable: this.vegetables.indexOf(this.selectedVegetable),
            Season: this.seasons.indexOf(this.selectedSeason),
            Month: this.month_values[this.months.indexOf(this.selectedMonth)],
            Condition: this.conditions.indexOf(this.selectedCondition),
            Disaster:
              this.disaster_values[this.disasters.indexOf(this.haveDisaster)],
            Temperature: this.givenTemp,
          },
          { headers: headers }
        )
        .subscribe(
          (res: any) => {
            console.log(res);
            console.log(res['price_result']);
            this.PredictServ.PriceOutput(res['price_result']);
            this.router.navigate(['price/output']);
          },
          (error: any) => {
            console.log(error);
          }
        );
    }
  }
}
