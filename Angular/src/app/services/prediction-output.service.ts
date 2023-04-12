import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PredictionOutputService {
  yield_op: any;
  price_op: any;
  vegName: any;

  YieldOutput(y: any) {
    this.yield_op = y;
  }

  PriceVegName(n : any)
  {
       this.vegName=n;
  }

  PriceOutput(p: any) {
    this.price_op = p;
  }

  constructor() {}
}
