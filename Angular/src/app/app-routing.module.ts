import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PredictYieldComponent } from './predict-yield/predict-yield.component';
import { PredictPriceComponent } from './predict-price/predict-price.component';
import { YieldOutputComponent } from './yield-output/yield-output.component';
import { PriceOuputComponent } from './price-ouput/price-ouput.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { VerificationComponent } from './verification/verification.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {path:'about', component:AboutComponent},
  { path: 'signup', component: SignupComponent },
  { path:'verification', component:VerificationComponent},
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'predict/yield', component: PredictYieldComponent },
  { path: 'predict/price', component: PredictPriceComponent },
  { path: 'yield/output', component: YieldOutputComponent },
  { path: 'price/output', component: PriceOuputComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
