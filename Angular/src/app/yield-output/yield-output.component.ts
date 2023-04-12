import { Component, OnInit } from '@angular/core';
import { PredictionOutputService } from '../services/prediction-output.service';

@Component({
  selector: 'app-yield-output',
  templateUrl: './yield-output.component.html',
  styleUrls: ['./yield-output.component.css'],
})
export class YieldOutputComponent implements OnInit {
  suitableCropName: any;
  suitableCrop: any;
  suitableYield: any;
  constructor(private PredictServ: PredictionOutputService) {}

  ngOnInit(): void {
    this.suitableCropName = this.PredictServ.yield_op;
    this.suitableCrop ='/assets/img/' + this.PredictServ.yield_op + ' crop.jpg';
    console.log(this.suitableCrop);
    this.suitableYield = '/assets/img/' + this.PredictServ.yield_op + '.jpg';
    console.log(this.suitableYield);
  }
}
