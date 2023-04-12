import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FooterComponent } from './footer/footer.component';
import { PredictYieldComponent } from './predict-yield/predict-yield.component';
import { HomeComponent } from './home/home.component';
import { PredictPriceComponent } from './predict-price/predict-price.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { YieldOutputComponent } from './yield-output/yield-output.component';
import { PriceOuputComponent } from './price-ouput/price-ouput.component';
import { PredictionOutputService } from './services/prediction-output.service';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { VerificationComponent } from './verification/verification.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    PredictYieldComponent,
    HomeComponent,
    PredictPriceComponent,
    YieldOutputComponent,
    PriceOuputComponent,
    ContactComponent,
    AboutComponent,
    VerificationComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [UserService, PredictionOutputService],
  exports: [HeaderComponent, FooterComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
