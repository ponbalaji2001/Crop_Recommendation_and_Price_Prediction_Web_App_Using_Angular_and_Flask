import { Component, OnInit } from '@angular/core';
import { PredictionOutputService } from '../services/prediction-output.service';

@Component({
  selector: 'app-price-ouput',
  templateUrl: './price-ouput.component.html',
  styleUrls: ['./price-ouput.component.css'],
})
export class PriceOuputComponent implements OnInit {
  vegetable='';
  veglink='';
  price='';
  constructor( private PredictServ: PredictionOutputService){}
  ngOnInit(): void {
    this.vegetable = this.PredictServ.vegName;
    this.price=this.PredictServ.price_op;
    this.veglink='/assets/img/'+this.vegetable+'.jpg';
    console.log(this.veglink);
  }
}
